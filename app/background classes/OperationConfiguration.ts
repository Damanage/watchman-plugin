// Конфигурация составного события
import SiebelLoginDataFilter from "./interfaces/SiebelLoginDataFilter"
import EventConfiguration from "./interfaces/EventConfiguration"
export default class OperationConfiguration {
    public Id: string;
    public OperationName: string;               // имя операции
    public URLPattern: string;                  // regex документа
    public IsActive: boolean;                   // активна
    public StartEvent: EventConfiguration;      // описание события начала
    public EndEvent?: EventConfiguration;       // описание события окончания
    public EffectiveDateFrom?: Date;            // дата начала мониторинга
    public EffectiveDateTo?: Date;              // дата окончания мониторинга
    public SiebelLoginDataFilter: SiebelLoginDataFilter;    // фильтр на SiebelLoginData. Если параметр пропущен, он не проверяется
}