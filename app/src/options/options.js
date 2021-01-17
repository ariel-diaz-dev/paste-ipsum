//render ipsum type order options 
var configs = chromeApiWrapper.getConfigs();
var initialIpsumTypeOrder;

setTimeout(function(){ 
  
  $.each(configs.ipsumTypeOrder, function( index, value ){
    $("#sortable").append('<li class="ui-state-default" value="' + value + '">' + value + ' Ipsum</li>')
  });
    
  //enables sorting of right click menu items
  $( "#sortable").sortable();
  $( "#sortable").disableSelection();
  initialIpsumTypeOrder = $( "#sortable" ).sortable('toArray', {attribute: "value"});
},200);

var PasteIpsumOptions = {

  saveConfigs : function(){
   let amountOfIpsum = $("#amountOfIpsum").val();
   let ipsumTypeOrder = $( "#sortable" ).sortable('toArray', {attribute: "value"});
   var needsRefresh = JSON.stringify(initialIpsumTypeOrder) !== JSON.stringify(ipsumTypeOrder);
   var thisObj = this; 

   var key = "pasteIpsumConfigs",
   configs = JSON.stringify({
        'amountOfIpsum': amountOfIpsum,
        'ipsumTypeOrder': ipsumTypeOrder
    });
    var jsonfile = {};
      jsonfile[key] = configs;
      chrome.storage.sync.set(jsonfile, function () {
    }); 
    
    return needsRefresh;
  }, 

  executeScriptOnTab : function(code){
    chrome.tabs.executeScript( null, {code : code}, function(){ } );
  },

  loadConfigs : function(){
    var thisObj = this;
    var configs = chromeApiWrapper.getConfigs();
    
    setTimeout(function(){ 
      $("#amountOfIpsum").val(configs.amountOfIpsum);
    },200);
  },

  initListeners : function(){
    var thisObj = PasteIpsumOptions;  

    $("#gotFeedback").on('click', function(event){
        event.preventDefault();
        var newURL = "https://chrome.google.com/webstore/detail/paste-ipsum/mkbikjdfkhonedidmbfjgiaiekghaeeo/support?hl=en";
        chrome.tabs.create({ url: newURL });
    }); 

    $("#buyMeACoffee").on('click', function(event){
        event.preventDefault();
        var newURL = "https://paypal.me/dragonborn/5";
        chrome.tabs.create({ url: newURL });
    }); 

    $("#cancelChanges").on('click', function(event){
        window.close();
    });

    $("#saveChanges").on('click', function(event){
      event.preventDefault();
      let refresh = thisObj.saveConfigs(); 
      if(refresh){
        chrome.tabs.executeScript(null, {code:"window.location.reload();"});
        chrome.runtime.reload();
      } 
      window.close();
    }); 

  },

  init: function(){
    var thisObj = this;
    thisObj.loadConfigs();
    thisObj.initListeners();
  }
}

$(document).ready(function(){
  PasteIpsumOptions.init(); 
})
