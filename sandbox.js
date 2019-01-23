"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("./Common");
chrome.runtime.onMessage.addEventListner(function (message, sender, sendResponse) {
    //if (message.MessageTypeId == ContentScriptMessageTypeIdEn.EvalExpression)
    if (message instanceof Common_1.ContentScriptMessageEval) {
        // выполнить eval в context
        try {
            eval(message.Expression);
        }
        catch (ex) {
        }
    }
});
//# sourceMappingURL=sandbox.js.map