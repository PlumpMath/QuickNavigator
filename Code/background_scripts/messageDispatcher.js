﻿chrome.extension.onConnect.addListener(function(port) {
    console.log("init connect ==> " + port.name);

    if(port.name == "keydown"){
        port.onMessage.addListener(function(msg) {
            //console.log("get connect message ==> " + msg);
            if(msg.requestHandler === "requestSuggestions"){
                var text = msg.value;
                if(text){
                    var res = suggestions.getSuggestion(text);
                    port.postMessage({
                        requestHandler: "responseSuggestions",
                        value: res
                    });
                }
            }
            else if(msg.requestHandler === "requestNavigate"){
                window.db.saveVisitedUrl(msg.url,msg.title,msg.sourceType);
            }
            else if(msg.requestHandler === "requestMRU"){
                var mru = suggestions.getMRU();
                port.postMessage({
                    requestHandler: "responseSuggestions",
                    value: mru 
                });
            }
        });
    }
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {   
    console.log("short message ==> get "+request.requestHandler+" request");
    if (request.requestHandler == "getOptions"){
        switch(request.option){
            case "disableMRU":
                    var disabled = options.getMRUDisabled();
                    sendResponse({responseHandler:"options",option:"disableMRU",value:disabled});
                break;
        }
    }

    //这里要返回true表明了要等待异步发送给sender
    return true;
});
