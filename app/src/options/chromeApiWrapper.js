var chromeApiWrapper = {

    defaultamountOfIpsum: '25',
    defaultIpsumTypeOrder: ["Default","Bacon","Cupcakes","Boosk","Movies"],
  
    getConfigs : function(){
            console.log("HEY!")
        var thisObj = this; 
        var configs = {};
        chrome.storage.sync.get('pasteIpsumConfigs', function (response) {
          if(response.pasteIpsumConfigs == null){
            configs.amountOfIpsum = thisObj.defaultamountOfIpsum;
            configs.ipsumTypeOrder = thisObj.defaultIpsumTypeOrder;
          }else{
            var parsedConfigs = JSON.parse(response.pasteIpsumConfigs);
            if(parsedConfigs.amountOfIpsum == null){
              configs.amountOfIpsum = thisObj.defaultamountOfIpsum;
            }else{
              configs.amountOfIpsum = parsedConfigs.amountOfIpsum;
            }
            if(parsedConfigs.ipsumTypeOrder == null || parsedConfigs.ipsumTypeOrder.length == 0){
              configs.ipsumTypeOrder = thisObj.defaultIpsumTypeOrder;
            }else{
              configs.ipsumTypeOrder = parsedConfigs.ipsumTypeOrder;
            }
          }
        });
        return configs;
      }
  }