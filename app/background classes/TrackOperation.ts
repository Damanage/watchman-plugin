import Metrics from "./interfaces/Metrics"
import RequestReceivedTiming from "./interfaces/RequestReceivedTiming"
import { TrackOperationStateEn } from "./variables/TrackOperationState"
import InternalEventTypeEn from "./variables/InternalEventTypeEn"
import InternalEvent from "./interfaces/InternalEvent"
import OperationConfiguration from "./OperationConfiguration"
import MetricsToObj from "./workers/MetricsConverter"
import { debuggerEvent_requestWillBeSent, debuggerEvent_responseReceived } from "./variables/DebugerEvent"
export default class TrackOperation {
    RequestId: string;
    ResetCounters(): void {
        this.LoadSize = 0;
        this.RequestNum = 0;
        this.RequestNumFailed = 0;
        this.RequestNumFromCache = 0;
        this.Requests = [];
    }
    PerformanceDataOnStart: Metrics; // состояние performance при запуске операции
    constructor(public TabId: number) {
        this.State = TrackOperationStateEn.NotStarted;
        this.ResetCounters(); // установка счетчиков в ноль
        let self: TrackOperation = this;
        // Таблица переходов состояний
        this.StateTable = [];

        // ... NotStarted yet. Start >>>>>
        this.StateTable[TrackOperationStateEn.NotStarted] = async (iev: InternalEvent, op: OperationConfiguration): Promise<TrackOperationStateEn> => {
            if (op.StartEvent && await op.StartEvent.TestMatchInternal(iev, this.RequestId)) {
                self.OpercationConfig = op;// запомнить Operation
                self.RequestId = (iev.Param ? iev.Param.requestId : null);
                if (false) {
                    // Взять текущий performanceData
                    chrome.debugger.sendCommand({ tabId: Number(this.TabId) }, "Performance.getMetrics", null, function (ret) {
                        self.PerformanceDataOnStart = MetricsToObj(ret);
                    });
                }
                self.PerformanceDataOnStart = MetricsToObj(null);

                self.StartedOperationDate = new Date();
                return TrackOperationStateEn.StartDone;
            }
            return self.State;// TrackOperationStateEn.NotStarted;
        };
        //... Finished
        this.StateTable[TrackOperationStateEn.Finished] = this.StateTable[TrackOperationStateEn.NotStarted]; // из Finished -> в StartDone
        //... StartDone
        this.StateTable[TrackOperationStateEn.StartDone] = async (iev: InternalEvent, op: OperationConfiguration): Promise<TrackOperationStateEn> => {
            if (op.StartEvent && op.StartEvent.CnjEndEvent) { // ждем связанное событие
                if (await op.StartEvent.CnjEndEvent.TestMatchInternal(iev, this.RequestId)) return TrackOperationStateEn.StartCnjDone;
                return TrackOperationStateEn.StartDone;
            }
            if (!op.EndEvent) return TrackOperationStateEn.Finished;
            if (await op.EndEvent.TestMatchInternal(iev, this.RequestId)) {
                if (!op.EndEvent.CnjEndEvent) return TrackOperationStateEn.Finished;
                self.RequestId = (iev.Param ? iev.Param.requestId : null);
                return TrackOperationStateEn.EndDone;
            }
            return self.State;//TrackOperationStateEn.StartDone;
        };
        //... StartCnjDone
        this.StateTable[TrackOperationStateEn.StartCnjDone] = async (iev: InternalEvent, op: OperationConfiguration): Promise<TrackOperationStateEn> => {
            if (!op.EndEvent) return TrackOperationStateEn.Finished;
            if (await op.EndEvent.TestMatchInternal(iev, this.RequestId)) {
                if (!op.EndEvent.CnjEndEvent) return TrackOperationStateEn.Finished;
                self.RequestId = (iev.Param ? iev.Param.requestId : null);
                return TrackOperationStateEn.EndDone;
            }
            return self.State;//TrackOperationStateEn.StartCnjDone;
        };
        // ... EndDone
        this.StateTable[TrackOperationStateEn.EndDone] = async (iev: InternalEvent, op: OperationConfiguration): Promise<TrackOperationStateEn> => {
            if (await op.EndEvent.CnjEndEvent.TestMatchInternal(iev, this.RequestId)) return TrackOperationStateEn.Finished;
            return self.State;//TrackOperationStateEn.EndDone;
        };

    }
    State: TrackOperationStateEn = TrackOperationStateEn.NotStarted;
    OpercationConfig: OperationConfiguration;
    // Счетчики и данные мониторинга операции
    StartedOperationDate: Date;
    LoadSize: number;
    RequestNum: number;
    RequestNumFailed: number;
    RequestNumFromCache: any;
    Requests: {
        requestId: string,
        requestWillBeSentTime: number, // requestWillBeSent ' timestamp
        requestReceivedTime: number, // requestReceived ' timestamp
        timing: RequestReceivedTiming, // requestReceived.timing
        loadingFinishedTime?: number, // loadingFinished'timestamp
        request: any // request per se. *dbg* remove in production env.
    }[];

