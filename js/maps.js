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

    var addMarkerOnAddress = function(map, address, callback, image) {
        $.getJSON("http://localhost/geocode/?city=" + address, function(data) {
            var latLng = new google.maps.LatLng(data.latitude, data.longitude);            
            var markerOptions = {
                map: map,
                position: latLng,
                animation: google.maps.Animation.DROP
            };            
            if(image) {
                markerOptions.icon = image;
            }
            var marker = new google.maps.Marker(markerOptions);
            google.maps.event.addListener(marker, 'click', function() {
                map.setZoom(8);
                map.setCenter(marker.getPosition());                
                if(callback)callback();
            });
        });  
    };

    var init = function(callback) {
        getCurrentLocation(function(coordinates) {
          map = initializeMaps(coordinates);
          callback();
        });
    };

    var showCity = function(name){
        var image = {
                    url: 'http://maps.google.com/mapfiles/ms/micons/green.png',
                    size: new google.maps.Size(20, 32),
                    origin: new google.maps.Point(0,0),        
                    anchor: new google.maps.Point(0, 32)
                };
       addMarkerOnAddress(map, name, function() {}, image); 
    };

    var addBoardingPoints = function(boardingPoints, city, callback, image){
        _.each(_.keys(boardingPoints), function(location){
            addMarkerOnAddress(map, location + ", " + city, function(){
                callback(location, boardingPoints[location]);
            }, image);
        });
    };

     var addDropOffPoints = function(dropOffPoints, city, callback, image){
        _.each(dropOffPoints, function(dropOffPoint){
            addMarkerOnAddress(map, dropOffPoint.location + ", " + city, function(){
                callback(dropOffPoint);
            }, image);
        });
    };

    return {
        init: init,
        showCity: showCity,
        addBoardingPoints:addBoardingPoints,
        addDropOffPoints:addDropOffPoints,
    };
};
