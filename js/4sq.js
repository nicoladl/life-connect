$(function() {
    foursquareApi.getLatestCheckins(configFoursquare.userId);
})

var foursquareApi = {
    clientId: configFoursquare.clientId,
    clientSecret: configFoursquare.clientSecret,
    oauth_token: configFoursquare.oauth_token,
    redirectUrl : configFoursquare.redirectUrl,
    authorize: function(){
        var url = "https://foursquare.com/oauth2/access_token";
            url += "?client_id="+this.clientId;
            url += "&client_secret="+this.clientSecret;
            url += "&grant_type=authorization_code";
            url += "&redirect_uri="+this.redirectUrl;

            this.getJson(url, function(data){
                console.log("authorize",data);
            });
    },
    getCode : function(){
        var url = "https://foursquare.com/oauth2/authenticate";
            url += "?client_id="+this.clientId;
            url += "&response_type=code";
            url += "&redirect_uri="+this.redirectUrl;
            this.getJson(url, function(data){
                console.log("code",data);
            })

    },
    getJson: function(url, callback){
        $.getJSON(url, function(data) {
          callback(data);
        });
    },
    getLatestVersion: function(){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getMonth();

        if(month <10){
            month = "0"+month;
        }
        if(day <10){
            day = "0"+day;
        }
        return year+month+day;
    },
    getUserId: function() {
        var latestversion = this.getLatestVersion();
        var url = "https://api.foursquare.com/v2/users/self?oauth_token="+this.oauth_token+"&v="+latestversion;

        var that = this;
        this.getJson(url, function(data){
            userId = data.response.user.id;
            // $('#user').append(userId);
        });
    },
    getLatestCheckins: function(userId){
        $('#user').append(userId);
        var latestversion = this.getLatestVersion();
        var url = "https://api.foursquare.com/v2/users/"+userId+"/checkins/?oauth_token="+this.oauth_token+"&v="+latestversion;

        var that = this;
        this.getJson(url, function(data){
            $.each(data.response.checkins.items, function(index, v) {

                // console.log(v);

                var nomeVenue = v.venue.name,
                    latitudineVenue = v.venue.location.lat,
                    longitudineVenue = v.venue.location.lng,
                    dateCheckin = v.createdAt;

                $('#latest').append('<li>'+nomeVenue + ' - coordinate: ' + latitudineVenue + ' / ' + longitudineVenue+' - date: '+ dateCheckin + '</li>');
            });
        });
    },
    // getList: function(userId){
    //     var latestversion = this.getLatestVersion();
    //     var url = "https://api.foursquare.com/v2/users/"+userId+"/lists/?oauth_token="+this.oauth_token+"&v="+latestversion;
    //     var that = this;
    //     this.getJson(url, function(data){

    //         $.each(data.response.lists.groups[0].items, function(index, v) {

    //             console.log(data);

    //             var nomeList = v.name,
    //                 descriptionList = v.description,
    //                 itemsList = v.listItems.count;
    //                 followerList = v.followers.count;

    //             $('#lists').append('<li>'+nomeList + ' - descrizione: ' + descriptionList + ' - numero Items ' + itemsList + ' - follower List: ' + followerList +'</li>');
    //         });
    //     });
    // },
};