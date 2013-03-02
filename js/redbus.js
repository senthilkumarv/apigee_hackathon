var redBus = function(){

    function authUrl(url, params){

        params = params ||{};
    
        var oauthObject = OAuthSimple().sign({path:url,
                                              parameters:params,
                                              signatures:{
                                                api_key:"ANwhpxc7owtm3HurEaxVHvC3HS1qqz",
                                                shared_secret:"bO7y2b68jlxr5UMVoGDw1d5phOjpj8"
                                              }
                                            });
        return oauthObject.signed_url;
    }

    function getSources(callback){
       
        var url = authUrl("http://api.seatseller.travel/sources");
        $.ajax(url,{
            success:function(data){
                callback(data);
            },

        });
    }


    function getBoardingPoints(data){
    
        var boardingJourneys = {};
        _.each(data.availableTrips, function(journey){
           _.each(journey.boardingTimes, function(boardingTime){
                var location = boardingTime.location;
                boardingJourneys[location] = boardingJourneys[location] || [];
                boardingJourneys[location].push(journey);
           }); 
        });

        return boardingJourneys;
    }

    function getDropOffPoints(data){
    
        var dropOffJourneys = {};
        _.each(data.availableTrips, function(journey){
           _.each(journey.droppingTimes, function(droppingTime){
                var location = droppingTime.location;
                dropOffJourneys[location] = dropOffJourneys[location] || [];
                dropOffJourneys[location].push(journey);
           }); 
        });

        return dropOffJourneys;
    }

    function getJourenyPoints(source, destination, doj, callback){
        var params = "source="+ source + "&destination=" + destination + "&doj=" + doj;
        $.ajax(authUrl("http://api.seatseller.travel/availabletrips",params), {
            success:function(data){
                callback( {
                    boardingPoints:getBoardingPoints(data),
                    dropOffPoints:getDropOffPoints(data)
                });
            }
        });
    }

    return {
        authUrl:authUrl,
        getSources:getSources,
        getJourenyPoints:getJourenyPoints
    };
}
