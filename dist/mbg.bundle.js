/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/MonitoringBackground2.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/MonitoringBackground2.ts":
/*!**************************************!*\
  !*** ./app/MonitoringBackground2.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
const TrackOperation_1 = __webpack_require__(/*! ./background classes/TrackOperation */ "./app/background classes/TrackOperation.ts");
const BrowserEvent_1 = __webpack_require__(/*! ./background classes/BrowserEvent */ "./app/background classes/BrowserEvent.ts");
const ContentScriptMessage_1 = __webpack_require__(/*! ./background classes/ContentScriptMessage */ "./app/background classes/ContentScriptMessage.ts");
//Variables
const InternalEventTypeEn_1 = __webpack_require__(/*! ./background classes/variables/InternalEventTypeEn */ "./app/background classes/variables/InternalEventTypeEn.ts");
const TrackOperationState_1 = __webpack_require__(/*! ./background classes/variables/TrackOperationState */ "./app/background classes/variables/TrackOperationState.ts");
const DebugerEvent_1 = __webpack_require__(/*! ./background classes/variables/DebugerEvent */ "./app/background classes/variables/DebugerEvent.ts");
const EventTypeEn_1 = __webpack_require__(/*! ./background classes/variables/EventTypeEn */ "./app/background classes/variables/EventTypeEn.ts");
const AjaxRequests_1 = __webpack_require__(/*! ./background classes/variables/AjaxRequests */ "./app/background classes/variables/AjaxRequests.ts");
const BrowserEventTypeEn_1 = __webpack_require__(/*! ./background classes/variables/BrowserEventTypeEn */ "./app/background classes/variables/BrowserEventTypeEn.ts");
//Workers
const MetricsConverter_1 = __webpack_require__(/*! ./background classes/workers/MetricsConverter */ "./app/background classes/workers/MetricsConverter.ts");
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
        if (false) {}
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


/***/ }),

/***/ "./app/background classes/BrowserEvent.ts":
/*!************************************************!*\
  !*** ./app/background classes/BrowserEvent.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BrowserEvent {
    constructor(eventType, eventParam) {
        this.eventType = eventType;
        this.eventParam = eventParam;
    }
}
exports.default = BrowserEvent;


/***/ }),

/***/ "./app/background classes/ContentScriptMessage.ts":
/*!********************************************************!*\
  !*** ./app/background classes/ContentScriptMessage.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Типы сообщений background -> tab
var ContentScriptMessageTypeEn;
(function (ContentScriptMessageTypeEn) {
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["Eval"] = 0] = "Eval";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["SetupDOMEventListners"] = 1] = "SetupDOMEventListners";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["SetupDOMMutationListners"] = 2] = "SetupDOMMutationListners";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["GetSiebelLoginData"] = 3] = "GetSiebelLoginData";
})(ContentScriptMessageTypeEn = exports.ContentScriptMessageTypeEn || (exports.ContentScriptMessageTypeEn = {}));
class ContentScriptMessageEval {
    constructor(Context, Expression) {
        this.Context = Context;
        this.Expression = Expression;
        this.MessageType = ContentScriptMessageTypeEn.Eval;
    }
}
exports.ContentScriptMessageEval = ContentScriptMessageEval;
class ContentScriptMessageSetupDOMListners {
    constructor(Events) {
        this.Events = Events;
        this.MessageType = ContentScriptMessageTypeEn.SetupDOMEventListners;
    }
}
exports.ContentScriptMessageSetupDOMListners = ContentScriptMessageSetupDOMListners;
class ContentScriptMessageSetupDOMMutationListners {
    constructor(Events) {
        this.Events = Events;
        this.MessageType = ContentScriptMessageTypeEn.SetupDOMMutationListners;
    }
}
exports.ContentScriptMessageSetupDOMMutationListners = ContentScriptMessageSetupDOMMutationListners;
class ContentScriptMessageGetSiebelLoginData {
    constructor() {
        this.MessageType = ContentScriptMessageTypeEn.GetSiebelLoginData;
    }
}
exports.ContentScriptMessageGetSiebelLoginData = ContentScriptMessageGetSiebelLoginData;


/***/ }),

/***/ "./app/background classes/TrackOperation.ts":
/*!**************************************************!*\
  !*** ./app/background classes/TrackOperation.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
const TrackOperationState_1 = __webpack_require__(/*! ./variables/TrackOperationState */ "./app/background classes/variables/TrackOperationState.ts");
const InternalEventTypeEn_1 = __webpack_require__(/*! ./variables/InternalEventTypeEn */ "./app/background classes/variables/InternalEventTypeEn.ts");
const MetricsConverter_1 = __webpack_require__(/*! ./workers/MetricsConverter */ "./app/background classes/workers/MetricsConverter.ts");
const DebugerEvent_1 = __webpack_require__(/*! ./variables/DebugerEvent */ "./app/background classes/variables/DebugerEvent.ts");
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
                if (false) {}
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


/***/ }),

/***/ "./app/background classes/variables/AjaxRequests.ts":
/*!**********************************************************!*\
  !*** ./app/background classes/variables/AjaxRequests.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Ajax response or request
var AjaxRequestResponse;
(function (AjaxRequestResponse) {
    AjaxRequestResponse[AjaxRequestResponse["Request"] = 0] = "Request";
    AjaxRequestResponse[AjaxRequestResponse["Response"] = 1] = "Response";
})(AjaxRequestResponse = exports.AjaxRequestResponse || (exports.AjaxRequestResponse = {}));
// Предмет теста условия для ajax 
var AjaxTestTargetTypeEn;
(function (AjaxTestTargetTypeEn) {
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["URL"] = 0] = "URL";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["Header"] = 1] = "Header";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["Body"] = 2] = "Body";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["HeaderBody"] = 3] = "HeaderBody";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["CustomExpression"] = 4] = "CustomExpression";
})(AjaxTestTargetTypeEn = exports.AjaxTestTargetTypeEn || (exports.AjaxTestTargetTypeEn = {}));


/***/ }),

/***/ "./app/background classes/variables/BrowserEventTypeEn.ts":
/*!****************************************************************!*\
  !*** ./app/background classes/variables/BrowserEventTypeEn.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// события, посылаемые в browser_action script
var BrowserEventTypeEn;
(function (BrowserEventTypeEn) {
    BrowserEventTypeEn[BrowserEventTypeEn["EventFired"] = 0] = "EventFired";
    BrowserEventTypeEn[BrowserEventTypeEn["ConfigLoaded"] = 1] = "ConfigLoaded";
})(BrowserEventTypeEn || (BrowserEventTypeEn = {}));
exports.default = BrowserEventTypeEn;


/***/ }),

/***/ "./app/background classes/variables/DebugerEvent.ts":
/*!**********************************************************!*\
  !*** ./app/background classes/variables/DebugerEvent.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.debuggerEvent_requestWillBeSent = "Network.requestWillBeSent";
exports.debuggerEvent_responseReceived = "Network.responseReceived";


/***/ }),

/***/ "./app/background classes/variables/EventTypeEn.ts":
/*!*********************************************************!*\
  !*** ./app/background classes/variables/EventTypeEn.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Конфигурация: тип события начала/окончания
var EventTypeEn;
(function (EventTypeEn) {
    EventTypeEn[EventTypeEn["DocumentNavigation"] = 0] = "DocumentNavigation";
    EventTypeEn[EventTypeEn["AjaxRequest"] = 1] = "AjaxRequest";
    EventTypeEn[EventTypeEn["AjaxRequestComplete"] = 2] = "AjaxRequestComplete";
    EventTypeEn[EventTypeEn["DOMEvent"] = 3] = "DOMEvent";
    EventTypeEn[EventTypeEn["DOMMutation"] = 4] = "DOMMutation"; // изменение в структуре или атрибутах дерева DOM
})(EventTypeEn || (EventTypeEn = {}));
exports.default = EventTypeEn;


/***/ }),

/***/ "./app/background classes/variables/InternalEventTypeEn.ts":
/*!*****************************************************************!*\
  !*** ./app/background classes/variables/InternalEventTypeEn.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// типы сообщений, обрабатываемых внутри routing
var InternalEventTypeEn;
(function (InternalEventTypeEn) {
    InternalEventTypeEn[InternalEventTypeEn["Network"] = 0] = "Network";
    InternalEventTypeEn[InternalEventTypeEn["ClientDOMReady"] = 1] = "ClientDOMReady";
    InternalEventTypeEn[InternalEventTypeEn["DOMEvent"] = 2] = "DOMEvent";
    InternalEventTypeEn[InternalEventTypeEn["DOMMutation"] = 3] = "DOMMutation";
    InternalEventTypeEn[InternalEventTypeEn["SiebelLoginData"] = 4] = "SiebelLoginData";
    InternalEventTypeEn[InternalEventTypeEn["BrowserRequestEventsAndConfig"] = 5] = "BrowserRequestEventsAndConfig";
})(InternalEventTypeEn || (InternalEventTypeEn = {}));
exports.default = InternalEventTypeEn;


/***/ }),

/***/ "./app/background classes/variables/TrackOperationState.ts":
/*!*****************************************************************!*\
  !*** ./app/background classes/variables/TrackOperationState.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TrackOperationStateEn;
(function (TrackOperationStateEn) {
    TrackOperationStateEn[TrackOperationStateEn["NotStarted"] = 0] = "NotStarted";
    TrackOperationStateEn[TrackOperationStateEn["StartDone"] = 1] = "StartDone";
    TrackOperationStateEn[TrackOperationStateEn["StartCnjDone"] = 2] = "StartCnjDone";
    TrackOperationStateEn[TrackOperationStateEn["EndDone"] = 3] = "EndDone";
    TrackOperationStateEn[TrackOperationStateEn["Finished"] = 4] = "Finished";
})(TrackOperationStateEn = exports.TrackOperationStateEn || (exports.TrackOperationStateEn = {}));


/***/ }),

