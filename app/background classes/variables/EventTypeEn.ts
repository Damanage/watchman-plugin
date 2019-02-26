// Конфигурация: тип события начала/окончания
enum EventTypeEn {
    DocumentNavigation,     // открытие документа
    AjaxRequest,            // Запрос ajax
    AjaxRequestComplete,    // Завершение запроса ajax
    DOMEvent,               // событие на странице (a la click, dblclick)
    DOMMutation             // изменение в структуре или атрибутах дерева DOM
}
export default EventTypeEn