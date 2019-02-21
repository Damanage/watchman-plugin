// Конфигурация: тип события начала/окончания
var EventTypeEn;
(function (EventTypeEn) {
    EventTypeEn[EventTypeEn["DocumentNavigation"] = 0] = "DocumentNavigation";
    EventTypeEn[EventTypeEn["AjaxRequest"] = 1] = "AjaxRequest";
    EventTypeEn[EventTypeEn["AjaxRequestComplete"] = 2] = "AjaxRequestComplete";
    EventTypeEn[EventTypeEn["DOMEvent"] = 3] = "DOMEvent";
    EventTypeEn[EventTypeEn["DOMMutation"] = 4] = "DOMMutation"; // изменение в структуре или атрибутах дерева DOM
})(EventTypeEn || (EventTypeEn = {}));
// Типы сообщений background -> tab
var ContentScriptMessageTypeEn;
(function (ContentScriptMessageTypeEn) {
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["Eval"] = 0] = "Eval";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["SetupDOMEventListners"] = 1] = "SetupDOMEventListners";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["SetupDOMMutationListners"] = 2] = "SetupDOMMutationListners";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["GetSiebelLoginData"] = 3] = "GetSiebelLoginData";
})(ContentScriptMessageTypeEn || (ContentScriptMessageTypeEn = {}));
// Ajax response or request
var AjaxRequestResponse;
(function (AjaxRequestResponse) {
    AjaxRequestResponse[AjaxRequestResponse["Request"] = 0] = "Request";
    AjaxRequestResponse[AjaxRequestResponse["Response"] = 1] = "Response";
})(AjaxRequestResponse || (AjaxRequestResponse = {}));
// Предмет теста условия для ajax 
var AjaxTestTargetTypeEn;
(function (AjaxTestTargetTypeEn) {
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["URL"] = 0] = "URL";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["Header"] = 1] = "Header";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["Body"] = 2] = "Body";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["HeaderBody"] = 3] = "HeaderBody";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["CustomExpression"] = 4] = "CustomExpression";
})(AjaxTestTargetTypeEn || (AjaxTestTargetTypeEn = {}));
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
var ContentScriptMessageEval = /** @class */ (function () {
    function ContentScriptMessageEval(Context, Expression) {
        this.Context = Context;
        this.Expression = Expression;
        this.MessageType = ContentScriptMessageTypeEn.Eval;
    }
    return ContentScriptMessageEval;
}());
var ContentScriptMessageSetupDOMListners = /** @class */ (function () {
    function ContentScriptMessageSetupDOMListners(Events) {
        this.Events = Events;
        this.MessageType = ContentScriptMessageTypeEn.SetupDOMEventListners;
    }
    return ContentScriptMessageSetupDOMListners;
}());
var ContentScriptMessageSetupDOMMutationListners = /** @class */ (function () {
    function ContentScriptMessageSetupDOMMutationListners(Events) {
        this.Events = Events;
        this.MessageType = ContentScriptMessageTypeEn.SetupDOMMutationListners;
    }
    return ContentScriptMessageSetupDOMMutationListners;
}());
var ContentScriptMessageGetSiebelLoginData = /** @class */ (function () {
    function ContentScriptMessageGetSiebelLoginData() {
        this.MessageType = ContentScriptMessageTypeEn.GetSiebelLoginData;
    }
    return ContentScriptMessageGetSiebelLoginData;
}());
var siebelLoginTagName = "siebel-login-data";
var siebelLoginTagAttr = "data-login";
var browserApplicationName = "Watchman-angular-app";
// события, посылаемые в browser_action script
var BrowserEventTypeEn;
(function (BrowserEventTypeEn) {
    BrowserEventTypeEn[BrowserEventTypeEn["EventFired"] = 0] = "EventFired";
    BrowserEventTypeEn[BrowserEventTypeEn["ConfigLoaded"] = 1] = "ConfigLoaded";
})(BrowserEventTypeEn || (BrowserEventTypeEn = {}));
var BrowserEvent = /** @class */ (function () {
    function BrowserEvent(eventType, eventParam) {
        this.eventType = eventType;
        this.eventParam = eventParam;
    }
    return BrowserEvent;
}());
;
//# sourceMappingURL=watchmanCommon.js.map