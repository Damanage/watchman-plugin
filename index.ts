//------------ <reference path="lib/angular.min.js" />
angular.module(browserApplicationName, []).controller("index", ["$scope", "$http", function ($scope, $http) {
    var $ctl = $scope;
    $ctl.eventList = [];
    $ctl.operationsConfig = { Operations: [] };
    $ctl.EventTypeEn = EventTypeEn;

    chrome.runtime.onMessage.addListener(
        function (msg: BrowserEvent, sender: any, sendResponse: (any) => void): void {
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
        }
    );
    // запросить события
    chrome.runtime.sendMessage(<Tab2BackgroundMessage>{ EventType: InternalEventTypeEn.BrowserRequestEventsAndConfig }, function (resp: any) {
        if (resp.collectedEvents && resp.collectedEvents.length) {
            $ctl.eventList = resp.collectedEvents;
            $ctl.$apply();
        }
    });
    enum Tabs { config, events }
    $ctl.Tabs = Tabs;
    $ctl.tabActive = Tabs.config;

    // Event subtype for display
    $ctl.getEventSubtype = function (ev: EventConfiguration): string{
        if (!ev) return "";
        switch (ev.EventType) {
            case EventTypeEn.DocumentNavigation:
                return (<any>ev).URLPattern;
            case EventTypeEn.DOMEvent:
                return (<any>ev).DOMEvent;
            case EventTypeEn.DOMMutation:
                return "Target element:" + (<any>ev).TargetElementSelector
                    + " Expression:" + (<any>ev).OKExpression;
            case EventTypeEn.AjaxRequest:
                return "Type: " + AjaxRequestResponse[(<any>ev).RequestResponse]
                    + " TestTarget:" + AjaxTestTargetTypeEn[(<any>ev).TestTarget]
                    + " RegExp:" + (<any>ev).OKRegexp;
            default:
                return "";
        }
    }

}]);