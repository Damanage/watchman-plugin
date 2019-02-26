"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Типы сообщений background -> tab
var ContentScriptMessageTypeEn;
(function (ContentScriptMessageTypeEn) {
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["Eval"] = 0] = "Eval";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["SetupDOMEventListners"] = 1] = "SetupDOMEventListners";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["SetupDOMMutationListners"] = 2] = "SetupDOMMutationListners";
    ContentScriptMessageTypeEn[ContentScriptMessageTypeEn["GetSiebelLoginData"] = 3] = "GetSiebelLoginData";
})(ContentScriptMessageTypeEn = exports.ContentScriptMessageTypeEn || (exports.ContentScriptMessageTypeEn = {}));
class ContentScriptMessageEval {
    constructor(Context, Expression) {
        this.Context = Context;
        this.Expression = Expression;
        this.MessageType = ContentScriptMessageTypeEn.Eval;
    }
}
exports.ContentScriptMessageEval = ContentScriptMessageEval;
class ContentScriptMessageSetupDOMListners {
    constructor(Events) {
        this.Events = Events;
        this.MessageType = ContentScriptMessageTypeEn.SetupDOMEventListners;
    }
}
exports.ContentScriptMessageSetupDOMListners = ContentScriptMessageSetupDOMListners;
class ContentScriptMessageSetupDOMMutationListners {
    constructor(Events) {
        this.Events = Events;
        this.MessageType = ContentScriptMessageTypeEn.SetupDOMMutationListners;
    }
}
exports.ContentScriptMessageSetupDOMMutationListners = ContentScriptMessageSetupDOMMutationListners;
class ContentScriptMessageGetSiebelLoginData {
    constructor() {
        this.MessageType = ContentScriptMessageTypeEn.GetSiebelLoginData;
    }
}
exports.ContentScriptMessageGetSiebelLoginData = ContentScriptMessageGetSiebelLoginData;
//# sourceMappingURL=ContentScriptMessage.js.map