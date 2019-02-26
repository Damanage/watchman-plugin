"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TrackOperationState_1 = require("./variables/TrackOperationState");
const InternalEventTypeEn_1 = require("./variables/InternalEventTypeEn");
const MetricsConverter_1 = require("./workers/MetricsConverter");
const DebugerEvent_1 = require("./variables/DebugerEvent");
class TrackOperation {
    constructor(TabId) {
        this.TabId = TabId;
        this.State = TrackOperationState_1.TrackOperationStateEn.NotStarted;
        this.State = TrackOperationState_1.TrackOperationStateEn.NotStarted;
        this.ResetCounters(); // установка счетчиков в ноль
        let self = this;
        // Таблица переходов состояний
        this.StateTable = [];
        // ... NotStarted yet. Start >>>>>
        this.StateTable[TrackOperationState_1.TrackOperationStateEn.NotStarted] = (iev, op) => __awaiter(this, void 0, void 0, function* () {
            if (op.StartEvent && (yield op.StartEvent.TestMatchInternal(iev, this.RequestId))) {
                self.OpercationConfig = op; // запомнить Operation
                self.RequestId = (iev.Param ? iev.Param.requestId : null);
                if (false) {
                    // Взять текущий performanceData
                    chrome.debugger.sendCommand({ tabId: Number(this.TabId) }, "Performance.getMetrics", null, function (ret) {
                        self.PerformanceDataOnStart = MetricsConverter_1.default(ret);
                    });
                }
                self.PerformanceDataOnStart = MetricsConverter_1.default(null);
                self.StartedOperationDate = new Date();
                return TrackOperationState_1.TrackOperationStateEn.StartDone;
            }
            return self.State; // TrackOperationStateEn.NotStarted;
        });
        //... Finished
        this.StateTable[TrackOperationState_1.TrackOperationStateEn.Finished] = this.StateTable[TrackOperationState_1.TrackOperationStateEn.NotStarted]; // из Finished -> в StartDone
        //... StartDone
        this.StateTable[TrackOperationState_1.TrackOperationStateEn.StartDone] = (iev, op) => __awaiter(this, void 0, void 0, function* () {
            if (op.StartEvent && op.StartEvent.CnjEndEvent) { // ждем связанное событие
                if (yield op.StartEvent.CnjEndEvent.TestMatchInternal(iev, this.RequestId))
                    return TrackOperationState_1.TrackOperationStateEn.StartCnjDone;
                return TrackOperationState_1.TrackOperationStateEn.StartDone;
            }
            if (!op.EndEvent)
                return TrackOperationState_1.TrackOperationStateEn.Finished;
            if (yield op.EndEvent.TestMatchInternal(iev, this.RequestId)) {
                if (!op.EndEvent.CnjEndEvent)
                    return TrackOperationState_1.TrackOperationStateEn.Finished;
                self.RequestId = (iev.Param ? iev.Param.requestId : null);
                return TrackOperationState_1.TrackOperationStateEn.EndDone;
            }
            return self.State; //TrackOperationStateEn.StartDone;
        });
        //... StartCnjDone
        this.StateTable[TrackOperationState_1.TrackOperationStateEn.StartCnjDone] = (iev, op) => __awaiter(this, void 0, void 0, function* () {
            if (!op.EndEvent)
                return TrackOperationState_1.TrackOperationStateEn.Finished;
            if (yield op.EndEvent.TestMatchInternal(iev, this.RequestId)) {
                if (!op.EndEvent.CnjEndEvent)
                    return TrackOperationState_1.TrackOperationStateEn.Finished;
                self.RequestId = (iev.Param ? iev.Param.requestId : null);
                return TrackOperationState_1.TrackOperationStateEn.EndDone;
            }
            return self.State; //TrackOperationStateEn.StartCnjDone;
        });
        // ... EndDone
        this.StateTable[TrackOperationState_1.TrackOperationStateEn.EndDone] = (iev, op) => __awaiter(this, void 0, void 0, function* () {
            if (yield op.EndEvent.CnjEndEvent.TestMatchInternal(iev, this.RequestId))
                return TrackOperationState_1.TrackOperationStateEn.Finished;
            return self.State; //TrackOperationStateEn.EndDone;
        });
    }
    ResetCounters() {
        this.LoadSize = 0;
        this.RequestNum = 0;
        this.RequestNumFailed = 0;
        this.RequestNumFromCache = 0;
        this.Requests = [];
    }
    //---------------------------
    // Обработчик события
    //---------------------------
    HandleEvent(iev, op) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            //console.log("Probing state table handler for operaction id:" + op.Id, " state:", TrackOperationStateEn[this.State]);
            let newState = yield this.StateTable[this.State](iev, op);
            //if (newState == TrackOperationStateEn.EndDone) debugger;
            const responseCodeOK = "200";
            const responseCodeNotModified = "304";
            //console.log("event:", iev.EventSubType, iev.Param);//*dbg*
            // Если событие начато, обрабатываем все события - подсчитываем параметры
            if (newState != TrackOperationState_1.TrackOperationStateEn.NotStarted && this.State != TrackOperationState_1.TrackOperationStateEn.NotStarted) {
                // Таблица тип события - обработчик
                let internalEvent2Counter = [
                    //Network.loadingFinished
                    {
                        ie: { EventType: InternalEventTypeEn_1.default.Network, TabId: this.TabId, EventSubType: "Network.loadingFinished" },
                        handler: (ie) => { self.LoadSize += Number(ie.Param.encodedDataLength); self.RequestNum++; }
                    }
                    // Network.requestWillBeSent
                    ,
                    {
                        ie: { EventType: InternalEventTypeEn_1.default.Network, TabId: this.TabId, EventSubType: DebugerEvent_1.debuggerEvent_requestWillBeSent },
                        handler: (ie) => {
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
                    ,
                    {
                        ie: { EventType: InternalEventTypeEn_1.default.Network, TabId: this.TabId, EventSubType: DebugerEvent_1.debuggerEvent_responseReceived },
                        handler: (ie) => {
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
                    ,
                    {
                        ie: { EventType: InternalEventTypeEn_1.default.Network, TabId: this.TabId, EventSubType: "Network.loadingFinished" },
                        handler: (ie) => {
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
                    ,
                    {
                        ie: { EventType: InternalEventTypeEn_1.default.Network, TabId: this.TabId, EventSubType: "Network.dataReceived" },
                        handler: (ie) => {
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
                    if (it.ie.EventType == iev.EventType && it.ie.EventSubType == iev.EventSubType)
                        it.handler(iev);
                }
            }
            if (newState != self.State && this.State == TrackOperationState_1.TrackOperationStateEn.NotStarted) {
                this.ResetCounters(); // переход в запуск - сбросить счетчики
            }
            if (newState != self.State) {
                console.log("Switched state for op:", op.Id, " new state:", TrackOperationState_1.TrackOperationStateEn[newState]);
            }
            this.State = newState; // switch state
            return newState;
        });
    }
    ;
}
exports.default = TrackOperation;
//# sourceMappingURL=TrackOperation.js.map