    //---------------------------
    // Обработчик события
    //---------------------------
    async HandleEvent(iev: InternalEvent, op: OperationConfiguration): Promise<TrackOperationStateEn> {
        let self: TrackOperation = this;
        //console.log("Probing state table handler for operaction id:" + op.Id, " state:", TrackOperationStateEn[this.State]);
        let newState = await this.StateTable[this.State](iev, op);
        //if (newState == TrackOperationStateEn.EndDone) debugger;
        const responseCodeOK = "200";
        const responseCodeNotModified = "304";
        //console.log("event:", iev.EventSubType, iev.Param);//*dbg*
        // Если событие начато, обрабатываем все события - подсчитываем параметры
        if (newState != TrackOperationStateEn.NotStarted && this.State != TrackOperationStateEn.NotStarted) {
            // Таблица тип события - обработчик
            let internalEvent2Counter: { ie: InternalEvent, handler: (ie: InternalEvent) => void }[] = [
                //Network.loadingFinished
                {
                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: "Network.loadingFinished" }
                    , handler: (ie) => { self.LoadSize += Number(ie.Param.encodedDataLength); self.RequestNum++; }
                }
                // Network.requestWillBeSent
                , {
                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: debuggerEvent_requestWillBeSent  }
                    , handler: (ie) => {
                        self.Requests[ie.Param.requestId] = {
                            requestId: ie.Param.requestId,
                            requestWillBeSentTime: ie.Param.timestamp,
                            timing: null,
                            requestReceivedTime: null,
                            request: ie.Request
                        }; // создаем запрос
                    }
                }
                // Network.responseReceived
                , {
                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: debuggerEvent_responseReceived }
                    , handler: (ie) => {
                        self.RequestNumFailed += (ie.Param.response.status == responseCodeOK
                            || ie.Param.response.status == responseCodeNotModified ? 0 : 1);
                        self.RequestNumFromCache += (ie.Param.response.fromDiskCache || ie.Param.response.status == responseCodeNotModified ? 1 : 0);
                        // Timing записать
                        let req = self.Requests[ie.Param.requestId];
                        if (!req) {
                            req = {
                                requestId: ie.Param.requestId,
                                requestWillBeSentTime: null,
                                timing: null,
                                requestReceivedTime: null,
                                request: ie.Request
                            }; 
                            self.Requests[ie.Param.requestId] = req;
                        }
                        req.requestReceivedTime = ie.Param.timestamp; // время получения
                        req.timing = ie.Param.response.timing; // взять timing
                    }
                }
                // Network.loadingFinished
                , {
                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: "Network.loadingFinished" }
                    , handler: (ie) => {
                        let req = self.Requests[ie.Param.requestId];
                        if (!req) {
                            req = {
                                requestId: ie.Param.requestId,
                                requestWillBeSentTime: null,
                                timing: null,
                                requestReceivedTime: null,
                                request: null
                            };
                            self.Requests[ie.Param.requestId] = req;
                        }
                        req.loadingFinishedTime = ie.Param.timestamp;
                    }
                }
                // Network.dataReceived
                , {
                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: "Network.dataReceived" }
                    , handler: (ie) => {
                        let req = self.Requests[ie.Param.requestId];
                        if (!req) {
                            req = {
                                requestId: ie.Param.requestId,
                                requestWillBeSentTime: null,
                                timing: null,
                                requestReceivedTime: null,
                                request: null
                            };
                            self.Requests[ie.Param.requestId] = req;
                        }
                    }
                }
            ];
            for (var it of internalEvent2Counter) {
                if (it.ie.EventType == iev.EventType && it.ie.EventSubType == iev.EventSubType) it.handler(iev);
            }
        }

        if (newState != self.State && this.State == TrackOperationStateEn.NotStarted) {
            this.ResetCounters();// переход в запуск - сбросить счетчики
        }
        if (newState != self.State) {
            console.log("Switched state for op:", op.Id, " new state:", TrackOperationStateEn[newState]);
        }
        this.State = newState; // switch state
        return newState;
    };
    // Таблица переходов состояния: map состояние -> обработчик для состояния
    StateTable: ( (InternalEvent, OperationConfiguration) => Promise<TrackOperationStateEn>)[];
}