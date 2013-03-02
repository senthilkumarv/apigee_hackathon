var App = App || {};
App.Maps = function() {
    "use strict";
    /*global $: true, navigator: true, google: true, console: true */

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
            if (status != google.maps.GeocoderStatus.OK) {
                throw('Geocode was not successful for the following reason: ' + status);
            }
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP
            });
            google.maps.event.addListener(marker, 'click', function() {
                map.setZoom(8);
                map.setCenter(marker.getPosition());
                console.log("Clicked on " + results[0].formatted_address);
            });
        });  
    };

    var displayLocationInfo = function(coordinate) {
        $("#latitude").text(coordinate.latitude);
        $("#longitude").text(coordinate.longitude);
    };

    var init = function(locations) {
        getCurrentLocation(function(coordinates) {
          displayLocationInfo(coordinates);
          var map = initializeMaps(coordinates);
          addMarkerOnLatLng(map, coordinates);
          addMarkers(map, locations);
        });
    };
    
    var addMarkers = function(map, locations) {
        _.each(locations, function(location) {
            addMarkerOnAddress(map, location.name);
        });
    };

    return {
        init: init,
        addMarkers: addMarkers
    };
};