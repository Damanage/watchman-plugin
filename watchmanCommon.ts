// Конфигурация: тип события начала/окончания
enum EventTypeEn {
    DocumentNavigation,     // открытие документа
    AjaxRequest,            // Запрос ajax
    AjaxRequestComplete,    // Завершение запроса ajax
    DOMEvent,               // событие на странице (a la click, dblclick)
    DOMMutation             // изменение в структуре или атрибутах дерева DOM
}


// Базовое описание конфигурации события 
interface EventConfiguration {
    EventType: EventTypeEn;
    RepeatCount: number;
    EventConfigurationId: number;
    TestMatchInternal(iev: InternalEvent, requestId: string): Promise<boolean>;
    CnjEndEvent?: EventConfiguration;// только внутреннее использование
}

// Типы сообщений background -> tab
enum ContentScriptMessageTypeEn {
    Eval,
    SetupDOMEventListners,
    SetupDOMMutationListners,
    GetSiebelLoginData
}


// Ajax response or request
enum AjaxRequestResponse {
    Request,
    Response
}

// Предмет теста условия для ajax 
enum AjaxTestTargetTypeEn {
    URL,
    Header,
    Body,
    HeaderBody,
    CustomExpression
}

// типы сообщений, обрабатываемых внутри routing
enum InternalEventTypeEn {
    Network,
    ClientDOMReady,
    DOMEvent,
    DOMMutation,
    SiebelLoginData,
    BrowserRequestEventsAndConfig
}


// Сообщение от tab -> background
interface Tab2BackgroundMessage {
    EventType: InternalEventTypeEn,
    EventSubtype: string,
    DOMEvent?: string,
    Exception: any,
    Param?: any
}

interface ContentScriptMessage {
    MessageType: ContentScriptMessageTypeEn;
}

class ContentScriptMessageEval implements ContentScriptMessage {
    MessageType: ContentScriptMessageTypeEn;
    constructor(public Context: any, public Expression: any) {
        this.MessageType = ContentScriptMessageTypeEn.Eval;
    }
}

class ContentScriptMessageSetupDOMListners implements ContentScriptMessage
{
    MessageType: ContentScriptMessageTypeEn = ContentScriptMessageTypeEn.SetupDOMEventListners;
    constructor(public Events: EventConfiguration[]) {
    }
}

class ContentScriptMessageSetupDOMMutationListners implements ContentScriptMessage {
    MessageType: ContentScriptMessageTypeEn = ContentScriptMessageTypeEn.SetupDOMMutationListners;
    constructor(public Events: EventConfiguration[]) {
    }
}

class ContentScriptMessageGetSiebelLoginData implements ContentScriptMessage {
    MessageType: ContentScriptMessageTypeEn = ContentScriptMessageTypeEn.GetSiebelLoginData;
}

const siebelLoginTagName = "siebel-login-data";
const siebelLoginTagAttr = "data-login";

const browserApplicationName = "Watchman-angular-app";

// события, посылаемые в browser_action script
enum BrowserEventTypeEn {
    EventFired,
    ConfigLoaded

}
class BrowserEvent {
    constructor(public eventType: BrowserEventTypeEn, public eventParam?: any) { }
}

//------- Данные о login Siebel
interface SiebelLoginData
{
    LoginName: string;
    Region: string;// -> region
    RegionCode: string; 
    BranchId: string; // -> filial
    BranchName: string;
    DivisionCode: string; // -> TP code
    DivisionName: string; // -> TP name
};
//------Данные конфигурации
interface ConfigurationData {
    config: { versionNo: number, configJson: string };
    operations: any[];
}

//--- debug networkEvent.responseReceived.timing
interface RequestReceivedTiming {
    connectStart: number;//Started connecting to the remote host.
    connectEnd: number;//Connected to the remote host.
    dnsStart: number;//Started DNS address resolve.
    dnsEnd: number;//Finished DNS address resolve.
    proxyEnd: number;
    proxyStart: number;
    pushEnd: number;
    pushStart: number;
    receiveHeadersEnd: number;//Finished receiving response headers.
    requestTime: number;//Timing's requestTime is a baseline in seconds, while the other numbers are ticks in milliseconds relatively to this requestTime.
    sendEnd: number;//Finished sending request.
    sendStart: number;//Started sending request.
    sslEnd: number;//Finished SSL handshake.
    sslStart: number;//Started SSL handshake.
    workerReady: number;
    workerStart: number;
    //wait: timing.receiveHeadersEnd - timing.sendEnd
}