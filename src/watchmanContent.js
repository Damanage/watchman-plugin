"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="MonitoringBackground2.ts" />
const common_1 = require("./background classes/variables/common");
const ContentScriptMessage_1 = require("./background classes/ContentScriptMessage");
const InternalEventTypeEn_1 = require("./background classes/variables/InternalEventTypeEn");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //--------- сообщение получить данные login Siebel. Найти созданный нами элемент, взять оттуда данные и послать отдельным сообщением 
    if (message.MessageType == ContentScriptMessage_1.ContentScriptMessageTypeEn.GetSiebelLoginData) {
        $(document).ready(function () {
            let rc = null;
            // сначачала пытаемся взять из storage
            var storage = localStorage[common_1.siebelLoginTagAttr];
            if (storage) {
                try {
                    rc = JSON.parse(storage);
                }
                catch (e) {
                    rc = null;
                }
            }
            if (!rc) { // не получилось - берем из нашего HTML-элемента
                let els = document.getElementsByTagName(common_1.siebelLoginTagName);
                if (els.length) {
                    let el = els[0];
                    var data = el.getAttribute(common_1.siebelLoginTagAttr);
                    if (data) {
                        try {
                            rc = JSON.parse(data);
                        }
                        catch (ex) {
                            rc = null;
                        }
                    }
                }
            }
            chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn_1.default.SiebelLoginData, Param: rc });
        });
    }
    //------------- сообщение Eval - вычислить выражение в контексте страницы
    else if (message.MessageType == ContentScriptMessage_1.ContentScriptMessageTypeEn.Eval) {
        let rc = { response: null, exception: null };
        // выполнить eval в context
        try {
            let msg = message;
            // Строим контекст: все поля из контекста становятся переменными. В конец дописываем expression
            let ftext = "(function() {";
            for (let prop in msg.Context) {
                if (msg.Context.hasOwnProperty(prop)) {
                    ftext += "var " + prop + " = " + JSON.stringify(msg.Context[prop]) + ";";
                }
            }
            ftext += "return " + msg.Expression;
            ftext += ";})()";
            rc.response = eval(ftext);
        }
        catch (ex) {
            delete rc.response;
            rc.exception = ex;
        }
        sendResponse(rc);
    }
    //>>>>>>>>>> DOM Event
    else if (message.MessageType == ContentScriptMessage_1.ContentScriptMessageTypeEn.SetupDOMEventListners) {
        // повесить обработчики событий
        let msg = message;
        msg.Events.forEach((e) => {
            let domEventCfg = e;
            $(document).on(domEventCfg.DOMEvent, domEventCfg.TargetElementSelector, {
                f: function (domEvent) {
                    let evalRC;
                    let eventConfigurationId = domEventCfg.EventConfigurationId;
                    let exception;
                    try {
                        evalRC = !domEventCfg.OKExpression || eval(domEventCfg.OKExpression);
                    }
                    catch (ex) {
                        evalRC = true;
                        exception = ex;
                    }
                    if (evalRC) {
                        let level = 0;
                        chrome.runtime.sendMessage(null, {
                            EventType: InternalEventTypeEn_1.default.DOMEvent, EventSubtype: domEventCfg.DOMEvent,
                            DOMEvent: JSON.parse(JSON.stringify(Object.assign({ EventConfigurationId: eventConfigurationId }, domEvent), function (key, value) {
                                if (typeof (value) != "string" && level++ > 100)
                                    return "<<replaced>>";
                                return value;
                            })),
                            Exception: exception
                        });
                    }
                }
            }.f);
        });
    }
    //>>>>>>>>>> DOM Mutation
    else if (message.MessageType == ContentScriptMessage_1.ContentScriptMessageTypeEn.SetupDOMMutationListners) {
        // повесить обработчики событий 
        let msg = message;
        var config = { attributes: true, childList: true };
        msg.Events.forEach((e) => {
            let domChangeEventCfg = e;
            $(domChangeEventCfg.TargetElementSelector || "body").each(function (ix, DOMEl) {
                let ev = Object.assign({}, e);
                new MutationObserver({
                    f: function (mutaionList) {
                        let evalRC;
                        let exception = null;
                        try {
                            evalRC = !ev.OKExpression || eval(ev.OKExpression);
                        }
                        catch (ex) {
                            exception = ex;
                            evalRC = true;
                        }
                        if (evalRC) {
                            chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn_1.default.DOMMutation, EventSubtype: domChangeEventCfg.TargetElementSelector, Exception: exception });
                        }
                    }
                }.f).observe(DOMEl, config);
            });
        });
    }
});
//------------------------------------------------------------------------------
// Получить данные о login siebel. Данные записываются в tag=siebelLoginTagName
//------------------------------------------------------------------------------
function getSiebelGoginData(siebelLoginTagName, siebelLoginTagAttr) {
    var w = window;
    //debugger;
    var rc = null;
    var login_storage_key = siebelLoginTagName; // storage key is the same
    if (!rc) {
        if (w.SiebelApp && w.SiebelApp.S_App && typeof (w.SiebelApp.S_App.GetProfileAttr) == "function") {
            try {
                rc = {
                    LoginName: w.SiebelApp.S_App.GetProfileAttr("Login Name"),
                    Region: w.SiebelApp.S_App.GetProfileAttr("VTB24 Region"),
                    RegionCode: w.SiebelApp.S_App.GetProfileAttr("VTB24 Region Code"),
                    BranchId: w.SiebelApp.S_App.GetProfileAttr("VTB24 BIS Branch Id"),
                    BranchName: w.SiebelApp.S_App.GetProfileAttr("VTB24 BIS Branch Name"),
                    DivisionCode: w.SiebelApp.S_App.GetProfileAttr("VTB24 BIS Division Code"),
                    DivisionName: w.SiebelApp.S_App.GetProfileAttr("VTB24 Primary Division Name")
                };
                localStorage[login_storage_key] = JSON.stringify(rc);
            }
            catch (ex) {
                rc = null;
                // try to get from storage
                var szStorage = localStorage[login_storage_key];
                if (szStorage) {
                    try {
                        rc = JSON.parse(szStorage);
                    }
                    catch (e) {
                        rc = null;
                    }
                }
            }
        }
        else
            rc = null;
    }
    let els = window.document.getElementsByTagName(siebelLoginTagName); // может, элемент уже есть
    let ourEl;
    if (!els.length) {
        ourEl = window.document.createElement(siebelLoginTagName);
        window.document.body.appendChild(ourEl);
    }
    else {
        ourEl = els[0];
    }
    ourEl.setAttribute(siebelLoginTagAttr, JSON.stringify(rc)); // в html елемент записать все параметры login
}
$(document).ready(function () {
    console.log("watchmanContent. doc.ready()");
    var scr = document.createElement('script');
    scr.text = "(" + getSiebelGoginData + ")('" + common_1.siebelLoginTagName + "', '" + common_1.siebelLoginTagAttr + "');";
    //scr.src = chrome.extension.getURL("getSiebelLoginData.js");
    document.body.appendChild(scr);
    // Получилось ли с login, мы не знаем, но попробуем взять из кеша
    var loginData = localStorage[common_1.siebelLoginTagName];
    if (loginData) {
        try {
            loginData = JSON.parse(loginData);
        }
        catch (e) {
            loginData = null;
        }
    }
    chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn_1.default.ClientDOMReady, Param: loginData });
    return;
});
//# sourceMappingURL=watchmanContent.js.map