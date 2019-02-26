"use strict";
/// <reference path="watchmanContent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
//Variables
const common_1 = require("./background classes/variables/common");
const BrowserEventTypeEn_1 = require("./background classes/variables/BrowserEventTypeEn");
const EventTypeEn_1 = require("./background classes/variables/EventTypeEn");
const InternalEventTypeEn_1 = require("./background classes/variables/InternalEventTypeEn");
const AjaxRequests_1 = require("./background classes/variables/AjaxRequests");
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
//# sourceMappingURL=index.js.map