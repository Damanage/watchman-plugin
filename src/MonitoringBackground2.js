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
//Classes
const TrackOperation_1 = require("./background classes/TrackOperation");
const BrowserEvent_1 = require("./background classes/BrowserEvent");
const ContentScriptMessage_1 = require("./background classes/ContentScriptMessage");
//Variables
const InternalEventTypeEn_1 = require("./background classes/variables/InternalEventTypeEn");
const TrackOperationState_1 = require("./background classes/variables/TrackOperationState");
const DebugerEvent_1 = require("./background classes/variables/DebugerEvent");
const EventTypeEn_1 = require("./background classes/variables/EventTypeEn");
const AjaxRequests_1 = require("./background classes/variables/AjaxRequests");
const BrowserEventTypeEn_1 = require("./background classes/variables/BrowserEventTypeEn");
//Workers
const MetricsConverter_1 = require("./background classes/workers/MetricsConverter");
let signalR;
//---------------------------
// Обработчик TAB
//--------------------------
class TabHandler {
    // TabHandler constructor
    constructor(TabId, Config, _parent) {
        this.TabId = TabId;
        this.Config = Config;
        this.debuggerVersion = "1.0";
        // Очередь событий
        this.EventQueue = [];
        this.HandleEventQueueEntered = false;
        this.PluginVersion = chrome.runtime.getManifest().version;
        let self = this;
        this.Parent = _parent;
        this.TrackOp = new TrackOperation_1.default(TabId);
        chrome.debugger.attach({ tabId: this.TabId }, this.debuggerVersion, this.OnAttach.bind(this));
        chrome.debugger.sendCommand({ tabId: Number(this.TabId) }, "Network.enable");
        if (false) {
            chrome.debugger.sendCommand({ tabId: Number(self.TabId) }, "Performance.enable", function () {
                let lastError = chrome.runtime.lastError;
                if (lastError)
                    console.error("Performance.enable raised an error:", lastError);
            });
        }
        //-----------------------------
        // Сообщение от content script
        //-----------------------------
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            let self = this;
            if (sender.tab && self.TabId == sender.tab.id) {
                if (request.EventType == InternalEventTypeEn_1.default.ClientDOMReady) { // в параметрах пришел SiebelLoginData - взять его оттуда
                    if (request.Param) {
                        self.Parent.SiebelLoginData = request.Param;
                    }
                }
                this.EventQueue.push({ EventType: request.EventType, TabId: self.TabId, EventSubType: request.EventSubtype, Param: request.DOMEvent });
                if (!self.HandleEventQueueEntered)
                    setTimeout(self.HandleEventQueue.bind(self), 1);
                if (request.EventType == InternalEventTypeEn_1.default.ClientDOMReady) { // это самое первое событие - можно повесить и остальные listners
                    self.SetupDOMEventListners(); // все обработчики событий создаст content script
                }
            }
        }.bind(this));
    }
    OnAttach() {
        if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
            return;
        }
        chrome.debugger.onEvent.addListener(this.OnDebuggerEvent.bind(this));
    }
    HandleEventQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            function HandleOneEvent(iev) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield self.InternalEventHandler(iev);
                });
            }
            self.HandleEventQueueEntered = true;
            while (true) {
                let iev = self.EventQueue.shift();
                if (!iev)
                    break;
                yield HandleOneEvent(iev);
            }
            self.HandleEventQueueEntered = false;
        });
    }
    // chrome debugger event handler
    OnDebuggerEvent(debuggeeId, message, param) {
        if (debuggeeId.tabId != this.TabId)
            return;
        //console.log(arguments);
        this.EventQueue.push({ EventType: InternalEventTypeEn_1.default.Network, TabId: this.TabId, EventSubType: message, Request: param.request, Response: param.response, Param: param });
        if (!this.HandleEventQueueEntered)
            setTimeout(this.HandleEventQueue.bind(this), 1);
    }
    //--------------------------------------------------
    // Подготовка данных о запросе и отправка на сервер.
    //--------------------------------------------------
    PresentMonData() {
        let self = this;
        /*chrome.debugger.sendCommand({ tabId: Number(this.TabId) }, "Performance.getMetrics", null, */
        (function (ret) {
            //debugger;
            let perfData = MetricsConverter_1.default(ret);
            // Вычесть из perfData данные по состоянию на Start
            for (var i in perfData) {
                if (self.TrackOp.PerformanceDataOnStart[i]) {
                    perfData[i] -= self.TrackOp.PerformanceDataOnStart[i];
                }
            }
            // Выставить в metrics все в 0, поскольку perfData не возвращается
            for (var i in perfData) {
                perfData[i] = 0;
            }
            let endDate = new Date();
            // Считаем 
            let roundFactor = 6;
            let roundMult = Math.pow(10, roundFactor);
            let duration_total_ms = (endDate.valueOf() - self.TrackOp.StartedOperationDate.valueOf()); // всего выполнялся запрос
            let server_time = 0; // сколько ждали ответа от сервера
            let duration_network_ms = 0; // сколько ждали сеть
            let duration_loading_ms = 0; // сколько грузили данные
            for (var requestId in self.TrackOp.Requests) {
                let r = self.TrackOp.Requests[requestId];
                if (r.timing) {
                    duration_loading_ms +=
                        //(r.requestReceivedTime - (r.timing.requestTime /*+ r.timing.receiveHeadersEnd*/));// old school
                        /** new school: as per source code under the link below:
                         * addRange(
                                      timing.pushStart ? Network.RequestTimeRangeNames.ReceivingPush : Network.RequestTimeRangeNames.Receiving,
                                      request.responseReceivedTime, endTime);
                         *
                         */
                        (r.requestWillBeSentTime == null && r.loadingFinishedTime ? r.loadingFinishedTime - r.requestReceivedTime
                            : r.requestWillBeSentTime == null ? 0 :
                                (r.requestReceivedTime - r.requestWillBeSentTime));
                    //server_time += (r.timing.receiveHeadersEnd - r.timing.sendEnd); old school calc. See next few lines
                    /* server time: waiting calculation as per https://cs.chromium.org/chromium/src/third_party/blink/renderer/devtools/front_end/network/RequestTimingView.js?type=cs&q=RequestTimingView&sq=package:chromium&l=34
                     * addOffsetRange(
                          Network.RequestTimeRangeNames.Waiting,
                          Math.max(timing.sendEnd, timing.connectEnd, timing.dnsEnd, timing.proxyEnd, blockingEnd), responseReceived)
                     */
                    const blockingEnd = 0; //firstPositive([timing.dnsStart, timing.connectStart, timing.sendStart, responseReceived]) || 0;
                    let reqServerTime = r.timing.receiveHeadersEnd - Math.max(r.timing.sendEnd, r.timing.connectEnd, r.timing.dnsEnd, r.timing.proxyEnd, blockingEnd);
                    server_time += reqServerTime;
                    duration_network_ms += ((r.timing.connectEnd - r.timing.connectStart)
                        + (r.timing.dnsEnd - r.timing.dnsStart)
                        + (r.timing.sslEnd - r.timing.sslStart));
                }
            }
            // Время на клиенте
            let duration_painting_ms = 0;
            let duration_rendering_ms = perfData.LayoutDuration + perfData.RecalcStyleDuration;
            let duration_scripting_ms = perfData.ScriptDuration;
            // Client - сумма всех, кроме server
            let duration_client_ms = duration_loading_ms + duration_network_ms + duration_painting_ms + duration_rendering_ms + duration_scripting_ms;
            let duration_idle_ms = duration_total_ms - duration_client_ms - server_time; // в ожидании - остаток времени от занятий
            if (duration_idle_ms < 0) {
                duration_idle_ms = 0;
            }
            duration_client_ms += duration_idle_ms; // и idle идет в счет клиента
            let pluginUpdateDate = localStorage[self.Parent.installDate_storageKey];
            if (pluginUpdateDate) {
                pluginUpdateDate = new Date(pluginUpdateDate).valueOf();
            }
            else {
                pluginUpdateDate = null;
            }
            let userOperation = {
                audio_handlers: perfData.AudioHandlers,
                cpu_load: 0,
                documents: perfData.Documents,
                dom_content_loaded: perfData.DomContentLoaded,
                duration_client_ms: duration_client_ms,
                duration_idle_ms: duration_idle_ms,
                duration_loading_ms: duration_loading_ms,
                duration_network_ms: duration_network_ms,
                duration_other_ms: 0,
                duration_painting_ms: duration_painting_ms,
                duration_rendering_ms: duration_rendering_ms,
                duration_scripting_ms: duration_scripting_ms,
                duration_total_ms: duration_total_ms,
                end_date: endDate,
                first_meaningful_paint: perfData.FirstMeaningfulPaint,
                frames: perfData.Frames,
                hdd_load: 0,
                id: self.TrackOp.OpercationConfig.Id,
                js_event_listeners: perfData.JSEventListeners,
                js_heap_total_size: perfData.JSHeapTotalSize,
                js_heap_used_size: perfData.JSHeapUsedSize,
                layout_count: perfData.LayoutCount,
                layout_duration: perfData.LayoutDuration,
                layout_objects: perfData.LayoutObjects,
                load_size: self.TrackOp.LoadSize,
                media_keys: perfData.MediaKeys,
                media_key_sessions: perfData.MediaKeySessions,
                message_log: "",
                navigation_start: perfData.NavigationStart,
                nodes: perfData.Nodes,
                pausable_objects: perfData.PausableObjects,
                plugin_update_date: pluginUpdateDate,
                plugin_version: self.PluginVersion,
                ram_load_per: 0,
                ram_load_value: 0,
                recalc_style_count: perfData.RecalcStyleCount,
                recalc_style_duration: perfData.RecalcStyleDuration,
                request_count: self.TrackOp.RequestNum,
                request_num_failed: self.TrackOp.RequestNumFailed,
                request_num_from_cache: self.TrackOp.RequestNumFromCache,
                resources: perfData.Resources,
                script_duration: perfData.ScriptDuration,
                script_promises: perfData.ScriptPromises,
                server_time: server_time,
                start_date: self.TrackOp.StartedOperationDate,
                task_duration: endDate.valueOf() - self.TrackOp.StartedOperationDate.valueOf(),
                timestamp: perfData.Timestamp,
                uacss_resources: perfData.UACSSResources,
                v8_per_context_datas: perfData.V8PerContextDatas,
                worker_global_scopes: perfData.WorkerGlobalScopes
            };
            // Округлить все числовые величины
            for (var prop in userOperation) {
                if (userOperation[prop]) {
                    let v = Number(userOperation[prop]);
                    if (!isNaN(v)) {
                        v = Math.round(v * roundMult) / roundMult;
                        userOperation[prop] = v;
                    }
                }
            }
            console.log("operation completed", userOperation);
            let tmpSiebelLoginData = Object.assign({ Region: "", RegionCode: "", BranchId: "", BranchName: "", DivisionCode: "", LoginName: "", DivisionName: "" }, self.Parent.SiebelLoginData);
            self.Parent.LogEvent(self.TabId, "op", $.extend(userOperation, {
                region: tmpSiebelLoginData.Region,
                region_code: tmpSiebelLoginData.RegionCode,
                branch_id: tmpSiebelLoginData.BranchId,
                branch_name: tmpSiebelLoginData.BranchName,
                division_code: tmpSiebelLoginData.DivisionCode,
                division_name: tmpSiebelLoginData.DivisionName
            }));
        }([]));
    }
    // проверка, что или в фильтре на SiebelLoginData не задано свойство, или значения равны
    isSiebelLoginMatch(loginData, filter) {
        // tpList = SiebelLoginData.DivisionCode
        // regionList = SiebelLoginData.RegionCode
        // filialList = SiebelLoginData.BranchId
        // Если указан TP и наш TP - в списке, то ОК
        if (loginData.DivisionCode && (filter.tpList || []).includes(loginData.DivisionCode))
            return true;
        // Для region и для branch или фильтр не указан совсем, или наш должен быть в списке
        function testProp(propLogin, propFilter) {
            if (!(filter[propFilter] || []).length)
                return true;
            return filter[propFilter].includes(loginData[propLogin]);
        }
        return testProp("RegionCode", "regionList") && testProp("BranchId", "filialList");
    }
    //----------------------------
    /// Internal event handler
    //-----------------------------
    InternalEventHandler(iev) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            // Если мы вошли в событие, то обрабатываем его
            //console.log("InternalEventHandler Operation status:", TrackOperationStateEn[this.TrackOp.State], " Handle event:", iev.EventSubType, "Event param:", iev.Param);
            if (this.TrackOp.State != TrackOperationState_1.TrackOperationStateEn.NotStarted) {
                yield this.TrackOp.HandleEvent(iev, this.TrackOp.OpercationConfig);
                // Если завершился, завершаем событие
                if (this.TrackOp.State == TrackOperationState_1.TrackOperationStateEn.Finished) {
                    this.PresentMonData();
                    this.TrackOp.State = TrackOperationState_1.TrackOperationStateEn.NotStarted; // переключили в начальное положение 
                }
                return;
            }
            else {
                // По всем событиям - ищем, кто откликнется, что наш запрос соответствует
                for (var op of this.Config.Operations) {
                    // только активные, попадающие в диапазон дат, соответствующие (филиал,регион,организация)
                    let today = new Date();
                    let effectiveDateTo1 = null;
                    if (op.EffectiveDateTo) {
                        effectiveDateTo1 = op.EffectiveDateTo;
                        effectiveDateTo1.setDate(effectiveDateTo1.getDate() + 1);
                    }
                    if (op.IsActive
                        && (!op.EffectiveDateFrom || today >= op.EffectiveDateFrom)
                        && (!op.EffectiveDateTo || today < effectiveDateTo1)
                        && (!self.Parent.SiebelLoginData // мы не получили данные SibelLogin
                            || !op.SiebelLoginDataFilter // в операции не указан SiebelLoginFilter
                            || self.isSiebelLoginMatch(self.Parent.SiebelLoginData, op.SiebelLoginDataFilter) // соответствует фильтру
                        )) {
                        if ((yield this.TrackOp.HandleEvent(iev, op)) != TrackOperationState_1.TrackOperationStateEn.NotStarted) // запустилось. Выходим
                            break;
                    }
                }
            }
        });
    }
    // TabHandler add event listners - send messages to content script to enable event listeners
    SetupDOMEventListners() {
        // по всем элементам конфигурации с типом начала/конца операции DOMEvent/DOMMutated: собрать их все в кучу и послать content script
        let trackedEvents = [];
        let trackedDOMMutatedEvents = [];
        function addTracked(ec) {
            if (ec && ec.EventType == EventTypeEn_1.default.DOMEvent)
                trackedEvents.push(ec);
            else if (ec && ec.EventType == EventTypeEn_1.default.DOMMutation)
                trackedDOMMutatedEvents.push(ec);
        }
        for (let i in this.Config.Operations) {
            if (this.Config.Operations[i].IsActive) {
                addTracked(this.Config.Operations[i].StartEvent);
                if (this.Config.Operations[i].StartEvent)
                    addTracked(this.Config.Operations[i].StartEvent.CnjEndEvent);
                addTracked(this.Config.Operations[i].EndEvent);
            }
        }
        chrome.tabs.sendMessage(this.TabId, new ContentScriptMessage_1.ContentScriptMessageSetupDOMListners(trackedEvents));
        chrome.tabs.sendMessage(this.TabId, new ContentScriptMessage_1.ContentScriptMessageSetupDOMMutationListners(trackedDOMMutatedEvents));
    }
}
// Выполнить eval выражения expression в контексте страницы пользователя, обеспечив контекст из context
function Eval(iev, context, expression) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            chrome.tabs.sendMessage(iev.TabId, new ContentScriptMessage_1.ContentScriptMessageEval(context, expression), (resp) => {
                resolve(resp);
            });
        });
    });
}
let EventConfigurationSerial = 1; // последовательный номер EventConfiguration
//-------------------------------
// EventConfiguration: Document
//-------------------------------
class EventConfigurationDocumentNavigation {
    constructor(URLPattern) {
        this.URLPattern = URLPattern;
        this.EventType = EventTypeEn_1.default.DocumentNavigation;
        this.EventConfigurationId = EventConfigurationSerial++;
        this.CnjEndEvent = new EventConfigurationDOMEvent("DOMContentLoaded");
    }
    TestMatchInternal(iev) {
        return __awaiter(this, void 0, void 0, function* () {
            return iev.EventType == InternalEventTypeEn_1.default.Network
                && iev.EventSubType == DebugerEvent_1.debuggerEvent_requestWillBeSent
                && iev.Param
                && iev.Param.type == "Document"
                && iev.Request
                && new RegExp(this.URLPattern, "i").test(iev.Request.url);
        });
    }
}
//----------------------------------------------------------------------------------------------------------------------
// EventConfiguration ajaxComplete. Событие добавляется обработчиком конфигурации в CnjEndEvent, когда событие - Request
//----------------------------------------------------------------------------------------------------------------------
class EventConfigurationAjaxComplete {
    constructor() {
        this.EventType = EventTypeEn_1.default.AjaxRequestComplete;
        this.EventConfigurationId = EventConfigurationSerial++;
    }
    TestMatchInternal(iev, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (iev.EventType == InternalEventTypeEn_1.default.Network && iev.EventSubType == DebugerEvent_1.debuggerEvent_responseReceived /*&& requestId == iev.Param.requestId*/);
        });
    }
}
//----------------------------------------------------
// EventConfiguration ajax: конфигурация события ajax
//---------------------------------------------------
class EventConfigurationAjax {
    constructor() {
        this.EventType = EventTypeEn_1.default.AjaxRequest;
        this.EventConfigurationId = EventConfigurationSerial++;
    }
    TestMatchInternal(iev) {
        return __awaiter(this, void 0, void 0, function* () {
            let rc = iev.EventType == InternalEventTypeEn_1.default.Network
                && ((this.RequestResponse == AjaxRequests_1.AjaxRequestResponse.Request && iev.EventSubType == DebugerEvent_1.debuggerEvent_requestWillBeSent)
                    || (this.RequestResponse == AjaxRequests_1.AjaxRequestResponse.Response && iev.EventSubType == DebugerEvent_1.debuggerEvent_responseReceived))
                && iev.Param
                && iev.Param.type == "XHR";
            iev.Param = iev.Param || {};
            /*
            console.log("AjaxRequest testing match. Initial test result:", rc, !rc ?
                (iev.Param.type != "XHR" ? "request type:" + iev.Param.type : "")
                + (this.RequestResponse == AjaxRequestResponse.Request && iev.EventSubType != debuggerEvent_requestWillBeSent ? "Waiting for request but event is " + iev.EventSubType : "")
                + (this.RequestResponse == AjaxRequestResponse.Response && iev.EventSubType != debuggerEvent_responseReceived  ? "Waiting for response but event is " + iev.EventSubType : "")
                : "");*/
            if (!rc)
                return false;
            let testRegExp = new RegExp(this.OKRegexp, "i");
            let requestOrResponse = iev.Param[this.RequestResponse == AjaxRequests_1.AjaxRequestResponse.Request ? "request" : "response"];
            if (!requestOrResponse) {
                //console.error("AjaxRequest testing match. Request or Response field not initialised");
                return;
            }
            if (this.RequestResponse == AjaxRequests_1.AjaxRequestResponse.Request) { // headersText не заполнен
                let kv = [];
                for (var prp in requestOrResponse.headers)
                    kv.push(prp + ": " + requestOrResponse.headers[prp]);
                requestOrResponse.headersText = kv.join("\r\n");
            }
            let self = this;
            // URL
            if (this.TestTarget == AjaxRequests_1.AjaxTestTargetTypeEn.URL) {
                let rc = testRegExp.test(requestOrResponse.url);
                //console.log("AjaxRequest testing match. Testing URL. Result:" + rc);
                return rc;
            }
            // Header
            if (this.TestTarget == AjaxRequests_1.AjaxTestTargetTypeEn.Header) {
                let rc = testRegExp.test(requestOrResponse.headersText);
                //console.log("AjaxRequest testing match. Testing header. Result:" + rc);
                return rc;
            }
            // Body && HeaderBody REQUEST
            else if (self.RequestResponse == AjaxRequests_1.AjaxRequestResponse.Request
                && [AjaxRequests_1.AjaxTestTargetTypeEn.HeaderBody, AjaxRequests_1.AjaxTestTargetTypeEn.Body].indexOf(this.TestTarget) >= 0) {
                return new Promise(function (resolve) {
                    chrome.debugger.sendCommand({ tabId: iev.TabId }, "Network.getRequestPostData", { requestId: iev.Param.requestId }, function (data) {
                        return __awaiter(this, void 0, void 0, function* () {
                            let testString = chrome.runtime.lastError ? "" : data.postData; // that's not "POST" if there was an error
                            if (self.TestTarget == AjaxRequests_1.AjaxTestTargetTypeEn.HeaderBody)
                                testString = requestOrResponse.headersText + testString; // prepend header
                            let rc = testRegExp.test(testString);
                            //console.log("AjaxRequest testing match. Testing request header+body. Result:" + rc);
                            resolve(rc);
                            // custom expression
                            // (await Eval(iev, { body: resp.body }, self.StartCondition.OKExpression)).response;
                        });
                    });
                });
            }
            // Body && HeaderBody RESPONSE - getting body in this case
            else if (self.RequestResponse == AjaxRequests_1.AjaxRequestResponse.Response && [AjaxRequests_1.AjaxTestTargetTypeEn.HeaderBody, AjaxRequests_1.AjaxTestTargetTypeEn.Body].indexOf(this.TestTarget) >= 0) {
                // получить body
                return new Promise((resolve) => {
                    chrome.debugger.sendCommand({ tabId: iev.TabId }, "Network.getResponseBody", { requestId: iev.Param.requestId }, function (resp) {
                        return __awaiter(this, void 0, void 0, function* () {
                            let testString = resp.body;
                            if (self.TestTarget == AjaxRequests_1.AjaxTestTargetTypeEn.HeaderBody)
                                testString = iev.Param.response.headersText + testString; // prepend header
                            let rc = testRegExp.test(testString);
                            //console.log("AjaxRequest testing match. Testing response header+body. Result:" + rc);
                            resolve(rc);
                            // custom expression
                            // (await Eval(iev, { body: resp.body }, self.StartCondition.OKExpression)).response;
                        });
                    });
                });
            }
            return false;
        });
    }
}
//--------------------------------------------------------------
// Event configuration DOM: конфигурация события "Событие DOM"
//--------------------------------------------------------------
class EventConfigurationDOMEvent {
    constructor(DOMEvent, TargetElementSelector) {
        this.DOMEvent = DOMEvent;
        this.TargetElementSelector = TargetElementSelector;
        this.EventType = EventTypeEn_1.default.DOMEvent;
        this.EventConfigurationId = EventConfigurationSerial++;
    }
    TestMatchInternal(iev) {
        return __awaiter(this, void 0, void 0, function* () {
            if (iev.EventType == InternalEventTypeEn_1.default.ClientDOMReady && this.DOMEvent == "DOMContentLoaded")
                return true; // это специальный случай 
            return iev.EventType == InternalEventTypeEn_1.default.DOMEvent
                && iev.EventSubType == this.DOMEvent && iev.Param.EventConfigurationId == this.EventConfigurationId;
        });
    }
}
exports.EventConfigurationDOMEvent = EventConfigurationDOMEvent;
//----------------------------------------------------------------------
// EventCongiguration DOM Mutation: конфигурация события "Изменение DOM"
//----------------------------------------------------------------------
class EventConfigurationDOMMutation {
    constructor(TargetElementSelector, OKExpression) {
        this.TargetElementSelector = TargetElementSelector;
        this.OKExpression = OKExpression;
        this.EventType = EventTypeEn_1.default.DOMMutation;
        this.EventConfigurationId = EventConfigurationSerial++;
    }
    TestMatchInternal(iev) {
        return __awaiter(this, void 0, void 0, function* () {
            return iev.EventType == InternalEventTypeEn_1.default.DOMMutation;
        });
    }
}
exports.EventConfigurationDOMMutation = EventConfigurationDOMMutation;
class MonitoringBackground {
    constructor(monitoringAgentServerUrl) {
        this.attachedToTabIds = [];
        this.TabHandlers = [];
        this.OperationsConfig = {
            SiebelURL: null,
            Operations: []
        };
        this.PreConfig = {
            SiebelURL: "http://bcvm327/fins_rus/",
            Operations: [
                {
                    Id: "1",
                    OperationName: "1",
                    URLPattern: "http://localhost:8080/.*",
                    StartEvent: new EventConfigurationDocumentNavigation("http://localhost:8080/?$"),
                    IsActive: true,
                    SiebelLoginDataFilter: null
                },
                {
                    Id: "2",
                    OperationName: "2",
                    URLPattern: "http://localhost:8080/.*",
                    StartEvent: (() => {
                        var v = new EventConfigurationAjax();
                        v.RequestResponse = AjaxRequests_1.AjaxRequestResponse.Request;
                        v.TestTarget = AjaxRequests_1.AjaxTestTargetTypeEn.URL;
                        v.OKRegexp = "http://localhost:8080/MessageHub/PendingActivities";
                        //v.StartCondition = new AjaxEventCondition();
                        //v.StartCondition.TargetType = AjaxRequestTargetTypeEn.Header;
                        //v.StartCondition.OKExpression = 'response.headers["X-AspNetMvc-Version"]=="5.2"';
                        //v.StartCondition.TargetType = AjaxRequestTargetTypeEn.Body;
                        //v.StartCondition.OKExpression = 'body.startsWith("{")';
                        return v;
                    })(),
                    IsActive: true,
                    SiebelLoginDataFilter: null
                },
                {
                    Id: "3",
                    OperationName: "3",
                    URLPattern: "http://localhost:8080/.*",
                    StartEvent: new EventConfigurationDOMEvent("click", "a[href='/Admin/EditUserRights/1']"),
                    IsActive: true,
                    SiebelLoginDataFilter: null
                },
                {
                    Id: "4",
                    OperationName: "4",
                    URLPattern: "http://localhost:8080/.*",
                    StartEvent: new EventConfigurationDOMMutation("table"),
                    IsActive: true,
                    SiebelLoginDataFilter: null
                },
                {
                    Id: "5",
                    OperationName: "5",
                    URLPattern: "http://localhost:8080/.*",
                    StartEvent: (() => {
                        var v = new EventConfigurationAjax();
                        v.TestTarget = AjaxRequests_1.AjaxTestTargetTypeEn.URL;
                        v.OKRegexp = "PendingActivities";
                        v.RequestResponse = AjaxRequests_1.AjaxRequestResponse.Request;
                        return v;
                    })(),
                    IsActive: true,
                    SiebelLoginDataFilter: null
                }
            ]
        };
        this.AccumulatedEvents = [];
        this.CollectedEvents = [];
        // Ид. tab, открытых с нашим контентом
        this.browserActionTabIds = [];
        this.siebelDataSent = false;
        this.installDate_storageKey = "installDate"; // под этим ключом лежит дата обновления extension
        var self = this;
        var APIurl = monitoringAgentServerUrl + "API/";
        var logEventUrl = APIurl + "LogEvent/";
        var siebelLoginDataUrl = APIurl + "SiebelLoginData/";
        let getConfigUrl = APIurl + "getConfig";
        let getConfigUrlImm = APIurl + "getConfigImm";
        let siebelDataSent = false; // данные о подключении Siebel отправляются один раз или при загрузке конфигурации.
        var ajaxParam = {
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        };
        // Отправка накопленных событий на сервер
        setInterval(function () {
            if (self.AccumulatedEvents.length) {
                var eventsTmp = self.AccumulatedEvents;
                self.AccumulatedEvents = [];
                $.ajax(Object.assign({
                    url: logEventUrl,
                    data: {
                        p: { items: eventsTmp }
                    }
                }, ajaxParam));
            }
        }, 1000);
        let firstConfigPoll = true; // первый раз берем конфигурацию - она не должна выпасть в ожидание
        //-----------------------------------
        // Перезагрузка конфигурации событий
        //-----------------------------------
        function rebuildConfiguration(data) {
            //self.OperationsConfig = self.PreConfig;
            //return;
            // Параметры конфигурации 
            const configKey_siebelUrl = "efr_home_regx";
            // Параметры самой конфигурации
            if (data.config && data.config.configJson) {
                let cfgParam = JSON.parse(data.config.configJson).config;
                var p = cfgParam.find(function (e) { return e.param_code == configKey_siebelUrl; });
                if (p)
                    self.OperationsConfig.SiebelURL = p.value;
            }
            // Операции
            if (!data)
                return;
            // map с типа события start/stop сервера на наш enum
            let srvEventType2InternalEventType = {};
            srvEventType2InternalEventType["ajax"] = EventTypeEn_1.default.AjaxRequest;
            srvEventType2InternalEventType["dom-mutation"] = EventTypeEn_1.default.DOMMutation;
            srvEventType2InternalEventType["doc"] = EventTypeEn_1.default.DocumentNavigation;
            srvEventType2InternalEventType["event"] = EventTypeEn_1.default.DOMEvent;
            if (data.operations) {
                self.OperationsConfig.Operations =
                    data.operations.map(function (op) {
                        let srvConfigEl = JSON.parse(op.configData);
                        console.log(srvConfigEl);
                        function mapEvent(startStop) {
                            let ev;
                            switch (srvEventType2InternalEventType[srvConfigEl[startStop + "_type"]]) {
                                case EventTypeEn_1.default.AjaxRequest:
                                    let evAjax = new EventConfigurationAjax();
                                    evAjax.RequestResponse = srvConfigEl[startStop + "_subtype"] == AjaxRequests_1.AjaxRequestResponse.Request
                                        ? AjaxRequests_1.AjaxRequestResponse.Request : AjaxRequests_1.AjaxRequestResponse.Response;
                                    evAjax.TestTarget = Number(srvConfigEl[startStop + "_monitor"]);
                                    evAjax.OKRegexp = srvConfigEl[startStop + "_regexp"];
                                    evAjax.CustomExpression = srvConfigEl[startStop + "_cond"];
                                    ev = evAjax;
                                    // Если мы смотрим на Request, то добавить связанное событие, чтобы дождаться ответа
                                    if (evAjax.RequestResponse == AjaxRequests_1.AjaxRequestResponse.Request) {
                                        //evAjax.CnjEndEvent = new EventConfigurationAjaxComplete();
                                    }
                                    break;
                                case EventTypeEn_1.default.DOMMutation:
                                    let evDOMMutation = new EventConfigurationDOMMutation(srvConfigEl[startStop + "_regexp"], srvConfigEl[startStop + "_cond"]);
                                    ev = evDOMMutation;
                                    break;
                                case EventTypeEn_1.default.DocumentNavigation:
                                    ev = new EventConfigurationDocumentNavigation(srvConfigEl[startStop + "_monitor"]);
                                    break;
                                case EventTypeEn_1.default.DOMEvent:
                                    let evDOMEv = new EventConfigurationDOMEvent(srvConfigEl[startStop + "_subtype"], srvConfigEl[startStop + "_regexp"]);
                                    evDOMEv.OKExpression = srvConfigEl[startStop + "_cond"];
                                    ev = evDOMEv;
                                    break;
                                default:
                                    ev = null;
                            }
                            if (ev != null)
                                ev.RepeatCount = srvConfigEl[startStop + "_events_count"];
                            return ev;
                        }
                        let newEl = {
                            EffectiveDateFrom: typeof (srvConfigEl.date_from) == "string" ? new Date(srvConfigEl.date_from) : srvConfigEl.date_from,
                            EffectiveDateTo: typeof (srvConfigEl.date_to) == "string" ? new Date(srvConfigEl.date_to) : srvConfigEl.date_to,
                            EndEvent: mapEvent("stop"),
                            Id: srvConfigEl.id,
                            IsActive: srvConfigEl.active,
                            OperationName: srvConfigEl.operation_name,
                            StartEvent: mapEvent("start"),
                            URLPattern: srvConfigEl.browser_link,
                            SiebelLoginDataFilter: { regionList: srvConfigEl.regionList, filialList: srvConfigEl.filialList, tpList: srvConfigEl.tpList }
                        };
                        return newEl;
                    });
            }
            self.attachToAllTabs();
        }
        // Опрос конфигурации - long poll
        function PollConfig() {
            return __awaiter(this, void 0, void 0, function* () {
                function iter() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return new Promise(function (resolve) {
                            $.ajax(Object.assign({
                                url: firstConfigPoll ? getConfigUrlImm : getConfigUrl
                            }, ajaxParam, { timeout: 0 }))
                                .done(function (data) {
                                console.log("%cConfiguration received >>>>>>>>>>>>>>>>>>>>>>>>>>", "color:#000;background-color:#ccc;");
                                firstConfigPoll = false;
                                rebuildConfiguration(data);
                                // Послать сообщение browser tabs
                                sendConfigToBrowser();
                                resolve();
                            })
                                .fail(function () {
                                setTimeout(function () {
                                    resolve();
                                }, 10000);
                            });
                        });
                    });
                }
                while (true)
                    yield iter();
            });
        }
        PollConfig(); // запуск опроса получения конфигурации
        self.attachToAllTabs(); // Attach debugger to all tabs
        // onUpdated URL. Attach to newly created tab
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (changeInfo.url) {
                self.AttachToTab(tab);
            }
        });
        // onRemoved tab. Удалить tab.id из списка tab с нашим контентом
        chrome.tabs.onRemoved.addListener(function (tabId) {
            let ixToDel = self.browserActionTabIds.indexOf(tabId);
            if (ixToDel >= 0)
                self.browserActionTabIds.splice(ixToDel, 1);
        });
        // отправить конфигурацию в browser tab
        function sendConfigToBrowser() {
            chrome.runtime.sendMessage({ eventType: BrowserEventTypeEn_1.default.ConfigLoaded, eventParam: self.OperationsConfig });
        }
        //-----------------------------
        // Сообщение от content script
        //-----------------------------
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            //------- Сообщение от content script: данные о siebel login 
            if (request.EventType == InternalEventTypeEn_1.default.SiebelLoginData) {
                console.log("SiebelLoginData:", request.Param);
                if (request.Param && !self.SiebelLoginData)
                    self.SiebelLoginData = request.Param; // если данные получены, а у нас они - наоборот - не сохранены
                $.ajax(Object.assign({
                    url: siebelLoginDataUrl,
                    data: request.Param
                }, ajaxParam));
            }
            //----- Browser запрашивает накопленные события и конфигурацию
            else if (request.EventType == InternalEventTypeEn_1.default.BrowserRequestEventsAndConfig) {
                sendResponse({ collectedEvents: self.CollectedEvents });
                setTimeout(sendConfigToBrowser, 0);
            }
        }.bind(this));
        //----------------------------
        // browserAction
        //---------------------------
        chrome.browserAction.onClicked.addListener(function (tab) {
            chrome.tabs.create({ url: chrome.runtime.getURL("index.html") }, function (tab) {
                self.browserActionTabIds.push(tab.id);
            });
        });
        //--------------
        // onInstalled
        //------------
        chrome.runtime.onInstalled.addListener(function (details) {
            if (["install", "update"].includes(details.reason)) {
                window.localStorage.setItem(self.installDate_storageKey, JSON.stringify(new Date()));
            }
        });
    }
    HandleInternalEvent(ev) {
    }
    LogEvent(tabId, message, param) {
        //if (!filterEvents.includes(message)) return; // filter out not interesing events
        // decode tab
        let self = this;
        chrome.tabs.query({}, function (tabs) {
            var thisTab = tabs.filter(function (t) { return t.id == tabId; });
            let extendedObj = { title: "", url: "", timestamp: new Date().valueOf(), timeZoneOffset: new Date().getTimezoneOffset() };
            if (thisTab.length) {
                extendedObj.tabTitle = thisTab[0].title;
                extendedObj.tabUrl = thisTab[0].url;
            }
            if (!param)
                param = {};
            let eventDesc = Object.assign({ tabId: tabId, message: message, param: param }, extendedObj);
            // Вытащить операцию по ИД
            var op = self.OperationsConfig.Operations.filter(function (e) { return e.Id == eventDesc.param.id; });
            // Послать сообщение о событии в browser_action
            var tmp = Object.assign({}, eventDesc);
            if (op.length)
                tmp.operationName = op[0].OperationName;
            tmp.param.start_date = tmp.param.start_date.valueOf();
            tmp.param.end_date = tmp.param.end_date.valueOf();
            self.CollectedEvents.push(tmp);
            self.browserActionTabIds.forEach((e) => chrome.tabs.sendMessage(e, new BrowserEvent_1.default(BrowserEventTypeEn_1.default.EventFired, self.CollectedEvents)));
            // в очередь на отправку
            eventDesc.param = JSON.stringify(param);
            self.AccumulatedEvents.push(eventDesc);
        });
    }
    //----------------------------------------------------------------------------------------------------------------
    // Получить данные из login Siebel. Отправка сообщения. Ответ придет потом отдельным сообщением от content script
    //----------------------------------------------------------------------------------------------------------------
    GetSiebelLoginData(tabId) {
        chrome.tabs.sendMessage(tabId, new ContentScriptMessage_1.ContentScriptMessageGetSiebelLoginData());
    }
    //--------------------------------------------------------------------------------
    // Проверка, нужно ли подключить закладку к мониторингу и, если нужно, подключение
    //---------------------------------------------------------------------------------
    AttachToTab(tab) {
        let self = this;
        var tabId = Number(tab.id);
        if (!self.TabHandlers.some(function (e) { return e.TabId == tabId; })
            && tab.url && !tab.url.toLowerCase().startsWith("chrome://")
            // URL соответствует одному из наших событий
            && this.OperationsConfig.Operations.some(function (e) { return new RegExp(e.URLPattern, "i").test(tab.url); })) {
            self.TabHandlers.push(new TabHandler(tabId, self.OperationsConfig, self));
        }
        // Если данные в Siebel не отправили, а url - его, получить данные 
        if (!self.siebelDataSent && new RegExp(self.OperationsConfig.SiebelURL, "i").test(tab.url)) {
            self.GetSiebelLoginData(tabId);
        }
    }
    //------------------------------------------------
    // Попытаться сделать attach debugger to all tabs
    //------------------------------------------------
    attachToAllTabs() {
        let self = this;
        // Attach debugger to all tabs
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (e) {
                self.AttachToTab(e);
            });
        });
    }
}
window.monitoringBackground = new MonitoringBackground("http://localhost:5002/");
//# sourceMappingURL=MonitoringBackground2.js.map