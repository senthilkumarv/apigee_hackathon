var App = App || {};
App.Maps = function() {
    "use strict";
    /*global $: true, navigator: true, google: true, console: true */

    var map;

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

    var addMarkerOnAddress = function(map, address, callback, type) {
        $.getJSON("http://localhost/geocode/?city=" + address, function(data) {
            var latLng = new google.maps.LatLng(data.latitude, data.longitude);            
            var markerOptions = {
                map: map,
                position: latLng,
                animation: google.maps.Animation.DROP
            };            
            if(type) {
                var image = {
                    url: 'http://maps.google.com/mapfiles/ms/micons/green.png',
                    size: new google.maps.Size(20, 32),
                    origin: new google.maps.Point(0,0),        
                    anchor: new google.maps.Point(0, 32)
                };
                markerOptions.icon = image;
            }
            var marker = new google.maps.Marker(markerOptions);
            if(type) return;
            google.maps.event.addListener(marker, 'click', function() {
                map.setZoom(8);
                map.setCenter(marker.getPosition());                
                callback();
            });
        });  
    };

    var displayLocationInfo = function(coordinate) {
        $("#latitude").text(coordinate.latitude);
        $("#longitude").text(coordinate.longitude);
    };

    var init = function(callback) {
        getCurrentLocation(function(coordinates) {
          displayLocationInfo(coordinates);
          map = initializeMaps(coordinates);
          callback();
        });
    };

    var showCity = function(name){
       addMarkerOnAddress(map, name, function() {}, "aa"); 
    };
    
    var addMarkers = function(locations) {
        _.each(locations, function(location) {
            addMarkerOnAddress(map, location, function() {});
        }, "aa");
    };


    var addBoardingPoints = function(boardingPoints, callback, type){
        _.each(_.keys(boardingPoints), function(location){
            addMarkerOnAddress(map, location, function(){
                callback(location, boardingPoints[location]);
            }, type);
        });
    };

     var addDropOffPoints = function(dropOffPoints, callback, type){
        _.each(dropOffPoints, function(dropOffPoint){
            addMarkerOnAddress(map, dropOffPoint.location, function(){
                callback(dropOffPoint);
            }, type);
        });
    };

    return {
        init: init,
        addMarkers: addMarkers,
        showCity: showCity,
        addBoardingPoints:addBoardingPoints,
        addDropOffPoints:addDropOffPoints,
    };
};
