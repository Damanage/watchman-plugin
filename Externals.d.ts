interface Chrome {
    tabs: any;
    runtime: any;
    debugger: any;
    extension: any;
    browserAction: any;
}



declare let chrome: Chrome;
declare let $: any;
declare let angular: any;

interface Array<T> {
    find(predicate: (search: T) => boolean): T;
    includes(search: T): boolean;
}