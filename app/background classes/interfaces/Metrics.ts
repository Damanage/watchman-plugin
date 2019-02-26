export default interface Metrics {
    Timestamp: number,
    AudioHandlers: number,
    Documents: number,  //Number of documents in the page.
    Frames: number, //Number of frames in the page.
    JSEventListeners: number, //Number of events in the page.
    LayoutObjects: number,
    MediaKeySessions: number,
    MediaKeys: number,
    Nodes: number, // Number of DOM nodes in the page.
    Resources: number,
    ScriptPromises: number,
    PausableObjects: number,
    V8PerContextDatas: number,
    WorkerGlobalScopes: number,
    UACSSResources: number,
    LayoutCount: number, // Total number of full or partial page layout.
    RecalcStyleCount: number, //Total number of page style recalculations.
    LayoutDuration: number, //Combined durations of all page layouts.
    RecalcStyleDuration: number, //Combined duration of all page style recalculations.
    ScriptDuration: number, //Combined duration of JavaScript execution.
    TaskDuration: number, //Combined duration of all tasks performed by the browser.
    JSHeapUsedSize: number, // Used JavaScript heap size.
    JSHeapTotalSize: number, //Total JavaScript heap size.
    FirstMeaningfulPaint: number,
    DomContentLoaded: number,
    NavigationStart: number
}