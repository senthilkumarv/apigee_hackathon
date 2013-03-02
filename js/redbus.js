var redBus = function(){

    function authUrl(url, params){
    
    var oauthObject = OAuthSimple().sign({path:url,
                                          parameters:params,
                                          signatures:{
                                            api_key:"ANwhpxc7owtm3HurEaxVHvC3HS1qqz",
                                            shared_secret:"bO7y2b68jlxr5UMVoGDw1d5phOjpj8"
                                          }
                                        });
    return oauthObject.signed_url;
    }

    function getSources(){
        
        

        $.ajax(authUrl("http://api.seatseller.travel/sources"),{

            headers:{
                oauth_consumer_key:"ANwhpxc7owtm3HurEaxVHvC3HS1qqz",
                oauth_signature_method:"HMAC-SHA1",
                oauth_timestamp:"1362205866",
                oauth_nonce:"503674127",
                oauth_version:"1.0",
                oauth_signature:"niVM2LKxoAgI2vVMqEvRqqJvp%2Bc%3D"
            },

            success:function(data){
                console.log(data);
            },


            dataType:"jsonp"

        });
    }

    return {
        getSources:getSources,
        authUrl:authUrl
    };
}
