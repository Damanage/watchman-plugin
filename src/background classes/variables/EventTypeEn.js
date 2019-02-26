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
//# sourceMappingURL=EventTypeEn.js.map