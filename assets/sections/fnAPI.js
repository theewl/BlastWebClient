const request = require('request');

exports.getStats = (username, platform, callback) => {

    var url = "https://fortnitetracker.com/profile/";
    url += platform + "/" + encodeURIComponent(username);

    request(url, (error, response, body) => 
    {
        //console.log(body);
        // check platform
        if(platform != "pc" && platform != "psn" && platform != "xbl"){
            callback(new Error("Platform must be one of: 'pc', 'psn', 'xbl'"), null);
            return;
        }

        // no response
        if(!response){
            callback(new Error("No response"), null);
            return;
        }

        // player not found
        if(response.statusCode != 200){
            callback(new Error("Player not found"), null);
            return;
        }

        // random error
        if(error){
            callback(new Error("Some error occurred :("), null);
            return;
        }

        // get text for last 7 days stats
        var lifetimeStats = body.substring(body.indexOf("var imp_lifetimeStats") + 23);
        lifetimeStats = lifetimeStats.substring(0, lifetimeStats.indexOf("</script>") - 1);

        // get text for account info
        var accountInfo = body.substring(body.indexOf("var imp_accountInfo") + 22);
        accountInfo = accountInfo.substring(0, accountInfo.indexOf(";</script>"));

        // parse to json objects
        var jsonStats = JSON.parse(lifetimeStats);
        var jsonInfo = JSON.parse(accountInfo);

        // obtain each value and put in dict
        var ret = 
        {
            accountName: jsonInfo.nickname,
            platform: jsonInfo.platform,
            score: jsonStats["3"][0].value,
            kills: jsonStats["3"][11].value,
            wins: jsonStats["3"][1].value,
            kd: jsonStats["3"][8].value,
            wr: jsonStats["3"][9].value,
        }

        // callback function with result
        callback(null, ret);
    });
}