var App = App || {};

App.init = function() {
  "use strict";
  var maps = new App.Maps();
  var redbus = new redBus();
  redbus.getSources(function(data) {
      console.log(data);
      maps.init(data.cities);      
  });
};

google.maps.event.addDomListener(window, 'load', App.init);