/***/ "./app/background classes/workers/MetricsConverter.ts":
/*!************************************************************!*\
  !*** ./app/background classes/workers/MetricsConverter.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Convert arr: {metrics: {name:string, value:number} }
function MetricsToObj(arr) {
    let o = {};
    if (!arr)
        return;
    for (var it of (arr.metrics || [])) {
        o[it.name] = Number(it.value);
    }
    return o;
}
exports.default = MetricsToObj;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL01vbml0b3JpbmdCYWNrZ3JvdW5kMi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZCBjbGFzc2VzL0Jyb3dzZXJFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZCBjbGFzc2VzL0NvbnRlbnRTY3JpcHRNZXNzYWdlLnRzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kIGNsYXNzZXMvVHJhY2tPcGVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvQWpheFJlcXVlc3RzLnRzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL0Jyb3dzZXJFdmVudFR5cGVFbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9EZWJ1Z2VyRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvRXZlbnRUeXBlRW4udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvSW50ZXJuYWxFdmVudFR5cGVFbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9UcmFja09wZXJhdGlvblN0YXRlLnRzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kIGNsYXNzZXMvd29ya2Vycy9NZXRyaWNzQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztB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QixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBTWhDOzs7Ozs7Ozs7Ozs7Ozs7QUNMRCx1REFBdUQ7QUFDdkQsU0FBd0IsWUFBWSxDQUFDLEdBQW1EO0lBQ3BGLElBQUksQ0FBQyxHQUFRLEVBQUUsQ0FBQztJQUNoQixJQUFJLENBQUMsR0FBRztRQUFFLE9BQU87SUFDakIsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDO0FBUEQsK0JBT0MiLCJmaWxlIjoibWJnLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL01vbml0b3JpbmdCYWNrZ3JvdW5kMi50c1wiKTtcbiIsIlxuLy9DbGFzc2VzXG5pbXBvcnQgVHJhY2tPcGVyYXRpb24gIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy9UcmFja09wZXJhdGlvblwiXG5pbXBvcnQgT3BlcmF0aW9uQ29uZmlndXJhdGlvbiBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvT3BlcmF0aW9uQ29uZmlndXJhdGlvblwiXG5pbXBvcnQgQnJvd3NlckV2ZW50IGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy9Ccm93c2VyRXZlbnRcIlxuaW1wb3J0IHsgXG4gICAgQ29udGVudFNjcmlwdE1lc3NhZ2VTZXR1cERPTUxpc3RuZXJzLCBcbiAgICBDb250ZW50U2NyaXB0TWVzc2FnZVNldHVwRE9NTXV0YXRpb25MaXN0bmVycyxcbiAgICBDb250ZW50U2NyaXB0TWVzc2FnZUdldFNpZWJlbExvZ2luRGF0YSxcbiAgICBDb250ZW50U2NyaXB0TWVzc2FnZUV2YWxcbn0gZnJvbSBcIi4vYmFja2dyb3VuZCBjbGFzc2VzL0NvbnRlbnRTY3JpcHRNZXNzYWdlXCJcblxuLy9JbnRlcmZhY2VzXG5pbXBvcnQgU2llYmVsTG9naW5EYXRhRmlsdGVyIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy9pbnRlcmZhY2VzL1NpZWJlbExvZ2luRGF0YUZpbHRlclwiXG5pbXBvcnQgU2llYmVsTG9naW5EYXRhIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy9pbnRlcmZhY2VzL1NpZWJlbExvZ2luRGF0YVwiXG5pbXBvcnQgSW50ZXJuYWxFdmVudCBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvaW50ZXJmYWNlcy9JbnRlcm5hbEV2ZW50XCJcbmltcG9ydCBFdmVudENvbmZpZ3VyYXRpb24gZnJvbSBcIi4vYmFja2dyb3VuZCBjbGFzc2VzL2ludGVyZmFjZXMvRXZlbnRDb25maWd1cmF0aW9uXCJcbmltcG9ydCBUYWIyQmFja2dyb3VuZE1lc3NhZ2UgZnJvbSBcIi4vYmFja2dyb3VuZCBjbGFzc2VzL2ludGVyZmFjZXMvVGFiMkJhY2tncm91bmRNZXNzYWdlXCJcbmltcG9ydCBDb25maWd1cmF0aW9uRGF0YSBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvaW50ZXJmYWNlcy9Db25maWd1cmF0aW9uRGF0YVwiXG5cbi8vVmFyaWFibGVzXG5pbXBvcnQgIEludGVybmFsRXZlbnRUeXBlRW4gIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvSW50ZXJuYWxFdmVudFR5cGVFblwiXG5pbXBvcnQgeyBUcmFja09wZXJhdGlvblN0YXRlRW4gfSBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL1RyYWNrT3BlcmF0aW9uU3RhdGVcIlxuaW1wb3J0IHsgZGVidWdnZXJFdmVudF9yZXF1ZXN0V2lsbEJlU2VudCwgZGVidWdnZXJFdmVudF9yZXNwb25zZVJlY2VpdmVkIH0gZnJvbSBcIi4vYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9EZWJ1Z2VyRXZlbnRcIlxuaW1wb3J0IEV2ZW50VHlwZUVuIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvRXZlbnRUeXBlRW5cIlxuaW1wb3J0IHsgQWpheFJlcXVlc3RSZXNwb25zZSwgQWpheFRlc3RUYXJnZXRUeXBlRW4gfSBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL0FqYXhSZXF1ZXN0c1wiXG5pbXBvcnQgQnJvd3NlckV2ZW50VHlwZUVuIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvQnJvd3NlckV2ZW50VHlwZUVuXCJcblxuLy9Xb3JrZXJzXG5pbXBvcnQgTWV0cmljc1RvT2JqIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy93b3JrZXJzL01ldHJpY3NDb252ZXJ0ZXJcIlxuXG5sZXQgc2lnbmFsUjogYW55O1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vINCe0LHRgNCw0LHQvtGC0YfQuNC6IFRBQlxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2xhc3MgVGFiSGFuZGxlciB7XG4gICAgcmVhZG9ubHkgZGVidWdnZXJWZXJzaW9uOiBzdHJpbmcgPSBcIjEuMFwiO1xuICAgIFRyYWNrT3A6IFRyYWNrT3BlcmF0aW9uO1xuXG4gICAgT25BdHRhY2goKSB7XG4gICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIGFsZXJ0KGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjaHJvbWUuZGVidWdnZXIub25FdmVudC5hZGRMaXN0ZW5lcih0aGlzLk9uRGVidWdnZXJFdmVudC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgLy8g0J7Rh9C10YDQtdC00Ywg0YHQvtCx0YvRgtC40LlcbiAgICBFdmVudFF1ZXVlOiBJbnRlcm5hbEV2ZW50W10gPSBbXTtcbiAgICBIYW5kbGVFdmVudFF1ZXVlRW50ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFzeW5jIEhhbmRsZUV2ZW50UXVldWUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gSGFuZGxlT25lRXZlbnQoaWV2OiBJbnRlcm5hbEV2ZW50KSA6IFByb21pc2U8dm9pZD57XG4gICAgICAgICAgICBhd2FpdCBzZWxmLkludGVybmFsRXZlbnRIYW5kbGVyKGlldik7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5IYW5kbGVFdmVudFF1ZXVlRW50ZXJlZCA9IHRydWU7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBsZXQgaWV2ID0gc2VsZi5FdmVudFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIWlldikgYnJlYWs7XG4gICAgICAgICAgICBhd2FpdCBIYW5kbGVPbmVFdmVudChpZXYpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuSGFuZGxlRXZlbnRRdWV1ZUVudGVyZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgIC8vIGNocm9tZSBkZWJ1Z2dlciBldmVudCBoYW5kbGVyXG4gICAgT25EZWJ1Z2dlckV2ZW50KGRlYnVnZ2VlSWQsIG1lc3NhZ2U6c3RyaW5nLCBwYXJhbTogYW55KSB7XG4gICAgICAgIGlmIChkZWJ1Z2dlZUlkLnRhYklkICE9IHRoaXMuVGFiSWQpIHJldHVybjtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLkV2ZW50UXVldWUucHVzaCh7IEV2ZW50VHlwZTogSW50ZXJuYWxFdmVudFR5cGVFbi5OZXR3b3JrLCBUYWJJZDogdGhpcy5UYWJJZCwgRXZlbnRTdWJUeXBlOiBtZXNzYWdlLCBSZXF1ZXN0OiBwYXJhbS5yZXF1ZXN0LCBSZXNwb25zZTogcGFyYW0ucmVzcG9uc2UsIFBhcmFtOiBwYXJhbSB9KTtcbiAgICAgICAgaWYgKCF0aGlzLkhhbmRsZUV2ZW50UXVldWVFbnRlcmVkKVxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLkhhbmRsZUV2ZW50UXVldWUuYmluZCh0aGlzKSwgMSk7XG4gICAgfVxuICAgIFBsdWdpblZlcnNpb246IHN0cmluZyA9IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkudmVyc2lvbjtcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8g0J/QvtC00LPQvtGC0L7QstC60LAg0LTQsNC90L3Ri9GFINC+INC30LDQv9GA0L7RgdC1INC4INC+0YLQv9GA0LDQstC60LAg0L3QsCDRgdC10YDQstC10YAuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIFByZXNlbnRNb25EYXRhKCk6IHZvaWQge1xuICAgICAgICBsZXQgc2VsZjogVGFiSGFuZGxlciA9IHRoaXM7XG4gICAgICAgIC8qY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKHsgdGFiSWQ6IE51bWJlcih0aGlzLlRhYklkKSB9LCBcIlBlcmZvcm1hbmNlLmdldE1ldHJpY3NcIiwgbnVsbCwgKi9cbiAgICAgICAgKGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XG4gICAgICAgICAgICBsZXQgcGVyZkRhdGEgPSBNZXRyaWNzVG9PYmooPGFueT5yZXQpO1xuXG4gICAgICAgICAgICAvLyDQktGL0YfQtdGB0YLRjCDQuNC3IHBlcmZEYXRhINC00LDQvdC90YvQtSDQv9C+INGB0L7RgdGC0L7Rj9C90LjRjiDQvdCwIFN0YXJ0XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHBlcmZEYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuVHJhY2tPcC5QZXJmb3JtYW5jZURhdGFPblN0YXJ0W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcmZEYXRhW2ldIC09IHNlbGYuVHJhY2tPcC5QZXJmb3JtYW5jZURhdGFPblN0YXJ0W2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g0JLRi9GB0YLQsNCy0LjRgtGMINCyIG1ldHJpY3Mg0LLRgdC1INCyIDAsINC/0L7RgdC60L7Qu9GM0LrRgyBwZXJmRGF0YSDQvdC1INCy0L7Qt9Cy0YDQsNGJ0LDQtdGC0YHRj1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwZXJmRGF0YSkge1xuICAgICAgICAgICAgICAgIHBlcmZEYXRhW2ldID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGVuZERhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICAvLyDQodGH0LjRgtCw0LXQvCBcbiAgICAgICAgICAgIGxldCByb3VuZEZhY3RvciA9IDY7XG4gICAgICAgICAgICBsZXQgcm91bmRNdWx0ID0gTWF0aC5wb3coMTAsIHJvdW5kRmFjdG9yKTtcblxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uX3RvdGFsX21zID0gKGVuZERhdGUudmFsdWVPZigpIC0gc2VsZi5UcmFja09wLlN0YXJ0ZWRPcGVyYXRpb25EYXRlLnZhbHVlT2YoKSk7IC8vINCy0YHQtdCz0L4g0LLRi9C/0L7Qu9C90Y/Qu9GB0Y8g0LfQsNC/0YDQvtGBXG4gICAgICAgICAgICBsZXQgc2VydmVyX3RpbWUgPSAwOyAvLyDRgdC60L7Qu9GM0LrQviDQttC00LDQu9C4INC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwXG4gICAgICAgICAgICBsZXQgZHVyYXRpb25fbmV0d29ya19tcyA9IDA7IC8vINGB0LrQvtC70YzQutC+INC20LTQsNC70Lgg0YHQtdGC0YxcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbl9sb2FkaW5nX21zID0gMDsgLy8g0YHQutC+0LvRjNC60L4g0LPRgNGD0LfQuNC70Lgg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICBmb3IgKHZhciByZXF1ZXN0SWQgaW4gc2VsZi5UcmFja09wLlJlcXVlc3RzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSBzZWxmLlRyYWNrT3AuUmVxdWVzdHNbcmVxdWVzdElkXTtcbiAgICAgICAgICAgICAgICBpZiAoci50aW1pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25fbG9hZGluZ19tcyArPVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8oci5yZXF1ZXN0UmVjZWl2ZWRUaW1lIC0gKHIudGltaW5nLnJlcXVlc3RUaW1lIC8qKyByLnRpbWluZy5yZWNlaXZlSGVhZGVyc0VuZCovKSk7Ly8gb2xkIHNjaG9vbFxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIG5ldyBzY2hvb2w6IGFzIHBlciBzb3VyY2UgY29kZSB1bmRlciB0aGUgbGluayBiZWxvdzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIGFkZFJhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1pbmcucHVzaFN0YXJ0ID8gTmV0d29yay5SZXF1ZXN0VGltZVJhbmdlTmFtZXMuUmVjZWl2aW5nUHVzaCA6IE5ldHdvcmsuUmVxdWVzdFRpbWVSYW5nZU5hbWVzLlJlY2VpdmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZVJlY2VpdmVkVGltZSwgZW5kVGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIucmVxdWVzdFdpbGxCZVNlbnRUaW1lID09IG51bGwgJiYgci5sb2FkaW5nRmluaXNoZWRUaW1lID8gci5sb2FkaW5nRmluaXNoZWRUaW1lIC0gci5yZXF1ZXN0UmVjZWl2ZWRUaW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiByLnJlcXVlc3RXaWxsQmVTZW50VGltZSA9PSBudWxsID8gMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoci5yZXF1ZXN0UmVjZWl2ZWRUaW1lIC0gci5yZXF1ZXN0V2lsbEJlU2VudFRpbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJfdGltZSArPSAoci50aW1pbmcucmVjZWl2ZUhlYWRlcnNFbmQgLSByLnRpbWluZy5zZW5kRW5kKTsgb2xkIHNjaG9vbCBjYWxjLiBTZWUgbmV4dCBmZXcgbGluZXNcbiAgICAgICAgICAgICAgICAgICAgLyogc2VydmVyIHRpbWU6IHdhaXRpbmcgY2FsY3VsYXRpb24gYXMgcGVyIGh0dHBzOi8vY3MuY2hyb21pdW0ub3JnL2Nocm9taXVtL3NyYy90aGlyZF9wYXJ0eS9ibGluay9yZW5kZXJlci9kZXZ0b29scy9mcm9udF9lbmQvbmV0d29yay9SZXF1ZXN0VGltaW5nVmlldy5qcz90eXBlPWNzJnE9UmVxdWVzdFRpbWluZ1ZpZXcmc3E9cGFja2FnZTpjaHJvbWl1bSZsPTM0XG4gICAgICAgICAgICAgICAgICAgICAqIGFkZE9mZnNldFJhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBOZXR3b3JrLlJlcXVlc3RUaW1lUmFuZ2VOYW1lcy5XYWl0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCh0aW1pbmcuc2VuZEVuZCwgdGltaW5nLmNvbm5lY3RFbmQsIHRpbWluZy5kbnNFbmQsIHRpbWluZy5wcm94eUVuZCwgYmxvY2tpbmdFbmQpLCByZXNwb25zZVJlY2VpdmVkKVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvY2tpbmdFbmQgPSAwOyAvL2ZpcnN0UG9zaXRpdmUoW3RpbWluZy5kbnNTdGFydCwgdGltaW5nLmNvbm5lY3RTdGFydCwgdGltaW5nLnNlbmRTdGFydCwgcmVzcG9uc2VSZWNlaXZlZF0pIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXFTZXJ2ZXJUaW1lID0gci50aW1pbmcucmVjZWl2ZUhlYWRlcnNFbmQgLSBNYXRoLm1heChyLnRpbWluZy5zZW5kRW5kLCByLnRpbWluZy5jb25uZWN0RW5kLCByLnRpbWluZy5kbnNFbmQsIHIudGltaW5nLnByb3h5RW5kLCBibG9ja2luZ0VuZCk7XG4gICAgICAgICAgICAgICAgICAgIHNlcnZlcl90aW1lICs9IHJlcVNlcnZlclRpbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25fbmV0d29ya19tcyArPSAoKHIudGltaW5nLmNvbm5lY3RFbmQgLSByLnRpbWluZy5jb25uZWN0U3RhcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICArIChyLnRpbWluZy5kbnNFbmQgLSByLnRpbWluZy5kbnNTdGFydClcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKHIudGltaW5nLnNzbEVuZCAtIHIudGltaW5nLnNzbFN0YXJ0KVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vINCS0YDQtdC80Y8g0L3QsCDQutC70LjQtdC90YLQtVxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uX3BhaW50aW5nX21zID0gMDtcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbl9yZW5kZXJpbmdfbXMgPSBwZXJmRGF0YS5MYXlvdXREdXJhdGlvbiArIHBlcmZEYXRhLlJlY2FsY1N0eWxlRHVyYXRpb247XG4gICAgICAgICAgICBsZXQgZHVyYXRpb25fc2NyaXB0aW5nX21zID0gcGVyZkRhdGEuU2NyaXB0RHVyYXRpb247XG4gICAgICAgICAgICAvLyBDbGllbnQgLSDRgdGD0LzQvNCwINCy0YHQtdGFLCDQutGA0L7QvNC1IHNlcnZlclxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uX2NsaWVudF9tcyA9IGR1cmF0aW9uX2xvYWRpbmdfbXMgKyBkdXJhdGlvbl9uZXR3b3JrX21zICsgZHVyYXRpb25fcGFpbnRpbmdfbXMgKyBkdXJhdGlvbl9yZW5kZXJpbmdfbXMgKyBkdXJhdGlvbl9zY3JpcHRpbmdfbXM7XG5cbiAgICAgICAgICAgIGxldCBkdXJhdGlvbl9pZGxlX21zID0gZHVyYXRpb25fdG90YWxfbXMgLSBkdXJhdGlvbl9jbGllbnRfbXMgLSBzZXJ2ZXJfdGltZTsvLyDQsiDQvtC20LjQtNCw0L3QuNC4IC0g0L7RgdGC0LDRgtC+0Log0LLRgNC10LzQtdC90Lgg0L7RgiDQt9Cw0L3Rj9GC0LjQuVxuICAgICAgICAgICAgaWYgKGR1cmF0aW9uX2lkbGVfbXMgPCAwKSB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb25faWRsZV9tcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkdXJhdGlvbl9jbGllbnRfbXMgKz0gZHVyYXRpb25faWRsZV9tczsgLy8g0LggaWRsZSDQuNC00LXRgiDQsiDRgdGH0LXRgiDQutC70LjQtdC90YLQsFxuXG4gICAgICAgICAgICBsZXQgcGx1Z2luVXBkYXRlRGF0ZSA9IGxvY2FsU3RvcmFnZVtzZWxmLlBhcmVudC5pbnN0YWxsRGF0ZV9zdG9yYWdlS2V5XTtcbiAgICAgICAgICAgIGlmIChwbHVnaW5VcGRhdGVEYXRlKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luVXBkYXRlRGF0ZSA9IG5ldyBEYXRlKHBsdWdpblVwZGF0ZURhdGUpLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBsdWdpblVwZGF0ZURhdGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdXNlck9wZXJhdGlvbjogVXNlck9wZXJhdGlvbiA9e1xuICAgICAgICAgICAgICAgIGF1ZGlvX2hhbmRsZXJzOiBwZXJmRGF0YS5BdWRpb0hhbmRsZXJzLFxuICAgICAgICAgICAgICAgIGNwdV9sb2FkOiAwLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50czogcGVyZkRhdGEuRG9jdW1lbnRzLFxuICAgICAgICAgICAgICAgIGRvbV9jb250ZW50X2xvYWRlZDogcGVyZkRhdGEuRG9tQ29udGVudExvYWRlZCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbl9jbGllbnRfbXM6IGR1cmF0aW9uX2NsaWVudF9tcyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbl9pZGxlX21zOiBkdXJhdGlvbl9pZGxlX21zLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uX2xvYWRpbmdfbXM6IGR1cmF0aW9uX2xvYWRpbmdfbXMsXG4gICAgICAgICAgICAgICAgZHVyYXRpb25fbmV0d29ya19tczogZHVyYXRpb25fbmV0d29ya19tcyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbl9vdGhlcl9tczogMCwgLy8g0Y3RgtC+INC80Ysg0L3QtSDQt9C90LDQtdC8LCDRh9GC0L4g0YLQsNC60L7QtVxuICAgICAgICAgICAgICAgIGR1cmF0aW9uX3BhaW50aW5nX21zOiBkdXJhdGlvbl9wYWludGluZ19tcyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbl9yZW5kZXJpbmdfbXM6IGR1cmF0aW9uX3JlbmRlcmluZ19tcyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbl9zY3JpcHRpbmdfbXM6IGR1cmF0aW9uX3NjcmlwdGluZ19tcyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbl90b3RhbF9tczogZHVyYXRpb25fdG90YWxfbXMsXG4gICAgICAgICAgICAgICAgZW5kX2RhdGU6IGVuZERhdGUsXG4gICAgICAgICAgICAgICAgZmlyc3RfbWVhbmluZ2Z1bF9wYWludDogcGVyZkRhdGEuRmlyc3RNZWFuaW5nZnVsUGFpbnQsXG4gICAgICAgICAgICAgICAgZnJhbWVzOiBwZXJmRGF0YS5GcmFtZXMsXG4gICAgICAgICAgICAgICAgaGRkX2xvYWQ6IDAsXG4gICAgICAgICAgICAgICAgaWQ6IHNlbGYuVHJhY2tPcC5PcGVyY2F0aW9uQ29uZmlnLklkLFxuICAgICAgICAgICAgICAgIGpzX2V2ZW50X2xpc3RlbmVyczogcGVyZkRhdGEuSlNFdmVudExpc3RlbmVycyxcbiAgICAgICAgICAgICAgICBqc19oZWFwX3RvdGFsX3NpemU6IHBlcmZEYXRhLkpTSGVhcFRvdGFsU2l6ZSxcbiAgICAgICAgICAgICAgICBqc19oZWFwX3VzZWRfc2l6ZTogcGVyZkRhdGEuSlNIZWFwVXNlZFNpemUsXG4gICAgICAgICAgICAgICAgbGF5b3V0X2NvdW50OiBwZXJmRGF0YS5MYXlvdXRDb3VudCxcbiAgICAgICAgICAgICAgICBsYXlvdXRfZHVyYXRpb246IHBlcmZEYXRhLkxheW91dER1cmF0aW9uLFxuICAgICAgICAgICAgICAgIGxheW91dF9vYmplY3RzOiBwZXJmRGF0YS5MYXlvdXRPYmplY3RzLFxuICAgICAgICAgICAgICAgIGxvYWRfc2l6ZTogc2VsZi5UcmFja09wLkxvYWRTaXplLFxuICAgICAgICAgICAgICAgIG1lZGlhX2tleXM6IHBlcmZEYXRhLk1lZGlhS2V5cyxcbiAgICAgICAgICAgICAgICBtZWRpYV9rZXlfc2Vzc2lvbnM6IHBlcmZEYXRhLk1lZGlhS2V5U2Vzc2lvbnMsXG4gICAgICAgICAgICAgICAgbWVzc2FnZV9sb2c6IFwiXCIsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbl9zdGFydDogcGVyZkRhdGEuTmF2aWdhdGlvblN0YXJ0LFxuICAgICAgICAgICAgICAgIG5vZGVzOiBwZXJmRGF0YS5Ob2RlcyxcbiAgICAgICAgICAgICAgICBwYXVzYWJsZV9vYmplY3RzOiBwZXJmRGF0YS5QYXVzYWJsZU9iamVjdHMsXG4gICAgICAgICAgICAgICAgcGx1Z2luX3VwZGF0ZV9kYXRlOiBwbHVnaW5VcGRhdGVEYXRlLFxuICAgICAgICAgICAgICAgIHBsdWdpbl92ZXJzaW9uOiBzZWxmLlBsdWdpblZlcnNpb24sXG4gICAgICAgICAgICAgICAgcmFtX2xvYWRfcGVyOiAwLFxuICAgICAgICAgICAgICAgIHJhbV9sb2FkX3ZhbHVlOiAwLFxuICAgICAgICAgICAgICAgIHJlY2FsY19zdHlsZV9jb3VudDogcGVyZkRhdGEuUmVjYWxjU3R5bGVDb3VudCxcbiAgICAgICAgICAgICAgICByZWNhbGNfc3R5bGVfZHVyYXRpb246IHBlcmZEYXRhLlJlY2FsY1N0eWxlRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgcmVxdWVzdF9jb3VudDogc2VsZi5UcmFja09wLlJlcXVlc3ROdW0sXG4gICAgICAgICAgICAgICAgcmVxdWVzdF9udW1fZmFpbGVkOiBzZWxmLlRyYWNrT3AuUmVxdWVzdE51bUZhaWxlZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0X251bV9mcm9tX2NhY2hlOiBzZWxmLlRyYWNrT3AuUmVxdWVzdE51bUZyb21DYWNoZSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHBlcmZEYXRhLlJlc291cmNlcyxcbiAgICAgICAgICAgICAgICBzY3JpcHRfZHVyYXRpb246IHBlcmZEYXRhLlNjcmlwdER1cmF0aW9uLFxuICAgICAgICAgICAgICAgIHNjcmlwdF9wcm9taXNlczogcGVyZkRhdGEuU2NyaXB0UHJvbWlzZXMsXG4gICAgICAgICAgICAgICAgc2VydmVyX3RpbWU6IHNlcnZlcl90aW1lLFxuICAgICAgICAgICAgICAgIHN0YXJ0X2RhdGU6IHNlbGYuVHJhY2tPcC5TdGFydGVkT3BlcmF0aW9uRGF0ZSxcbiAgICAgICAgICAgICAgICB0YXNrX2R1cmF0aW9uOiBlbmREYXRlLnZhbHVlT2YoKSAtIHNlbGYuVHJhY2tPcC5TdGFydGVkT3BlcmF0aW9uRGF0ZS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBwZXJmRGF0YS5UaW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgdWFjc3NfcmVzb3VyY2VzOiBwZXJmRGF0YS5VQUNTU1Jlc291cmNlcyxcbiAgICAgICAgICAgICAgICB2OF9wZXJfY29udGV4dF9kYXRhczogcGVyZkRhdGEuVjhQZXJDb250ZXh0RGF0YXMsXG4gICAgICAgICAgICAgICAgd29ya2VyX2dsb2JhbF9zY29wZXM6IHBlcmZEYXRhLldvcmtlckdsb2JhbFNjb3Blc1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8g0J7QutGA0YPQs9C70LjRgtGMINCy0YHQtSDRh9C40YHQu9C+0LLRi9C1INCy0LXQu9C40YfQuNC90YtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gdXNlck9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyT3BlcmF0aW9uW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gTnVtYmVyKHVzZXJPcGVyYXRpb25bcHJvcF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gTWF0aC5yb3VuZCh2ICogcm91bmRNdWx0KSAvIHJvdW5kTXVsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJPcGVyYXRpb25bcHJvcF0gPSB2O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZXJhdGlvbiBjb21wbGV0ZWRcIiwgdXNlck9wZXJhdGlvbik7XG4gICAgICAgICAgICBsZXQgdG1wU2llYmVsTG9naW5EYXRhOiBTaWViZWxMb2dpbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgLi4uIHsgUmVnaW9uOiBcIlwiLCBSZWdpb25Db2RlOiBcIlwiLCBCcmFuY2hJZDogXCJcIiwgQnJhbmNoTmFtZTogXCJcIiwgRGl2aXNpb25Db2RlOiBcIlwiLCBMb2dpbk5hbWU6IFwiXCIsIERpdmlzaW9uTmFtZTogXCJcIiB9XG4gICAgICAgICAgICAgICAgLCAuLi5zZWxmLlBhcmVudC5TaWViZWxMb2dpbkRhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZWxmLlBhcmVudC5Mb2dFdmVudChzZWxmLlRhYklkLCBcIm9wXCJcbiAgICAgICAgICAgICAgICAsICQuZXh0ZW5kKHVzZXJPcGVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpb246IHRtcFNpZWJlbExvZ2luRGF0YS5SZWdpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpb25fY29kZTogdG1wU2llYmVsTG9naW5EYXRhLlJlZ2lvbkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBicmFuY2hfaWQ6IHRtcFNpZWJlbExvZ2luRGF0YS5CcmFuY2hJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyYW5jaF9uYW1lOiB0bXBTaWViZWxMb2dpbkRhdGEuQnJhbmNoTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdmlzaW9uX2NvZGU6IHRtcFNpZWJlbExvZ2luRGF0YS5EaXZpc2lvbkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXZpc2lvbl9uYW1lOiB0bXBTaWViZWxMb2dpbkRhdGEuRGl2aXNpb25OYW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgIH0oW10pKTtcbiAgICB9XG4gICAgLy8g0L/RgNC+0LLQtdGA0LrQsCwg0YfRgtC+INC40LvQuCDQsiDRhNC40LvRjNGC0YDQtSDQvdCwIFNpZWJlbExvZ2luRGF0YSDQvdC1INC30LDQtNCw0L3QviDRgdCy0L7QudGB0YLQstC+LCDQuNC70Lgg0LfQvdCw0YfQtdC90LjRjyDRgNCw0LLQvdGLXG4gICAgaXNTaWViZWxMb2dpbk1hdGNoKGxvZ2luRGF0YTogU2llYmVsTG9naW5EYXRhLCBmaWx0ZXI6IFNpZWJlbExvZ2luRGF0YUZpbHRlcik6IGJvb2xlYW4ge1xuICAgICAgICAvLyB0cExpc3QgPSBTaWViZWxMb2dpbkRhdGEuRGl2aXNpb25Db2RlXG4gICAgICAgIC8vIHJlZ2lvbkxpc3QgPSBTaWViZWxMb2dpbkRhdGEuUmVnaW9uQ29kZVxuICAgICAgICAvLyBmaWxpYWxMaXN0ID0gU2llYmVsTG9naW5EYXRhLkJyYW5jaElkXG5cbiAgICAgICAgLy8g0JXRgdC70Lgg0YPQutCw0LfQsNC9IFRQINC4INC90LDRiCBUUCAtINCyINGB0L/QuNGB0LrQtSwg0YLQviDQntCaXG4gICAgICAgIGlmIChsb2dpbkRhdGEuRGl2aXNpb25Db2RlICYmIChmaWx0ZXIudHBMaXN0IHx8IFtdKS5pbmNsdWRlcyhsb2dpbkRhdGEuRGl2aXNpb25Db2RlKSkgcmV0dXJuIHRydWU7IFxuICAgICAgICAvLyDQlNC70Y8gcmVnaW9uINC4INC00LvRjyBicmFuY2gg0LjQu9C4INGE0LjQu9GM0YLRgCDQvdC1INGD0LrQsNC30LDQvSDRgdC+0LLRgdC10LwsINC40LvQuCDQvdCw0Ygg0LTQvtC70LbQtdC9INCx0YvRgtGMINCyINGB0L/QuNGB0LrQtVxuICAgICAgICBmdW5jdGlvbiB0ZXN0UHJvcChwcm9wTG9naW46IHN0cmluZywgcHJvcEZpbHRlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBpZiAoIShmaWx0ZXJbcHJvcEZpbHRlcl0gfHwgW10pLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyW3Byb3BGaWx0ZXJdLmluY2x1ZGVzKGxvZ2luRGF0YVtwcm9wTG9naW5dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGVzdFByb3AoXCJSZWdpb25Db2RlXCIsIFwicmVnaW9uTGlzdFwiKSAmJiB0ZXN0UHJvcChcIkJyYW5jaElkXCIsIFwiZmlsaWFsTGlzdFwiKTtcbiAgICB9XG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8vIEludGVybmFsIGV2ZW50IGhhbmRsZXJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgYXN5bmMgSW50ZXJuYWxFdmVudEhhbmRsZXIoaWV2OiBJbnRlcm5hbEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBzZWxmOiBUYWJIYW5kbGVyID0gdGhpcztcbiAgICAgICAgLy8g0JXRgdC70Lgg0LzRiyDQstC+0YjQu9C4INCyINGB0L7QsdGL0YLQuNC1LCDRgtC+INC+0LHRgNCw0LHQsNGC0YvQstCw0LXQvCDQtdCz0L5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkludGVybmFsRXZlbnRIYW5kbGVyIE9wZXJhdGlvbiBzdGF0dXM6XCIsIFRyYWNrT3BlcmF0aW9uU3RhdGVFblt0aGlzLlRyYWNrT3AuU3RhdGVdLCBcIiBIYW5kbGUgZXZlbnQ6XCIsIGlldi5FdmVudFN1YlR5cGUsIFwiRXZlbnQgcGFyYW06XCIsIGlldi5QYXJhbSk7XG4gICAgICAgIGlmICh0aGlzLlRyYWNrT3AuU3RhdGUgIT0gVHJhY2tPcGVyYXRpb25TdGF0ZUVuLk5vdFN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuVHJhY2tPcC5IYW5kbGVFdmVudChpZXYsIHRoaXMuVHJhY2tPcC5PcGVyY2F0aW9uQ29uZmlnKTtcbiAgICAgICAgICAgIC8vINCV0YHQu9C4INC30LDQstC10YDRiNC40LvRgdGPLCDQt9Cw0LLQtdGA0YjQsNC10Lwg0YHQvtCx0YvRgtC40LVcbiAgICAgICAgICAgIGlmICh0aGlzLlRyYWNrT3AuU3RhdGUgPT0gVHJhY2tPcGVyYXRpb25TdGF0ZUVuLkZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5QcmVzZW50TW9uRGF0YSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuVHJhY2tPcC5TdGF0ZSA9IFRyYWNrT3BlcmF0aW9uU3RhdGVFbi5Ob3RTdGFydGVkOy8vINC/0LXRgNC10LrQu9GO0YfQuNC70Lgg0LIg0L3QsNGH0LDQu9GM0L3QvtC1INC/0L7Qu9C+0LbQtdC90LjQtSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vINCf0L4g0LLRgdC10Lwg0YHQvtCx0YvRgtC40Y/QvCAtINC40YnQtdC8LCDQutGC0L4g0L7RgtC60LvQuNC60L3QtdGC0YHRjywg0YfRgtC+INC90LDRiCDQt9Cw0L/RgNC+0YEg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YJcbiAgICAgICAgICAgIGZvciAodmFyIG9wIG9mIHRoaXMuQ29uZmlnLk9wZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0LDQutGC0LjQstC90YvQtSwg0L/QvtC/0LDQtNCw0Y7RidC40LUg0LIg0LTQuNCw0L/QsNC30L7QvSDQtNCw0YIsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LjQtSAo0YTQuNC70LjQsNC7LNGA0LXQs9C40L7QvSzQvtGA0LPQsNC90LjQt9Cw0YbQuNGPKVxuICAgICAgICAgICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZWZmZWN0aXZlRGF0ZVRvMTogRGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKG9wLkVmZmVjdGl2ZURhdGVUbykge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVEYXRlVG8xID0gb3AuRWZmZWN0aXZlRGF0ZVRvO1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVEYXRlVG8xLnNldERhdGUoZWZmZWN0aXZlRGF0ZVRvMS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG9wLklzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICYmICghb3AuRWZmZWN0aXZlRGF0ZUZyb20gfHwgdG9kYXkgPj0gb3AuRWZmZWN0aXZlRGF0ZUZyb20pXG4gICAgICAgICAgICAgICAgICAgICYmICghb3AuRWZmZWN0aXZlRGF0ZVRvIHx8IHRvZGF5IDwgZWZmZWN0aXZlRGF0ZVRvMSlcbiAgICAgICAgICAgICAgICAgICAgJiYgKCFzZWxmLlBhcmVudC5TaWViZWxMb2dpbkRhdGEgLy8g0LzRiyDQvdC1INC/0L7Qu9GD0YfQuNC70Lgg0LTQsNC90L3Ri9C1IFNpYmVsTG9naW5cbiAgICAgICAgICAgICAgICAgICAgfHwgIW9wLlNpZWJlbExvZ2luRGF0YUZpbHRlciAgICAgIC8vINCyINC+0L/QtdGA0LDRhtC40Lgg0L3QtSDRg9C60LDQt9Cw0L0gU2llYmVsTG9naW5GaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgfHwgc2VsZi5pc1NpZWJlbExvZ2luTWF0Y2goc2VsZi5QYXJlbnQuU2llYmVsTG9naW5EYXRhLCBvcC5TaWViZWxMb2dpbkRhdGFGaWx0ZXIpIC8vINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINGE0LjQu9GM0YLRgNGDXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF3YWl0IHRoaXMuVHJhY2tPcC5IYW5kbGVFdmVudChpZXYsIG9wKSAhPSBUcmFja09wZXJhdGlvblN0YXRlRW4uTm90U3RhcnRlZCkgLy8g0LfQsNC/0YPRgdGC0LjQu9C+0YHRjC4g0JLRi9GF0L7QtNC40LxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUYWJIYW5kbGVyIGFkZCBldmVudCBsaXN0bmVycyAtIHNlbmQgbWVzc2FnZXMgdG8gY29udGVudCBzY3JpcHQgdG8gZW5hYmxlIGV2ZW50IGxpc3RlbmVyc1xuICAgIHByaXZhdGUgU2V0dXBET01FdmVudExpc3RuZXJzKCk6dm9pZCB7XG4gICAgICAgIC8vINC/0L4g0LLRgdC10Lwg0Y3Qu9C10LzQtdC90YLQsNC8INC60L7QvdGE0LjQs9GD0YDQsNGG0LjQuCDRgSDRgtC40L/QvtC8INC90LDRh9Cw0LvQsC/QutC+0L3RhtCwINC+0L/QtdGA0LDRhtC40LggRE9NRXZlbnQvRE9NTXV0YXRlZDog0YHQvtCx0YDQsNGC0Ywg0LjRhSDQstGB0LUg0LIg0LrRg9GH0YMg0Lgg0L/QvtGB0LvQsNGC0YwgY29udGVudCBzY3JpcHRcbiAgICAgICAgbGV0IHRyYWNrZWRFdmVudHM6IEV2ZW50Q29uZmlndXJhdGlvbltdID0gW107XG4gICAgICAgIGxldCB0cmFja2VkRE9NTXV0YXRlZEV2ZW50czogRXZlbnRDb25maWd1cmF0aW9uW10gPSBbXTtcbiAgICAgICAgZnVuY3Rpb24gYWRkVHJhY2tlZChlYzogRXZlbnRDb25maWd1cmF0aW9uKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAoZWMgJiYgZWMuRXZlbnRUeXBlID09IEV2ZW50VHlwZUVuLkRPTUV2ZW50KVxuICAgICAgICAgICAgICAgIHRyYWNrZWRFdmVudHMucHVzaChlYyk7XG4gICAgICAgICAgICBlbHNlIGlmIChlYyAmJiBlYy5FdmVudFR5cGUgPT0gRXZlbnRUeXBlRW4uRE9NTXV0YXRpb24pXG4gICAgICAgICAgICAgICAgdHJhY2tlZERPTU11dGF0ZWRFdmVudHMucHVzaChlYyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLkNvbmZpZy5PcGVyYXRpb25zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5Db25maWcuT3BlcmF0aW9uc1tpXS5Jc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGFkZFRyYWNrZWQodGhpcy5Db25maWcuT3BlcmF0aW9uc1tpXS5TdGFydEV2ZW50KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5Db25maWcuT3BlcmF0aW9uc1tpXS5TdGFydEV2ZW50KSBhZGRUcmFja2VkKHRoaXMuQ29uZmlnLk9wZXJhdGlvbnNbaV0uU3RhcnRFdmVudC5DbmpFbmRFdmVudCk7XG4gICAgICAgICAgICAgICAgYWRkVHJhY2tlZCh0aGlzLkNvbmZpZy5PcGVyYXRpb25zW2ldLkVuZEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0aGlzLlRhYklkLCBuZXcgQ29udGVudFNjcmlwdE1lc3NhZ2VTZXR1cERPTUxpc3RuZXJzKHRyYWNrZWRFdmVudHMpKTtcbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGhpcy5UYWJJZCwgbmV3IENvbnRlbnRTY3JpcHRNZXNzYWdlU2V0dXBET01NdXRhdGlvbkxpc3RuZXJzKHRyYWNrZWRET01NdXRhdGVkRXZlbnRzKSk7XG4gICAgfVxuICAgIFBhcmVudDogTW9uaXRvcmluZ0JhY2tncm91bmQ7XG4gICAgLy8gVGFiSGFuZGxlciBjb25zdHJ1Y3RvclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBUYWJJZDogbnVtYmVyLCBwdWJsaWMgQ29uZmlnOiBDb25maWd1cmF0aW9uLCBfcGFyZW50OiBNb25pdG9yaW5nQmFja2dyb3VuZCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuUGFyZW50ID0gX3BhcmVudDtcbiAgICAgICAgdGhpcy5UcmFja09wID0gbmV3IFRyYWNrT3BlcmF0aW9uKFRhYklkKTtcbiAgICAgICAgY2hyb21lLmRlYnVnZ2VyLmF0dGFjaCh7IHRhYklkOiB0aGlzLlRhYklkIH0sIHRoaXMuZGVidWdnZXJWZXJzaW9uLCB0aGlzLk9uQXR0YWNoLmJpbmQodGhpcykpO1xuICAgICAgICBjaHJvbWUuZGVidWdnZXIuc2VuZENvbW1hbmQoeyB0YWJJZDogTnVtYmVyKHRoaXMuVGFiSWQpIH0sIFwiTmV0d29yay5lbmFibGVcIik7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKHsgdGFiSWQ6IE51bWJlcihzZWxmLlRhYklkKSB9LCBcIlBlcmZvcm1hbmNlLmVuYWJsZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RFcnJvciA9IGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAobGFzdEVycm9yKSBjb25zb2xlLmVycm9yKFwiUGVyZm9ybWFuY2UuZW5hYmxlIHJhaXNlZCBhbiBlcnJvcjpcIiwgbGFzdEVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8g0KHQvtC+0LHRidC10L3QuNC1INC+0YIgY29udGVudCBzY3JpcHRcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVxdWVzdDogVGFiMkJhY2tncm91bmRNZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSA6IChhbnkpPT52b2lkICkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxmOiBUYWJIYW5kbGVyID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoc2VuZGVyLnRhYiAmJiBzZWxmLlRhYklkID09IHNlbmRlci50YWIuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QuRXZlbnRUeXBlID09IEludGVybmFsRXZlbnRUeXBlRW4uQ2xpZW50RE9NUmVhZHkpIHsvLyDQsiDQv9Cw0YDQsNC80LXRgtGA0LDRhSDQv9GA0LjRiNC10LsgU2llYmVsTG9naW5EYXRhIC0g0LLQt9GP0YLRjCDQtdCz0L4g0L7RgtGC0YPQtNCwXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5QYXJhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuUGFyZW50LlNpZWJlbExvZ2luRGF0YSA9IHJlcXVlc3QuUGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5FdmVudFF1ZXVlLnB1c2goeyBFdmVudFR5cGU6IHJlcXVlc3QuRXZlbnRUeXBlLCBUYWJJZDogc2VsZi5UYWJJZCwgRXZlbnRTdWJUeXBlOiByZXF1ZXN0LkV2ZW50U3VidHlwZSwgUGFyYW06IHJlcXVlc3QuRE9NRXZlbnQgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5IYW5kbGVFdmVudFF1ZXVlRW50ZXJlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoc2VsZi5IYW5kbGVFdmVudFF1ZXVlLmJpbmQoc2VsZiksIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5FdmVudFR5cGUgPT0gSW50ZXJuYWxFdmVudFR5cGVFbi5DbGllbnRET01SZWFkeSkgey8vINGN0YLQviDRgdCw0LzQvtC1INC/0LXRgNCy0L7QtSDRgdC+0LHRi9GC0LjQtSAtINC80L7QttC90L4g0L/QvtCy0LXRgdC40YLRjCDQuCDQvtGB0YLQsNC70YzQvdGL0LUgbGlzdG5lcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuU2V0dXBET01FdmVudExpc3RuZXJzKCk7IC8vINCy0YHQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5INGB0L7Qt9C00LDRgdGCIGNvbnRlbnQgc2NyaXB0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIH1cbn1cblxuXG5cblxuXG5cblxuLy8g0JLRi9C/0L7Qu9C90LjRgtGMIGV2YWwg0LLRi9GA0LDQttC10L3QuNGPIGV4cHJlc3Npb24g0LIg0LrQvtC90YLQtdC60YHRgtC1INGB0YLRgNCw0L3QuNGG0Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPLCDQvtCx0LXRgdC/0LXRh9C40LIg0LrQvtC90YLQtdC60YHRgiDQuNC3IGNvbnRleHRcbmFzeW5jIGZ1bmN0aW9uIEV2YWwoaWV2OiBJbnRlcm5hbEV2ZW50LCBjb250ZXh0OiBhbnksIGV4cHJlc3Npb246IHN0cmluZyk6IFByb21pc2UgPCBhbnkgPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4ocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGlldi5UYWJJZFxuICAgICAgICAgICAgLCBuZXcgQ29udGVudFNjcmlwdE1lc3NhZ2VFdmFsKGNvbnRleHQsIGV4cHJlc3Npb24pXG4gICAgICAgICAgICAsIChyZXNwOiB7IHJlc3BvbnNlOiBhbnksIGV4Y2VwdGlvbjogYW55IH0pOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0pO1xufVxuXG5sZXQgRXZlbnRDb25maWd1cmF0aW9uU2VyaWFsID0gMTsgLy8g0L/QvtGB0LvQtdC00L7QstCw0YLQtdC70YzQvdGL0Lkg0L3QvtC80LXRgCBFdmVudENvbmZpZ3VyYXRpb25cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFdmVudENvbmZpZ3VyYXRpb246IERvY3VtZW50XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNsYXNzIEV2ZW50Q29uZmlndXJhdGlvbkRvY3VtZW50TmF2aWdhdGlvbiBpbXBsZW1lbnRzIEV2ZW50Q29uZmlndXJhdGlvbiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIFVSTFBhdHRlcm46IHN0cmluZykgeyB9XG4gICAgRXZlbnRUeXBlOiBFdmVudFR5cGVFbiA9IEV2ZW50VHlwZUVuLkRvY3VtZW50TmF2aWdhdGlvbjtcbiAgICBSZXBlYXRDb3VudDogbnVtYmVyO1xuICAgIEV2ZW50Q29uZmlndXJhdGlvbklkID0gRXZlbnRDb25maWd1cmF0aW9uU2VyaWFsKys7XG4gICAgQ25qRW5kRXZlbnQ6IEV2ZW50Q29uZmlndXJhdGlvbiA9IG5ldyBFdmVudENvbmZpZ3VyYXRpb25ET01FdmVudChcIkRPTUNvbnRlbnRMb2FkZWRcIik7XG4gICAgYXN5bmMgVGVzdE1hdGNoSW50ZXJuYWwoaWV2OiBJbnRlcm5hbEV2ZW50KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBpZXYuRXZlbnRUeXBlID09IEludGVybmFsRXZlbnRUeXBlRW4uTmV0d29ya1xuICAgICAgICAgICAgJiYgaWV2LkV2ZW50U3ViVHlwZSA9PSBkZWJ1Z2dlckV2ZW50X3JlcXVlc3RXaWxsQmVTZW50XG4gICAgICAgICAgICAmJiBpZXYuUGFyYW1cbiAgICAgICAgICAgICYmIGlldi5QYXJhbS50eXBlID09IFwiRG9jdW1lbnRcIlxuICAgICAgICAgICAgJiYgaWV2LlJlcXVlc3RcbiAgICAgICAgICAgICYmIG5ldyBSZWdFeHAodGhpcy5VUkxQYXR0ZXJuLCBcImlcIikudGVzdChpZXYuUmVxdWVzdC51cmwpO1xuICAgIH1cbn1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXZlbnRDb25maWd1cmF0aW9uIGFqYXhDb21wbGV0ZS4g0KHQvtCx0YvRgtC40LUg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDQvtCx0YDQsNCx0L7RgtGH0LjQutC+0Lwg0LrQvtC90YTQuNCz0YPRgNCw0YbQuNC4INCyIENuakVuZEV2ZW50LCDQutC+0LPQtNCwINGB0L7QsdGL0YLQuNC1IC0gUmVxdWVzdFxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5jbGFzcyBFdmVudENvbmZpZ3VyYXRpb25BamF4Q29tcGxldGUgaW1wbGVtZW50cyBFdmVudENvbmZpZ3VyYXRpb24ge1xuICAgIEV2ZW50VHlwZTogRXZlbnRUeXBlRW4gPSBFdmVudFR5cGVFbi5BamF4UmVxdWVzdENvbXBsZXRlO1xuICAgIEV2ZW50Q29uZmlndXJhdGlvbklkID0gRXZlbnRDb25maWd1cmF0aW9uU2VyaWFsKys7XG4gICAgUmVwZWF0Q291bnQ6IG51bWJlcjtcbiAgICBhc3luYyBUZXN0TWF0Y2hJbnRlcm5hbChpZXY6IEludGVybmFsRXZlbnQsIHJlcXVlc3RJZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiAoaWV2LkV2ZW50VHlwZSA9PSBJbnRlcm5hbEV2ZW50VHlwZUVuLk5ldHdvcmsgJiYgaWV2LkV2ZW50U3ViVHlwZSA9PSBkZWJ1Z2dlckV2ZW50X3Jlc3BvbnNlUmVjZWl2ZWQgLyomJiByZXF1ZXN0SWQgPT0gaWV2LlBhcmFtLnJlcXVlc3RJZCovKTtcbiAgICB9XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXZlbnRDb25maWd1cmF0aW9uIGFqYXg6INC60L7QvdGE0LjQs9GD0YDQsNGG0LjRjyDRgdC+0LHRi9GC0LjRjyBhamF4XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2xhc3MgRXZlbnRDb25maWd1cmF0aW9uQWpheCBpbXBsZW1lbnRzIEV2ZW50Q29uZmlndXJhdGlvbiB7XG4gICAgRXZlbnRUeXBlOiBFdmVudFR5cGVFbiA9IEV2ZW50VHlwZUVuLkFqYXhSZXF1ZXN0O1xuICAgIEV2ZW50Q29uZmlndXJhdGlvbklkID0gRXZlbnRDb25maWd1cmF0aW9uU2VyaWFsKys7XG4gICAgUmVwZWF0Q291bnQ6IG51bWJlcjtcbiAgICBSZXF1ZXN0UmVzcG9uc2U6IEFqYXhSZXF1ZXN0UmVzcG9uc2U7XG4gICAgVGVzdFRhcmdldDogQWpheFRlc3RUYXJnZXRUeXBlRW47XG4gICAgT0tSZWdleHA6IHN0cmluZztcbiAgICBDdXN0b21FeHByZXNzaW9uOiBzdHJpbmc7XG5cbiAgICBDbmpFbmRFdmVudD86IEV2ZW50Q29uZmlndXJhdGlvbkFqYXhDb21wbGV0ZTtcbiAgICBcbiAgICBhc3luYyBUZXN0TWF0Y2hJbnRlcm5hbChpZXY6IEludGVybmFsRXZlbnQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IHJjOiBib29sZWFuID0gaWV2LkV2ZW50VHlwZSA9PSBJbnRlcm5hbEV2ZW50VHlwZUVuLk5ldHdvcmtcbiAgICAgICAgICAgICYmIChcbiAgICAgICAgICAgICAgICAodGhpcy5SZXF1ZXN0UmVzcG9uc2UgPT0gQWpheFJlcXVlc3RSZXNwb25zZS5SZXF1ZXN0ICYmIGlldi5FdmVudFN1YlR5cGUgPT0gZGVidWdnZXJFdmVudF9yZXF1ZXN0V2lsbEJlU2VudClcbiAgICAgICAgICAgIHx8ICh0aGlzLlJlcXVlc3RSZXNwb25zZSA9PSBBamF4UmVxdWVzdFJlc3BvbnNlLlJlc3BvbnNlICYmIGlldi5FdmVudFN1YlR5cGUgPT0gZGVidWdnZXJFdmVudF9yZXNwb25zZVJlY2VpdmVkKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgJiYgaWV2LlBhcmFtXG4gICAgICAgICAgICAmJiBpZXYuUGFyYW0udHlwZSA9PSBcIlhIUlwiXG4gICAgICAgICAgICA7XG4gICAgICAgIGlldi5QYXJhbSA9IGlldi5QYXJhbSB8fCB7fTtcbiAgICAgICAgLypcbiAgICAgICAgY29uc29sZS5sb2coXCJBamF4UmVxdWVzdCB0ZXN0aW5nIG1hdGNoLiBJbml0aWFsIHRlc3QgcmVzdWx0OlwiLCByYywgIXJjID9cbiAgICAgICAgICAgIChpZXYuUGFyYW0udHlwZSAhPSBcIlhIUlwiID8gXCJyZXF1ZXN0IHR5cGU6XCIgKyBpZXYuUGFyYW0udHlwZSA6IFwiXCIpIFxuICAgICAgICAgICAgKyAodGhpcy5SZXF1ZXN0UmVzcG9uc2UgPT0gQWpheFJlcXVlc3RSZXNwb25zZS5SZXF1ZXN0ICYmIGlldi5FdmVudFN1YlR5cGUgIT0gZGVidWdnZXJFdmVudF9yZXF1ZXN0V2lsbEJlU2VudCA/IFwiV2FpdGluZyBmb3IgcmVxdWVzdCBidXQgZXZlbnQgaXMgXCIgKyBpZXYuRXZlbnRTdWJUeXBlIDogXCJcIilcbiAgICAgICAgICAgICsgKHRoaXMuUmVxdWVzdFJlc3BvbnNlID09IEFqYXhSZXF1ZXN0UmVzcG9uc2UuUmVzcG9uc2UgJiYgaWV2LkV2ZW50U3ViVHlwZSAhPSBkZWJ1Z2dlckV2ZW50X3Jlc3BvbnNlUmVjZWl2ZWQgID8gXCJXYWl0aW5nIGZvciByZXNwb25zZSBidXQgZXZlbnQgaXMgXCIgKyBpZXYuRXZlbnRTdWJUeXBlIDogXCJcIilcbiAgICAgICAgICAgIDogXCJcIik7Ki9cbiAgICAgICAgaWYgKCFyYykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBsZXQgdGVzdFJlZ0V4cCA9IG5ldyBSZWdFeHAodGhpcy5PS1JlZ2V4cCwgXCJpXCIpO1xuICAgICAgICBsZXQgcmVxdWVzdE9yUmVzcG9uc2UgPSBpZXYuUGFyYW1bdGhpcy5SZXF1ZXN0UmVzcG9uc2UgPT0gQWpheFJlcXVlc3RSZXNwb25zZS5SZXF1ZXN0ID8gXCJyZXF1ZXN0XCIgOiBcInJlc3BvbnNlXCJdO1xuICAgICAgICBpZiAoIXJlcXVlc3RPclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJBamF4UmVxdWVzdCB0ZXN0aW5nIG1hdGNoLiBSZXF1ZXN0IG9yIFJlc3BvbnNlIGZpZWxkIG5vdCBpbml0aWFsaXNlZFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5SZXF1ZXN0UmVzcG9uc2UgPT0gQWpheFJlcXVlc3RSZXNwb25zZS5SZXF1ZXN0KSB7Ly8gaGVhZGVyc1RleHQg0L3QtSDQt9Cw0L/QvtC70L3QtdC9XG4gICAgICAgICAgICBsZXQga3Y6c3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGZvcih2YXIgcHJwIGluIHJlcXVlc3RPclJlc3BvbnNlLmhlYWRlcnMpXG4gICAgICAgICAgICAgICAga3YucHVzaChwcnAgKyBcIjogXCIgKyByZXF1ZXN0T3JSZXNwb25zZS5oZWFkZXJzW3BycF0pO1xuICAgICAgICAgICAgcmVxdWVzdE9yUmVzcG9uc2UuaGVhZGVyc1RleHQgPSBrdi5qb2luKFwiXFxyXFxuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIFVSTFxuICAgICAgICBpZiAodGhpcy5UZXN0VGFyZ2V0ID09IEFqYXhUZXN0VGFyZ2V0VHlwZUVuLlVSTCkge1xuICAgICAgICAgICAgbGV0IHJjID0gdGVzdFJlZ0V4cC50ZXN0KHJlcXVlc3RPclJlc3BvbnNlLnVybCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQWpheFJlcXVlc3QgdGVzdGluZyBtYXRjaC4gVGVzdGluZyBVUkwuIFJlc3VsdDpcIiArIHJjKTtcbiAgICAgICAgICAgIHJldHVybiByYztcbiAgICAgICAgfVxuICAgICAgICAvLyBIZWFkZXJcbiAgICAgICAgaWYgKHRoaXMuVGVzdFRhcmdldCA9PSBBamF4VGVzdFRhcmdldFR5cGVFbi5IZWFkZXIpIHtcbiAgICAgICAgICAgIGxldCByYyA9IHRlc3RSZWdFeHAudGVzdChyZXF1ZXN0T3JSZXNwb25zZS5oZWFkZXJzVGV4dCk7IFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFqYXhSZXF1ZXN0IHRlc3RpbmcgbWF0Y2guIFRlc3RpbmcgaGVhZGVyLiBSZXN1bHQ6XCIgKyByYyk7XG4gICAgICAgICAgICByZXR1cm4gcmM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQm9keSAmJiBIZWFkZXJCb2R5IFJFUVVFU1RcbiAgICAgICAgZWxzZSBpZiAoc2VsZi5SZXF1ZXN0UmVzcG9uc2UgPT0gQWpheFJlcXVlc3RSZXNwb25zZS5SZXF1ZXN0XG4gICAgICAgICAgICAmJiBbQWpheFRlc3RUYXJnZXRUeXBlRW4uSGVhZGVyQm9keSwgQWpheFRlc3RUYXJnZXRUeXBlRW4uQm9keV0uaW5kZXhPZih0aGlzLlRlc3RUYXJnZXQpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIGNocm9tZS5kZWJ1Z2dlci5zZW5kQ29tbWFuZCh7IHRhYklkOiBpZXYuVGFiSWQgfSwgXCJOZXR3b3JrLmdldFJlcXVlc3RQb3N0RGF0YVwiLCB7IHJlcXVlc3RJZDogaWV2LlBhcmFtLnJlcXVlc3RJZCB9XG4gICAgICAgICAgICAgICAgICAgICwgYXN5bmMgZnVuY3Rpb24gKGRhdGE6IHsgcG9zdERhdGE6c3RyaW5nfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RTdHJpbmcgPSBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IgPyBcIlwiIDogZGF0YS5wb3N0RGF0YTsgLy8gdGhhdCdzIG5vdCBcIlBPU1RcIiBpZiB0aGVyZSB3YXMgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLlRlc3RUYXJnZXQgPT0gQWpheFRlc3RUYXJnZXRUeXBlRW4uSGVhZGVyQm9keSkgdGVzdFN0cmluZyA9IHJlcXVlc3RPclJlc3BvbnNlLmhlYWRlcnNUZXh0ICsgdGVzdFN0cmluZzsvLyBwcmVwZW5kIGhlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJjID0gdGVzdFJlZ0V4cC50ZXN0KHRlc3RTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFqYXhSZXF1ZXN0IHRlc3RpbmcgbWF0Y2guIFRlc3RpbmcgcmVxdWVzdCBoZWFkZXIrYm9keS4gUmVzdWx0OlwiICsgcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXN0b20gZXhwcmVzc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKGF3YWl0IEV2YWwoaWV2LCB7IGJvZHk6IHJlc3AuYm9keSB9LCBzZWxmLlN0YXJ0Q29uZGl0aW9uLk9LRXhwcmVzc2lvbikpLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJvZHkgJiYgSGVhZGVyQm9keSBSRVNQT05TRSAtIGdldHRpbmcgYm9keSBpbiB0aGlzIGNhc2VcbiAgICAgICAgZWxzZSBpZiAoc2VsZi5SZXF1ZXN0UmVzcG9uc2UgPT0gQWpheFJlcXVlc3RSZXNwb25zZS5SZXNwb25zZSAmJiBbQWpheFRlc3RUYXJnZXRUeXBlRW4uSGVhZGVyQm9keSwgQWpheFRlc3RUYXJnZXRUeXBlRW4uQm9keV0uaW5kZXhPZih0aGlzLlRlc3RUYXJnZXQpID49IDApIHtcbiAgICAgICAgICAgIC8vINC/0L7Qu9GD0YfQuNGC0YwgYm9keVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKHsgdGFiSWQ6IGlldi5UYWJJZCB9LCBcIk5ldHdvcmsuZ2V0UmVzcG9uc2VCb2R5XCIsIHsgcmVxdWVzdElkOiBpZXYuUGFyYW0ucmVxdWVzdElkIH1cbiAgICAgICAgICAgICAgICAgICAgLCBhc3luYyBmdW5jdGlvbiAocmVzcDogeyBiYXNlNjRFbmNvZGVkOiBib29sZWFuLCBib2R5OiBzdHJpbmcgfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RTdHJpbmcgPSByZXNwLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5UZXN0VGFyZ2V0ID09IEFqYXhUZXN0VGFyZ2V0VHlwZUVuLkhlYWRlckJvZHkpIHRlc3RTdHJpbmcgPSBpZXYuUGFyYW0ucmVzcG9uc2UuaGVhZGVyc1RleHQgKyB0ZXN0U3RyaW5nOy8vIHByZXBlbmQgaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmMgPSB0ZXN0UmVnRXhwLnRlc3QodGVzdFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQWpheFJlcXVlc3QgdGVzdGluZyBtYXRjaC4gVGVzdGluZyByZXNwb25zZSBoZWFkZXIrYm9keS4gUmVzdWx0OlwiICsgcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXN0b20gZXhwcmVzc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKGF3YWl0IEV2YWwoaWV2LCB7IGJvZHk6IHJlc3AuYm9keSB9LCBzZWxmLlN0YXJ0Q29uZGl0aW9uLk9LRXhwcmVzc2lvbikpLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV2ZW50IGNvbmZpZ3VyYXRpb24gRE9NOiDQutC+0L3RhNC40LPRg9GA0LDRhtC40Y8g0YHQvtCx0YvRgtC40Y8gXCLQodC+0LHRi9GC0LjQtSBET01cIlxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIEV2ZW50Q29uZmlndXJhdGlvbkRPTUV2ZW50IGltcGxlbWVudHMgRXZlbnRDb25maWd1cmF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgRE9NRXZlbnQ6IHN0cmluZywgcHVibGljIFRhcmdldEVsZW1lbnRTZWxlY3Rvcj86IHN0cmluZykge1xuXG4gICAgfVxuICAgIEV2ZW50VHlwZTogRXZlbnRUeXBlRW4gPSBFdmVudFR5cGVFbi5ET01FdmVudDtcbiAgICBFdmVudENvbmZpZ3VyYXRpb25JZCA9IEV2ZW50Q29uZmlndXJhdGlvblNlcmlhbCsrO1xuICAgIFJlcGVhdENvdW50OiBudW1iZXI7XG4gICAgT0tFeHByZXNzaW9uOiBzdHJpbmc7XG4gICAgT3BlcmF0aW9uSWQ6IHN0cmluZzsgLy8g0LjQtCDRgNC+0LTQuNGC0LXQu9GM0YHQutC+0Lkg0L7Qv9C10YDQsNGG0LjQuCwg0YfRgtC+0LHRiyDQt9C90LDRgtGMLCDQuiDQutCw0LrQvtC5INC+0L/QtdGA0LDRhtC40Lgg0L7RgtC90L7RgdC40YLRgdGPIFxuICAgIGFzeW5jIFRlc3RNYXRjaEludGVybmFsKGlldjogSW50ZXJuYWxFdmVudCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoaWV2LkV2ZW50VHlwZSA9PSBJbnRlcm5hbEV2ZW50VHlwZUVuLkNsaWVudERPTVJlYWR5ICYmIHRoaXMuRE9NRXZlbnQgPT0gXCJET01Db250ZW50TG9hZGVkXCIpIHJldHVybiB0cnVlOy8vINGN0YLQviDRgdC/0LXRhtC40LDQu9GM0L3Ri9C5INGB0LvRg9GH0LDQuSBcbiAgICAgICAgcmV0dXJuIGlldi5FdmVudFR5cGUgPT0gSW50ZXJuYWxFdmVudFR5cGVFbi5ET01FdmVudFxuICAgICAgICAgICAgJiYgaWV2LkV2ZW50U3ViVHlwZSA9PSB0aGlzLkRPTUV2ZW50ICYmIGlldi5QYXJhbS5FdmVudENvbmZpZ3VyYXRpb25JZCA9PSB0aGlzLkV2ZW50Q29uZmlndXJhdGlvbklkO1xuICAgIH1cbn1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXZlbnRDb25naWd1cmF0aW9uIERPTSBNdXRhdGlvbjog0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGPINGB0L7QsdGL0YLQuNGPIFwi0JjQt9C80LXQvdC10L3QuNC1IERPTVwiXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBjbGFzcyBFdmVudENvbmZpZ3VyYXRpb25ET01NdXRhdGlvbiBpbXBsZW1lbnRzIEV2ZW50Q29uZmlndXJhdGlvbiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIFRhcmdldEVsZW1lbnRTZWxlY3Rvcjogc3RyaW5nLCBwdWJsaWMgT0tFeHByZXNzaW9uPzogc3RyaW5nKSB7IH1cbiAgICBFdmVudFR5cGU6IEV2ZW50VHlwZUVuID0gRXZlbnRUeXBlRW4uRE9NTXV0YXRpb247XG4gICAgRXZlbnRDb25maWd1cmF0aW9uSWQgPSBFdmVudENvbmZpZ3VyYXRpb25TZXJpYWwrKztcbiAgICBSZXBlYXRDb3VudDogbnVtYmVyO1xuICAgIGFzeW5jIFRlc3RNYXRjaEludGVybmFsKGlldjogSW50ZXJuYWxFdmVudCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gaWV2LkV2ZW50VHlwZSA9PSBJbnRlcm5hbEV2ZW50VHlwZUVuLkRPTU11dGF0aW9uO1xuICAgIH1cbn1cblxuaW50ZXJmYWNlIENvbmZpZ3VyYXRpb24ge1xuICAgIFNpZWJlbFVSTDogc3RyaW5nO1xuICAgIE9wZXJhdGlvbnM6IE9wZXJhdGlvbkNvbmZpZ3VyYXRpb25bXTtcbn1cblxuY2xhc3MgTW9uaXRvcmluZ0JhY2tncm91bmQge1xuXG4gICAgYXR0YWNoZWRUb1RhYklkczogbnVtYmVyW10gPSBbXTtcbiAgICBjb25uZWN0aW9uOiBhbnk7XG5cbiAgICBIYW5kbGVJbnRlcm5hbEV2ZW50KGV2OiBJbnRlcm5hbEV2ZW50KSA6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgU2llYmVsTG9naW5EYXRhOiBTaWViZWxMb2dpbkRhdGE7XG4gICAgVGFiSGFuZGxlcnM6IFRhYkhhbmRsZXJbXSA9IFtdO1xuICAgIE9wZXJhdGlvbnNDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgIFNpZWJlbFVSTDogbnVsbFxuICAgICAgICAsIE9wZXJhdGlvbnM6IFtdXG4gICAgfVxuXG4gICAgUHJlQ29uZmlnOiBDb25maWd1cmF0aW9uID1cbiAgICAgICAge1xuICAgICAgICBTaWViZWxVUkw6IFwiaHR0cDovL2Jjdm0zMjcvZmluc19ydXMvXCJcbiAgICAgICAgLE9wZXJhdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBJZDogXCIxXCIsXG4gICAgICAgICAgICAgICAgT3BlcmF0aW9uTmFtZTpcIjFcIixcbiAgICAgICAgICAgICAgICBVUkxQYXR0ZXJuOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8uKlwiLFxuICAgICAgICAgICAgICAgIFN0YXJ0RXZlbnQ6IG5ldyBFdmVudENvbmZpZ3VyYXRpb25Eb2N1bWVudE5hdmlnYXRpb24oXCJodHRwOi8vbG9jYWxob3N0OjgwODAvPyRcIiksXG4gICAgICAgICAgICAgICAgSXNBY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgU2llYmVsTG9naW5EYXRhRmlsdGVyOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsIHtcbiAgICAgICAgICAgICAgICBJZDogXCIyXCIsXG4gICAgICAgICAgICAgICAgT3BlcmF0aW9uTmFtZTogXCIyXCIsXG4gICAgICAgICAgICAgICAgVVJMUGF0dGVybjogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvLipcIixcbiAgICAgICAgICAgICAgICBTdGFydEV2ZW50OiAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IG5ldyBFdmVudENvbmZpZ3VyYXRpb25BamF4KCk7XG4gICAgICAgICAgICAgICAgICAgIHYuUmVxdWVzdFJlc3BvbnNlID0gQWpheFJlcXVlc3RSZXNwb25zZS5SZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICB2LlRlc3RUYXJnZXQgPSBBamF4VGVzdFRhcmdldFR5cGVFbi5VUkw7XG4gICAgICAgICAgICAgICAgICAgIHYuT0tSZWdleHAgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9NZXNzYWdlSHViL1BlbmRpbmdBY3Rpdml0aWVzXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vdi5TdGFydENvbmRpdGlvbiA9IG5ldyBBamF4RXZlbnRDb25kaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgLy92LlN0YXJ0Q29uZGl0aW9uLlRhcmdldFR5cGUgPSBBamF4UmVxdWVzdFRhcmdldFR5cGVFbi5IZWFkZXI7XG4gICAgICAgICAgICAgICAgICAgIC8vdi5TdGFydENvbmRpdGlvbi5PS0V4cHJlc3Npb24gPSAncmVzcG9uc2UuaGVhZGVyc1tcIlgtQXNwTmV0TXZjLVZlcnNpb25cIl09PVwiNS4yXCInO1xuICAgICAgICAgICAgICAgICAgICAvL3YuU3RhcnRDb25kaXRpb24uVGFyZ2V0VHlwZSA9IEFqYXhSZXF1ZXN0VGFyZ2V0VHlwZUVuLkJvZHk7XG4gICAgICAgICAgICAgICAgICAgIC8vdi5TdGFydENvbmRpdGlvbi5PS0V4cHJlc3Npb24gPSAnYm9keS5zdGFydHNXaXRoKFwie1wiKSc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApKCksXG4gICAgICAgICAgICAgICAgSXNBY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgU2llYmVsTG9naW5EYXRhRmlsdGVyOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsIHtcbiAgICAgICAgICAgICAgICBJZDogXCIzXCIsXG4gICAgICAgICAgICAgICAgT3BlcmF0aW9uTmFtZTogXCIzXCIsXG4gICAgICAgICAgICAgICAgVVJMUGF0dGVybjogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvLipcIixcbiAgICAgICAgICAgICAgICBTdGFydEV2ZW50OiBuZXcgRXZlbnRDb25maWd1cmF0aW9uRE9NRXZlbnQoXCJjbGlja1wiLCBcImFbaHJlZj0nL0FkbWluL0VkaXRVc2VyUmlnaHRzLzEnXVwiKSxcbiAgICAgICAgICAgICAgICBJc0FjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBTaWViZWxMb2dpbkRhdGFGaWx0ZXI6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICwge1xuICAgICAgICAgICAgICAgIElkOiBcIjRcIixcbiAgICAgICAgICAgICAgICBPcGVyYXRpb25OYW1lOiBcIjRcIixcbiAgICAgICAgICAgICAgICBVUkxQYXR0ZXJuOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8uKlwiLFxuICAgICAgICAgICAgICAgIFN0YXJ0RXZlbnQ6IG5ldyBFdmVudENvbmZpZ3VyYXRpb25ET01NdXRhdGlvbihcInRhYmxlXCIpLFxuICAgICAgICAgICAgICAgIElzQWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIFNpZWJlbExvZ2luRGF0YUZpbHRlcjogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLCB7XG4gICAgICAgICAgICAgICAgSWQ6IFwiNVwiLFxuICAgICAgICAgICAgICAgIE9wZXJhdGlvbk5hbWU6XCI1XCIsXG4gICAgICAgICAgICAgICAgVVJMUGF0dGVybjogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvLipcIixcbiAgICAgICAgICAgICAgICBTdGFydEV2ZW50OiAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IG5ldyBFdmVudENvbmZpZ3VyYXRpb25BamF4KCk7XG4gICAgICAgICAgICAgICAgICAgIHYuVGVzdFRhcmdldCA9IEFqYXhUZXN0VGFyZ2V0VHlwZUVuLlVSTDtcbiAgICAgICAgICAgICAgICAgICAgdi5PS1JlZ2V4cCA9IFwiUGVuZGluZ0FjdGl2aXRpZXNcIjtcbiAgICAgICAgICAgICAgICAgICAgdi5SZXF1ZXN0UmVzcG9uc2UgPSBBamF4UmVxdWVzdFJlc3BvbnNlLlJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICAgICAgSXNBY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgU2llYmVsTG9naW5EYXRhRmlsdGVyOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIEFjY3VtdWxhdGVkRXZlbnRzOiBhbnlbXSA9IFtdO1xuICAgIENvbGxlY3RlZEV2ZW50czogYW55W10gPSBbXTtcbiAgICAvLyDQmNC0LiB0YWIsINC+0YLQutGA0YvRgtGL0YUg0YEg0L3QsNGI0LjQvCDQutC+0L3RgtC10L3RgtC+0LxcbiAgICBicm93c2VyQWN0aW9uVGFiSWRzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgTG9nRXZlbnQodGFiSWQ6IG51bWJlciwgbWVzc2FnZTogYW55LCBwYXJhbTphbnkpIHtcbiAgICAgICAgLy9pZiAoIWZpbHRlckV2ZW50cy5pbmNsdWRlcyhtZXNzYWdlKSkgcmV0dXJuOyAvLyBmaWx0ZXIgb3V0IG5vdCBpbnRlcmVzaW5nIGV2ZW50c1xuICAgICAgICAvLyBkZWNvZGUgdGFiXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe30sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgICAgICB2YXIgdGhpc1RhYiA9IHRhYnMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7IHJldHVybiB0LmlkID09IHRhYklkOyB9KTtcbiAgICAgICAgICAgIGxldCBleHRlbmRlZE9iajogYW55ID0geyB0aXRsZTogXCJcIiwgdXJsOiBcIlwiLCB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudmFsdWVPZigpLCB0aW1lWm9uZU9mZnNldDogbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpIH07XG4gICAgICAgICAgICBpZiAodGhpc1RhYi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBleHRlbmRlZE9iai50YWJUaXRsZSA9IHRoaXNUYWJbMF0udGl0bGU7XG4gICAgICAgICAgICAgICAgZXh0ZW5kZWRPYmoudGFiVXJsID0gdGhpc1RhYlswXS51cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBhcmFtKSBwYXJhbSA9IHt9O1xuICAgICAgICAgICAgbGV0IGV2ZW50RGVzYyA9IHtcbiAgICAgICAgICAgICAgICB0YWJJZDogdGFiSWRcbiAgICAgICAgICAgICAgICAsIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAsIHBhcmFtOiBwYXJhbVxuICAgICAgICAgICAgICAgICwgLi4uZXh0ZW5kZWRPYmpcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyDQktGL0YLQsNGJ0LjRgtGMINC+0L/QtdGA0LDRhtC40Y4g0L/QviDQmNCUXG4gICAgICAgICAgICB2YXIgb3AgPSBzZWxmLk9wZXJhdGlvbnNDb25maWcuT3BlcmF0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuSWQgPT0gZXZlbnREZXNjLnBhcmFtLmlkOyB9KTtcbiAgICAgICAgICAgIC8vINCf0L7RgdC70LDRgtGMINGB0L7QvtCx0YnQtdC90LjQtSDQviDRgdC+0LHRi9GC0LjQuCDQsiBicm93c2VyX2FjdGlvblxuICAgICAgICAgICAgdmFyIHRtcCA9IHsgLi4ue30sIC4uLmV2ZW50RGVzYyB9O1xuICAgICAgICAgICAgaWYgKG9wLmxlbmd0aClcbiAgICAgICAgICAgICAgICB0bXAub3BlcmF0aW9uTmFtZSA9IG9wWzBdLk9wZXJhdGlvbk5hbWU7XG4gICAgICAgICAgICB0bXAucGFyYW0uc3RhcnRfZGF0ZSA9IHRtcC5wYXJhbS5zdGFydF9kYXRlLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIHRtcC5wYXJhbS5lbmRfZGF0ZSA9IHRtcC5wYXJhbS5lbmRfZGF0ZS52YWx1ZU9mKCk7XG4gICAgICAgICAgICBzZWxmLkNvbGxlY3RlZEV2ZW50cy5wdXNoKHRtcCk7XG4gICAgICAgICAgICBzZWxmLmJyb3dzZXJBY3Rpb25UYWJJZHMuZm9yRWFjaCgoZSkgPT4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoZSwgbmV3IEJyb3dzZXJFdmVudChCcm93c2VyRXZlbnRUeXBlRW4uRXZlbnRGaXJlZCwgc2VsZi5Db2xsZWN0ZWRFdmVudHMpKSk7XG4gICAgICAgICAgICAvLyDQsiDQvtGH0LXRgNC10LTRjCDQvdCwINC+0YLQv9GA0LDQstC60YNcbiAgICAgICAgICAgIGV2ZW50RGVzYy5wYXJhbSA9IEpTT04uc3RyaW5naWZ5KHBhcmFtKTtcbiAgICAgICAgICAgIHNlbGYuQWNjdW11bGF0ZWRFdmVudHMucHVzaChldmVudERlc2MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWViZWxEYXRhU2VudCA9IGZhbHNlO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8g0J/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LUg0LjQtyBsb2dpbiBTaWViZWwuINCe0YLQv9GA0LDQstC60LAg0YHQvtC+0LHRidC10L3QuNGPLiDQntGC0LLQtdGCINC/0YDQuNC00LXRgiDQv9C+0YLQvtC8INC+0YLQtNC10LvRjNC90YvQvCDRgdC+0L7QsdGJ0LXQvdC40LXQvCDQvtGCIGNvbnRlbnQgc2NyaXB0XG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgR2V0U2llYmVsTG9naW5EYXRhKHRhYklkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIG5ldyBDb250ZW50U2NyaXB0TWVzc2FnZUdldFNpZWJlbExvZ2luRGF0YSgpKTtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8g0J/RgNC+0LLQtdGA0LrQsCwg0L3Rg9C20L3QviDQu9C4INC/0L7QtNC60LvRjtGH0LjRgtGMINC30LDQutC70LDQtNC60YMg0Log0LzQvtC90LjRgtC+0YDQuNC90LPRgyDQuCwg0LXRgdC70Lgg0L3Rg9C20L3Qviwg0L/QvtC00LrQu9GO0YfQtdC90LjQtVxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQXR0YWNoVG9UYWIodGFiOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGxldCBzZWxmOiBNb25pdG9yaW5nQmFja2dyb3VuZCA9IHRoaXM7XG4gICAgICAgIHZhciB0YWJJZCA9IE51bWJlcih0YWIuaWQpO1xuICAgICAgICBpZiAoIXNlbGYuVGFiSGFuZGxlcnMuc29tZShmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5UYWJJZCA9PSB0YWJJZDsgfSlcbiAgICAgICAgICAgICYmIHRhYi51cmwgJiYgIXRhYi51cmwudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKFwiY2hyb21lOi8vXCIpXG4gICAgICAgICAgICAvLyBVUkwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0L7QtNC90L7QvNGDINC40Lcg0L3QsNGI0LjRhSDRgdC+0LHRi9GC0LjQuVxuICAgICAgICAgICAgJiYgdGhpcy5PcGVyYXRpb25zQ29uZmlnLk9wZXJhdGlvbnMuc29tZShmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmV3IFJlZ0V4cChlLlVSTFBhdHRlcm4sIFwiaVwiKS50ZXN0KHRhYi51cmwpOyB9KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNlbGYuVGFiSGFuZGxlcnMucHVzaChuZXcgVGFiSGFuZGxlcih0YWJJZCwgc2VsZi5PcGVyYXRpb25zQ29uZmlnLCBzZWxmKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g0JXRgdC70Lgg0LTQsNC90L3Ri9C1INCyIFNpZWJlbCDQvdC1INC+0YLQv9GA0LDQstC40LvQuCwg0LAgdXJsIC0g0LXQs9C+LCDQv9C+0LvRg9GH0LjRgtGMINC00LDQvdC90YvQtSBcbiAgICAgICAgaWYgKCFzZWxmLnNpZWJlbERhdGFTZW50ICYmIG5ldyBSZWdFeHAoc2VsZi5PcGVyYXRpb25zQ29uZmlnLlNpZWJlbFVSTCwgXCJpXCIpLnRlc3QodGFiLnVybCkpIHtcbiAgICAgICAgICAgIHNlbGYuR2V0U2llYmVsTG9naW5EYXRhKHRhYklkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8g0J/QvtC/0YvRgtCw0YLRjNGB0Y8g0YHQtNC10LvQsNGC0YwgYXR0YWNoIGRlYnVnZ2VyIHRvIGFsbCB0YWJzXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBhdHRhY2hUb0FsbFRhYnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gQXR0YWNoIGRlYnVnZ2VyIHRvIGFsbCB0YWJzXG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHt9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICAgICAgdGFicy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5BdHRhY2hUb1RhYihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgY29uc3RydWN0b3IobW9uaXRvcmluZ0FnZW50U2VydmVyVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgQVBJdXJsID0gbW9uaXRvcmluZ0FnZW50U2VydmVyVXJsICsgXCJBUEkvXCI7XG4gICAgICAgIHZhciBsb2dFdmVudFVybCA9IEFQSXVybCArIFwiTG9nRXZlbnQvXCI7XG4gICAgICAgIHZhciBzaWViZWxMb2dpbkRhdGFVcmwgPSBBUEl1cmwgKyBcIlNpZWJlbExvZ2luRGF0YS9cIjtcbiAgICAgICAgbGV0IGdldENvbmZpZ1VybCA9IEFQSXVybCArIFwiZ2V0Q29uZmlnXCI7XG4gICAgICAgIGxldCBnZXRDb25maWdVcmxJbW0gPSBBUEl1cmwgKyBcImdldENvbmZpZ0ltbVwiO1xuICAgICAgICBsZXQgc2llYmVsRGF0YVNlbnQ6IGJvb2xlYW4gPSBmYWxzZTsgLy8g0LTQsNC90L3Ri9C1INC+INC/0L7QtNC60LvRjtGH0LXQvdC40LggU2llYmVsINC+0YLQv9GA0LDQstC70Y/RjtGC0YHRjyDQvtC00LjQvSDRgNCw0Lcg0LjQu9C4INC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INC60L7QvdGE0LjQs9GD0YDQsNGG0LjQuC5cbiAgICAgICAgdmFyIGFqYXhQYXJhbSA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxuICAgICAgICAgICAgeGhyRmllbGRzOiB7XG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3Jvc3NEb21haW46IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICAvLyDQntGC0L/RgNCw0LLQutCwINC90LDQutC+0L/Qu9C10L3QvdGL0YUg0YHQvtCx0YvRgtC40Lkg0L3QsCDRgdC10YDQstC10YBcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuQWNjdW11bGF0ZWRFdmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50c1RtcCA9IHNlbGYuQWNjdW11bGF0ZWRFdmVudHM7XG4gICAgICAgICAgICAgICAgc2VsZi5BY2N1bXVsYXRlZEV2ZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgICQuYWpheChcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogbG9nRXZlbnRVcmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHA6IHsgaXRlbXM6IGV2ZW50c1RtcCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICwgLi4uYWpheFBhcmFtXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICBsZXQgZmlyc3RDb25maWdQb2xsID0gdHJ1ZTsvLyDQv9C10YDQstGL0Lkg0YDQsNC3INCx0LXRgNC10Lwg0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGOIC0g0L7QvdCwINC90LUg0LTQvtC70LbQvdCwINCy0YvQv9Cw0YHRgtGMINCyINC+0LbQuNC00LDQvdC40LVcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vINCf0LXRgNC10LfQsNCz0YDRg9C30LrQsCDQutC+0L3RhNC40LPRg9GA0LDRhtC40Lgg0YHQvtCx0YvRgtC40LlcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBmdW5jdGlvbiByZWJ1aWxkQ29uZmlndXJhdGlvbihkYXRhOiBDb25maWd1cmF0aW9uRGF0YSk6IHZvaWQge1xuICAgICAgICAgICAgLy9zZWxmLk9wZXJhdGlvbnNDb25maWcgPSBzZWxmLlByZUNvbmZpZztcbiAgICAgICAgICAgIC8vcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyDQn9Cw0YDQsNC80LXRgtGA0Ysg0LrQvtC90YTQuNCz0YPRgNCw0YbQuNC4IFxuICAgICAgICAgICAgY29uc3QgY29uZmlnS2V5X3NpZWJlbFVybCA9IFwiZWZyX2hvbWVfcmVneFwiO1xuICAgICAgICAgICAgLy8g0J/QsNGA0LDQvNC10YLRgNGLINGB0LDQvNC+0Lkg0LrQvtC90YTQuNCz0YPRgNCw0YbQuNC4XG4gICAgICAgICAgICBpZiAoZGF0YS5jb25maWcgJiYgZGF0YS5jb25maWcuY29uZmlnSnNvbikge1xuICAgICAgICAgICAgICAgIGxldCBjZmdQYXJhbTogeyBwYXJhbV9jb2RlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdID0gSlNPTi5wYXJzZShkYXRhLmNvbmZpZy5jb25maWdKc29uKS5jb25maWc7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBjZmdQYXJhbS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnBhcmFtX2NvZGUgPT0gY29uZmlnS2V5X3NpZWJlbFVybDsgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHApIHNlbGYuT3BlcmF0aW9uc0NvbmZpZy5TaWViZWxVUkwgPSBwLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDQntC/0LXRgNCw0YbQuNC4XG4gICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcbiAgICAgICAgICAgIC8vIG1hcCDRgSDRgtC40L/QsCDRgdC+0LHRi9GC0LjRjyBzdGFydC9zdG9wINGB0LXRgNCy0LXRgNCwINC90LAg0L3QsNGIIGVudW1cbiAgICAgICAgICAgIGxldCBzcnZFdmVudFR5cGUySW50ZXJuYWxFdmVudFR5cGU6IHsgW2tleTogc3RyaW5nXTogRXZlbnRUeXBlRW4gfSA9IHt9O1xuICAgICAgICAgICAgc3J2RXZlbnRUeXBlMkludGVybmFsRXZlbnRUeXBlW1wiYWpheFwiXSA9IEV2ZW50VHlwZUVuLkFqYXhSZXF1ZXN0O1xuICAgICAgICAgICAgc3J2RXZlbnRUeXBlMkludGVybmFsRXZlbnRUeXBlW1wiZG9tLW11dGF0aW9uXCJdID0gRXZlbnRUeXBlRW4uRE9NTXV0YXRpb247XG4gICAgICAgICAgICBzcnZFdmVudFR5cGUySW50ZXJuYWxFdmVudFR5cGVbXCJkb2NcIl0gPSBFdmVudFR5cGVFbi5Eb2N1bWVudE5hdmlnYXRpb247XG4gICAgICAgICAgICBzcnZFdmVudFR5cGUySW50ZXJuYWxFdmVudFR5cGVbXCJldmVudFwiXSA9IEV2ZW50VHlwZUVuLkRPTUV2ZW50O1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5vcGVyYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5PcGVyYXRpb25zQ29uZmlnLk9wZXJhdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICBkYXRhLm9wZXJhdGlvbnMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKG9wOiB7IGlkOiBzdHJpbmcsIHZlcnNpb246IG51bWJlciwgY29uZmlnRGF0YTogc3RyaW5nIH0pOiBPcGVyYXRpb25Db25maWd1cmF0aW9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3J2Q29uZmlnRWw6IFNlcnZlck9wZXJhdGlvbkNvbmZpZ3VyYXRpb24gPSBKU09OLnBhcnNlKG9wLmNvbmZpZ0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNydkNvbmZpZ0VsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBFdmVudChzdGFydFN0b3A6IFwic3RhcnRcIiB8IFwic3RvcFwiKTogRXZlbnRDb25maWd1cmF0aW9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV2OiBFdmVudENvbmZpZ3VyYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3J2RXZlbnRUeXBlMkludGVybmFsRXZlbnRUeXBlW3NydkNvbmZpZ0VsW3N0YXJ0U3RvcCArIFwiX3R5cGVcIl1dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZUVuLkFqYXhSZXF1ZXN0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBldkFqYXggPSBuZXcgRXZlbnRDb25maWd1cmF0aW9uQWpheCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2QWpheC5SZXF1ZXN0UmVzcG9uc2UgPSBzcnZDb25maWdFbFtzdGFydFN0b3AgKyBcIl9zdWJ0eXBlXCJdID09IEFqYXhSZXF1ZXN0UmVzcG9uc2UuUmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEFqYXhSZXF1ZXN0UmVzcG9uc2UuUmVxdWVzdCA6IEFqYXhSZXF1ZXN0UmVzcG9uc2UuUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZBamF4LlRlc3RUYXJnZXQgPSBOdW1iZXIoPEFqYXhUZXN0VGFyZ2V0VHlwZUVuPnNydkNvbmZpZ0VsW3N0YXJ0U3RvcCArIFwiX21vbml0b3JcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2QWpheC5PS1JlZ2V4cCA9IHNydkNvbmZpZ0VsW3N0YXJ0U3RvcCArIFwiX3JlZ2V4cFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldkFqYXguQ3VzdG9tRXhwcmVzc2lvbiA9IHNydkNvbmZpZ0VsW3N0YXJ0U3RvcCArIFwiX2NvbmRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXYgPSBldkFqYXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JXRgdC70Lgg0LzRiyDRgdC80L7RgtGA0LjQvCDQvdCwIFJlcXVlc3QsINGC0L4g0LTQvtCx0LDQstC40YLRjCDRgdCy0Y/Qt9Cw0L3QvdC+0LUg0YHQvtCx0YvRgtC40LUsINGH0YLQvtCx0Ysg0LTQvtC20LTQsNGC0YzRgdGPINC+0YLQstC10YLQsFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldkFqYXguUmVxdWVzdFJlc3BvbnNlID09IEFqYXhSZXF1ZXN0UmVzcG9uc2UuUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2V2QWpheC5DbmpFbmRFdmVudCA9IG5ldyBFdmVudENvbmZpZ3VyYXRpb25BamF4Q29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZUVuLkRPTU11dGF0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBldkRPTU11dGF0aW9uID0gbmV3IEV2ZW50Q29uZmlndXJhdGlvbkRPTU11dGF0aW9uKHNydkNvbmZpZ0VsW3N0YXJ0U3RvcCArIFwiX3JlZ2V4cFwiXSwgc3J2Q29uZmlnRWxbc3RhcnRTdG9wICsgXCJfY29uZFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXYgPSBldkRPTU11dGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVFbi5Eb2N1bWVudE5hdmlnYXRpb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXYgPSBuZXcgRXZlbnRDb25maWd1cmF0aW9uRG9jdW1lbnROYXZpZ2F0aW9uKHNydkNvbmZpZ0VsW3N0YXJ0U3RvcCArIFwiX21vbml0b3JcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVFbi5ET01FdmVudDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXZET01FdiA9IG5ldyBFdmVudENvbmZpZ3VyYXRpb25ET01FdmVudChzcnZDb25maWdFbFtzdGFydFN0b3AgKyBcIl9zdWJ0eXBlXCJdLCBzcnZDb25maWdFbFtzdGFydFN0b3AgKyBcIl9yZWdleHBcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2RE9NRXYuT0tFeHByZXNzaW9uID0gc3J2Q29uZmlnRWxbc3RhcnRTdG9wICsgXCJfY29uZFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldiA9IGV2RE9NRXY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXYgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2LlJlcGVhdENvdW50ID0gc3J2Q29uZmlnRWxbc3RhcnRTdG9wICsgXCJfZXZlbnRzX2NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0VsOiBPcGVyYXRpb25Db25maWd1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVmZmVjdGl2ZURhdGVGcm9tOiB0eXBlb2YgKHNydkNvbmZpZ0VsLmRhdGVfZnJvbSkgPT0gXCJzdHJpbmdcIiA/IG5ldyBEYXRlKHNydkNvbmZpZ0VsLmRhdGVfZnJvbSkgOiBzcnZDb25maWdFbC5kYXRlX2Zyb21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEVmZmVjdGl2ZURhdGVUbzogdHlwZW9mIChzcnZDb25maWdFbC5kYXRlX3RvKSA9PSBcInN0cmluZ1wiID8gbmV3IERhdGUoc3J2Q29uZmlnRWwuZGF0ZV90bykgOiBzcnZDb25maWdFbC5kYXRlX3RvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBFbmRFdmVudDogbWFwRXZlbnQoXCJzdG9wXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJZDogc3J2Q29uZmlnRWwuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIElzQWN0aXZlOiBzcnZDb25maWdFbC5hY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIE9wZXJhdGlvbk5hbWU6IHNydkNvbmZpZ0VsLm9wZXJhdGlvbl9uYW1lIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgU3RhcnRFdmVudDogbWFwRXZlbnQoXCJzdGFydFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgVVJMUGF0dGVybjogc3J2Q29uZmlnRWwuYnJvd3Nlcl9saW5rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBTaWViZWxMb2dpbkRhdGFGaWx0ZXI6IHsgcmVnaW9uTGlzdDogc3J2Q29uZmlnRWwucmVnaW9uTGlzdCwgZmlsaWFsTGlzdDogc3J2Q29uZmlnRWwuZmlsaWFsTGlzdCwgdHBMaXN0OiBzcnZDb25maWdFbC50cExpc3QgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3RWw7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5hdHRhY2hUb0FsbFRhYnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDQntC/0YDQvtGBINC60L7QvdGE0LjQs9GD0YDQsNGG0LjQuCAtIGxvbmcgcG9sbFxuICAgICAgICBhc3luYyBmdW5jdGlvbiBQb2xsQ29uZmlnKCk6IFByb21pc2U8dm9pZD57XG4gICAgICAgICAgICBhc3luYyBmdW5jdGlvbiBpdGVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGZpcnN0Q29uZmlnUG9sbCA/IGdldENvbmZpZ1VybEltbSA6IGdldENvbmZpZ1VybFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIC4uLmFqYXhQYXJhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgLi4ueyB0aW1lb3V0OiAwIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNDb25maWd1cmF0aW9uIHJlY2VpdmVkID4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+XCIsIFwiY29sb3I6IzAwMDtiYWNrZ3JvdW5kLWNvbG9yOiNjY2M7XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0Q29uZmlnUG9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYnVpbGRDb25maWd1cmF0aW9uKGRhdGEpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQn9C+0YHQu9Cw0YLRjCDRgdC+0L7QsdGJ0LXQvdC40LUgYnJvd3NlciB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZENvbmZpZ1RvQnJvd3NlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSBhd2FpdCBpdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBQb2xsQ29uZmlnKCk7Ly8g0LfQsNC/0YPRgdC6INC+0L/RgNC+0YHQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LrQvtC90YTQuNCz0YPRgNCw0YbQuNC4XG5cbiAgICAgICAgc2VsZi5hdHRhY2hUb0FsbFRhYnMoKTsvLyBBdHRhY2ggZGVidWdnZXIgdG8gYWxsIHRhYnNcblxuICAgICAgICAvLyBvblVwZGF0ZWQgVVJMLiBBdHRhY2ggdG8gbmV3bHkgY3JlYXRlZCB0YWJcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uICh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlSW5mby51cmwpIHtcbiAgICAgICAgICAgICAgICBzZWxmLkF0dGFjaFRvVGFiKHRhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBvblJlbW92ZWQgdGFiLiDQo9C00LDQu9C40YLRjCB0YWIuaWQg0LjQtyDRgdC/0LjRgdC60LAgdGFiINGBINC90LDRiNC40Lwg0LrQvtC90YLQtdC90YLQvtC8XG4gICAgICAgIGNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAodGFiSWQ6IG51bWJlcikge1xuICAgICAgICAgICAgbGV0IGl4VG9EZWwgPSBzZWxmLmJyb3dzZXJBY3Rpb25UYWJJZHMuaW5kZXhPZih0YWJJZCk7XG4gICAgICAgICAgICBpZiAoaXhUb0RlbCA+PSAwKSBzZWxmLmJyb3dzZXJBY3Rpb25UYWJJZHMuc3BsaWNlKGl4VG9EZWwsIDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDQvtGC0L/RgNCw0LLQuNGC0Ywg0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGOINCyIGJyb3dzZXIgdGFiXG4gICAgICAgIGZ1bmN0aW9uIHNlbmRDb25maWdUb0Jyb3dzZXIoKSB7XG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSg8QnJvd3NlckV2ZW50PnsgZXZlbnRUeXBlOiBCcm93c2VyRXZlbnRUeXBlRW4uQ29uZmlnTG9hZGVkLCBldmVudFBhcmFtOiBzZWxmLk9wZXJhdGlvbnNDb25maWcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyDQodC+0L7QsdGJ0LXQvdC40LUg0L7RgiBjb250ZW50IHNjcmlwdFxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXF1ZXN0OiBUYWIyQmFja2dyb3VuZE1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlOiAoYW55KSA9PiB2b2lkKSB7XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tINCh0L7QvtCx0YnQtdC90LjQtSDQvtGCIGNvbnRlbnQgc2NyaXB0OiDQtNCw0L3QvdGL0LUg0L4gc2llYmVsIGxvZ2luIFxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LkV2ZW50VHlwZSA9PSBJbnRlcm5hbEV2ZW50VHlwZUVuLlNpZWJlbExvZ2luRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNpZWJlbExvZ2luRGF0YTpcIiwgcmVxdWVzdC5QYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LlBhcmFtICYmICFzZWxmLlNpZWJlbExvZ2luRGF0YSkgc2VsZi5TaWViZWxMb2dpbkRhdGEgPSByZXF1ZXN0LlBhcmFtOyAvLyDQtdGB0LvQuCDQtNCw0L3QvdGL0LUg0L/QvtC70YPRh9C10L3Riywg0LAg0YMg0L3QsNGBINC+0L3QuCAtINC90LDQvtCx0L7RgNC+0YIgLSDQvdC1INGB0L7RhdGA0LDQvdC10L3Ri1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogc2llYmVsTG9naW5EYXRhVXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiByZXF1ZXN0LlBhcmFtXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAsIC4uLmFqYXhQYXJhbVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8tLS0tLSBCcm93c2VyINC30LDQv9GA0LDRiNC40LLQsNC10YIg0L3QsNC60L7Qv9C70LXQvdC90YvQtSDRgdC+0LHRi9GC0LjRjyDQuCDQutC+0L3RhNC40LPRg9GA0LDRhtC40Y5cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LkV2ZW50VHlwZSA9PSBJbnRlcm5hbEV2ZW50VHlwZUVuLkJyb3dzZXJSZXF1ZXN0RXZlbnRzQW5kQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IGNvbGxlY3RlZEV2ZW50czogc2VsZi5Db2xsZWN0ZWRFdmVudHMgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoc2VuZENvbmZpZ1RvQnJvd3NlciwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIGJyb3dzZXJBY3Rpb25cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKFwiaW5kZXguaHRtbFwiKSB9LCBmdW5jdGlvbiAodGFiOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmJyb3dzZXJBY3Rpb25UYWJJZHMucHVzaCh0YWIuaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIG9uSW5zdGFsbGVkXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tXG4gICAgICAgIGNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKFxuICAgICAgICAgICAgZnVuY3Rpb24gKGRldGFpbHM6IHsgcmVhc29uOiBcImluc3RhbGxcIiB8IFwidXBkYXRlXCIgfCBcImNocm9tZV91cGRhdGVcIiB8IFwic2hhcmVkX21vZHVsZV91cGRhdGVcIiB9KSB7XG4gICAgICAgICAgICAgICAgaWYgKFtcImluc3RhbGxcIiwgXCJ1cGRhdGVcIl0uaW5jbHVkZXMoZGV0YWlscy5yZWFzb24pKXtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHNlbGYuaW5zdGFsbERhdGVfc3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkobmV3IERhdGUoKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlYWRvbmx5IGluc3RhbGxEYXRlX3N0b3JhZ2VLZXkgPSBcImluc3RhbGxEYXRlXCI7Ly8g0L/QvtC0INGN0YLQuNC8INC60LvRjtGH0L7QvCDQu9C10LbQuNGCINC00LDRgtCwINC+0LHQvdC+0LLQu9C10L3QuNGPIGV4dGVuc2lvblxuXG59XG5cbig8YW55PndpbmRvdykubW9uaXRvcmluZ0JhY2tncm91bmQgPSBuZXcgTW9uaXRvcmluZ0JhY2tncm91bmQoXCJodHRwOi8vbG9jYWxob3N0OjUwMDIvXCIpOyIsImltcG9ydCBCcm93c2VyRXZlbnRUeXBlRW4gZnJvbSBcIi4uL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvQnJvd3NlckV2ZW50VHlwZUVuXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJvd3NlckV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZXZlbnRUeXBlOiBCcm93c2VyRXZlbnRUeXBlRW4sIHB1YmxpYyBldmVudFBhcmFtPzogYW55KSB7IH1cbn0iLCJpbXBvcnQgRXZlbnRDb25maWd1cmF0aW9uIGZyb20gXCIuL2ludGVyZmFjZXMvRXZlbnRDb25maWd1cmF0aW9uXCJcblxuLy8g0KLQuNC/0Ysg0YHQvtC+0LHRidC10L3QuNC5IGJhY2tncm91bmQgLT4gdGFiXG5leHBvcnQgZW51bSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbiB7XG4gICAgRXZhbCxcbiAgICBTZXR1cERPTUV2ZW50TGlzdG5lcnMsXG4gICAgU2V0dXBET01NdXRhdGlvbkxpc3RuZXJzLFxuICAgIEdldFNpZWJlbExvZ2luRGF0YVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRlbnRTY3JpcHRNZXNzYWdlIHtcbiAgICBNZXNzYWdlVHlwZTogQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW47XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50U2NyaXB0TWVzc2FnZUV2YWwgaW1wbGVtZW50cyBDb250ZW50U2NyaXB0TWVzc2FnZSB7XG4gICAgTWVzc2FnZVR5cGU6IENvbnRlbnRTY3JpcHRNZXNzYWdlVHlwZUVuO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBDb250ZXh0OiBhbnksIHB1YmxpYyBFeHByZXNzaW9uOiBhbnkpIHtcbiAgICAgICAgdGhpcy5NZXNzYWdlVHlwZSA9IENvbnRlbnRTY3JpcHRNZXNzYWdlVHlwZUVuLkV2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29udGVudFNjcmlwdE1lc3NhZ2VTZXR1cERPTUxpc3RuZXJzIGltcGxlbWVudHMgQ29udGVudFNjcmlwdE1lc3NhZ2VcbntcbiAgICBNZXNzYWdlVHlwZTogQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW4gPSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5TZXR1cERPTUV2ZW50TGlzdG5lcnM7XG4gICAgY29uc3RydWN0b3IocHVibGljIEV2ZW50czogRXZlbnRDb25maWd1cmF0aW9uW10pIHtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50U2NyaXB0TWVzc2FnZVNldHVwRE9NTXV0YXRpb25MaXN0bmVycyBpbXBsZW1lbnRzIENvbnRlbnRTY3JpcHRNZXNzYWdlIHtcbiAgICBNZXNzYWdlVHlwZTogQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW4gPSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5TZXR1cERPTU11dGF0aW9uTGlzdG5lcnM7XG4gICAgY29uc3RydWN0b3IocHVibGljIEV2ZW50czogRXZlbnRDb25maWd1cmF0aW9uW10pIHtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50U2NyaXB0TWVzc2FnZUdldFNpZWJlbExvZ2luRGF0YSBpbXBsZW1lbnRzIENvbnRlbnRTY3JpcHRNZXNzYWdlIHtcbiAgICBNZXNzYWdlVHlwZTogQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW4gPSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5HZXRTaWViZWxMb2dpbkRhdGE7XG59IiwiaW1wb3J0IE1ldHJpY3MgZnJvbSBcIi4vaW50ZXJmYWNlcy9NZXRyaWNzXCJcbmltcG9ydCBSZXF1ZXN0UmVjZWl2ZWRUaW1pbmcgZnJvbSBcIi4vaW50ZXJmYWNlcy9SZXF1ZXN0UmVjZWl2ZWRUaW1pbmdcIlxuaW1wb3J0IHsgVHJhY2tPcGVyYXRpb25TdGF0ZUVuIH0gZnJvbSBcIi4vdmFyaWFibGVzL1RyYWNrT3BlcmF0aW9uU3RhdGVcIlxuaW1wb3J0IEludGVybmFsRXZlbnRUeXBlRW4gZnJvbSBcIi4vdmFyaWFibGVzL0ludGVybmFsRXZlbnRUeXBlRW5cIlxuaW1wb3J0IEludGVybmFsRXZlbnQgZnJvbSBcIi4vaW50ZXJmYWNlcy9JbnRlcm5hbEV2ZW50XCJcbmltcG9ydCBPcGVyYXRpb25Db25maWd1cmF0aW9uIGZyb20gXCIuL09wZXJhdGlvbkNvbmZpZ3VyYXRpb25cIlxuaW1wb3J0IE1ldHJpY3NUb09iaiBmcm9tIFwiLi93b3JrZXJzL01ldHJpY3NDb252ZXJ0ZXJcIlxuaW1wb3J0IHsgZGVidWdnZXJFdmVudF9yZXF1ZXN0V2lsbEJlU2VudCwgZGVidWdnZXJFdmVudF9yZXNwb25zZVJlY2VpdmVkIH0gZnJvbSBcIi4vdmFyaWFibGVzL0RlYnVnZXJFdmVudFwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFja09wZXJhdGlvbiB7XG4gICAgUmVxdWVzdElkOiBzdHJpbmc7XG4gICAgUmVzZXRDb3VudGVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5Mb2FkU2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuUmVxdWVzdE51bSA9IDA7XG4gICAgICAgIHRoaXMuUmVxdWVzdE51bUZhaWxlZCA9IDA7XG4gICAgICAgIHRoaXMuUmVxdWVzdE51bUZyb21DYWNoZSA9IDA7XG4gICAgICAgIHRoaXMuUmVxdWVzdHMgPSBbXTtcbiAgICB9XG4gICAgUGVyZm9ybWFuY2VEYXRhT25TdGFydDogTWV0cmljczsgLy8g0YHQvtGB0YLQvtGP0L3QuNC1IHBlcmZvcm1hbmNlINC/0YDQuCDQt9Cw0L/Rg9GB0LrQtSDQvtC/0LXRgNCw0YbQuNC4XG4gICAgY29uc3RydWN0b3IocHVibGljIFRhYklkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5TdGF0ZSA9IFRyYWNrT3BlcmF0aW9uU3RhdGVFbi5Ob3RTdGFydGVkO1xuICAgICAgICB0aGlzLlJlc2V0Q291bnRlcnMoKTsgLy8g0YPRgdGC0LDQvdC+0LLQutCwINGB0YfQtdGC0YfQuNC60L7QsiDQsiDQvdC+0LvRjFxuICAgICAgICBsZXQgc2VsZjogVHJhY2tPcGVyYXRpb24gPSB0aGlzO1xuICAgICAgICAvLyDQotCw0LHQu9C40YbQsCDQv9C10YDQtdGF0L7QtNC+0LIg0YHQvtGB0YLQvtGP0L3QuNC5XG4gICAgICAgIHRoaXMuU3RhdGVUYWJsZSA9IFtdO1xuXG4gICAgICAgIC8vIC4uLiBOb3RTdGFydGVkIHlldC4gU3RhcnQgPj4+Pj5cbiAgICAgICAgdGhpcy5TdGF0ZVRhYmxlW1RyYWNrT3BlcmF0aW9uU3RhdGVFbi5Ob3RTdGFydGVkXSA9IGFzeW5jIChpZXY6IEludGVybmFsRXZlbnQsIG9wOiBPcGVyYXRpb25Db25maWd1cmF0aW9uKTogUHJvbWlzZTxUcmFja09wZXJhdGlvblN0YXRlRW4+ID0+IHtcbiAgICAgICAgICAgIGlmIChvcC5TdGFydEV2ZW50ICYmIGF3YWl0IG9wLlN0YXJ0RXZlbnQuVGVzdE1hdGNoSW50ZXJuYWwoaWV2LCB0aGlzLlJlcXVlc3RJZCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLk9wZXJjYXRpb25Db25maWcgPSBvcDsvLyDQt9Cw0L/QvtC80L3QuNGC0YwgT3BlcmF0aW9uXG4gICAgICAgICAgICAgICAgc2VsZi5SZXF1ZXN0SWQgPSAoaWV2LlBhcmFtID8gaWV2LlBhcmFtLnJlcXVlc3RJZCA6IG51bGwpO1xuICAgICAgICAgICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDQktC30Y/RgtGMINGC0LXQutGD0YnQuNC5IHBlcmZvcm1hbmNlRGF0YVxuICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuc2VuZENvbW1hbmQoeyB0YWJJZDogTnVtYmVyKHRoaXMuVGFiSWQpIH0sIFwiUGVyZm9ybWFuY2UuZ2V0TWV0cmljc1wiLCBudWxsLCBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlBlcmZvcm1hbmNlRGF0YU9uU3RhcnQgPSBNZXRyaWNzVG9PYmoocmV0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuUGVyZm9ybWFuY2VEYXRhT25TdGFydCA9IE1ldHJpY3NUb09iaihudWxsKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuU3RhcnRlZE9wZXJhdGlvbkRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBUcmFja09wZXJhdGlvblN0YXRlRW4uU3RhcnREb25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuU3RhdGU7Ly8gVHJhY2tPcGVyYXRpb25TdGF0ZUVuLk5vdFN0YXJ0ZWQ7XG4gICAgICAgIH07XG4gICAgICAgIC8vLi4uIEZpbmlzaGVkXG4gICAgICAgIHRoaXMuU3RhdGVUYWJsZVtUcmFja09wZXJhdGlvblN0YXRlRW4uRmluaXNoZWRdID0gdGhpcy5TdGF0ZVRhYmxlW1RyYWNrT3BlcmF0aW9uU3RhdGVFbi5Ob3RTdGFydGVkXTsgLy8g0LjQtyBGaW5pc2hlZCAtPiDQsiBTdGFydERvbmVcbiAgICAgICAgLy8uLi4gU3RhcnREb25lXG4gICAgICAgIHRoaXMuU3RhdGVUYWJsZVtUcmFja09wZXJhdGlvblN0YXRlRW4uU3RhcnREb25lXSA9IGFzeW5jIChpZXY6IEludGVybmFsRXZlbnQsIG9wOiBPcGVyYXRpb25Db25maWd1cmF0aW9uKTogUHJvbWlzZTxUcmFja09wZXJhdGlvblN0YXRlRW4+ID0+IHtcbiAgICAgICAgICAgIGlmIChvcC5TdGFydEV2ZW50ICYmIG9wLlN0YXJ0RXZlbnQuQ25qRW5kRXZlbnQpIHsgLy8g0LbQtNC10Lwg0YHQstGP0LfQsNC90L3QvtC1INGB0L7QsdGL0YLQuNC1XG4gICAgICAgICAgICAgICAgaWYgKGF3YWl0IG9wLlN0YXJ0RXZlbnQuQ25qRW5kRXZlbnQuVGVzdE1hdGNoSW50ZXJuYWwoaWV2LCB0aGlzLlJlcXVlc3RJZCkpIHJldHVybiBUcmFja09wZXJhdGlvblN0YXRlRW4uU3RhcnRDbmpEb25lO1xuICAgICAgICAgICAgICAgIHJldHVybiBUcmFja09wZXJhdGlvblN0YXRlRW4uU3RhcnREb25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvcC5FbmRFdmVudCkgcmV0dXJuIFRyYWNrT3BlcmF0aW9uU3RhdGVFbi5GaW5pc2hlZDtcbiAgICAgICAgICAgIGlmIChhd2FpdCBvcC5FbmRFdmVudC5UZXN0TWF0Y2hJbnRlcm5hbChpZXYsIHRoaXMuUmVxdWVzdElkKSkge1xuICAgICAgICAgICAgICAgIGlmICghb3AuRW5kRXZlbnQuQ25qRW5kRXZlbnQpIHJldHVybiBUcmFja09wZXJhdGlvblN0YXRlRW4uRmluaXNoZWQ7XG4gICAgICAgICAgICAgICAgc2VsZi5SZXF1ZXN0SWQgPSAoaWV2LlBhcmFtID8gaWV2LlBhcmFtLnJlcXVlc3RJZCA6IG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBUcmFja09wZXJhdGlvblN0YXRlRW4uRW5kRG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmLlN0YXRlOy8vVHJhY2tPcGVyYXRpb25TdGF0ZUVuLlN0YXJ0RG9uZTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8uLi4gU3RhcnRDbmpEb25lXG4gICAgICAgIHRoaXMuU3RhdGVUYWJsZVtUcmFja09wZXJhdGlvblN0YXRlRW4uU3RhcnRDbmpEb25lXSA9IGFzeW5jIChpZXY6IEludGVybmFsRXZlbnQsIG9wOiBPcGVyYXRpb25Db25maWd1cmF0aW9uKTogUHJvbWlzZTxUcmFja09wZXJhdGlvblN0YXRlRW4+ID0+IHtcbiAgICAgICAgICAgIGlmICghb3AuRW5kRXZlbnQpIHJldHVybiBUcmFja09wZXJhdGlvblN0YXRlRW4uRmluaXNoZWQ7XG4gICAgICAgICAgICBpZiAoYXdhaXQgb3AuRW5kRXZlbnQuVGVzdE1hdGNoSW50ZXJuYWwoaWV2LCB0aGlzLlJlcXVlc3RJZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wLkVuZEV2ZW50LkNuakVuZEV2ZW50KSByZXR1cm4gVHJhY2tPcGVyYXRpb25TdGF0ZUVuLkZpbmlzaGVkO1xuICAgICAgICAgICAgICAgIHNlbGYuUmVxdWVzdElkID0gKGlldi5QYXJhbSA/IGlldi5QYXJhbS5yZXF1ZXN0SWQgOiBudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gVHJhY2tPcGVyYXRpb25TdGF0ZUVuLkVuZERvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5TdGF0ZTsvL1RyYWNrT3BlcmF0aW9uU3RhdGVFbi5TdGFydENuakRvbmU7XG4gICAgICAgIH07XG4gICAgICAgIC8vIC4uLiBFbmREb25lXG4gICAgICAgIHRoaXMuU3RhdGVUYWJsZVtUcmFja09wZXJhdGlvblN0YXRlRW4uRW5kRG9uZV0gPSBhc3luYyAoaWV2OiBJbnRlcm5hbEV2ZW50LCBvcDogT3BlcmF0aW9uQ29uZmlndXJhdGlvbik6IFByb21pc2U8VHJhY2tPcGVyYXRpb25TdGF0ZUVuPiA9PiB7XG4gICAgICAgICAgICBpZiAoYXdhaXQgb3AuRW5kRXZlbnQuQ25qRW5kRXZlbnQuVGVzdE1hdGNoSW50ZXJuYWwoaWV2LCB0aGlzLlJlcXVlc3RJZCkpIHJldHVybiBUcmFja09wZXJhdGlvblN0YXRlRW4uRmluaXNoZWQ7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5TdGF0ZTsvL1RyYWNrT3BlcmF0aW9uU3RhdGVFbi5FbmREb25lO1xuICAgICAgICB9O1xuXG4gICAgfVxuICAgIFN0YXRlOiBUcmFja09wZXJhdGlvblN0YXRlRW4gPSBUcmFja09wZXJhdGlvblN0YXRlRW4uTm90U3RhcnRlZDtcbiAgICBPcGVyY2F0aW9uQ29uZmlnOiBPcGVyYXRpb25Db25maWd1cmF0aW9uO1xuICAgIC8vINCh0YfQtdGC0YfQuNC60Lgg0Lgg0LTQsNC90L3Ri9C1INC80L7QvdC40YLQvtGA0LjQvdCz0LAg0L7Qv9C10YDQsNGG0LjQuFxuICAgIFN0YXJ0ZWRPcGVyYXRpb25EYXRlOiBEYXRlO1xuICAgIExvYWRTaXplOiBudW1iZXI7XG4gICAgUmVxdWVzdE51bTogbnVtYmVyO1xuICAgIFJlcXVlc3ROdW1GYWlsZWQ6IG51bWJlcjtcbiAgICBSZXF1ZXN0TnVtRnJvbUNhY2hlOiBhbnk7XG4gICAgUmVxdWVzdHM6IHtcbiAgICAgICAgcmVxdWVzdElkOiBzdHJpbmcsXG4gICAgICAgIHJlcXVlc3RXaWxsQmVTZW50VGltZTogbnVtYmVyLCAvLyByZXF1ZXN0V2lsbEJlU2VudCAnIHRpbWVzdGFtcFxuICAgICAgICByZXF1ZXN0UmVjZWl2ZWRUaW1lOiBudW1iZXIsIC8vIHJlcXVlc3RSZWNlaXZlZCAnIHRpbWVzdGFtcFxuICAgICAgICB0aW1pbmc6IFJlcXVlc3RSZWNlaXZlZFRpbWluZywgLy8gcmVxdWVzdFJlY2VpdmVkLnRpbWluZ1xuICAgICAgICBsb2FkaW5nRmluaXNoZWRUaW1lPzogbnVtYmVyLCAvLyBsb2FkaW5nRmluaXNoZWQndGltZXN0YW1wXG4gICAgICAgIHJlcXVlc3Q6IGFueSAvLyByZXF1ZXN0IHBlciBzZS4gKmRiZyogcmVtb3ZlIGluIHByb2R1Y3Rpb24gZW52LlxuICAgIH1bXTtcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y9cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGFzeW5jIEhhbmRsZUV2ZW50KGlldjogSW50ZXJuYWxFdmVudCwgb3A6IE9wZXJhdGlvbkNvbmZpZ3VyYXRpb24pOiBQcm9taXNlPFRyYWNrT3BlcmF0aW9uU3RhdGVFbj4ge1xuICAgICAgICBsZXQgc2VsZjogVHJhY2tPcGVyYXRpb24gPSB0aGlzO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUHJvYmluZyBzdGF0ZSB0YWJsZSBoYW5kbGVyIGZvciBvcGVyYWN0aW9uIGlkOlwiICsgb3AuSWQsIFwiIHN0YXRlOlwiLCBUcmFja09wZXJhdGlvblN0YXRlRW5bdGhpcy5TdGF0ZV0pO1xuICAgICAgICBsZXQgbmV3U3RhdGUgPSBhd2FpdCB0aGlzLlN0YXRlVGFibGVbdGhpcy5TdGF0ZV0oaWV2LCBvcCk7XG4gICAgICAgIC8vaWYgKG5ld1N0YXRlID09IFRyYWNrT3BlcmF0aW9uU3RhdGVFbi5FbmREb25lKSBkZWJ1Z2dlcjtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VDb2RlT0sgPSBcIjIwMFwiO1xuICAgICAgICBjb25zdCByZXNwb25zZUNvZGVOb3RNb2RpZmllZCA9IFwiMzA0XCI7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJldmVudDpcIiwgaWV2LkV2ZW50U3ViVHlwZSwgaWV2LlBhcmFtKTsvLypkYmcqXG4gICAgICAgIC8vINCV0YHQu9C4INGB0L7QsdGL0YLQuNC1INC90LDRh9Cw0YLQviwg0L7QsdGA0LDQsdCw0YLRi9Cy0LDQtdC8INCy0YHQtSDRgdC+0LHRi9GC0LjRjyAtINC/0L7QtNGB0YfQuNGC0YvQstCw0LXQvCDQv9Cw0YDQsNC80LXRgtGA0YtcbiAgICAgICAgaWYgKG5ld1N0YXRlICE9IFRyYWNrT3BlcmF0aW9uU3RhdGVFbi5Ob3RTdGFydGVkICYmIHRoaXMuU3RhdGUgIT0gVHJhY2tPcGVyYXRpb25TdGF0ZUVuLk5vdFN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIC8vINCi0LDQsdC70LjRhtCwINGC0LjQvyDRgdC+0LHRi9GC0LjRjyAtINC+0LHRgNCw0LHQvtGC0YfQuNC6XG4gICAgICAgICAgICBsZXQgaW50ZXJuYWxFdmVudDJDb3VudGVyOiB7IGllOiBJbnRlcm5hbEV2ZW50LCBoYW5kbGVyOiAoaWU6IEludGVybmFsRXZlbnQpID0+IHZvaWQgfVtdID0gW1xuICAgICAgICAgICAgICAgIC8vTmV0d29yay5sb2FkaW5nRmluaXNoZWRcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGllOiB7IEV2ZW50VHlwZTogSW50ZXJuYWxFdmVudFR5cGVFbi5OZXR3b3JrLCBUYWJJZDogdGhpcy5UYWJJZCwgRXZlbnRTdWJUeXBlOiBcIk5ldHdvcmsubG9hZGluZ0ZpbmlzaGVkXCIgfVxuICAgICAgICAgICAgICAgICAgICAsIGhhbmRsZXI6IChpZSkgPT4geyBzZWxmLkxvYWRTaXplICs9IE51bWJlcihpZS5QYXJhbS5lbmNvZGVkRGF0YUxlbmd0aCk7IHNlbGYuUmVxdWVzdE51bSsrOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE5ldHdvcmsucmVxdWVzdFdpbGxCZVNlbnRcbiAgICAgICAgICAgICAgICAsIHtcbiAgICAgICAgICAgICAgICAgICAgaWU6IHsgRXZlbnRUeXBlOiBJbnRlcm5hbEV2ZW50VHlwZUVuLk5ldHdvcmssIFRhYklkOiB0aGlzLlRhYklkLCBFdmVudFN1YlR5cGU6IGRlYnVnZ2VyRXZlbnRfcmVxdWVzdFdpbGxCZVNlbnQgIH1cbiAgICAgICAgICAgICAgICAgICAgLCBoYW5kbGVyOiAoaWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuUmVxdWVzdHNbaWUuUGFyYW0ucmVxdWVzdElkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IGllLlBhcmFtLnJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0V2lsbEJlU2VudFRpbWU6IGllLlBhcmFtLnRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1pbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFJlY2VpdmVkVGltZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiBpZS5SZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICB9OyAvLyDRgdC+0LfQtNCw0LXQvCDQt9Cw0L/RgNC+0YFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBOZXR3b3JrLnJlc3BvbnNlUmVjZWl2ZWRcbiAgICAgICAgICAgICAgICAsIHtcbiAgICAgICAgICAgICAgICAgICAgaWU6IHsgRXZlbnRUeXBlOiBJbnRlcm5hbEV2ZW50VHlwZUVuLk5ldHdvcmssIFRhYklkOiB0aGlzLlRhYklkLCBFdmVudFN1YlR5cGU6IGRlYnVnZ2VyRXZlbnRfcmVzcG9uc2VSZWNlaXZlZCB9XG4gICAgICAgICAgICAgICAgICAgICwgaGFuZGxlcjogKGllKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlJlcXVlc3ROdW1GYWlsZWQgKz0gKGllLlBhcmFtLnJlc3BvbnNlLnN0YXR1cyA9PSByZXNwb25zZUNvZGVPS1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGllLlBhcmFtLnJlc3BvbnNlLnN0YXR1cyA9PSByZXNwb25zZUNvZGVOb3RNb2RpZmllZCA/IDAgOiAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuUmVxdWVzdE51bUZyb21DYWNoZSArPSAoaWUuUGFyYW0ucmVzcG9uc2UuZnJvbURpc2tDYWNoZSB8fCBpZS5QYXJhbS5yZXNwb25zZS5zdGF0dXMgPT0gcmVzcG9uc2VDb2RlTm90TW9kaWZpZWQgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaW1pbmcg0LfQsNC/0LjRgdCw0YLRjFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHNlbGYuUmVxdWVzdHNbaWUuUGFyYW0ucmVxdWVzdElkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IGllLlBhcmFtLnJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFdpbGxCZVNlbnRUaW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1pbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RSZWNlaXZlZFRpbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IGllLlJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlJlcXVlc3RzW2llLlBhcmFtLnJlcXVlc3RJZF0gPSByZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXEucmVxdWVzdFJlY2VpdmVkVGltZSA9IGllLlBhcmFtLnRpbWVzdGFtcDsgLy8g0LLRgNC10LzRjyDQv9C+0LvRg9GH0LXQvdC40Y9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS50aW1pbmcgPSBpZS5QYXJhbS5yZXNwb25zZS50aW1pbmc7IC8vINCy0LfRj9GC0YwgdGltaW5nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTmV0d29yay5sb2FkaW5nRmluaXNoZWRcbiAgICAgICAgICAgICAgICAsIHtcbiAgICAgICAgICAgICAgICAgICAgaWU6IHsgRXZlbnRUeXBlOiBJbnRlcm5hbEV2ZW50VHlwZUVuLk5ldHdvcmssIFRhYklkOiB0aGlzLlRhYklkLCBFdmVudFN1YlR5cGU6IFwiTmV0d29yay5sb2FkaW5nRmluaXNoZWRcIiB9XG4gICAgICAgICAgICAgICAgICAgICwgaGFuZGxlcjogKGllKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0gc2VsZi5SZXF1ZXN0c1tpZS5QYXJhbS5yZXF1ZXN0SWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogaWUuUGFyYW0ucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0V2lsbEJlU2VudFRpbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWluZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFJlY2VpdmVkVGltZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5SZXF1ZXN0c1tpZS5QYXJhbS5yZXF1ZXN0SWRdID0gcmVxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLmxvYWRpbmdGaW5pc2hlZFRpbWUgPSBpZS5QYXJhbS50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTmV0d29yay5kYXRhUmVjZWl2ZWRcbiAgICAgICAgICAgICAgICAsIHtcbiAgICAgICAgICAgICAgICAgICAgaWU6IHsgRXZlbnRUeXBlOiBJbnRlcm5hbEV2ZW50VHlwZUVuLk5ldHdvcmssIFRhYklkOiB0aGlzLlRhYklkLCBFdmVudFN1YlR5cGU6IFwiTmV0d29yay5kYXRhUmVjZWl2ZWRcIiB9XG4gICAgICAgICAgICAgICAgICAgICwgaGFuZGxlcjogKGllKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0gc2VsZi5SZXF1ZXN0c1tpZS5QYXJhbS5yZXF1ZXN0SWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogaWUuUGFyYW0ucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0V2lsbEJlU2VudFRpbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWluZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFJlY2VpdmVkVGltZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5SZXF1ZXN0c1tpZS5QYXJhbS5yZXF1ZXN0SWRdID0gcmVxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGZvciAodmFyIGl0IG9mIGludGVybmFsRXZlbnQyQ291bnRlcikge1xuICAgICAgICAgICAgICAgIGlmIChpdC5pZS5FdmVudFR5cGUgPT0gaWV2LkV2ZW50VHlwZSAmJiBpdC5pZS5FdmVudFN1YlR5cGUgPT0gaWV2LkV2ZW50U3ViVHlwZSkgaXQuaGFuZGxlcihpZXYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1N0YXRlICE9IHNlbGYuU3RhdGUgJiYgdGhpcy5TdGF0ZSA9PSBUcmFja09wZXJhdGlvblN0YXRlRW4uTm90U3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5SZXNldENvdW50ZXJzKCk7Ly8g0L/QtdGA0LXRhdC+0LQg0LIg0LfQsNC/0YPRgdC6IC0g0YHQsdGA0L7RgdC40YLRjCDRgdGH0LXRgtGH0LjQutC4XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1N0YXRlICE9IHNlbGYuU3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3dpdGNoZWQgc3RhdGUgZm9yIG9wOlwiLCBvcC5JZCwgXCIgbmV3IHN0YXRlOlwiLCBUcmFja09wZXJhdGlvblN0YXRlRW5bbmV3U3RhdGVdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlN0YXRlID0gbmV3U3RhdGU7IC8vIHN3aXRjaCBzdGF0ZVxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfTtcbiAgICAvLyDQotCw0LHQu9C40YbQsCDQv9C10YDQtdGF0L7QtNC+0LIg0YHQvtGB0YLQvtGP0L3QuNGPOiBtYXAg0YHQvtGB0YLQvtGP0L3QuNC1IC0+INC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDRgdC+0YHRgtC+0Y/QvdC40Y9cbiAgICBTdGF0ZVRhYmxlOiAoIChJbnRlcm5hbEV2ZW50LCBPcGVyYXRpb25Db25maWd1cmF0aW9uKSA9PiBQcm9taXNlPFRyYWNrT3BlcmF0aW9uU3RhdGVFbj4pW107XG59IiwiLy8gQWpheCByZXNwb25zZSBvciByZXF1ZXN0XG5leHBvcnQgZW51bSBBamF4UmVxdWVzdFJlc3BvbnNlIHtcbiAgICBSZXF1ZXN0LFxuICAgIFJlc3BvbnNlXG59XG5cbi8vINCf0YDQtdC00LzQtdGCINGC0LXRgdGC0LAg0YPRgdC70L7QstC40Y8g0LTQu9GPIGFqYXggXG5leHBvcnQgZW51bSBBamF4VGVzdFRhcmdldFR5cGVFbiB7XG4gICAgVVJMLFxuICAgIEhlYWRlcixcbiAgICBCb2R5LFxuICAgIEhlYWRlckJvZHksXG4gICAgQ3VzdG9tRXhwcmVzc2lvblxufSIsIi8vINGB0L7QsdGL0YLQuNGPLCDQv9C+0YHRi9C70LDQtdC80YvQtSDQsiBicm93c2VyX2FjdGlvbiBzY3JpcHRcbmVudW0gQnJvd3NlckV2ZW50VHlwZUVuIHtcbiAgICBFdmVudEZpcmVkLFxuICAgIENvbmZpZ0xvYWRlZFxuXG59XG5leHBvcnQgZGVmYXVsdCBCcm93c2VyRXZlbnRUeXBlRW4iLCJcbmV4cG9ydCBjb25zdCBkZWJ1Z2dlckV2ZW50X3JlcXVlc3RXaWxsQmVTZW50ID0gXCJOZXR3b3JrLnJlcXVlc3RXaWxsQmVTZW50XCI7XG5leHBvcnQgY29uc3QgZGVidWdnZXJFdmVudF9yZXNwb25zZVJlY2VpdmVkID0gXCJOZXR3b3JrLnJlc3BvbnNlUmVjZWl2ZWRcIjsiLCIvLyDQmtC+0L3RhNC40LPRg9GA0LDRhtC40Y86INGC0LjQvyDRgdC+0LHRi9GC0LjRjyDQvdCw0YfQsNC70LAv0L7QutC+0L3Rh9Cw0L3QuNGPXG5lbnVtIEV2ZW50VHlwZUVuIHtcbiAgICBEb2N1bWVudE5hdmlnYXRpb24sICAgICAvLyDQvtGC0LrRgNGL0YLQuNC1INC00L7QutGD0LzQtdC90YLQsFxuICAgIEFqYXhSZXF1ZXN0LCAgICAgICAgICAgIC8vINCX0LDQv9GA0L7RgSBhamF4XG4gICAgQWpheFJlcXVlc3RDb21wbGV0ZSwgICAgLy8g0JfQsNCy0LXRgNGI0LXQvdC40LUg0LfQsNC/0YDQvtGB0LAgYWpheFxuICAgIERPTUV2ZW50LCAgICAgICAgICAgICAgIC8vINGB0L7QsdGL0YLQuNC1INC90LAg0YHRgtGA0LDQvdC40YbQtSAoYSBsYSBjbGljaywgZGJsY2xpY2spXG4gICAgRE9NTXV0YXRpb24gICAgICAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNC1INCyINGB0YLRgNGD0LrRgtGD0YDQtSDQuNC70Lgg0LDRgtGA0LjQsdGD0YLQsNGFINC00LXRgNC10LLQsCBET01cbn1cbmV4cG9ydCBkZWZhdWx0IEV2ZW50VHlwZUVuIiwiLy8g0YLQuNC/0Ysg0YHQvtC+0LHRidC10L3QuNC5LCDQvtCx0YDQsNCx0LDRgtGL0LLQsNC10LzRi9GFINCy0L3Rg9GC0YDQuCByb3V0aW5nXG5lbnVtIEludGVybmFsRXZlbnRUeXBlRW4ge1xuICAgIE5ldHdvcmssXG4gICAgQ2xpZW50RE9NUmVhZHksXG4gICAgRE9NRXZlbnQsXG4gICAgRE9NTXV0YXRpb24sXG4gICAgU2llYmVsTG9naW5EYXRhLFxuICAgIEJyb3dzZXJSZXF1ZXN0RXZlbnRzQW5kQ29uZmlnXG59XG5leHBvcnQgZGVmYXVsdCBJbnRlcm5hbEV2ZW50VHlwZUVuOyIsImV4cG9ydCBlbnVtIFRyYWNrT3BlcmF0aW9uU3RhdGVFbiB7XG4gICAgTm90U3RhcnRlZCxcbiAgICBTdGFydERvbmUsXG4gICAgU3RhcnRDbmpEb25lLFxuICAgIEVuZERvbmUsXG4gICAgRmluaXNoZWRcbn0iLCJpbXBvcnQgTWV0cmljcyBmcm9tIFwiLi4vaW50ZXJmYWNlcy9NZXRyaWNzXCJcbi8vIENvbnZlcnQgYXJyOiB7bWV0cmljczoge25hbWU6c3RyaW5nLCB2YWx1ZTpudW1iZXJ9IH1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1ldHJpY3NUb09iaihhcnI6IHsgbWV0cmljczogeyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIgfVtdIH0pOiBNZXRyaWNzIHtcbiAgICBsZXQgbzogYW55ID0ge307XG4gICAgaWYgKCFhcnIpIHJldHVybjtcbiAgICBmb3IgKHZhciBpdCBvZiAoYXJyLm1ldHJpY3MgfHwgW10pKSB7XG4gICAgICAgIG9baXQubmFtZV0gPSBOdW1iZXIoaXQudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbztcbn0iXSwic291cmNlUm9vdCI6IiJ9