window.addEventListener('load', (event) => {
    //Initialization////////////////////////////////////////////////////
    chrome.storage.sync.get(['configuration'], function(configuration) { 
        setUI(configuration["configuration"]);
    });

    ////////////////////////////////////////////////////////////////////

    //Events////////////////////////////////////////////////////////////

    ///////////////////////

    //Checkbox events//////////////////////
    document.getElementById("removeArrowCheckBox").addEventListener("change", event =>{
        changeConfig("removeArrow", event.target.checked);
    });

    document.getElementById("removeUrlCheckBox").addEventListener("change", event =>{
        changeConfig("removeUrl", event.target.checked);
    });


    document.getElementById("colorUrlCheckBox").addEventListener("change", event =>{
        changeConfig("colorUrl", event.target.checked);
    });

    document.getElementById("urlColorSelection").addEventListener("change", event =>{
        changeConfig("urlColor", event.target.value);
    });

    document.getElementById("searchWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("searchWidget",event.target.checked);
    });

    document.getElementById("askWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("askWidget",event.target.checked);
    });

    document.getElementById("sideBarWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("sideBarWidget",event.target.checked);
    });

    document.getElementById("backgroundColorCheckBox").addEventListener("change", event =>{
        changeConfig("colorChange", event.target.checked);
    });

    document.getElementById("headFontCheckbox").addEventListener("change", event =>{
        changeConfig("fontChange",event.target.checked);
    });


    document.getElementById("imagesCheckBox").addEventListener("change", event =>{
        changeConfig("images", event.target.checked);
    });

    
    //Button///////////////
    document.getElementById("defaultSettings").addEventListener("click", restoreDefaultConfig);

    function restoreDefaultConfig(){
        const defaultConfiguration = {
            "configuration":{

                "removeArrow": false,
                "removeUrl": false,

                "colorUrl": false,
                "urlColor": "#ff6600", //orange, etc
                
               
                "searchWidget": false,
                "askWidget": false,
                "sideBarWidget": false,         
                "colorChange": false,                
                "fontChange": false,
                
                "images": false
            }
        }

        sendToProgramJS(defaultConfiguration);

        setUI(defaultConfiguration["configuration"]);

        chrome.storage.sync.set({'configuration': defaultConfiguration["configuration"]}, function(){});
    }

    ///////////////////////
    
    //Functions////////////////////////////////////////////////////////////

    function setUI(configuration){
        document.getElementById("removeArrowCheckBox").checked = configuration.removeArrow;
        document.getElementById("removeUrlCheckBox").checked = configuration.removeUrl;
        
        document.getElementById("colorUrlCheckBox").checked = configuration.colorUrl;
        document.getElementById("urlColorSelection").value  = configuration.urlColor;

       
        document.getElementById("searchWidgetCheckBox").checked = configuration.searchWidget;
        document.getElementById("askWidgetCheckBox").checked = configuration.askWidget;
        document.getElementById("sideBarWidgetCheckBox").checked = configuration.sideBarWidget;
        document.getElementById("backgroundColorCheckBox").checked = configuration.colorChange;
        document.getElementById("headFontCheckbox").checked = configuration.fontChange;
        
        document.getElementById("imagesCheckBox").checked = configuration.images;

    }

    function changeConfig(key, value){
        chrome.storage.sync.get(['configuration'], function(configuration) { 
            configuration["configuration"][key] = value;

            chrome.storage.sync.set({'configuration': configuration["configuration"]}, function(){});

            sendToProgramJS(configuration);
        });
    }

    function sendToProgramJS(payload){
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, payload);
        });
    }

    //////////////////////////////////////////////////////////////////////
});