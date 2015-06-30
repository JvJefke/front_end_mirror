(function () {
    angular.module('mirrorApp').factory('confService', ['tempConfLib', "authService", "dataService", function (tempConfLib, authService, dataService) {
        var local = {};
        var service = {
            getConf: getConf,
            changeVals: changeVals,
            getAppByName: getAppByName,
            addDeleteApps: addDeleteApps
        };

        // Check of de token in de localstorage expired is: nee --> gebruik bestaand token, ja --> vraag een nieuw token aan
        // Vraag nogmaals een token als de aanvraag gefaald is (tot 3x)
        // Gebruik hard gecodeerde configuratie na 3 keer.

        function getConf(callback, failCallback, counter) {

            if (!counter)
                counter = 0;

            if (authService.getToken()) {
                //if (!counter)
                    //console.log("Token not yet expired");
                local.getConf(callback, failCallback);
            } else {
                if (counter < 3) {
                    //console.log("Authenticating...");
                    counter += 1;
                    authService.auth(function () { service.getConf(callback, failCallback, counter) });
                }
                else {
                    //console.log("Loading local temp config...");
                    local.makeConfig(tempConfLib, callback);
                }
            }
        };

        function changeVals(n, o) {
            for (var index in o) {
                var newApp = getAppByName(n, o[index].Name);
                if (newApp) {
                    o[index].pLeft = newApp.pLeft;
                    o[index].pTop = newApp.pTop;
                    o[index].Theme = newApp.Theme;
                    o[index].Orientation = newApp.Orientation;
                }
            }
        }

        function addDeleteApps(n, o) {
            for (var index in n) {
                if(!getAppByName(o, n[index].Name))
                    o.push(n[index]);
            }
            for (var index in o) {
                var app = null;
                for (var i in n)
                    if (o[index].Name == n[i].Name)
                        app = 1;

                if (!app)
                    o.splice(index, 1);
            }
        }

        function getAppByName(list, name) {
            for (var index in list) {
                if (list[index].Name == name)
                    return list[index];
            }
            return null;
        }

        // Voeg hard gecodeerde apps aan de config toe

        local.addFixedToConf = function (conf) {
            //console.log(conf);
            for (index in conf.value) {
                conf.value[index].Apps.push({ "ID": 0, "pTop": "300px", "pLeft": "0px", "Name": "recorder", "Theme": "Theme1", "Orientation": 0 });
                //conf.value[index].Apps.push({ "ID": 10, "Data": "{ \"Items\": 2, \"Rate\": 10, \"URL\": \"http://www.hln.be/rss.xml\" }", "Name": "Claimd", "Orientation": 0, "Theme": "Theme2", "pLeft": "1000px", "pTop": "350px" });
            }
            //console.log("new conf", conf);
            return conf;
        };


        // Voeg hard gecodeerde apps toe aan de config (bv. recorder voor spraakherkenning)
        // Sla config op in de localstorage en voor de callback functie uit

        local.setConfig = function (conf, callback) {
            sConf = local.addFixedToConf(conf);

            var localstorageItem = JSON.stringify(sConf);
            if (localStorage)
                localStorage.setItem("mirror_conf", localstorageItem);

            //console.log("Conf", sConf);

            callback(sConf);
        }

        // Haal de localstorage config op indien aanwezig
        // Check of de localstorage nog geldig is (vervaldatum)
        // indien vervallen --> roep loadNewConfig functie op
        // Indien niet vervallen --> laad locale configuratie file op en roep de setConfig functie op

        local.getConf = function (callback, failCallback) {
            var temp;

            if (localStorage) {
                temp = localStorage.getItem("mirror_conf");
                temp = JSON.parse(temp);
            }
            var sConf = { local: false, value: null, last_updated: null };

            if (!temp) {
                //console.log("New config required, getting config from server ...");
                this.loadNewConfig(callback, failCallback);
            } else if (!temp.last_updated || (new Date(temp.last_updated) - new Date().setSeconds(new Date().getSeconds() - 10)) < 0) {
                //console.log("Reload, getting config from server ...");
                this.loadNewConfig(callback, failCallback);
            } else {
                //console.log("No New config required, getting local file ...");
                sConf.value = temp.value;
                sConf.local = true;
                local.setConfig(sConf, callback);
            }
        }

        // stel config samen om lokaal op te slaan

        local.makeConfig = function (data, callback) {
            var conf = {};

            conf.value = data;
            conf.local = false;
            conf.last_updated = new Date();

            local.setConfig(conf, callback);
        }

        // request opzetten
        // vraag nieuwe config op via dataService

        local.loadNewConfig = function (callback, failCallback) {
            conf = localStorage.getItem("mirror_conf");
            var lastUpdated = null;

            if (conf) {
                conf = JSON.parse(conf);
                lastUpdated = conf.last_updated;
            }

            var request = {
                method: 'POST',
                url: 'https://apimate.azurewebsites.net/api/config/mirror',
                headers: {
                    //"Auhtorization" : "Bearer 8ocLmPhp5gd2l2aMUJY9Rr_pMRcx696PJUBeQUFNwSGFKgs0WhL1gAoH_xg3Jah5O_ZkxELQ3zeYEVrG7PQH2AIl6NYEQG23MtlGh_hGVdfyB-jaN6mW-whvH3UAu0kFzbmozjfz3q7VqsFVMebNtM9V1lJOC8FAz_Cm8Z0ToPwQqWdYwkI-UjudtByY_XLFpFU_W_OUifWhiUDvUDKGbI2-jKDVKY1N7VKp7qaNabluCAoyUH-8YVVZiHvE0Gpv8TA-t0H8nh9hsKqOsICxuOedUxqG6Tap_OiznJausSy3NbxvkCQMX9CdB2a6crwSNugedUIWm1kk_RuoLuLq5mVJh0bfQ21kZTKIeuqymOOYXhtVk3auDTsJ1ivOBKf70zuNfxJGEhGaOKLyFmwuHWZGgpCHEKHW3_dYHz8pK83wIC1joEBVaX-xef1QSZQrfdOf1gEvgjjeTpCm6-1qGs23vpKXcNtP17BRG4gMCI5Xp2sxw9ydA6aPyrMEcLWe",
                    Authorization: "Bearer " + authService.getToken(),
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "userID": '',
                    "key": '',
                    "last_updated": lastUpdated
                })
            };

            dataService.postData(request, function (data) {
                //console.log(data);
                local.makeConfig(data, callback);
            }, failCallback);
        };

        return service;
    }]);
})();
