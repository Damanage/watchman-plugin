/// <reference path="MonitoringBackground2.ts" />
import { siebelLoginTagName, siebelLoginTagAttr } from "./background classes/variables/common"
import { 
    ContentScriptMessageSetupDOMMutationListners, 
    ContentScriptMessageSetupDOMListners, 
    ContentScriptMessageEval, 
    ContentScriptMessage, 
    ContentScriptMessageTypeEn 
} from "./background classes/ContentScriptMessage"
import Tab2BackgroundMessage from "./background classes/interfaces/Tab2BackgroundMessage"
import InternalEventTypeEn from "./background classes/variables/InternalEventTypeEn"
import SiebelLoginData from "./background classes/interfaces/SiebelLoginData"

import {
    EventConfigurationDOMEvent, 
    EventConfigurationDOMMutation
} from "./MonitoringBackground2";


chrome.runtime.onMessage.addListener(
    function (message: ContentScriptMessage, sender: any, sendResponse: (any) => void): void {
        //--------- сообщение получить данные login Siebel. Найти созданный нами элемент, взять оттуда данные и послать отдельным сообщением 
        if (message.MessageType == ContentScriptMessageTypeEn.GetSiebelLoginData) {
            $(document).ready(function () {
                let rc: any = null;
                // сначачала пытаемся взять из storage
                var storage = localStorage[siebelLoginTagAttr];
                if (storage) {
                    try {
                        rc = JSON.parse(storage);
                    }
                    catch (e) { rc = null; }
                }
                if (!rc) {// не получилось - берем из нашего HTML-элемента
                    let els = document.getElementsByTagName(siebelLoginTagName);
                    if (els.length) {
                        let el = els[0];
                        var data = el.getAttribute(siebelLoginTagAttr);
                        if (data) {
                            try {
                                rc = JSON.parse(data);
                            }
                            catch (ex) { rc = null; }
                        }
                    }
                }
                chrome.runtime.sendMessage(null, <Tab2BackgroundMessage>{ EventType: InternalEventTypeEn.SiebelLoginData, Param: rc });
            });
        }
        //------------- сообщение Eval - вычислить выражение в контексте страницы
        else if (message.MessageType == ContentScriptMessageTypeEn.Eval) {
            let rc: { response: any, exception: any } = { response: null, exception: null };
            // выполнить eval в context
            try {
                let msg = <ContentScriptMessageEval>message;
                // Строим контекст: все поля из контекста становятся переменными. В конец дописываем expression
                let ftext: string = "(function() {";
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
        else if (message.MessageType == ContentScriptMessageTypeEn.SetupDOMEventListners) {
            // повесить обработчики событий
            let msg = <ContentScriptMessageSetupDOMListners>message;
            msg.Events.forEach((e) => {
                let domEventCfg = <EventConfigurationDOMEvent>e;
                $(document).on(domEventCfg.DOMEvent, domEventCfg.TargetElementSelector, {
                    f: function (domEvent: Event) {
                        let evalRC: boolean;
                        let eventConfigurationId = domEventCfg.EventConfigurationId;
                        let exception: any;
                        try {
                            evalRC = !domEventCfg.OKExpression || eval(domEventCfg.OKExpression);
                        }
                        catch (ex) {
                            evalRC = true;
                            exception = ex;
                        }
                        if (evalRC) {
                            let level = 0;
                            chrome.runtime.sendMessage(null, <Tab2BackgroundMessage>{
                                EventType: InternalEventTypeEn.DOMEvent, EventSubtype: domEventCfg.DOMEvent
                                , DOMEvent: JSON.parse(JSON.stringify({ ...{ EventConfigurationId: eventConfigurationId }, ...domEvent }
                                    , function (key, value) {// avoid circular references
                                        if (typeof (value) != "string" && level++ > 100) return "<<replaced>>";
                                        return value;
                                    }
                                ))
                                , Exception: exception
                            });
                        }
                    }
                }.f);
            });

        }
            //>>>>>>>>>> DOM Mutation
        else if (message.MessageType == ContentScriptMessageTypeEn.SetupDOMMutationListners) {
            // повесить обработчики событий 
            let msg = <ContentScriptMessageSetupDOMMutationListners>message;
            var config = { attributes: true, childList: true };
            msg.Events.forEach((e: EventConfigurationDOMMutation) => {
                let domChangeEventCfg = <EventConfigurationDOMMutation>e;

                $(domChangeEventCfg.TargetElementSelector || "body").each(function (ix: number, DOMEl: any): void {
                    let ev = { ...e };
                    new MutationObserver({
                        f: function (mutaionList: { type: string }[]) {
                            let evalRC: boolean;
                            let exception: any = null;
                            
                            try {
                                evalRC = !ev.OKExpression || eval(ev.OKExpression);
                            }
                            catch (ex) {
                                exception = ex;
                                evalRC = true;
                            }
                            if (evalRC) {
                                chrome.runtime.sendMessage(null, <Tab2BackgroundMessage>{ EventType: InternalEventTypeEn.DOMMutation, EventSubtype: domChangeEventCfg.TargetElementSelector, Exception: exception });
                            }
                        }
                    }.f).observe(DOMEl, config);
                });

            });

        }
    }
);
//------------------------------------------------------------------------------
// Получить данные о login siebel. Данные записываются в tag=siebelLoginTagName
//------------------------------------------------------------------------------
function getSiebelGoginData(siebelLoginTagName: string, siebelLoginTagAttr: string) {
    var w: any = window;
    //debugger;
    var rc: SiebelLoginData = null;
    var login_storage_key = siebelLoginTagName;// storage key is the same
   
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
                var szStorage: string = localStorage[login_storage_key];
                if (szStorage) {
                    try {
                        rc = JSON.parse(szStorage);
                    }
                    catch (e) { rc = null; }
                }
            }
        }
        else
            rc = null;
    }

    let els = window.document.getElementsByTagName(siebelLoginTagName);// может, элемент уже есть
    let ourEl: Element;
    if (!els.length) {
        ourEl = window.document.createElement(siebelLoginTagName);
        window.document.body.appendChild(ourEl);
    }
    else {
        ourEl = els[0];
    }
    ourEl.setAttribute(siebelLoginTagAttr, JSON.stringify(rc));// в html елемент записать все параметры login
    
}


$(document).ready(function () {
    console.log("watchmanContent. doc.ready()")
    var scr = document.createElement('script');
    scr.text = "(" + getSiebelGoginData + ")('" + siebelLoginTagName + "', '" + siebelLoginTagAttr + "');";
    //scr.src = chrome.extension.getURL("getSiebelLoginData.js");
    document.body.appendChild(scr)

    // Получилось ли с login, мы не знаем, но попробуем взять из кеша
    var loginData = localStorage[siebelLoginTagName];
    if (loginData) {
        try {
            loginData = JSON.parse(loginData);
        }
        catch (e) { loginData = null; }
    }

    chrome.runtime.sendMessage(null, <Tab2BackgroundMessage>{ EventType: InternalEventTypeEn.ClientDOMReady, Param: loginData });
    return;

});