//-----<reference path="lib/jquery-3.1.1.intellisense.js" />
//---- <reference path="lib/signalr-client-1.0.0-alpha2-final.js" />
/// <reference path="common.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var signalR;
var TrackOperationStateEn;
(function (TrackOperationStateEn) {
    TrackOperationStateEn[TrackOperationStateEn["NotStarted"] = 0] = "NotStarted";
    TrackOperationStateEn[TrackOperationStateEn["StartDone"] = 1] = "StartDone";
    TrackOperationStateEn[TrackOperationStateEn["StartCnjDone"] = 2] = "StartCnjDone";
    TrackOperationStateEn[TrackOperationStateEn["EndDone"] = 3] = "EndDone";
    TrackOperationStateEn[TrackOperationStateEn["Finished"] = 4] = "Finished";
})(TrackOperationStateEn || (TrackOperationStateEn = {}));
// Convert arr: {metrics: {name:string, value:number} }
function MetricsToObj(arr) {
    var o = {};
    if (!arr)
        return;
    for (var _i = 0, _a = (arr.metrics || []); _i < _a.length; _i++) {
        var it = _a[_i];
        o[it.name] = Number(it.value);
    }
    return o;
}
var debuggerEvent_requestWillBeSent = "Network.requestWillBeSent";
var debuggerEvent_responseReceived = "Network.responseReceived";
var TrackOperation = /** @class */ (function () {
    function TrackOperation(TabId) {
        var _this = this;
        this.TabId = TabId;
        this.State = TrackOperationStateEn.NotStarted;
        this.State = TrackOperationStateEn.NotStarted;
        this.ResetCounters(); // установка счетчиков в ноль
        var self = this;
        // Таблица переходов состояний
        this.StateTable = [];
        // ... NotStarted yet. Start >>>>>
        this.StateTable[TrackOperationStateEn.NotStarted] = function (iev, op) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = op.StartEvent;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, op.StartEvent.TestMatchInternal(iev, this.RequestId)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            self.OpercationConfig = op; // запомнить Operation
                            self.RequestId = (iev.Param ? iev.Param.requestId : null);
                            if (false) {
                                // Взять текущий performanceData
                                chrome.debugger.sendCommand({ tabId: Number(this.TabId) }, "Performance.getMetrics", null, function (ret) {
                                    self.PerformanceDataOnStart = MetricsToObj(ret);
                                });
                            }
                            self.PerformanceDataOnStart = MetricsToObj(null);
                            self.StartedOperationDate = new Date();
                            return [2 /*return*/, TrackOperationStateEn.StartDone];
                        }
                        return [2 /*return*/, self.State]; // TrackOperationStateEn.NotStarted;
                }
            });
        }); };
        //... Finished
        this.StateTable[TrackOperationStateEn.Finished] = this.StateTable[TrackOperationStateEn.NotStarted]; // из Finished -> в StartDone
        //... StartDone
        this.StateTable[TrackOperationStateEn.StartDone] = function (iev, op) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(op.StartEvent && op.StartEvent.CnjEndEvent)) return [3 /*break*/, 2];
                        return [4 /*yield*/, op.StartEvent.CnjEndEvent.TestMatchInternal(iev, this.RequestId)];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/, TrackOperationStateEn.StartCnjDone];
                        return [2 /*return*/, TrackOperationStateEn.StartDone];
                    case 2:
                        if (!op.EndEvent)
                            return [2 /*return*/, TrackOperationStateEn.Finished];
                        return [4 /*yield*/, op.EndEvent.TestMatchInternal(iev, this.RequestId)];
                    case 3:
                        if (_a.sent()) {
                            if (!op.EndEvent.CnjEndEvent)
                                return [2 /*return*/, TrackOperationStateEn.Finished];
                            self.RequestId = (iev.Param ? iev.Param.requestId : null);
                            return [2 /*return*/, TrackOperationStateEn.EndDone];
                        }
                        return [2 /*return*/, self.State]; //TrackOperationStateEn.StartDone;
                }
            });
        }); };
        //... StartCnjDone
        this.StateTable[TrackOperationStateEn.StartCnjDone] = function (iev, op) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!op.EndEvent)
                            return [2 /*return*/, TrackOperationStateEn.Finished];
                        return [4 /*yield*/, op.EndEvent.TestMatchInternal(iev, this.RequestId)];
                    case 1:
                        if (_a.sent()) {
                            if (!op.EndEvent.CnjEndEvent)
                                return [2 /*return*/, TrackOperationStateEn.Finished];
                            self.RequestId = (iev.Param ? iev.Param.requestId : null);
                            return [2 /*return*/, TrackOperationStateEn.EndDone];
                        }
                        return [2 /*return*/, self.State]; //TrackOperationStateEn.StartCnjDone;
                }
            });
        }); };
        // ... EndDone
        this.StateTable[TrackOperationStateEn.EndDone] = function (iev, op) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, op.EndEvent.CnjEndEvent.TestMatchInternal(iev, this.RequestId)];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/, TrackOperationStateEn.Finished];
                        return [2 /*return*/, self.State]; //TrackOperationStateEn.EndDone;
                }
            });
        }); };
    }
    TrackOperation.prototype.ResetCounters = function () {
        this.LoadSize = 0;
        this.RequestNum = 0;
        this.RequestNumFailed = 0;
        this.RequestNumFromCache = 0;
        this.Requests = [];
    };
    //---------------------------
    // Обработчик события
    //---------------------------
    TrackOperation.prototype.HandleEvent = function (iev, op) {
        return __awaiter(this, void 0, void 0, function () {
            var self, newState, responseCodeOK, responseCodeNotModified, internalEvent2Counter, _i, internalEvent2Counter_1, it;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.StateTable[this.State](iev, op)];
                    case 1:
                        newState = _a.sent();
                        responseCodeOK = "200";
                        responseCodeNotModified = "304";
                        //console.log("event:", iev.EventSubType, iev.Param);//*dbg*
                        // Если событие начато, обрабатываем все события - подсчитываем параметры
                        if (newState != TrackOperationStateEn.NotStarted && this.State != TrackOperationStateEn.NotStarted) {
                            internalEvent2Counter = [
                                //Network.loadingFinished
                                {
                                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: "Network.loadingFinished" },
                                    handler: function (ie) { self.LoadSize += Number(ie.Param.encodedDataLength); self.RequestNum++; }
                                }
                                // Network.requestWillBeSent
                                ,
                                {
                                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: debuggerEvent_requestWillBeSent },
                                    handler: function (ie) {
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
                                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: debuggerEvent_responseReceived },
                                    handler: function (ie) {
                                        self.RequestNumFailed += (ie.Param.response.status == responseCodeOK
                                            || ie.Param.response.status == responseCodeNotModified ? 0 : 1);
                                        self.RequestNumFromCache += (ie.Param.response.fromDiskCache || ie.Param.response.status == responseCodeNotModified ? 1 : 0);
                                        // Timing записать
                                        var req = self.Requests[ie.Param.requestId];
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
                                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: "Network.loadingFinished" },
                                    handler: function (ie) {
                                        var req = self.Requests[ie.Param.requestId];
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
                                    ie: { EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: "Network.dataReceived" },
                                    handler: function (ie) {
                                        var req = self.Requests[ie.Param.requestId];
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
                            for (_i = 0, internalEvent2Counter_1 = internalEvent2Counter; _i < internalEvent2Counter_1.length; _i++) {
                                it = internalEvent2Counter_1[_i];
                                if (it.ie.EventType == iev.EventType && it.ie.EventSubType == iev.EventSubType)
                                    it.handler(iev);
                            }
                        }
                        if (newState != self.State && this.State == TrackOperationStateEn.NotStarted) {
                            this.ResetCounters(); // переход в запуск - сбросить счетчики
                        }
                        if (newState != self.State) {
                            console.log("Switched state for op:", op.Id, " new state:", TrackOperationStateEn[newState]);
                        }
                        this.State = newState; // switch state
                        return [2 /*return*/, newState];
                }
            });
        });
    };
    ;
    return TrackOperation;
}());
//---------------------------
// Обработчик TAB
//--------------------------
var TabHandler = /** @class */ (function () {
    // TabHandler constructor
    function TabHandler(TabId, Config, _parent) {
        this.TabId = TabId;
        this.Config = Config;
        this.debuggerVersion = "1.0";
        // Очередь событий
        this.EventQueue = [];
        this.HandleEventQueueEntered = false;
        this.PluginVersion = chrome.runtime.getManifest().version;
        var self = this;
        this.Parent = _parent;
        this.TrackOp = new TrackOperation(TabId);
        chrome.debugger.attach({ tabId: this.TabId }, this.debuggerVersion, this.OnAttach.bind(this));
        chrome.debugger.sendCommand({ tabId: Number(this.TabId) }, "Network.enable");
        if (false) {
            chrome.debugger.sendCommand({ tabId: Number(self.TabId) }, "Performance.enable", function () {
                var lastError = chrome.runtime.lastError;
                if (lastError)
                    console.error("Performance.enable raised an error:", lastError);
            });
        }
        //-----------------------------
        // Сообщение от content script
        //-----------------------------
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            var self = this;
            if (sender.tab && self.TabId == sender.tab.id) {
                if (request.EventType == InternalEventTypeEn.ClientDOMReady) { // в параметрах пришел SiebelLoginData - взять его оттуда
                    if (request.Param) {
                        self.Parent.SiebelLoginData = request.Param;
                    }
                }
                this.EventQueue.push({ EventType: request.EventType, TabId: self.TabId, EventSubType: request.EventSubtype, Param: request.DOMEvent });
                if (!self.HandleEventQueueEntered)
                    setTimeout(self.HandleEventQueue.bind(self), 1);
                if (request.EventType == InternalEventTypeEn.ClientDOMReady) { // это самое первое событие - можно повесить и остальные listners
                    self.SetupDOMEventListners(); // все обработчики событий создаст content script
                }
            }
        }.bind(this));
    }
    TabHandler.prototype.OnAttach = function () {
        if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
            return;
        }
        chrome.debugger.onEvent.addListener(this.OnDebuggerEvent.bind(this));
    };
    TabHandler.prototype.HandleEventQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            function HandleOneEvent(iev) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, self.InternalEventHandler(iev)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var self, iev;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        self.HandleEventQueueEntered = true;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        iev = self.EventQueue.shift();
                        if (!iev)
                            return [3 /*break*/, 3];
                        return [4 /*yield*/, HandleOneEvent(iev)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        self.HandleEventQueueEntered = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    // chrome debugger event handler
    TabHandler.prototype.OnDebuggerEvent = function (debuggeeId, message, param) {
        if (debuggeeId.tabId != this.TabId)
            return;
        //console.log(arguments);
        this.EventQueue.push({ EventType: InternalEventTypeEn.Network, TabId: this.TabId, EventSubType: message, Request: param.request, Response: param.response, Param: param });
        if (!this.HandleEventQueueEntered)
            setTimeout(this.HandleEventQueue.bind(this), 1);
    };
    //--------------------------------------------------
    // Подготовка данных о запросе и отправка на сервер.
    //--------------------------------------------------
    TabHandler.prototype.PresentMonData = function () {
        var self = this;
        /*chrome.debugger.sendCommand({ tabId: Number(this.TabId) }, "Performance.getMetrics", null, */
        (function (ret) {
            //debugger;
            var perfData = MetricsToObj(ret);
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
            var endDate = new Date();
            // Считаем 
            var roundFactor = 6;
            var roundMult = Math.pow(10, roundFactor);
            var duration_total_ms = (endDate.valueOf() - self.TrackOp.StartedOperationDate.valueOf()); // всего выполнялся запрос
            var server_time = 0; // сколько ждали ответа от сервера
            var duration_network_ms = 0; // сколько ждали сеть
            var duration_loading_ms = 0; // сколько грузили данные
            for (var requestId in self.TrackOp.Requests) {
                var r = self.TrackOp.Requests[requestId];
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
                    var blockingEnd = 0; //firstPositive([timing.dnsStart, timing.connectStart, timing.sendStart, responseReceived]) || 0;
                    var reqServerTime = r.timing.receiveHeadersEnd - Math.max(r.timing.sendEnd, r.timing.connectEnd, r.timing.dnsEnd, r.timing.proxyEnd, blockingEnd);
                    server_time += reqServerTime;
                    duration_network_ms += ((r.timing.connectEnd - r.timing.connectStart)
                        + (r.timing.dnsEnd - r.timing.dnsStart)
                        + (r.timing.sslEnd - r.timing.sslStart));
                }
            }
            // Время на клиенте
            var duration_painting_ms = 0;
            var duration_rendering_ms = perfData.LayoutDuration + perfData.RecalcStyleDuration;
            var duration_scripting_ms = perfData.ScriptDuration;
            // Client - сумма всех, кроме server
            var duration_client_ms = duration_loading_ms + duration_network_ms + duration_painting_ms + duration_rendering_ms + duration_scripting_ms;
            var duration_idle_ms = duration_total_ms - duration_client_ms - server_time; // в ожидании - остаток времени от занятий
            if (duration_idle_ms < 0) {
                duration_idle_ms = 0;
            }
            duration_client_ms += duration_idle_ms; // и idle идет в счет клиента
            var pluginUpdateDate = localStorage[self.Parent.installDate_storageKey];
            if (pluginUpdateDate) {
                pluginUpdateDate = new Date(pluginUpdateDate).valueOf();
            }
            else {
                pluginUpdateDate = null;
            }
            var userOperation = {
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
                    var v = Number(userOperation[prop]);
                    if (!isNaN(v)) {
                        v = Math.round(v * roundMult) / roundMult;
                        userOperation[prop] = v;
                    }
                }
            }
            console.log("operation completed", userOperation);
            var tmpSiebelLoginData = __assign({ Region: "", RegionCode: "", BranchId: "", BranchName: "", DivisionCode: "", LoginName: "", DivisionName: "" }, self.Parent.SiebelLoginData);
            self.Parent.LogEvent(self.TabId, "op", $.extend(userOperation, {
                region: tmpSiebelLoginData.Region,
                region_code: tmpSiebelLoginData.RegionCode,
                branch_id: tmpSiebelLoginData.BranchId,
                branch_name: tmpSiebelLoginData.BranchName,
                division_code: tmpSiebelLoginData.DivisionCode,
                division_name: tmpSiebelLoginData.DivisionName
            }));
        }([]));
    };
    // проверка, что или в фильтре на SiebelLoginData не задано свойство, или значения равны
    TabHandler.prototype.isSiebelLoginMatch = function (loginData, filter) {
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
    };
    //----------------------------
    /// Internal event handler
    //-----------------------------
    TabHandler.prototype.InternalEventHandler = function (iev) {
        return __awaiter(this, void 0, void 0, function () {
            var self, _i, _a, op, today, effectiveDateTo1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = this;
                        if (!(this.TrackOp.State != TrackOperationStateEn.NotStarted)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.TrackOp.HandleEvent(iev, this.TrackOp.OpercationConfig)];
                    case 1:
                        _b.sent();
                        // Если завершился, завершаем событие
                        if (this.TrackOp.State == TrackOperationStateEn.Finished) {
                            this.PresentMonData();
                            this.TrackOp.State = TrackOperationStateEn.NotStarted; // переключили в начальное положение 
                        }
                        return [2 /*return*/];
                    case 2:
                        _i = 0, _a = this.Config.Operations;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        op = _a[_i];
                        today = new Date();
                        effectiveDateTo1 = null;
                        if (op.EffectiveDateTo) {
                            effectiveDateTo1 = op.EffectiveDateTo;
                            effectiveDateTo1.setDate(effectiveDateTo1.getDate() + 1);
                        }
                        if (!(op.IsActive
                            && (!op.EffectiveDateFrom || today >= op.EffectiveDateFrom)
                            && (!op.EffectiveDateTo || today < effectiveDateTo1)
                            && (!self.Parent.SiebelLoginData // мы не получили данные SibelLogin
                                || !op.SiebelLoginDataFilter // в операции не указан SiebelLoginFilter
                                || self.isSiebelLoginMatch(self.Parent.SiebelLoginData, op.SiebelLoginDataFilter) // соответствует фильтру
                            ))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.TrackOp.HandleEvent(iev, op)];
                    case 4:
                        if ((_b.sent()) != TrackOperationStateEn.NotStarted) // запустилось. Выходим
                            return [3 /*break*/, 6];
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // TabHandler add event listners - send messages to content script to enable event listeners
    TabHandler.prototype.SetupDOMEventListners = function () {
        // по всем элементам конфигурации с типом начала/конца операции DOMEvent/DOMMutated: собрать их все в кучу и послать content script
        var trackedEvents = [];
        var trackedDOMMutatedEvents = [];
        function addTracked(ec) {
            if (ec && ec.EventType == EventTypeEn.DOMEvent)
                trackedEvents.push(ec);
            else if (ec && ec.EventType == EventTypeEn.DOMMutation)
                trackedDOMMutatedEvents.push(ec);
        }
        for (var i in this.Config.Operations) {
            if (this.Config.Operations[i].IsActive) {
                addTracked(this.Config.Operations[i].StartEvent);
                if (this.Config.Operations[i].StartEvent)
                    addTracked(this.Config.Operations[i].StartEvent.CnjEndEvent);
                addTracked(this.Config.Operations[i].EndEvent);
            }
        }
        chrome.tabs.sendMessage(this.TabId, new ContentScriptMessageSetupDOMListners(trackedEvents));
        chrome.tabs.sendMessage(this.TabId, new ContentScriptMessageSetupDOMMutationListners(trackedDOMMutatedEvents));
    };
    return TabHandler;
}());
// Конфигурация составного события
var OperationConfiguration = /** @class */ (function () {
    function OperationConfiguration() {
    }
    return OperationConfiguration;
}());
// Выполнить eval выражения expression в контексте страницы пользователя, обеспечив контекст из context
function Eval(iev, context, expression) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    chrome.tabs.sendMessage(iev.TabId, new ContentScriptMessageEval(context, expression), function (resp) {
                        resolve(resp);
                    });
                })];
        });
    });
}
var EventConfigurationSerial = 1; // последовательный номер EventConfiguration
//-------------------------------
// EventConfiguration: Document
//-------------------------------
var EventConfigurationDocumentNavigation = /** @class */ (function () {
    function EventConfigurationDocumentNavigation(URLPattern) {
        this.URLPattern = URLPattern;
        this.EventType = EventTypeEn.DocumentNavigation;
        this.EventConfigurationId = EventConfigurationSerial++;
        this.CnjEndEvent = new EventConfigurationDOMEvent("DOMContentLoaded");
    }
    EventConfigurationDocumentNavigation.prototype.TestMatchInternal = function (iev) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, iev.EventType == InternalEventTypeEn.Network
                        && iev.EventSubType == debuggerEvent_requestWillBeSent
                        && iev.Param
                        && iev.Param.type == "Document"
                        && iev.Request
                        && new RegExp(this.URLPattern, "i").test(iev.Request.url)];
            });
        });
    };
    return EventConfigurationDocumentNavigation;
}());
//----------------------------------------------------------------------------------------------------------------------
// EventConfiguration ajaxComplete. Событие добавляется обработчиком конфигурации в CnjEndEvent, когда событие - Request
//----------------------------------------------------------------------------------------------------------------------
var EventConfigurationAjaxComplete = /** @class */ (function () {
    function EventConfigurationAjaxComplete() {
        this.EventType = EventTypeEn.AjaxRequestComplete;
        this.EventConfigurationId = EventConfigurationSerial++;
    }
    EventConfigurationAjaxComplete.prototype.TestMatchInternal = function (iev, requestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (iev.EventType == InternalEventTypeEn.Network && iev.EventSubType == debuggerEvent_responseReceived /*&& requestId == iev.Param.requestId*/)];
            });
        });
    };
    return EventConfigurationAjaxComplete;
}());
//----------------------------------------------------
// EventConfiguration ajax: конфигурация события ajax
//---------------------------------------------------
var EventConfigurationAjax = /** @class */ (function () {
    function EventConfigurationAjax() {
        this.EventType = EventTypeEn.AjaxRequest;
        this.EventConfigurationId = EventConfigurationSerial++;
    }
    EventConfigurationAjax.prototype.TestMatchInternal = function (iev) {
        return __awaiter(this, void 0, void 0, function () {
            var rc, testRegExp, requestOrResponse, kv, prp, self, rc_1, rc_2;
            return __generator(this, function (_a) {
                rc = iev.EventType == InternalEventTypeEn.Network
                    && ((this.RequestResponse == AjaxRequestResponse.Request && iev.EventSubType == debuggerEvent_requestWillBeSent)
                        || (this.RequestResponse == AjaxRequestResponse.Response && iev.EventSubType == debuggerEvent_responseReceived))
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
                    return [2 /*return*/, false];
                testRegExp = new RegExp(this.OKRegexp, "i");
                requestOrResponse = iev.Param[this.RequestResponse == AjaxRequestResponse.Request ? "request" : "response"];
                if (!requestOrResponse) {
                    //console.error("AjaxRequest testing match. Request or Response field not initialised");
                    return [2 /*return*/];
                }
                if (this.RequestResponse == AjaxRequestResponse.Request) { // headersText не заполнен
                    kv = [];
                    for (prp in requestOrResponse.headers)
                        kv.push(prp + ": " + requestOrResponse.headers[prp]);
                    requestOrResponse.headersText = kv.join("\r\n");
                }
                self = this;
                // URL
                if (this.TestTarget == AjaxTestTargetTypeEn.URL) {
                    rc_1 = testRegExp.test(requestOrResponse.url);
                    //console.log("AjaxRequest testing match. Testing URL. Result:" + rc);
                    return [2 /*return*/, rc_1];
                }
                // Header
                if (this.TestTarget == AjaxTestTargetTypeEn.Header) {
                    rc_2 = testRegExp.test(requestOrResponse.headersText);
                    //console.log("AjaxRequest testing match. Testing header. Result:" + rc);
                    return [2 /*return*/, rc_2];
                }
                // Body && HeaderBody REQUEST
                else if (self.RequestResponse == AjaxRequestResponse.Request
                    && [AjaxTestTargetTypeEn.HeaderBody, AjaxTestTargetTypeEn.Body].indexOf(this.TestTarget) >= 0) {
                    return [2 /*return*/, new Promise(function (resolve) {
                            chrome.debugger.sendCommand({ tabId: iev.TabId }, "Network.getRequestPostData", { requestId: iev.Param.requestId }, function (data) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var testString, rc;
                                    return __generator(this, function (_a) {
                                        testString = chrome.runtime.lastError ? "" : data.postData;
                                        if (self.TestTarget == AjaxTestTargetTypeEn.HeaderBody)
                                            testString = requestOrResponse.headersText + testString; // prepend header
                                        rc = testRegExp.test(testString);
                                        //console.log("AjaxRequest testing match. Testing request header+body. Result:" + rc);
                                        resolve(rc);
                                        return [2 /*return*/];
                                    });
                                });
                            });
                        })];
                }
                // Body && HeaderBody RESPONSE - getting body in this case
                else if (self.RequestResponse == AjaxRequestResponse.Response && [AjaxTestTargetTypeEn.HeaderBody, AjaxTestTargetTypeEn.Body].indexOf(this.TestTarget) >= 0) {
                    // получить body
                    return [2 /*return*/, new Promise(function (resolve) {
                            chrome.debugger.sendCommand({ tabId: iev.TabId }, "Network.getResponseBody", { requestId: iev.Param.requestId }, function (resp) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var testString, rc;
                                    return __generator(this, function (_a) {
                                        testString = resp.body;
                                        if (self.TestTarget == AjaxTestTargetTypeEn.HeaderBody)
                                            testString = iev.Param.response.headersText + testString; // prepend header
                                        rc = testRegExp.test(testString);
                                        //console.log("AjaxRequest testing match. Testing response header+body. Result:" + rc);
                                        resolve(rc);
                                        return [2 /*return*/];
                                    });
                                });
                            });
                        })];
                }
                return [2 /*return*/, false];
            });
        });
    };
    return EventConfigurationAjax;
}());
//--------------------------------------------------------------
// Event configuration DOM: конфигурация события "Событие DOM"
//--------------------------------------------------------------
var EventConfigurationDOMEvent = /** @class */ (function () {
    function EventConfigurationDOMEvent(DOMEvent, TargetElementSelector) {
        this.DOMEvent = DOMEvent;
        this.TargetElementSelector = TargetElementSelector;
        this.EventType = EventTypeEn.DOMEvent;
        this.EventConfigurationId = EventConfigurationSerial++;
    }
    EventConfigurationDOMEvent.prototype.TestMatchInternal = function (iev) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (iev.EventType == InternalEventTypeEn.ClientDOMReady && this.DOMEvent == "DOMContentLoaded")
                    return [2 /*return*/, true]; // это специальный случай 
                return [2 /*return*/, iev.EventType == InternalEventTypeEn.DOMEvent
                        && iev.EventSubType == this.DOMEvent && iev.Param.EventConfigurationId == this.EventConfigurationId];
            });
        });
    };
    return EventConfigurationDOMEvent;
}());
//----------------------------------------------------------------------
// EventCongiguration DOM Mutation: конфигурация события "Изменение DOM"
//----------------------------------------------------------------------
var EventConfigurationDOMMutation = /** @class */ (function () {
    function EventConfigurationDOMMutation(TargetElementSelector, OKExpression) {
        this.TargetElementSelector = TargetElementSelector;
        this.OKExpression = OKExpression;
        this.EventType = EventTypeEn.DOMMutation;
        this.EventConfigurationId = EventConfigurationSerial++;
    }
    EventConfigurationDOMMutation.prototype.TestMatchInternal = function (iev) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, iev.EventType == InternalEventTypeEn.DOMMutation];
            });
        });
    };
    return EventConfigurationDOMMutation;
}());
var MonitoringBackground = /** @class */ (function () {
    function MonitoringBackground(monitoringAgentServerUrl) {
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
                    StartEvent: (function () {
                        var v = new EventConfigurationAjax();
                        v.RequestResponse = AjaxRequestResponse.Request;
                        v.TestTarget = AjaxTestTargetTypeEn.URL;
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
                    StartEvent: (function () {
                        var v = new EventConfigurationAjax();
                        v.TestTarget = AjaxTestTargetTypeEn.URL;
                        v.OKRegexp = "PendingActivities";
                        v.RequestResponse = AjaxRequestResponse.Request;
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
        var getConfigUrl = APIurl + "getConfig";
        var getConfigUrlImm = APIurl + "getConfigImm";
        var siebelDataSent = false; // данные о подключении Siebel отправляются один раз или при загрузке конфигурации.
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
                $.ajax(__assign({
                    url: logEventUrl,
                    data: {
                        p: { items: eventsTmp }
                    }
                }, ajaxParam));
            }
        }, 1000);
        var firstConfigPoll = true; // первый раз берем конфигурацию - она не должна выпасть в ожидание
        //-----------------------------------
        // Перезагрузка конфигурации событий
        //-----------------------------------
        function rebuildConfiguration(data) {
            //self.OperationsConfig = self.PreConfig;
            //return;
            // Параметры конфигурации 
            var configKey_siebelUrl = "efr_home_regx";
            // Параметры самой конфигурации
            if (data.config && data.config.configJson) {
                var cfgParam = JSON.parse(data.config.configJson).config;
                var p = cfgParam.find(function (e) { return e.param_code == configKey_siebelUrl; });
                if (p)
                    self.OperationsConfig.SiebelURL = p.value;
            }
            // Операции
            if (!data)
                return;
            // map с типа события start/stop сервера на наш enum
            var srvEventType2InternalEventType = {};
            srvEventType2InternalEventType["ajax"] = EventTypeEn.AjaxRequest;
            srvEventType2InternalEventType["dom-mutation"] = EventTypeEn.DOMMutation;
            srvEventType2InternalEventType["doc"] = EventTypeEn.DocumentNavigation;
            srvEventType2InternalEventType["event"] = EventTypeEn.DOMEvent;
            if (data.operations) {
                self.OperationsConfig.Operations =
                    data.operations.map(function (op) {
                        var srvConfigEl = JSON.parse(op.configData);
                        function mapEvent(startStop) {
                            var ev;
                            switch (srvEventType2InternalEventType[srvConfigEl[startStop + "_type"]]) {
                                case EventTypeEn.AjaxRequest:
                                    var evAjax = new EventConfigurationAjax();
                                    evAjax.RequestResponse = srvConfigEl[startStop + "_subtype"] == AjaxRequestResponse.Request
                                        ? AjaxRequestResponse.Request : AjaxRequestResponse.Response;
                                    evAjax.TestTarget = Number(srvConfigEl[startStop + "_monitor"]);
                                    evAjax.OKRegexp = srvConfigEl[startStop + "_regexp"];
                                    evAjax.CustomExpression = srvConfigEl[startStop + "_cond"];
                                    ev = evAjax;
                                    // Если мы смотрим на Request, то добавить связанное событие, чтобы дождаться ответа
                                    if (evAjax.RequestResponse == AjaxRequestResponse.Request) {
                                        //evAjax.CnjEndEvent = new EventConfigurationAjaxComplete();
                                    }
                                    break;
                                case EventTypeEn.DOMMutation:
                                    var evDOMMutation = new EventConfigurationDOMMutation(srvConfigEl[startStop + "_regexp"], srvConfigEl[startStop + "_cond"]);
                                    ev = evDOMMutation;
                                    break;
                                case EventTypeEn.DocumentNavigation:
                                    ev = new EventConfigurationDocumentNavigation(srvConfigEl[startStop + "_monitor"]);
                                    break;
                                case EventTypeEn.DOMEvent:
                                    var evDOMEv = new EventConfigurationDOMEvent(srvConfigEl[startStop + "_subtype"], srvConfigEl[startStop + "_regexp"]);
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
                        var newEl = {
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
            return __awaiter(this, void 0, void 0, function () {
                function iter() {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    $.ajax(__assign({
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
                                })];
                        });
                    });
                }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!true) return [3 /*break*/, 2];
                            return [4 /*yield*/, iter()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
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
            var ixToDel = self.browserActionTabIds.indexOf(tabId);
            if (ixToDel >= 0)
                self.browserActionTabIds.splice(ixToDel, 1);
        });
        // отправить конфигурацию в browser tab
        function sendConfigToBrowser() {
            chrome.runtime.sendMessage({ eventType: BrowserEventTypeEn.ConfigLoaded, eventParam: self.OperationsConfig });
        }
        //-----------------------------
        // Сообщение от content script
        //-----------------------------
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            //------- Сообщение от content script: данные о siebel login 
            if (request.EventType == InternalEventTypeEn.SiebelLoginData) {
                console.log("SiebelLoginData:", request.Param);
                if (request.Param && !self.SiebelLoginData)
                    self.SiebelLoginData = request.Param; // если данные получены, а у нас они - наоборот - не сохранены
                $.ajax(__assign({
                    url: siebelLoginDataUrl,
                    data: request.Param
                }, ajaxParam));
            }
            //----- Browser запрашивает накопленные события и конфигурацию
            else if (request.EventType == InternalEventTypeEn.BrowserRequestEventsAndConfig) {
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
    MonitoringBackground.prototype.HandleInternalEvent = function (ev) {
    };
    MonitoringBackground.prototype.LogEvent = function (tabId, message, param) {
        //if (!filterEvents.includes(message)) return; // filter out not interesing events
        // decode tab
        var self = this;
        chrome.tabs.query({}, function (tabs) {
            var thisTab = tabs.filter(function (t) { return t.id == tabId; });
            var extendedObj = { title: "", url: "", timestamp: new Date().valueOf(), timeZoneOffset: new Date().getTimezoneOffset() };
            if (thisTab.length) {
                extendedObj.tabTitle = thisTab[0].title;
                extendedObj.tabUrl = thisTab[0].url;
            }
            if (!param)
                param = {};
            var eventDesc = __assign({ tabId: tabId, message: message, param: param }, extendedObj);
            // Вытащить операцию по ИД
            var op = self.OperationsConfig.Operations.filter(function (e) { return e.Id == eventDesc.param.id; });
            // Послать сообщение о событии в browser_action
            var tmp = __assign({}, eventDesc);
            if (op.length)
                tmp.operationName = op[0].OperationName;
            tmp.param.start_date = tmp.param.start_date.valueOf();
            tmp.param.end_date = tmp.param.end_date.valueOf();
            self.CollectedEvents.push(tmp);
            self.browserActionTabIds.forEach(function (e) { return chrome.tabs.sendMessage(e, new BrowserEvent(BrowserEventTypeEn.EventFired, self.CollectedEvents)); });
            // в очередь на отправку
            eventDesc.param = JSON.stringify(param);
            self.AccumulatedEvents.push(eventDesc);
        });
    };
    //----------------------------------------------------------------------------------------------------------------
    // Получить данные из login Siebel. Отправка сообщения. Ответ придет потом отдельным сообщением от content script
    //----------------------------------------------------------------------------------------------------------------
    MonitoringBackground.prototype.GetSiebelLoginData = function (tabId) {
        chrome.tabs.sendMessage(tabId, new ContentScriptMessageGetSiebelLoginData());
    };
    //--------------------------------------------------------------------------------
    // Проверка, нужно ли подключить закладку к мониторингу и, если нужно, подключение
    //---------------------------------------------------------------------------------
    MonitoringBackground.prototype.AttachToTab = function (tab) {
        var self = this;
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
    };
    //------------------------------------------------
    // Попытаться сделать attach debugger to all tabs
    //------------------------------------------------
    MonitoringBackground.prototype.attachToAllTabs = function () {
        var self = this;
        // Attach debugger to all tabs
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (e) {
                self.AttachToTab(e);
            });
        });
    };
    return MonitoringBackground;
}());
window.monitoringBackground = new MonitoringBackground("http://localhost:5002/");
//# sourceMappingURL=MonitoringBackground2.js.map