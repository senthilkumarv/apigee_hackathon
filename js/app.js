var App = App || {};

App.init = function() {
  "use strict";
    var maps = new App.Maps();
    var redbus = new redBus();
    var cities;
    redbus.getSources(function(cityData) {
          
        cities = cityData.cities; 
        maps.init(function(){

            $(".details").show();    
            $("#GO").click(showCities)
        });
    });
  function showCities(){
    
     var fromCity = $("#from").val(); 
     var toCity = $("#to").val();
     maps.showCity(fromCity); 
     maps.showCity(toCity); 

     redBus().getJourneyPoints(getCityId(fromCity), getCityId(toCity), "2013-03-05",
       function(journeyPoints){
           var p = [_.keys(journeyPoints.boardingPoints)[0], _.keys(journeyPoints.dropOffPoints)[0]];
           maps.addMarkers(p);
        }
    );

  }

  function getCityId(name){
    return _.find(cities, function(city){return city.name === name; }).id;
  }
};

google.maps.event.addDomListener(window, 'load', App.init);
