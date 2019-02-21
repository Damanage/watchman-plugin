// ClientSite JS
window.monitoringBackground = ((function (monitoringAgentServerUrl) {

    var version = "1.0";
    function MessageHub() {
        var self = this;
        var APIurl = monitoringAgentServerUrl + "API/";
        var logEventUrl = APIurl + "LogEvent/";
        var generatedEvent_performance = "Performance.getMetrics";
        var filterEvents = ["Network.requestReceived"
            , "Network.requestWillBeSent"
            , generatedEvent_performance
        ];


        var eventConfig = {
            events: [
                {
                    urlPattern: "http://localhost:8080/.*"
                }
            ]
        };

        var throttleEvents = [];
        function logEvent(tabId, message, param) {
            //if (!filterEvents.includes(message)) return; // filter out not interesing events
            // decode tab
            chrome.tabs.query({}, function (tabs) {
                var thisTab = tabs.filter(function (t) { return t.id == tabId; });
                var extendedObj = { title: "", url: "", timestamp: new Date().valueOf(), timeZoneOffset: new Date().getTimezoneOffset() };
                if (thisTab.length) {
                    extendedObj.tabTitle = thisTab[0].title;
                    extendedObj.tabUrl = thisTab[0].url;
                }
                if (!param) param = {};
                throttleEvents.push($.extend({
                    tabId: tabId
                    , message: message
                    , param: JSON.stringify(param)
                    , requestId: param.requestId
                    , messageTimestamp: param.timestamp
                    , requestType: param.type
                    , requestUrl: (param.request || param.response || param).url
                    , wallTime: param.wallTime
                }, extendedObj));
            });
        }
        setInterval(function () {
            if (throttleEvents.length) {
                var eventsTmp = throttleEvents;
                throttleEvents = [];
                $.ajax({
                    type: "post", url: logEventUrl
                    , xhrFields: {
                        withCredentials: true
                    }
                    , crossDomain: true
                    , data: { items: eventsTmp }
                });
            }
        }, 3000);

        debugger;

        let connection = new signalR.HubConnection(monitoringAgentServerUrl + 'signalR');
        this.connection = connection;
        connection.start().then(function () {
                console.log('Connected to hub, connection ID=' + self.connection.id);
            })
            .catch(function () {
                console.log('Could not connect to messageHub');
            });

        connection.on('NotificationMessage', data => {
            debugger;
            console.log(data);
        });
        

       
        function onAttach(tabId) {
            if (chrome.runtime.lastError) {
                alert(chrome.runtime.lastError.message);
                return;
            }
            chrome.debugger.onEvent.addListener(onEvent.bind(tabId));
            //chrome.debugger.sendCommand({ tabId: Number(tabId) }, "Network.enable");
            chrome.debugger.sendCommand({ tabId: Number(tabId) }, "Performance.enable");


        }
        // Any event handler
        function onEvent(debuggeeId, message, param) {
            if (debuggeeId.tabId != this) return;
            //console.log(arguments);
            logEvent(debuggeeId.tabId, message, param);
        }
        // С заданным интервалом снимаем performance.getMetrics
        if (true) setInterval(function () {
            attachedToTabIds.forEach(function (tabId) {
                chrome.debugger.sendCommand({ tabId: Number(tabId) }, "Performance.getMetrics", null, function (ret) {
                    logEvent(tabId, generatedEvent_performance, ret);
                });
            });
        }, 20000);

        var attachedToTabIds = [];
        // Attach debugger to given tabId
        function attachToTab(tab) {
            var tabId = Number(tab.id);
            if (!attachedToTabIds.includes(tabId)
                && tab.url && !tab.url.toLowerCase().startsWith("chrome://")
                // URL соответствует одному из наших событий
                && eventConfig.events.some(function (e) { return new RegExp(e.urlPattern, "i").test(tab.url); })
            ) {
                chrome.debugger.attach({ tabId: tabId }, version, onAttach.bind(null, tabId));
                attachedToTabIds.push(tabId);
            }
        }

        // Attach debugger to all tabs
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (e) {
                    attachToTab(e);
                });
        });

        // Attach to newly created tab
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (changeInfo.url) {
                attachToTab(tab);
            }
        });

        //-----------------------------
        // Сообщение от content script
        //-----------------------------
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
                if (request.greeting == "hello")
                    sendResponse({ farewell: "goodbye" });
            });


        // Send version
        //chrome.debugger.sendCommand({ tabId: 385 }, "Browser.getVersion", null, function () { console.log(arguments) });

        
    }
    return new MessageHub(monitoringAgentServerUrl);
})(window.monitoringAgentServerUrl));