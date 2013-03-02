var App = App || {};

App.init = function() {
  "use strict";
  var maps = new App.Maps();
  var redbus = new redBus();
  var cities;
  maps.init(function(){        
      $(".details").show();    
      $("#GO").click(showCities)
  });
  function showCities(){    
     var fromCity = $("#from").val(); 
     var toCity = $("#to").val();
     maps.showCity(fromCity); 
     maps.showCity(toCity); 

     redBus().getJourneyPoints(3, 6, "2013-03-05",
       function(journeyPoints){
           var p = [_.keys(journeyPoints.boardingPoints)[0], _.keys(journeyPoints.dropOffPoints)[0]];           
           maps.addBoardingPoints(journeyPoints.boardingPoints, onChoosingBoardingPoint);
        }
      );

     function onChoosingBoardingPoint(boardingPoint, journeys) {
        console.log(boardingPoint);
        console.log(journeys);
        _.each(journeys, function(journey){
          maps.addDropOffPoints(journey.droppingTimes, onChoosingDropOffPoint);
        });

        function onChoosingDropOffPoint(dropOffPoint){
          //var journeys = getJourneys(boardingPoint, dropOffPoint);
          console.log(boardingPoint);
          console.log(dropOffPoint);
        }
     }
  }

  function getCityId(name){
    return _.find(cities, function(city){return city.name === name; }).id;
  }
};

google.maps.event.addDomListener(window, 'load', App.init);
