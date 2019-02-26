"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ajax response or request
var AjaxRequestResponse;
(function (AjaxRequestResponse) {
    AjaxRequestResponse[AjaxRequestResponse["Request"] = 0] = "Request";
    AjaxRequestResponse[AjaxRequestResponse["Response"] = 1] = "Response";
})(AjaxRequestResponse = exports.AjaxRequestResponse || (exports.AjaxRequestResponse = {}));
// Предмет теста условия для ajax 
var AjaxTestTargetTypeEn;
(function (AjaxTestTargetTypeEn) {
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["URL"] = 0] = "URL";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["Header"] = 1] = "Header";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["Body"] = 2] = "Body";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["HeaderBody"] = 3] = "HeaderBody";
    AjaxTestTargetTypeEn[AjaxTestTargetTypeEn["CustomExpression"] = 4] = "CustomExpression";
})(AjaxTestTargetTypeEn = exports.AjaxTestTargetTypeEn || (exports.AjaxTestTargetTypeEn = {}));
//# sourceMappingURL=AjaxRequests.js.map