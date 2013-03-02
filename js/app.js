var App = App || {};

App.init = function() {
  "use strict";
  var maps = new App.Maps();
  maps.init();  
};

google.maps.event.addDomListener(window, 'load', App.init);