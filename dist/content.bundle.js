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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/watchmanContent.ts");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./app/background classes/variables/common.ts":
/*!****************************************************!*\
  !*** ./app/background classes/variables/common.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.siebelLoginTagName = "siebel-login-data";
exports.siebelLoginTagAttr = "data-login";
exports.browserApplicationName = "Watchman-angular-app";


/***/ }),

/***/ "./app/watchmanContent.ts":
/*!********************************!*\
  !*** ./app/watchmanContent.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="MonitoringBackground2.ts" />
const common_1 = __webpack_require__(/*! ./background classes/variables/common */ "./app/background classes/variables/common.ts");
const ContentScriptMessage_1 = __webpack_require__(/*! ./background classes/ContentScriptMessage */ "./app/background classes/ContentScriptMessage.ts");
const InternalEventTypeEn_1 = __webpack_require__(/*! ./background classes/variables/InternalEventTypeEn */ "./app/background classes/variables/InternalEventTypeEn.ts");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //--------- сообщение получить данные login Siebel. Найти созданный нами элемент, взять оттуда данные и послать отдельным сообщением 
    if (message.MessageType == ContentScriptMessage_1.ContentScriptMessageTypeEn.GetSiebelLoginData) {
        $(document).ready(function () {
            let rc = null;
            // сначачала пытаемся взять из storage
            var storage = localStorage[common_1.siebelLoginTagAttr];
            if (storage) {
                try {
                    rc = JSON.parse(storage);
                }
                catch (e) {
                    rc = null;
                }
            }
            if (!rc) { // не получилось - берем из нашего HTML-элемента
                let els = document.getElementsByTagName(common_1.siebelLoginTagName);
                if (els.length) {
                    let el = els[0];
                    var data = el.getAttribute(common_1.siebelLoginTagAttr);
                    if (data) {
                        try {
                            rc = JSON.parse(data);
                        }
                        catch (ex) {
                            rc = null;
                        }
                    }
                }
            }
            chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn_1.default.SiebelLoginData, Param: rc });
        });
    }
    //------------- сообщение Eval - вычислить выражение в контексте страницы
    else if (message.MessageType == ContentScriptMessage_1.ContentScriptMessageTypeEn.Eval) {
        let rc = { response: null, exception: null };
        // выполнить eval в context
        try {
            let msg = message;
            // Строим контекст: все поля из контекста становятся переменными. В конец дописываем expression
            let ftext = "(function() {";
            for (let prop in msg.Context) {
                if (msg.Context.hasOwnProperty(prop)) {
                    ftext += "var " + prop + " = " + JSON.stringify(msg.Context[prop]) + ";";
                }
            }
            ftext += "return " + msg.Expression;
            ftext += ";})()";
            rc.response = eval(ftext);
        }
        catch (ex) {
            delete rc.response;
            rc.exception = ex;
        }
        sendResponse(rc);
    }
    //>>>>>>>>>> DOM Event
    else if (message.MessageType == ContentScriptMessage_1.ContentScriptMessageTypeEn.SetupDOMEventListners) {
        // повесить обработчики событий
        let msg = message;
        msg.Events.forEach((e) => {
            let domEventCfg = e;
            $(document).on(domEventCfg.DOMEvent, domEventCfg.TargetElementSelector, {
                f: function (domEvent) {
                    let evalRC;
                    let eventConfigurationId = domEventCfg.EventConfigurationId;
                    let exception;
                    try {
                        evalRC = !domEventCfg.OKExpression || eval(domEventCfg.OKExpression);
                    }
                    catch (ex) {
                        evalRC = true;
                        exception = ex;
                    }
                    if (evalRC) {
                        let level = 0;
                        chrome.runtime.sendMessage(null, {
                            EventType: InternalEventTypeEn_1.default.DOMEvent, EventSubtype: domEventCfg.DOMEvent,
                            DOMEvent: JSON.parse(JSON.stringify(Object.assign({ EventConfigurationId: eventConfigurationId }, domEvent), function (key, value) {
                                if (typeof (value) != "string" && level++ > 100)
                                    return "<<replaced>>";
                                return value;
                            })),
                            Exception: exception
                        });
                    }
                }
            }.f);
        });
    }
    //>>>>>>>>>> DOM Mutation
    else if (message.MessageType == ContentScriptMessage_1.ContentScriptMessageTypeEn.SetupDOMMutationListners) {
        // повесить обработчики событий 
        let msg = message;
        var config = { attributes: true, childList: true };
        msg.Events.forEach((e) => {
            let domChangeEventCfg = e;
            $(domChangeEventCfg.TargetElementSelector || "body").each(function (ix, DOMEl) {
                let ev = Object.assign({}, e);
                new MutationObserver({
                    f: function (mutaionList) {
                        let evalRC;
                        let exception = null;
                        try {
                            evalRC = !ev.OKExpression || eval(ev.OKExpression);
                        }
                        catch (ex) {
                            exception = ex;
                            evalRC = true;
                        }
                        if (evalRC) {
                            chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn_1.default.DOMMutation, EventSubtype: domChangeEventCfg.TargetElementSelector, Exception: exception });
                        }
                    }
                }.f).observe(DOMEl, config);
            });
        });
    }
});
//------------------------------------------------------------------------------
// Получить данные о login siebel. Данные записываются в tag=siebelLoginTagName
//------------------------------------------------------------------------------
function getSiebelGoginData(siebelLoginTagName, siebelLoginTagAttr) {
    var w = window;
    //debugger;
    var rc = null;
    var login_storage_key = siebelLoginTagName; // storage key is the same
    if (!rc) {
        if (w.SiebelApp && w.SiebelApp.S_App && typeof (w.SiebelApp.S_App.GetProfileAttr) == "function") {
            try {
                rc = {
                    LoginName: w.SiebelApp.S_App.GetProfileAttr("Login Name"),
                    Region: w.SiebelApp.S_App.GetProfileAttr("VTB24 Region"),
                    RegionCode: w.SiebelApp.S_App.GetProfileAttr("VTB24 Region Code"),
                    BranchId: w.SiebelApp.S_App.GetProfileAttr("VTB24 BIS Branch Id"),
                    BranchName: w.SiebelApp.S_App.GetProfileAttr("VTB24 BIS Branch Name"),
                    DivisionCode: w.SiebelApp.S_App.GetProfileAttr("VTB24 BIS Division Code"),
                    DivisionName: w.SiebelApp.S_App.GetProfileAttr("VTB24 Primary Division Name")
                };
                localStorage[login_storage_key] = JSON.stringify(rc);
            }
            catch (ex) {
                rc = null;
                // try to get from storage
                var szStorage = localStorage[login_storage_key];
                if (szStorage) {
                    try {
                        rc = JSON.parse(szStorage);
                    }
                    catch (e) {
                        rc = null;
                    }
                }
            }
        }
        else
            rc = null;
    }
    let els = window.document.getElementsByTagName(siebelLoginTagName); // может, элемент уже есть
    let ourEl;
    if (!els.length) {
        ourEl = window.document.createElement(siebelLoginTagName);
        window.document.body.appendChild(ourEl);
    }
    else {
        ourEl = els[0];
    }
    ourEl.setAttribute(siebelLoginTagAttr, JSON.stringify(rc)); // в html елемент записать все параметры login
}
$(document).ready(function () {
    console.log("watchmanContent. doc.ready()");
    var scr = document.createElement('script');
    scr.text = "(" + getSiebelGoginData + ")('" + common_1.siebelLoginTagName + "', '" + common_1.siebelLoginTagAttr + "');";
    //scr.src = chrome.extension.getURL("getSiebelLoginData.js");
    document.body.appendChild(scr);
    // Получилось ли с login, мы не знаем, но попробуем взять из кеша
    var loginData = localStorage[common_1.siebelLoginTagName];
    if (loginData) {
        try {
            loginData = JSON.parse(loginData);
        }
        catch (e) {
            loginData = null;
        }
    }
    chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn_1.default.ClientDOMReady, Param: loginData });
    return;
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2JhY2tncm91bmQgY2xhc3Nlcy9Db250ZW50U2NyaXB0TWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9JbnRlcm5hbEV2ZW50VHlwZUVuLnRzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL2NvbW1vbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvd2F0Y2htYW5Db250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQSxtQ0FBbUM7QUFDbkMsSUFBWSwwQkFLWDtBQUxELFdBQVksMEJBQTBCO0lBQ2xDLDJFQUFJO0lBQ0osNkdBQXFCO0lBQ3JCLG1IQUF3QjtJQUN4Qix1R0FBa0I7QUFD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RSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsK0NBQThDO0FBRTdHLENBQUM7QUFHRCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQztJQUMzQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixHQUFHLEtBQUssR0FBRywyQkFBa0IsR0FBRyxNQUFNLEdBQUcsMkJBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ3ZHLDZEQUE2RDtJQUM3RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFFOUIsaUVBQWlFO0lBQ2pFLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQywyQkFBa0IsQ0FBQyxDQUFDO0lBQ2pELElBQUksU0FBUyxFQUFFO1FBQ1gsSUFBSTtZQUNBLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxDQUFDLEVBQUU7WUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQUU7S0FDbEM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQXlCLEVBQUUsU0FBUyxFQUFFLDZCQUFtQixDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUM3SCxPQUFPO0FBRVgsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiY29udGVudC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC93YXRjaG1hbkNvbnRlbnQudHNcIik7XG4iLCJpbXBvcnQgRXZlbnRDb25maWd1cmF0aW9uIGZyb20gXCIuL2ludGVyZmFjZXMvRXZlbnRDb25maWd1cmF0aW9uXCJcblxuLy8g0KLQuNC/0Ysg0YHQvtC+0LHRidC10L3QuNC5IGJhY2tncm91bmQgLT4gdGFiXG5leHBvcnQgZW51bSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbiB7XG4gICAgRXZhbCxcbiAgICBTZXR1cERPTUV2ZW50TGlzdG5lcnMsXG4gICAgU2V0dXBET01NdXRhdGlvbkxpc3RuZXJzLFxuICAgIEdldFNpZWJlbExvZ2luRGF0YVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRlbnRTY3JpcHRNZXNzYWdlIHtcbiAgICBNZXNzYWdlVHlwZTogQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW47XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50U2NyaXB0TWVzc2FnZUV2YWwgaW1wbGVtZW50cyBDb250ZW50U2NyaXB0TWVzc2FnZSB7XG4gICAgTWVzc2FnZVR5cGU6IENvbnRlbnRTY3JpcHRNZXNzYWdlVHlwZUVuO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBDb250ZXh0OiBhbnksIHB1YmxpYyBFeHByZXNzaW9uOiBhbnkpIHtcbiAgICAgICAgdGhpcy5NZXNzYWdlVHlwZSA9IENvbnRlbnRTY3JpcHRNZXNzYWdlVHlwZUVuLkV2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29udGVudFNjcmlwdE1lc3NhZ2VTZXR1cERPTUxpc3RuZXJzIGltcGxlbWVudHMgQ29udGVudFNjcmlwdE1lc3NhZ2VcbntcbiAgICBNZXNzYWdlVHlwZTogQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW4gPSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5TZXR1cERPTUV2ZW50TGlzdG5lcnM7XG4gICAgY29uc3RydWN0b3IocHVibGljIEV2ZW50czogRXZlbnRDb25maWd1cmF0aW9uW10pIHtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50U2NyaXB0TWVzc2FnZVNldHVwRE9NTXV0YXRpb25MaXN0bmVycyBpbXBsZW1lbnRzIENvbnRlbnRTY3JpcHRNZXNzYWdlIHtcbiAgICBNZXNzYWdlVHlwZTogQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW4gPSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5TZXR1cERPTU11dGF0aW9uTGlzdG5lcnM7XG4gICAgY29uc3RydWN0b3IocHVibGljIEV2ZW50czogRXZlbnRDb25maWd1cmF0aW9uW10pIHtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50U2NyaXB0TWVzc2FnZUdldFNpZWJlbExvZ2luRGF0YSBpbXBsZW1lbnRzIENvbnRlbnRTY3JpcHRNZXNzYWdlIHtcbiAgICBNZXNzYWdlVHlwZTogQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW4gPSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5HZXRTaWViZWxMb2dpbkRhdGE7XG59IiwiLy8g0YLQuNC/0Ysg0YHQvtC+0LHRidC10L3QuNC5LCDQvtCx0YDQsNCx0LDRgtGL0LLQsNC10LzRi9GFINCy0L3Rg9GC0YDQuCByb3V0aW5nXG5lbnVtIEludGVybmFsRXZlbnRUeXBlRW4ge1xuICAgIE5ldHdvcmssXG4gICAgQ2xpZW50RE9NUmVhZHksXG4gICAgRE9NRXZlbnQsXG4gICAgRE9NTXV0YXRpb24sXG4gICAgU2llYmVsTG9naW5EYXRhLFxuICAgIEJyb3dzZXJSZXF1ZXN0RXZlbnRzQW5kQ29uZmlnXG59XG5leHBvcnQgZGVmYXVsdCBJbnRlcm5hbEV2ZW50VHlwZUVuOyIsImV4cG9ydCBjb25zdCBzaWViZWxMb2dpblRhZ05hbWUgPSBcInNpZWJlbC1sb2dpbi1kYXRhXCI7XG5leHBvcnQgY29uc3Qgc2llYmVsTG9naW5UYWdBdHRyID0gXCJkYXRhLWxvZ2luXCI7XG5leHBvcnQgY29uc3QgYnJvd3NlckFwcGxpY2F0aW9uTmFtZSA9IFwiV2F0Y2htYW4tYW5ndWxhci1hcHBcIjsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiTW9uaXRvcmluZ0JhY2tncm91bmQyLnRzXCIgLz5cbmltcG9ydCB7IHNpZWJlbExvZ2luVGFnTmFtZSwgc2llYmVsTG9naW5UYWdBdHRyIH0gZnJvbSBcIi4vYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9jb21tb25cIlxuaW1wb3J0IHsgXG4gICAgQ29udGVudFNjcmlwdE1lc3NhZ2VTZXR1cERPTU11dGF0aW9uTGlzdG5lcnMsIFxuICAgIENvbnRlbnRTY3JpcHRNZXNzYWdlU2V0dXBET01MaXN0bmVycywgXG4gICAgQ29udGVudFNjcmlwdE1lc3NhZ2VFdmFsLCBcbiAgICBDb250ZW50U2NyaXB0TWVzc2FnZSwgXG4gICAgQ29udGVudFNjcmlwdE1lc3NhZ2VUeXBlRW4gXG59IGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy9Db250ZW50U2NyaXB0TWVzc2FnZVwiXG5pbXBvcnQgVGFiMkJhY2tncm91bmRNZXNzYWdlIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy9pbnRlcmZhY2VzL1RhYjJCYWNrZ3JvdW5kTWVzc2FnZVwiXG5pbXBvcnQgSW50ZXJuYWxFdmVudFR5cGVFbiBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL0ludGVybmFsRXZlbnRUeXBlRW5cIlxuaW1wb3J0IFNpZWJlbExvZ2luRGF0YSBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvaW50ZXJmYWNlcy9TaWViZWxMb2dpbkRhdGFcIlxuXG5pbXBvcnQge1xuICAgIEV2ZW50Q29uZmlndXJhdGlvbkRPTUV2ZW50LCBcbiAgICBFdmVudENvbmZpZ3VyYXRpb25ET01NdXRhdGlvblxufSBmcm9tIFwiLi9Nb25pdG9yaW5nQmFja2dyb3VuZDJcIjtcblxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG4gICAgZnVuY3Rpb24gKG1lc3NhZ2U6IENvbnRlbnRTY3JpcHRNZXNzYWdlLCBzZW5kZXI6IGFueSwgc2VuZFJlc3BvbnNlOiAoYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIC8vLS0tLS0tLS0tINGB0L7QvtCx0YnQtdC90LjQtSDQv9C+0LvRg9GH0LjRgtGMINC00LDQvdC90YvQtSBsb2dpbiBTaWViZWwuINCd0LDQudGC0Lgg0YHQvtC30LTQsNC90L3Ri9C5INC90LDQvNC4INGN0LvQtdC80LXQvdGCLCDQstC30Y/RgtGMINC+0YLRgtGD0LTQsCDQtNCw0L3QvdGL0LUg0Lgg0L/QvtGB0LvQsNGC0Ywg0L7RgtC00LXQu9GM0L3Ri9C8INGB0L7QvtCx0YnQtdC90LjQtdC8IFxuICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlVHlwZSA9PSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5HZXRTaWViZWxMb2dpbkRhdGEpIHtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmM6IGFueSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8g0YHQvdCw0YfQsNGH0LDQu9CwINC/0YvRgtCw0LXQvNGB0Y8g0LLQt9GP0YLRjCDQuNC3IHN0b3JhZ2VcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZVtzaWViZWxMb2dpblRhZ0F0dHJdO1xuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByYyA9IEpTT04ucGFyc2Uoc3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgcmMgPSBudWxsOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmMpIHsvLyDQvdC1INC/0L7Qu9GD0YfQuNC70L7RgdGMIC0g0LHQtdGA0LXQvCDQuNC3INC90LDRiNC10LPQviBIVE1MLdGN0LvQtdC80LXQvdGC0LBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHNpZWJlbExvZ2luVGFnTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSBlbHNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGVsLmdldEF0dHJpYnV0ZShzaWViZWxMb2dpblRhZ0F0dHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChleCkgeyByYyA9IG51bGw7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShudWxsLCA8VGFiMkJhY2tncm91bmRNZXNzYWdlPnsgRXZlbnRUeXBlOiBJbnRlcm5hbEV2ZW50VHlwZUVuLlNpZWJlbExvZ2luRGF0YSwgUGFyYW06IHJjIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tINGB0L7QvtCx0YnQtdC90LjQtSBFdmFsIC0g0LLRi9GH0LjRgdC70LjRgtGMINCy0YvRgNCw0LbQtdC90LjQtSDQsiDQutC+0L3RgtC10LrRgdGC0LUg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgICBlbHNlIGlmIChtZXNzYWdlLk1lc3NhZ2VUeXBlID09IENvbnRlbnRTY3JpcHRNZXNzYWdlVHlwZUVuLkV2YWwpIHtcbiAgICAgICAgICAgIGxldCByYzogeyByZXNwb25zZTogYW55LCBleGNlcHRpb246IGFueSB9ID0geyByZXNwb25zZTogbnVsbCwgZXhjZXB0aW9uOiBudWxsIH07XG4gICAgICAgICAgICAvLyDQstGL0L/QvtC70L3QuNGC0YwgZXZhbCDQsiBjb250ZXh0XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtc2cgPSA8Q29udGVudFNjcmlwdE1lc3NhZ2VFdmFsPm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgLy8g0KHRgtGA0L7QuNC8INC60L7QvdGC0LXQutGB0YI6INCy0YHQtSDQv9C+0LvRjyDQuNC3INC60L7QvdGC0LXQutGB0YLQsCDRgdGC0LDQvdC+0LLRj9GC0YHRjyDQv9C10YDQtdC80LXQvdC90YvQvNC4LiDQkiDQutC+0L3QtdGGINC00L7Qv9C40YHRi9Cy0LDQtdC8IGV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICBsZXQgZnRleHQ6IHN0cmluZyA9IFwiKGZ1bmN0aW9uKCkge1wiO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gbXNnLkNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1zZy5Db250ZXh0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdGV4dCArPSBcInZhciBcIiArIHByb3AgKyBcIiA9IFwiICsgSlNPTi5zdHJpbmdpZnkobXNnLkNvbnRleHRbcHJvcF0pICsgXCI7XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnRleHQgKz0gXCJyZXR1cm4gXCIgKyBtc2cuRXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgICBmdGV4dCArPSBcIjt9KSgpXCI7XG4gICAgICAgICAgICAgICAgcmMucmVzcG9uc2UgPSBldmFsKGZ0ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByYy5yZXNwb25zZTtcbiAgICAgICAgICAgICAgICByYy5leGNlcHRpb24gPSBleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShyYyk7XG4gICAgICAgIH1cbiAgICAgICAgICAgIC8vPj4+Pj4+Pj4+PiBET00gRXZlbnRcbiAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5NZXNzYWdlVHlwZSA9PSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5TZXR1cERPTUV2ZW50TGlzdG5lcnMpIHtcbiAgICAgICAgICAgIC8vINC/0L7QstC10YHQuNGC0Ywg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxuICAgICAgICAgICAgbGV0IG1zZyA9IDxDb250ZW50U2NyaXB0TWVzc2FnZVNldHVwRE9NTGlzdG5lcnM+bWVzc2FnZTtcbiAgICAgICAgICAgIG1zZy5FdmVudHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkb21FdmVudENmZyA9IDxFdmVudENvbmZpZ3VyYXRpb25ET01FdmVudD5lO1xuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKGRvbUV2ZW50Q2ZnLkRPTUV2ZW50LCBkb21FdmVudENmZy5UYXJnZXRFbGVtZW50U2VsZWN0b3IsIHtcbiAgICAgICAgICAgICAgICAgICAgZjogZnVuY3Rpb24gKGRvbUV2ZW50OiBFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV2YWxSQzogYm9vbGVhbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBldmVudENvbmZpZ3VyYXRpb25JZCA9IGRvbUV2ZW50Q2ZnLkV2ZW50Q29uZmlndXJhdGlvbklkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4Y2VwdGlvbjogYW55O1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsUkMgPSAhZG9tRXZlbnRDZmcuT0tFeHByZXNzaW9uIHx8IGV2YWwoZG9tRXZlbnRDZmcuT0tFeHByZXNzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWxSQyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uID0gZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZhbFJDKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShudWxsLCA8VGFiMkJhY2tncm91bmRNZXNzYWdlPntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXZlbnRUeXBlOiBJbnRlcm5hbEV2ZW50VHlwZUVuLkRPTUV2ZW50LCBFdmVudFN1YnR5cGU6IGRvbUV2ZW50Q2ZnLkRPTUV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgRE9NRXZlbnQ6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoeyAuLi57IEV2ZW50Q29uZmlndXJhdGlvbklkOiBldmVudENvbmZpZ3VyYXRpb25JZCB9LCAuLi5kb21FdmVudCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7Ly8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSAhPSBcInN0cmluZ1wiICYmIGxldmVsKysgPiAxMDApIHJldHVybiBcIjw8cmVwbGFjZWQ+PlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBFeGNlcHRpb246IGV4Y2VwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfS5mKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgICAgIC8vPj4+Pj4+Pj4+PiBET00gTXV0YXRpb25cbiAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5NZXNzYWdlVHlwZSA9PSBDb250ZW50U2NyaXB0TWVzc2FnZVR5cGVFbi5TZXR1cERPTU11dGF0aW9uTGlzdG5lcnMpIHtcbiAgICAgICAgICAgIC8vINC/0L7QstC10YHQuNGC0Ywg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuSBcbiAgICAgICAgICAgIGxldCBtc2cgPSA8Q29udGVudFNjcmlwdE1lc3NhZ2VTZXR1cERPTU11dGF0aW9uTGlzdG5lcnM+bWVzc2FnZTtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9O1xuICAgICAgICAgICAgbXNnLkV2ZW50cy5mb3JFYWNoKChlOiBFdmVudENvbmZpZ3VyYXRpb25ET01NdXRhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkb21DaGFuZ2VFdmVudENmZyA9IDxFdmVudENvbmZpZ3VyYXRpb25ET01NdXRhdGlvbj5lO1xuXG4gICAgICAgICAgICAgICAgJChkb21DaGFuZ2VFdmVudENmZy5UYXJnZXRFbGVtZW50U2VsZWN0b3IgfHwgXCJib2R5XCIpLmVhY2goZnVuY3Rpb24gKGl4OiBudW1iZXIsIERPTUVsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2ID0geyAuLi5lIH07XG4gICAgICAgICAgICAgICAgICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGY6IGZ1bmN0aW9uIChtdXRhaW9uTGlzdDogeyB0eXBlOiBzdHJpbmcgfVtdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV2YWxSQzogYm9vbGVhbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhjZXB0aW9uOiBhbnkgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWxSQyA9ICFldi5PS0V4cHJlc3Npb24gfHwgZXZhbChldi5PS0V4cHJlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uID0gZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWxSQyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmFsUkMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobnVsbCwgPFRhYjJCYWNrZ3JvdW5kTWVzc2FnZT57IEV2ZW50VHlwZTogSW50ZXJuYWxFdmVudFR5cGVFbi5ET01NdXRhdGlvbiwgRXZlbnRTdWJ0eXBlOiBkb21DaGFuZ2VFdmVudENmZy5UYXJnZXRFbGVtZW50U2VsZWN0b3IsIEV4Y2VwdGlvbjogZXhjZXB0aW9uIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfS5mKS5vYnNlcnZlKERPTUVsLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuKTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyDQn9C+0LvRg9GH0LjRgtGMINC00LDQvdC90YvQtSDQviBsb2dpbiBzaWViZWwuINCU0LDQvdC90YvQtSDQt9Cw0L/QuNGB0YvQstCw0Y7RgtGB0Y8g0LIgdGFnPXNpZWJlbExvZ2luVGFnTmFtZVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmZ1bmN0aW9uIGdldFNpZWJlbEdvZ2luRGF0YShzaWViZWxMb2dpblRhZ05hbWU6IHN0cmluZywgc2llYmVsTG9naW5UYWdBdHRyOiBzdHJpbmcpIHtcbiAgICB2YXIgdzogYW55ID0gd2luZG93O1xuICAgIC8vZGVidWdnZXI7XG4gICAgdmFyIHJjOiBTaWViZWxMb2dpbkRhdGEgPSBudWxsO1xuICAgIHZhciBsb2dpbl9zdG9yYWdlX2tleSA9IHNpZWJlbExvZ2luVGFnTmFtZTsvLyBzdG9yYWdlIGtleSBpcyB0aGUgc2FtZVxuICAgXG4gICAgaWYgKCFyYykge1xuXG4gICAgICAgIGlmICh3LlNpZWJlbEFwcCAmJiB3LlNpZWJlbEFwcC5TX0FwcCAmJiB0eXBlb2YgKHcuU2llYmVsQXBwLlNfQXBwLkdldFByb2ZpbGVBdHRyKSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmMgPSB7XG4gICAgICAgICAgICAgICAgICAgIExvZ2luTmFtZTogdy5TaWViZWxBcHAuU19BcHAuR2V0UHJvZmlsZUF0dHIoXCJMb2dpbiBOYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWdpb246IHcuU2llYmVsQXBwLlNfQXBwLkdldFByb2ZpbGVBdHRyKFwiVlRCMjQgUmVnaW9uXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWdpb25Db2RlOiB3LlNpZWJlbEFwcC5TX0FwcC5HZXRQcm9maWxlQXR0cihcIlZUQjI0IFJlZ2lvbiBDb2RlXCIpLFxuICAgICAgICAgICAgICAgICAgICBCcmFuY2hJZDogdy5TaWViZWxBcHAuU19BcHAuR2V0UHJvZmlsZUF0dHIoXCJWVEIyNCBCSVMgQnJhbmNoIElkXCIpLFxuICAgICAgICAgICAgICAgICAgICBCcmFuY2hOYW1lOiB3LlNpZWJlbEFwcC5TX0FwcC5HZXRQcm9maWxlQXR0cihcIlZUQjI0IEJJUyBCcmFuY2ggTmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgRGl2aXNpb25Db2RlOiB3LlNpZWJlbEFwcC5TX0FwcC5HZXRQcm9maWxlQXR0cihcIlZUQjI0IEJJUyBEaXZpc2lvbiBDb2RlXCIpLFxuICAgICAgICAgICAgICAgICAgICBEaXZpc2lvbk5hbWU6IHcuU2llYmVsQXBwLlNfQXBwLkdldFByb2ZpbGVBdHRyKFwiVlRCMjQgUHJpbWFyeSBEaXZpc2lvbiBOYW1lXCIpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VbbG9naW5fc3RvcmFnZV9rZXldID0gSlNPTi5zdHJpbmdpZnkocmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmMgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIHRyeSB0byBnZXQgZnJvbSBzdG9yYWdlXG4gICAgICAgICAgICAgICAgdmFyIHN6U3RvcmFnZTogc3RyaW5nID0gbG9jYWxTdG9yYWdlW2xvZ2luX3N0b3JhZ2Vfa2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoc3pTdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByYyA9IEpTT04ucGFyc2Uoc3pTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkgeyByYyA9IG51bGw7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmMgPSBudWxsO1xuICAgIH1cblxuICAgIGxldCBlbHMgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2llYmVsTG9naW5UYWdOYW1lKTsvLyDQvNC+0LbQtdGCLCDRjdC70LXQvNC10L3RgiDRg9C20LUg0LXRgdGC0YxcbiAgICBsZXQgb3VyRWw6IEVsZW1lbnQ7XG4gICAgaWYgKCFlbHMubGVuZ3RoKSB7XG4gICAgICAgIG91ckVsID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoc2llYmVsTG9naW5UYWdOYW1lKTtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3VyRWwpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgb3VyRWwgPSBlbHNbMF07XG4gICAgfVxuICAgIG91ckVsLnNldEF0dHJpYnV0ZShzaWViZWxMb2dpblRhZ0F0dHIsIEpTT04uc3RyaW5naWZ5KHJjKSk7Ly8g0LIgaHRtbCDQtdC70LXQvNC10L3RgiDQt9Cw0L/QuNGB0LDRgtGMINCy0YHQtSDQv9Cw0YDQsNC80LXRgtGA0YsgbG9naW5cbiAgICBcbn1cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coXCJ3YXRjaG1hbkNvbnRlbnQuIGRvYy5yZWFkeSgpXCIpXG4gICAgdmFyIHNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjci50ZXh0ID0gXCIoXCIgKyBnZXRTaWViZWxHb2dpbkRhdGEgKyBcIikoJ1wiICsgc2llYmVsTG9naW5UYWdOYW1lICsgXCInLCAnXCIgKyBzaWViZWxMb2dpblRhZ0F0dHIgKyBcIicpO1wiO1xuICAgIC8vc2NyLnNyYyA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKFwiZ2V0U2llYmVsTG9naW5EYXRhLmpzXCIpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyKVxuXG4gICAgLy8g0J/QvtC70YPRh9C40LvQvtGB0Ywg0LvQuCDRgSBsb2dpbiwg0LzRiyDQvdC1INC30L3QsNC10LwsINC90L4g0L/QvtC/0YDQvtCx0YPQtdC8INCy0LfRj9GC0Ywg0LjQtyDQutC10YjQsFxuICAgIHZhciBsb2dpbkRhdGEgPSBsb2NhbFN0b3JhZ2Vbc2llYmVsTG9naW5UYWdOYW1lXTtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2dpbkRhdGEgPSBKU09OLnBhcnNlKGxvZ2luRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHsgbG9naW5EYXRhID0gbnVsbDsgfVxuICAgIH1cblxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKG51bGwsIDxUYWIyQmFja2dyb3VuZE1lc3NhZ2U+eyBFdmVudFR5cGU6IEludGVybmFsRXZlbnRUeXBlRW4uQ2xpZW50RE9NUmVhZHksIFBhcmFtOiBsb2dpbkRhdGEgfSk7XG4gICAgcmV0dXJuO1xuXG59KTsiXSwic291cmNlUm9vdCI6IiJ9