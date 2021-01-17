//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedEl = event.target; 
    }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var ipsum = "";
  var amountOfIpsum = 0; 

  if(request.name == "getRightClickedElement") {

    var configs = chromeApiWrapper.getConfigs();
    setTimeout(function(){ 
      amountOfIpsum = configs.amountOfIpsum;
      switch (request.ipsumType) {
        case "default":
          ipsum = generateIpsum(defaultIpsum, amountOfIpsum);
          break;
        case "bacon":
          ipsum = generateIpsum(baconIpsum, amountOfIpsum);
          break;
        case "cupcakes":
          ipsum = generateIpsum(cupcakesIpsum, amountOfIpsum);
          break;
        case "books":
          ipsum = generateIpsum(booksIpsum, amountOfIpsum);
          break;
        case "movies":
          ipsum = generateIpsum(moviesIpsum, amountOfIpsum);
          break;
        default:
          ipsum = generateIpsum(moviesIpsum, amountOfIpsum);
      }
      var currentValue = $(clickedEl).val();
      $(clickedEl).val(currentValue + " " + ipsum);
    },100);
  } 
});