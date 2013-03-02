var App = (function() {
    "use strict";
    /*global $: true, navigator: true, google: true */

    var getCurrentLocation = function(callback) { 
        var mapLocationDetails = function(position) {
            callback(position.coords);

        };
        navigator.geolocation.getCurrentPosition(mapLocationDetails);
    };
    
    var initializeMaps = function(coordinates) {
        var mapOptions = {
          zoom: 6,
          center: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        return new google.maps.Map($('#map_canvas')[0], mapOptions);
    };
    
    var addMarkerOnLatLng = function(map, coordinates) {
        var latLng = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        return marker;
    };

    var addMarkerOnAddress = function(map, address) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
          } else {
            throw('Geocode was not successful for the following reason: ' + status);
          }
        });  
    };

    var displayLocationInfo = function(coordinate) {
        $("#latitude").text(coordinate.latitude);
        $("#longitude").text(coordinate.longitude);
    };

    var init = function() {
        getCurrentLocation(function(coordinates) {
          displayLocationInfo(coordinates);
          var map = initializeMaps(coordinates);
          addMarkerOnLatLng(map, coordinates);
          addMarkerOnAddress(map, "Chennai");
          addMarkerOnAddress(map, "Bangalore");
          addMarkerOnAddress(map, "Koyambedu, Chennai");
          addMarkerOnAddress(map, "Madhapur");
        });
    };

    return {
        init: init
    };
})();

google.maps.event.addDomListener(window, 'load', App.init);