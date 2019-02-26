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
//# sourceMappingURL=InternalEventTypeEn.js.map