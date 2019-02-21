//------------ <reference path="lib/angular.min.js" />
angular.module(browserApplicationName, []).controller("index", ["$scope", "$http", function ($scope, $http) {
        var $ctl = $scope;
        $ctl.eventList = [];
        $ctl.operationsConfig = { Operations: [] };
        $ctl.EventTypeEn = EventTypeEn;
        chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
            // Произошло событие - перерисовать события
            if (msg.eventType == BrowserEventTypeEn.EventFired) {
                $ctl.eventList = msg.eventParam;
                $ctl.$apply();
            }
            // Обновилась конфигурация - перерисовать
            else if (msg.eventType == BrowserEventTypeEn.ConfigLoaded) {
                $ctl.operationsConfig = msg.eventParam;
                $ctl.$apply();
            }
        });
        // запросить события
        chrome.runtime.sendMessage({ EventType: InternalEventTypeEn.BrowserRequestEventsAndConfig }, function (resp) {
            if (resp.collectedEvents && resp.collectedEvents.length) {
                $ctl.eventList = resp.collectedEvents;
                $ctl.$apply();
            }
        });
        var Tabs;
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
                case EventTypeEn.DocumentNavigation:
                    return ev.URLPattern;
                case EventTypeEn.DOMEvent:
                    return ev.DOMEvent;
                case EventTypeEn.DOMMutation:
                    return "Target element:" + ev.TargetElementSelector
                        + " Expression:" + ev.OKExpression;
                case EventTypeEn.AjaxRequest:
                    return "Type: " + AjaxRequestResponse[ev.RequestResponse]
                        + " TestTarget:" + AjaxTestTargetTypeEn[ev.TestTarget]
                        + " RegExp:" + ev.OKRegexp;
                default:
                    return "";
            }
        };
    }]);
//# sourceMappingURL=index.js.map