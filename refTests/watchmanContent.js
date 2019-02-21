/// <reference path="monitoringbackground2.ts" />
/// <reference path="watchmanCommon.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //--------- сообщение получить данные login Siebel. Найти созданный нами элемент, взять оттуда данные и послать отдельным сообщением 
    if (message.MessageType == ContentScriptMessageTypeEn.GetSiebelLoginData) {
        $(document).ready(function () {
            var rc = null;
            // сначачала пытаемся взять из storage
            var storage = localStorage[siebelLoginTagAttr];
            if (storage) {
                try {
                    rc = JSON.parse(storage);
                }
                catch (e) {
                    rc = null;
                }
            }
            if (!rc) { // не получилось - берем из нашего HTML-элемента
                var els = document.getElementsByTagName(siebelLoginTagName);
                if (els.length) {
                    var el = els[0];
                    var data = el.getAttribute(siebelLoginTagAttr);
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
            chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn.SiebelLoginData, Param: rc });
        });
    }
    //------------- сообщение Eval - вычислить выражение в контексте страницы
    else if (message.MessageType == ContentScriptMessageTypeEn.Eval) {
        var rc = { response: null, exception: null };
        // выполнить eval в context
        try {
            var msg = message;
            // Строим контекст: все поля из контекста становятся переменными. В конец дописываем expression
            var ftext = "(function() {";
            for (var prop in msg.Context) {
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
    else if (message.MessageType == ContentScriptMessageTypeEn.SetupDOMEventListners) {
        // повесить обработчики событий
        var msg = message;
        msg.Events.forEach(function (e) {
            var domEventCfg = e;
            $(document).on(domEventCfg.DOMEvent, domEventCfg.TargetElementSelector, {
                f: function (domEvent) {
                    var evalRC;
                    var eventConfigurationId = domEventCfg.EventConfigurationId;
                    var exception;
                    try {
                        evalRC = !domEventCfg.OKExpression || eval(domEventCfg.OKExpression);
                    }
                    catch (ex) {
                        evalRC = true;
                        exception = ex;
                    }
                    if (evalRC) {
                        var level_1 = 0;
                        chrome.runtime.sendMessage(null, {
                            EventType: InternalEventTypeEn.DOMEvent, EventSubtype: domEventCfg.DOMEvent,
                            DOMEvent: JSON.parse(JSON.stringify(__assign({ EventConfigurationId: eventConfigurationId }, domEvent), function (key, value) {
                                if (typeof (value) != "string" && level_1++ > 100)
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
    else if (message.MessageType == ContentScriptMessageTypeEn.SetupDOMMutationListners) {
        // повесить обработчики событий 
        var msg = message;
        var config = { attributes: true, childList: true };
        msg.Events.forEach(function (e) {
            var domChangeEventCfg = e;
            $(domChangeEventCfg.TargetElementSelector || "body").each(function (ix, DOMEl) {
                var ev = __assign({}, e);
                new MutationObserver({
                    f: function (mutaionList) {
                        var evalRC;
                        var exception = null;
                        try {
                            evalRC = !ev.OKExpression || eval(ev.OKExpression);
                        }
                        catch (ex) {
                            exception = ex;
                            evalRC = true;
                        }
                        if (evalRC) {
                            chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn.DOMMutation, EventSubtype: domChangeEventCfg.TargetElementSelector, Exception: exception });
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
    var els = window.document.getElementsByTagName(siebelLoginTagName); // может, элемент уже есть
    var ourEl;
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
    var scr = document.createElement('script');
    scr.text = "(" + getSiebelGoginData + ")('" + siebelLoginTagName + "', '" + siebelLoginTagAttr + "');";
    //scr.src = chrome.extension.getURL("getSiebelLoginData.js");
    document.body.appendChild(scr);
    // Получилось ли с login, мы не знаем, но попробуем взять из кеша
    var loginData = localStorage[siebelLoginTagName];
    if (loginData) {
        try {
            loginData = JSON.parse(loginData);
        }
        catch (e) {
            loginData = null;
        }
    }
    chrome.runtime.sendMessage(null, { EventType: InternalEventTypeEn.ClientDOMReady, Param: loginData });
    return;
});
//# sourceMappingURL=watchmanContent.js.map