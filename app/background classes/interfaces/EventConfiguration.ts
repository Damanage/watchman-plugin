import InternalEvent from "./InternalEvent"
import EventTypeEn from "../variables/EventTypeEn"
// Базовое описание конфигурации события 
export default interface EventConfiguration {
    EventType: EventTypeEn;
    RepeatCount: number;
    EventConfigurationId: number;
    TestMatchInternal(iev: InternalEvent, requestId: string): Promise<boolean>;
    CnjEndEvent?: EventConfiguration;// только внутреннее использование
}