$(document).on(
    'facebookLoad',
    function(){
        //some code that requires the FB object
        FB.getLoginStatus(function(res){
            if( res.status == "connected" ){
                FB.api('/me', function(nicola) {
                    console.log(nicola);

                    user_email = nicola.email; //get user email
                    $('#about').append('<li>user_email: '+ user_email +'</li>');

                    user_first_name = nicola.first_name; //get user first_name
                    $('#about').append('<li>user_first_name: '+ user_first_name +'</li>');

                    user_last_name = nicola.last_name; //get user last_name
                    $('#about').append('<li>user_last_name: '+ user_last_name +'</li>');

                    user_hometown = nicola.hometown.name; //get user hometown
                    $('#about').append('<li>user_hometown: '+ user_hometown +'</li>');

                    user_location = nicola.location.name; //get user location
                    $('#about').append('<li>user_location: '+ user_location +'</li>');

                    for(var i = 0; i < nicola.languages.length; i++) {
                        user_languages = nicola.languages[i].name; //get user languages
                        $('#about').append('<li>user_languages'+ i +': '+ user_languages +'</li>');
                    }

                    user_bio = nicola.bio; //get user bio
                    $('#about').append('<li>user_bio: '+ user_bio +'</li>');
                });
            }
        });
    }
);
