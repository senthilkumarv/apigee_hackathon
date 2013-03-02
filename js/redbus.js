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

    return {
        getSources:getSources,
        authUrl:authUrl
    };
}
