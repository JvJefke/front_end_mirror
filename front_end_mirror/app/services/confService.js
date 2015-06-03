(function () {
    angular.module('mirrorApp').factory('confService', ['tempConfLib', "authService", "dataService", function (tempConfLib, authService, dataService) {
        var local = {};
        var service = {
            getConf: getConf,
            changeLocation: changeLocation,
            getAppByName: getAppByName
        };

        // Check if token in localstorage is expired: no --> use exesting token, yes --> request new token
        // Request token again if fails (up to 3 times)
        // after 3 times, use hardcoded configuration

        function getConf(callback, failCallback, counter) {
            //local.makeConfig(tempConfLib, callback);

            if (!counter)
                counter = 0;

            if (authService.getToken()) {
                if (!counter)
                    console.log("Token not yet expired");
                local.getConf(callback, failCallback);
            } else {
                if (counter < 3) {
                    console.log("Authenticating...");
                    counter += 1;
                    authService.auth(function () { service.getConf(callback, failCallback, counter) });
                }
                else {
                    console.log("Loading local temp config...");
                    local.makeConfig(tempConfLib, callback);
                }
            }
        };

        function changeLocation(n, o) {
            for (var index in o) {
                var newApp = getAppByName(n, o[index].Name);
                if (newApp) {
                    //console.log(o[index], newApp);
                    o[index].pLeft = newApp.pLeft;
                    o[index].pTop = newApp.pTop
                }
            }
        }

        function getAppByName(list, name) {
            for (var index in list) {
                if (list[index].Name == name)
                    return list[index];
            }
            return null;
        }

        // add fixed configuration to config file

        local.addFixedToConf = function (conf) {
            //console.log(conf);
            for (index in conf.value) {
                conf.value[index].Apps.push({ "ID": 0, "pTop": "300px", "pLeft": "0px", "Name": "recorder", "Theme": "Theme1" });
            }
            //console.log("new conf", conf);
            return conf;
        };

        // add fixed apps to configuration (eg. recorder for speech recognition)
        // save currrent config in localstorage and fire callback of initial function

        local.setConfig = function (conf, callback) {
            sConf = local.addFixedToConf(conf);

            var localstorageItem = JSON.stringify(sConf);
            if (localStorage)
                localStorage.setItem("mirror_conf", localstorageItem);

            //console.log("Conf", sConf);

            callback(sConf);
        }

        // get localstorage config if present
        // check if localstorage config is still valid (expire_date)
        // if expired or not present --> call loadNewConfig function
        // if not expired --> load local file and call setConfig function


        local.getConf = function (callback, failCallback) {
            var temp;

            if (localStorage) {
                temp = localStorage.getItem("mirror_conf");
                temp = JSON.parse(temp);
            }
            var sConf = { local: false, value: null, last_updated: null };

            if (!temp) {
                console.log("New config required, getting config from server ...");
                this.loadNewConfig(callback, failCallback);
            } else if (!temp.last_updated || (new Date(temp.last_updated) - new Date().setSeconds(new Date().getSeconds() - 10)) < 0) {
                console.log("Reload, getting config from server ...");
                this.loadNewConfig(callback, failCallback);
            } else {
                console.log("No New config required, getting local file ...");
                sConf.value = temp.value;
                sConf.local = true;
                local.setConfig(sConf, callback);
            }
        }

        // put server config in local config

        local.makeConfig = function (data, callback) {
            var conf = {};

            conf.value = data;
            conf.local = false;
            conf.last_updated = new Date();

            local.setConfig(conf, callback);
        }

        // set up request
        // request new config through dataService

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
