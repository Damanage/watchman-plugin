import InternalEventTypeEn from "../variables/InternalEventTypeEn"
// Сообщение от tab -> background
export default interface Tab2BackgroundMessage {
    EventType: InternalEventTypeEn,
    EventSubtype: string,
    DOMEvent?: string,
    Exception: any,
    Param?: any
}