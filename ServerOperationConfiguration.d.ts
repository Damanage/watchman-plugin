// Конфигурация операции, как она приходит от сервера
declare interface ServerOperationConfiguration {
         id : string;
         application_name : string;
         app_business_name : string;
         operation_name : string;
         browser_link : string;
         start_type : string;
         start_subtype : string;
         start_monitor : string;
         start_regexp : string;
         start_events_count : number;
         start_cond : string;
         stop_type : string;
         stop_subtype : string;
         stop_regexp : string;
         stop_monitor : string;
         stop_cond : string;
         stop_events_count: number;
         target_sla: number;//целевое время ответа
         date_from : Date;
         date_to : Date;
         process_name : string;
         app_url : string;
         filialList : string[];
         tpList : string[];
        regionList: string[];
        active: boolean;
         version: number;

}