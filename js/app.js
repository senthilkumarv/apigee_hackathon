var App = (function() {
    "use strict";
    /*global $,navigator */

    var getCurrentLocation = function(callback) { 
        var mapLocationDetails = function(position) {
            callback(position.coords);

        };
        navigator.geolocation.getCurrentPosition(mapLocationDetails);
    };
    
    var initializeMaps = function(coordinates) {
        var mapOptions = {
          zoom: 8,
          center: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        return new google.maps.Map($('#map_canvas')[0], mapOptions);
    };
    
    var addMarkerToMap = function(map, coordinates) {
        var latLng = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        return marker;
    };

    var displayLocationInfo = function(coordinate) {
        $("#latitude").text(coordinate.latitude);
        $("#longitude").text(coordinate.longitude);
    };

    var init = function() {
        getCurrentLocation(function(coordinates) {
          displayLocationInfo(coordinates);
          var map = initializeMaps(coordinates);
          addMarkerToMap(map, coordinates);
        });
    };

    return {
        init: init
    };
})();

google.maps.event.addDomListener(window, 'load', App.init);