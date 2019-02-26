import EventConfiguration from "./interfaces/EventConfiguration"

// Типы сообщений background -> tab
export enum ContentScriptMessageTypeEn {
    Eval,
    SetupDOMEventListners,
    SetupDOMMutationListners,
    GetSiebelLoginData
}

export interface ContentScriptMessage {
    MessageType: ContentScriptMessageTypeEn;
}

export class ContentScriptMessageEval implements ContentScriptMessage {
    MessageType: ContentScriptMessageTypeEn;
    constructor(public Context: any, public Expression: any) {
        this.MessageType = ContentScriptMessageTypeEn.Eval;
    }
}

export class ContentScriptMessageSetupDOMListners implements ContentScriptMessage
{
    MessageType: ContentScriptMessageTypeEn = ContentScriptMessageTypeEn.SetupDOMEventListners;
    constructor(public Events: EventConfiguration[]) {
    }
}

export class ContentScriptMessageSetupDOMMutationListners implements ContentScriptMessage {
    MessageType: ContentScriptMessageTypeEn = ContentScriptMessageTypeEn.SetupDOMMutationListners;
    constructor(public Events: EventConfiguration[]) {
    }
}

export class ContentScriptMessageGetSiebelLoginData implements ContentScriptMessage {
    MessageType: ContentScriptMessageTypeEn = ContentScriptMessageTypeEn.GetSiebelLoginData;
}