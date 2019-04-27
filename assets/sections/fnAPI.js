const request = require('request');

exports.getStats = (username, platform, callback) => {

    var url = "https://fortnitetracker.com/profile/";
    url += platform + "/" + encodeURIComponent(username);

    request(url, (error, response, body) => 
    {
        console.log(body);
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

        // get text for all time stats
        var lifetimeStats = body.substring(body.indexOf("var imp_lifetimeStats") + 23);
        lifetimeStats = lifetimeStats.substring(0, lifetimeStats.indexOf("</script>") - 1);

        // get text for account info
        var accountInfo = body.substring(body.indexOf("var imp_accountInfo") + 22);
        accountInfo = accountInfo.substring(0, accountInfo.indexOf(";</script>"));

        var sdsStats = body.substring(body.indexOf("var imp_playerData") + 21);
        sdsStats = sdsStats.substring(0, sdsStats.indexOf("</script>") - 1);

        // parse to json objects
        var jsonStats = JSON.parse(lifetimeStats);
        var jsonInfo = JSON.parse(accountInfo);
        var jsonsdsStats = JSON.parse(sdsStats);

        // obtain each value and put in dict
        var ret = 
        {
            accountName: jsonInfo.nickname,
            platform: jsonInfo.platform,

            //All-Time
            score: jsonStats["3"][0].value,
            kills: jsonStats["3"][11].value,
            wins: jsonStats["3"][1].value,
            kd: jsonStats["3"][8].value,
            wr: jsonStats["3"][9].value,

            //Solo
            soloScore: jsonsdsStats["p2"][1].value,
            soloKills: jsonsdsStats["p2"][12].value,
            soloWins: jsonsdsStats["p2"][2].value,
            soloKd: jsonsdsStats["p2"][9].value,
            soloWr: jsonsdsStats["p2"][10].value,

            //Duo
            duoScore: jsonsdsStats["p10"][1].value,
            duoKills: jsonsdsStats["p10"][12].value,
            duoWins: jsonsdsStats["p10"][2].value,
            duoKd: jsonsdsStats["p10"][9].value,
            duoWr: jsonsdsStats["p10"][10].value,

            //Squad
            squadScore: jsonsdsStats["p9"][1].value,
            squadKills: jsonsdsStats["p9"][12].value,
            squadWins: jsonsdsStats["p9"][2].value,
            squadKd: jsonsdsStats["p9"][9].value,
            squadWr: jsonsdsStats["p9"][10].value,

        }

        // callback function with result
        callback(null, ret);
    });
}