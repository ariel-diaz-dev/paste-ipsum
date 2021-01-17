chrome.contextMenus.removeAll(function(){});

var ipsumType = "";

function defaultIpsum(info, tab){
    ipsumType = "default";
    notifyContentWithSelection(info, tab);
}

function baconIpsum(info, tab){
    ipsumType = "bacon";
    notifyContentWithSelection(info, tab);
}

function cupcakesIpsum(info, tab){
    ipsumType = "cupcakes";
    notifyContentWithSelection(info, tab);
}

function booksIpsum(info, tab){
    ipsumType = "books";
    notifyContentWithSelection(info, tab);
}

function moviesIpsum(info, tab){
    ipsumType = "movies";
    notifyContentWithSelection(info, tab);
}

function notifyContentWithSelection(info, tab) {
    var request = {
        name : "getRightClickedElement", 
        ipsumType : ipsumType
    }

    chrome.tabs.sendMessage(tab.id, request, function(clickedEl) {
    });
}

var configs = chromeApiWrapper.getConfigs();

setTimeout(function(){ 
  $.each(configs.ipsumTypeOrder, function( index, value ){
      switch (value) { 
        case "Bacon":
            chrome.contextMenus.create({
                title: "Bacon Ipsum",
                contexts:["editable"], 
                onclick: baconIpsum,
            });
          break;
        case "Cupcakes":
            chrome.contextMenus.create({
                title: "Cupcakes Ipsum",
                contexts:["editable"], 
                onclick: cupcakesIpsum,
            });
          break;
        case "Books":
            chrome.contextMenus.create({
                title: "Books Ipsum",
                contexts:["editable"], 
                onclick: booksIpsum,
            });
          break;
        case "Movies":
            chrome.contextMenus.create({
                title: "Movies Ipsum",
                contexts:["editable"], 
                onclick: moviesIpsum,
            });
          break;
        default:
            chrome.contextMenus.create({
                title: "Default Ipsum",
                contexts:["editable"], 
                onclick: defaultIpsum,
            }); 
      } 
  }); 
},200);
  