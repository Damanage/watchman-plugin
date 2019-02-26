import Metrics from "./Metrics";
// Данные мониторинга операции. Отправляется на сервер as is
export default interface MonData extends Metrics {
    OperationCode: string,      // ид операции из конфигурации
    Start: Date,                // дата начала операции
    End: Date,                  // дата завершения операции
    Duration: number,           // длительность операции в мс
    LoadSize: number,           // суммарная длина принятых с сервера данных
    RequestNum: number,         // количество запросов за операцию
    RequestNumFailed: number,   // количество запросов, завершившихся с ошибкой
    RequestNumFromCache: number // количество запросов, загруженных из cache
    ServerTime: number;         // время ожидания запроса
    Loading: number;
    Painting: number;
    Idle: number;

}