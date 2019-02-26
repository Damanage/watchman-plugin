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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/index.ts");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./app/index.ts":
/*!**********************!*\
  !*** ./app/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="watchmanContent.ts" />
//Lib
//import angular from "./Lib/angular.min.js"
//Variables
const common_1 = __webpack_require__(/*! ./background classes/variables/common */ "./app/background classes/variables/common.ts");
const BrowserEventTypeEn_1 = __webpack_require__(/*! ./background classes/variables/BrowserEventTypeEn */ "./app/background classes/variables/BrowserEventTypeEn.ts");
const EventTypeEn_1 = __webpack_require__(/*! ./background classes/variables/EventTypeEn */ "./app/background classes/variables/EventTypeEn.ts");
const InternalEventTypeEn_1 = __webpack_require__(/*! ./background classes/variables/InternalEventTypeEn */ "./app/background classes/variables/InternalEventTypeEn.ts");
const AjaxRequests_1 = __webpack_require__(/*! ./background classes/variables/AjaxRequests */ "./app/background classes/variables/AjaxRequests.ts");
angular.module(common_1.browserApplicationName, []).controller("index", ["$scope", "$http", function ($scope, $http) {
        var $ctl = $scope;
        $ctl.eventList = [];
        $ctl.operationsConfig = { Operations: [] };
        $ctl.EventTypeEn = EventTypeEn_1.default;
        chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
            // Произошло событие - перерисовать события
            if (msg.eventType == BrowserEventTypeEn_1.default.EventFired) {
                $ctl.eventList = msg.eventParam;
                $ctl.$apply();
            }
            // Обновилась конфигурация - перерисовать
            else if (msg.eventType == BrowserEventTypeEn_1.default.ConfigLoaded) {
                $ctl.operationsConfig = msg.eventParam;
                $ctl.$apply();
            }
        });
        // запросить события
        chrome.runtime.sendMessage({ EventType: InternalEventTypeEn_1.default.BrowserRequestEventsAndConfig }, function (resp) {
            if (resp.collectedEvents && resp.collectedEvents.length) {
                $ctl.eventList = resp.collectedEvents;
                $ctl.$apply();
            }
        });
        let Tabs;
        (function (Tabs) {
            Tabs[Tabs["config"] = 0] = "config";
            Tabs[Tabs["events"] = 1] = "events";
        })(Tabs || (Tabs = {}));
        $ctl.Tabs = Tabs;
        $ctl.tabActive = Tabs.config;
        // Event subtype for display
        $ctl.getEventSubtype = function (ev) {
            if (!ev)
                return "";
            switch (ev.EventType) {
                case EventTypeEn_1.default.DocumentNavigation:
                    return ev.URLPattern;
                case EventTypeEn_1.default.DOMEvent:
                    return ev.DOMEvent;
                case EventTypeEn_1.default.DOMMutation:
                    return "Target element:" + ev.TargetElementSelector
                        + " Expression:" + ev.OKExpression;
                case EventTypeEn_1.default.AjaxRequest:
                    return "Type: " + AjaxRequests_1.AjaxRequestResponse[ev.RequestResponse]
                        + " TestTarget:" + AjaxRequests_1.AjaxTestTargetTypeEn[ev.TestTarget]
                        + " RegExp:" + ev.OKRegexp;
                default:
                    return "";
            }
        };
    }]);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvQWpheFJlcXVlc3RzLnRzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL0Jyb3dzZXJFdmVudFR5cGVFbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9FdmVudFR5cGVFbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9JbnRlcm5hbEV2ZW50VHlwZUVuLnRzIiwid2VicGFjazovLy8uL2FwcC9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL2NvbW1vbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7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MUM7b0JBQ0ksT0FBTyxFQUFFLENBQUM7YUFDakI7UUFDTCxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9pbmRleC50c1wiKTtcbiIsIi8vIEFqYXggcmVzcG9uc2Ugb3IgcmVxdWVzdFxuZXhwb3J0IGVudW0gQWpheFJlcXVlc3RSZXNwb25zZSB7XG4gICAgUmVxdWVzdCxcbiAgICBSZXNwb25zZVxufVxuXG4vLyDQn9GA0LXQtNC80LXRgiDRgtC10YHRgtCwINGD0YHQu9C+0LLQuNGPINC00LvRjyBhamF4IFxuZXhwb3J0IGVudW0gQWpheFRlc3RUYXJnZXRUeXBlRW4ge1xuICAgIFVSTCxcbiAgICBIZWFkZXIsXG4gICAgQm9keSxcbiAgICBIZWFkZXJCb2R5LFxuICAgIEN1c3RvbUV4cHJlc3Npb25cbn0iLCIvLyDRgdC+0LHRi9GC0LjRjywg0L/QvtGB0YvQu9Cw0LXQvNGL0LUg0LIgYnJvd3Nlcl9hY3Rpb24gc2NyaXB0XG5lbnVtIEJyb3dzZXJFdmVudFR5cGVFbiB7XG4gICAgRXZlbnRGaXJlZCxcbiAgICBDb25maWdMb2FkZWRcblxufVxuZXhwb3J0IGRlZmF1bHQgQnJvd3NlckV2ZW50VHlwZUVuIiwiLy8g0JrQvtC90YTQuNCz0YPRgNCw0YbQuNGPOiDRgtC40L8g0YHQvtCx0YvRgtC40Y8g0L3QsNGH0LDQu9CwL9C+0LrQvtC90YfQsNC90LjRj1xuZW51bSBFdmVudFR5cGVFbiB7XG4gICAgRG9jdW1lbnROYXZpZ2F0aW9uLCAgICAgLy8g0L7RgtC60YDRi9GC0LjQtSDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICBBamF4UmVxdWVzdCwgICAgICAgICAgICAvLyDQl9Cw0L/RgNC+0YEgYWpheFxuICAgIEFqYXhSZXF1ZXN0Q29tcGxldGUsICAgIC8vINCX0LDQstC10YDRiNC10L3QuNC1INC30LDQv9GA0L7RgdCwIGFqYXhcbiAgICBET01FdmVudCwgICAgICAgICAgICAgICAvLyDRgdC+0LHRi9GC0LjQtSDQvdCwINGB0YLRgNCw0L3QuNGG0LUgKGEgbGEgY2xpY2ssIGRibGNsaWNrKVxuICAgIERPTU11dGF0aW9uICAgICAgICAgICAgIC8vINC40LfQvNC10L3QtdC90LjQtSDQsiDRgdGC0YDRg9C60YLRg9GA0LUg0LjQu9C4INCw0YLRgNC40LHRg9GC0LDRhSDQtNC10YDQtdCy0LAgRE9NXG59XG5leHBvcnQgZGVmYXVsdCBFdmVudFR5cGVFbiIsIi8vINGC0LjQv9GLINGB0L7QvtCx0YnQtdC90LjQuSwg0L7QsdGA0LDQsdCw0YLRi9Cy0LDQtdC80YvRhSDQstC90YPRgtGA0Lggcm91dGluZ1xuZW51bSBJbnRlcm5hbEV2ZW50VHlwZUVuIHtcbiAgICBOZXR3b3JrLFxuICAgIENsaWVudERPTVJlYWR5LFxuICAgIERPTUV2ZW50LFxuICAgIERPTU11dGF0aW9uLFxuICAgIFNpZWJlbExvZ2luRGF0YSxcbiAgICBCcm93c2VyUmVxdWVzdEV2ZW50c0FuZENvbmZpZ1xufVxuZXhwb3J0IGRlZmF1bHQgSW50ZXJuYWxFdmVudFR5cGVFbjsiLCJleHBvcnQgY29uc3Qgc2llYmVsTG9naW5UYWdOYW1lID0gXCJzaWViZWwtbG9naW4tZGF0YVwiO1xuZXhwb3J0IGNvbnN0IHNpZWJlbExvZ2luVGFnQXR0ciA9IFwiZGF0YS1sb2dpblwiO1xuZXhwb3J0IGNvbnN0IGJyb3dzZXJBcHBsaWNhdGlvbk5hbWUgPSBcIldhdGNobWFuLWFuZ3VsYXItYXBwXCI7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIndhdGNobWFuQ29udGVudC50c1wiIC8+XG4vL0xpYlxuLy9pbXBvcnQgYW5ndWxhciBmcm9tIFwiLi9MaWIvYW5ndWxhci5taW4uanNcIlxuLy9WYXJpYWJsZXNcbmltcG9ydCB7YnJvd3NlckFwcGxpY2F0aW9uTmFtZX0gZnJvbSBcIi4vYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9jb21tb25cIlxuaW1wb3J0IEJyb3dzZXJFdmVudFR5cGVFbiBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL0Jyb3dzZXJFdmVudFR5cGVFblwiXG5pbXBvcnQgRXZlbnRUeXBlRW4gZnJvbSBcIi4vYmFja2dyb3VuZCBjbGFzc2VzL3ZhcmlhYmxlcy9FdmVudFR5cGVFblwiXG5pbXBvcnQgSW50ZXJuYWxFdmVudFR5cGVFbiBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvdmFyaWFibGVzL0ludGVybmFsRXZlbnRUeXBlRW5cIlxuLy9JbnRlcmZhY2VzXG5pbXBvcnQgVGFiMkJhY2tncm91bmRNZXNzYWdlIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy9pbnRlcmZhY2VzL1RhYjJCYWNrZ3JvdW5kTWVzc2FnZVwiXG5pbXBvcnQgRXZlbnRDb25maWd1cmF0aW9uIGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy9pbnRlcmZhY2VzL0V2ZW50Q29uZmlndXJhdGlvblwiXG5pbXBvcnQgeyBBamF4UmVxdWVzdFJlc3BvbnNlLCBBamF4VGVzdFRhcmdldFR5cGVFbiB9IGZyb20gXCIuL2JhY2tncm91bmQgY2xhc3Nlcy92YXJpYWJsZXMvQWpheFJlcXVlc3RzXCJcbi8vQ2xhc3Nlc1xuaW1wb3J0IEJyb3dzZXJFdmVudCBmcm9tIFwiLi9iYWNrZ3JvdW5kIGNsYXNzZXMvQnJvd3NlckV2ZW50XCJcblxuXG5hbmd1bGFyLm1vZHVsZShicm93c2VyQXBwbGljYXRpb25OYW1lLCBbXSkuY29udHJvbGxlcihcImluZGV4XCIsIFtcIiRzY29wZVwiLCBcIiRodHRwXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwKSB7XG4gICAgdmFyICRjdGwgPSAkc2NvcGU7XG4gICAgJGN0bC5ldmVudExpc3QgPSBbXTtcbiAgICAkY3RsLm9wZXJhdGlvbnNDb25maWcgPSB7IE9wZXJhdGlvbnM6IFtdIH07XG4gICAgJGN0bC5FdmVudFR5cGVFbiA9IEV2ZW50VHlwZUVuO1xuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcbiAgICAgICAgZnVuY3Rpb24gKG1zZzogQnJvd3NlckV2ZW50LCBzZW5kZXI6IGFueSwgc2VuZFJlc3BvbnNlOiAoYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgICAgICAvLyDQn9GA0L7QuNC30L7RiNC70L4g0YHQvtCx0YvRgtC40LUgLSDQv9C10YDQtdGA0LjRgdC+0LLQsNGC0Ywg0YHQvtCx0YvRgtC40Y9cbiAgICAgICAgICAgIGlmIChtc2cuZXZlbnRUeXBlID09IEJyb3dzZXJFdmVudFR5cGVFbi5FdmVudEZpcmVkKSB7XG4gICAgICAgICAgICAgICAgJGN0bC5ldmVudExpc3QgPSBtc2cuZXZlbnRQYXJhbTtcbiAgICAgICAgICAgICAgICAkY3RsLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g0J7QsdC90L7QstC40LvQsNGB0Ywg0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGPIC0g0L/QtdGA0LXRgNC40YHQvtCy0LDRgtGMXG4gICAgICAgICAgICBlbHNlIGlmIChtc2cuZXZlbnRUeXBlID09IEJyb3dzZXJFdmVudFR5cGVFbi5Db25maWdMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAkY3RsLm9wZXJhdGlvbnNDb25maWcgPSBtc2cuZXZlbnRQYXJhbTtcbiAgICAgICAgICAgICAgICAkY3RsLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbiAgICAvLyDQt9Cw0L/RgNC+0YHQuNGC0Ywg0YHQvtCx0YvRgtC40Y9cbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSg8VGFiMkJhY2tncm91bmRNZXNzYWdlPnsgRXZlbnRUeXBlOiBJbnRlcm5hbEV2ZW50VHlwZUVuLkJyb3dzZXJSZXF1ZXN0RXZlbnRzQW5kQ29uZmlnIH0sIGZ1bmN0aW9uIChyZXNwOiBhbnkpIHtcbiAgICAgICAgaWYgKHJlc3AuY29sbGVjdGVkRXZlbnRzICYmIHJlc3AuY29sbGVjdGVkRXZlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgJGN0bC5ldmVudExpc3QgPSByZXNwLmNvbGxlY3RlZEV2ZW50cztcbiAgICAgICAgICAgICRjdGwuJGFwcGx5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBlbnVtIFRhYnMgeyBjb25maWcsIGV2ZW50cyB9XG4gICAgJGN0bC5UYWJzID0gVGFicztcbiAgICAkY3RsLnRhYkFjdGl2ZSA9IFRhYnMuY29uZmlnO1xuXG4gICAgLy8gRXZlbnQgc3VidHlwZSBmb3IgZGlzcGxheVxuICAgICRjdGwuZ2V0RXZlbnRTdWJ0eXBlID0gZnVuY3Rpb24gKGV2OiBFdmVudENvbmZpZ3VyYXRpb24pOiBzdHJpbmd7XG4gICAgICAgIGlmICghZXYpIHJldHVybiBcIlwiO1xuICAgICAgICBzd2l0Y2ggKGV2LkV2ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVFbi5Eb2N1bWVudE5hdmlnYXRpb246XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8YW55PmV2KS5VUkxQYXR0ZXJuO1xuICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVFbi5ET01FdmVudDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxhbnk+ZXYpLkRPTUV2ZW50O1xuICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVFbi5ET01NdXRhdGlvbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJUYXJnZXQgZWxlbWVudDpcIiArICg8YW55PmV2KS5UYXJnZXRFbGVtZW50U2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBFeHByZXNzaW9uOlwiICsgKDxhbnk+ZXYpLk9LRXhwcmVzc2lvbjtcbiAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlRW4uQWpheFJlcXVlc3Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiVHlwZTogXCIgKyBBamF4UmVxdWVzdFJlc3BvbnNlWyg8YW55PmV2KS5SZXF1ZXN0UmVzcG9uc2VdXG4gICAgICAgICAgICAgICAgICAgICsgXCIgVGVzdFRhcmdldDpcIiArIEFqYXhUZXN0VGFyZ2V0VHlwZUVuWyg8YW55PmV2KS5UZXN0VGFyZ2V0XVxuICAgICAgICAgICAgICAgICAgICArIFwiIFJlZ0V4cDpcIiArICg8YW55PmV2KS5PS1JlZ2V4cDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbn1dKTsiXSwic291cmNlUm9vdCI6IiJ9