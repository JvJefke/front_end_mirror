(function () {
    angular.module("mirrorApp", [])

    .controller("mirror",['$scope', 'confService', 'speechService', 'keyService', function($scope, confService, speechService, keyService){
       
        $scope.apps = [];
        $scope.showAll = false;
        $scope.loader = true;
        $scope.showUser = false;
        $scope.username = "user 1";

        const CONFIG_REFRESH_TIME = 10000; //60000 * 5;
        const CONFIG_FAIL_REFRESH_TIME = 5000;
        const USER_ID_SHOW_TIME = 5000;
       
        var loadedConf;
        var confIndex = 0;
        var userTimeout;

        var setConfig = function (conf, bool) {
            loadedConf = conf;
            if (conf) {
                if ($scope.apps.length == 0 || bool) {
                    $scope.apps = conf.value[confIndex].Apps;
                    $scope.loader = false;
                    $scope.showAll = true;
                    $scope.username = "user " + loadedConf.value[confIndex].MemberName;
                    $scope.showUser = true;
                    clearTimeout(userTimeout);
                    userTimeout = setTimeout(function () { $scope.showUser = false; }, USER_ID_SHOW_TIME);
                } else {
                    confService.addDeleteApps(conf.value[confIndex].Apps, $scope.apps);
                    confService.changeVals(conf.value[confIndex].Apps, $scope.apps);
                    $scope.$broadcast("update", conf.value[confIndex].Apps);
                }
                setTimeout(getConf, CONFIG_REFRESH_TIME);
            } else {
                setTimeout(getConf, CONFIG_FAIL_REFRESH_TIME);
            }
        };

        var failGetConf = function (data, status, headers, config) {
            console.log(data, status, headers, config);
        };

        var getConf = function(){
            confService.getConf(setConfig, failGetConf);            
        };

        $scope.keyUpEvent = function(e){
            keyService.keyUpPressed(e);
        };

        function toggleScreen(obj) {
            if (obj && obj.on_off && obj.on_off.value) {
                if (obj.on_off.value == "on" && !$scope.showAll)
                    $scope.showAll = true;
                else if (obj.on_off.value == "off" && $scope.showAll)
                    $scope.showAll = false;
            }
        };      

        function cycleUser() {
            confIndex += 1;
            if (confIndex >= loadedConf.value.length) {
                confIndex = 0;
            }
            setConfig(loadedConf, true);
        };

        keyService.registerKey("83", "cycleUser", cycleUser);
        speechService.registerSpeechFunction("clear", "main", toggleScreen);

        speechService.init();
        getConf();

    }]);

    angular.module("mirrorApp").config(["$controllerProvider", "$provide", "$compileProvider", "$httpProvider", function ($controllerProvider, $provide, $compileProvider, $httpProvider) {
        angular.module("mirrorApp")._controller = angular.module("mirrorApp").controller;
        angular.module("mirrorApp")._service = angular.module("mirrorApp").service;
        angular.module("mirrorApp")._factory = angular.module("mirrorApp").factory;
        angular.module("mirrorApp")._value = angular.module("mirrorApp").value;
        angular.module("mirrorApp")._directive = angular.module("mirrorApp").directive;

        // Provider-based controller.
        angular.module("mirrorApp").controller = function (name, constructor) {

            $controllerProvider.register( name, constructor );
            return( this );

        };

        // Provider-based service.
        angular.module("mirrorApp").service = function (name, constructor) {

            $provide.service( name, constructor );
            return( this );

        };

        // Provider-based factory.
        angular.module("mirrorApp").factory = function (name, factory) {

            $provide.factory( name, factory );
            return( this );

        };

        // Provider-based value.
        angular.module("mirrorApp").value = function (name, value) {

            $provide.value( name, value );
            return( this );

        };

        // Provider-based directive.
        angular.module("mirrorApp").directive = function (name, factory) {

            $compileProvider.directive( name, factory );
            return( this );

        };

        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;
                for (name in obj) {
                    value = obj[name];
                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }
                return query.length ? query.substr(0, query.length - 1) : query;
            };
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];

    }]);
})();
(function () {
    angular.module('mirrorApp').factory('authService', ['dataService', function (dataService) {
        var local = {};
        var service = {
            auth: auth,
            getToken: getToken
        };

        function auth(callback) {
            dataService.postData(local.req, function (data) {
                localStorage.setItem("AI", JSON.stringify(data));
                callback();
            }, callback);
        };

        function getToken() {
            var info = JSON.parse(localStorage.getItem("AI"));
            if (local.checkAuhtInfo(info))
                return info.access_token;
            else
                return null;
        };

        local.checkAuhtInfo = function (info) {
            if (info && info.access_token && info[".expires"]) {
                var date = new Date(info[".expires"]);
                var treshDate = new Date().setTime(new Date().getTime() + 86400000);
                //console.log(date - treshDate);
                if ((date - treshDate) > 0) {
                    return true;
                } else {
                    console.log("Token expired, need new token");
                    return false;
                }
            } else {
                return false;
            }
        }

        local.req = {
            method: 'POST',
            url: 'http://apimate.azurewebsites.net/Token',
            headers: {
                "Content-Type": "x-www-form-urlencoded"
            },
            data: {
                "grant_type": "password",
                "username": "test1@gmail.com",
                "password": "test1234"
            }
        };

        return service;
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('confService', ['tempConfLib', "authService", "dataService", function (tempConfLib, authService, dataService) {
        var local = {};
        var service = {
            getConf: getConf,
            changeVals: changeVals,
            getAppByName: getAppByName,
            addDeleteApps: addDeleteApps
        };

        // Check if token in localstorage is expired: no --> use exesting token, yes --> request new token
        // Request token again if fails (up to 3 times)
        // after 3 times, use hardcoded configuration

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

        // add fixed configuration to config file

        local.addFixedToConf = function (conf) {
            //console.log(conf);
            for (index in conf.value) {
                conf.value[index].Apps.push({ "ID": 0, "pTop": "300px", "pLeft": "0px", "Name": "recorder", "Theme": "Theme1", "Orientation": 0 });
                //conf.value[index].Apps.push({ "ID": 10, "Data": "{ \"Items\": 2, \"Rate\": 10, \"URL\": \"http://www.hln.be/rss.xml\" }", "Name": "Claimd", "Orientation": 0, "Theme": "Theme2", "pLeft": "1000px", "pTop": "350px" });
            }
            //console.log("new conf", conf);
            return conf;
        };

        // add fixed apps to configuration (eg. recorder for speech recognition)C
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

(function () {
    angular.module('mirrorApp').factory('dataService', ['$http', function ($http) {
        var local = {};
        var service = {
            getData: getData,
            postData: postData,
            getJSONFromXML: getJSONFromXML,
            getUrlFromRSS: getUrlFromRSS
        };

        function getData(sSource, callback, errCallback, extraData) {
            $http.get(encodeURI(sSource)).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config, extraData);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config, extraData);
            });
        };

        function postData(sSource, indata, callback, errCallback) {
            $http.post(encodeURI(sSource), indata).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config);
            });
        };

        function postData(request, callback, errCallback) {
            $http(request).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config);
            });
        };

        function getJSONFromXML(source, callback, errCallback) {
            $.feedToJson({
                feed: source,
                success: function (data) {
                    if (callback)
                        callback(data);
                },
                error: function (data) {
                    if (errCallback)
                        errCallback(data);
                }
            });
        };       

        function getUrlFromRSS(item) {
            var item = JSON.stringify(item);
            var counter = local.extensionLib.length - 1;
            var val;

            while (!val && counter >= 0) {
                if (item.indexOf(local.extensionLib[counter]) != -1)
                    val = local.getUrlFromPosition(item, local.extensionLib[counter])
                counter--;
            }

            return val;

        };

        local.extensionLib = [".jpg", ".png", ".gif", ".jpeg", ".tiff", ".svg"]

        local.getUrlFromPosition = function (item, type) {
            var index = item.indexOf(type);
            var endIndex = index + type.length;
            var temp = item.substring(0, endIndex);
            var lastIndex = temp.lastIndexOf("\"");
            var temp2 = temp.slice(lastIndex + 1);

            return temp2;
        }

        return service;
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('keyService', ['speechService', '$rootScope', function (speechService, $rootScope) {
        var local = {};
        var service = {
            keyUpPressed: keyUpPressed,
            registerKey: registerKey
        };

        function keyUpPressed(event) {
            console.log(event.keyCode);

            if (local.lib['' + event.keyCode])
                local.lib['' + event.keyCode].func();
        };

        function registerKey(key, name, func) {
            local.lib[key] = {
                name: name,
                func: func,
                status: true
            }
        }

        function listen() {
            local.lib["77"].status = speechService.startStopMic(local.lib['77'].status);
        };       

        local.lib = {
            '77': {
                name: "speech",
                func: listen,
                status: false
            },
            '67': {
                name: "compliment",
                func: function () { $rootScope.showCompliment() },
                status: true
            }            
        };

        return service;
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('mainFormatService', [function () {
        var local = {};
        var service = {
            formatTime: formatTime,
            ISODateString: ISODateString
        };

       function formatTime(sTimer) {
            var formatter;
            if (sTimer > 60) {
                var mtemp = Math.floor(sTimer / 60);
                var stemp = sTimer % 60;

                if (mtemp > 60) {
                    var utemp = Math.floor(mtemp / 60);
                    var mtemp = mtemp % 60;

                    if (utemp > 24)
                        var dtemp = Math.floor(utemp / 24);
                    var utemp = utemp % 24;
                }
            } else {
                var stemp = sTimer;
            }



            if (stemp != undefined && mtemp != undefined && utemp != undefined && dtemp != undefined)
                formatter = local.tdf(dtemp) + ":" + local.tdf(utemp) + ":" + local.tdf(mtemp) + ":" + local.tdf(stemp);
            else if (stemp != undefined && mtemp != undefined && utemp != undefined)
                formatter = local.tdf(utemp) + ":" + local.tdf(mtemp) + ":" + local.tdf(stemp);
            else if (stemp != undefined && mtemp != undefined)
                formatter = local.tdf(mtemp) + ":" + local.tdf(stemp);
            else if (stemp != undefined)
                formatter = "00:" + local.tdf(stemp);

            if (formatter)
                return formatter;
            else
                return null;
       };

       function ISODateString(d) {
           function pad(n) { return n < 10 ? '0' + n : n }
           return d.getUTCFullYear() + '-'
                + pad(d.getUTCMonth() + 1) + '-'
                + pad(d.getUTCDate()) + 'T'
                + pad(d.getUTCHours()) + ':'
                + pad(d.getUTCMinutes()) + ':'
                + pad(d.getUTCSeconds()) + 'Z'
       }

       local.tdf = function (val) {
           //console.log((""+val).length, val);
           if (val != undefined && ("" + val).length < 2) {
               return "0" + val;
           } else {
               return val;
           }
       };

        return service;
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('speechService', ['$rootScope', 'confService', 'talkService', function ($rootScope, confService, talkService) {
        var local = {};
        var service = {
            init: init,
            startStopMic: startStopMic,
            registerSpeechFunction: registerSpeechFunction,
            registerMic: registerMic
        };

        function init() {
            local.mic = new Wit.Microphone();
            local.info = function (msg) {
                console.log("info", msg);
            };
            local.error = function (msg) {
                console.log("err:", msg);
            };
            local.mic.onready = function () {
                local.info("Microphone is ready to record");
            };
            local.mic.onaudiostart = function () {
                local.info("Recording started");
            };
            local.mic.onaudioend = function () {
                local.info("Recording stopped, processing started");
            };
            local.mic.onresult = function (intent, entities) {

                if (local.lib[intent])
                    local.lib[intent].func(entities);
                else
                    console.log("function does not exist for the command: " + intent);

            };
            local.mic.onerror = function (err) {
                local.error("Error: " + err);
            };
            local.mic.onconnecting = function () {
                local.info("Microphone is connecting");
                setTimeout(function () {
                    window.parent.postMessage({ speech: true }, "http://localhost:3333");
                }, 7000);
            };
            local.mic.ondisconnected = function () {
                local.info("Microphone is not connected");
                local.connect(2000);
            };

            local.connect(10000);
        };

        local.connect = function(time){
            setTimeout(function () { local.mic.connect("7YH3Q2CYLASQKAV6NHURHPZOQTFYA47N") }, time);
        }

        function startStopMic(bool) {
            if (bool) {
                local.mic.start();
                local.micLib[bool]();
            } else {
                local.mic.stop();
                local.micLib[bool]();
            }

            return !bool;
        };

        function registerSpeechFunction(name, appName, func) {
            local.lib[name] = {
                'appName': appName,
                'func': func
            }
        }

        function registerMic(funcTrue, funcFalse) {
            local.micLib[true] = funcTrue;
            local.micLib[false] = funcFalse;
        }

        local.lib = {           
            'hello': {
                'appName': 'main',
                'func': function (obj) {
                    talkService.talk("Hello everyone, I'm the mirror mate. Nice to meet you");
                }
            },
            "whatami": {
                'appName': 'main',
                'func': function (obj) {
                    talkService.talk("I'm a smart mirror that shows useful information on top of your awesome reflection.");
                }
            },
            "thankyou": {
                'appName': 'main',
                'func': function (obj) {
                    talkService.talk("You're welcome!");
                }
            }
        };

        local.micLib = {
            true: function () {
                console.log("mic still initializing ...");
            },
            false: function () {
                console.log("mic still initializing ...");
            }
        }

        return service;
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('talkService', [function (speechService, $rootScope) {
        var service = {};
        var local = {};

        //local.audio = document.createElement("audio");

        /*local.sound = {
            tracks: {},
            enabled: true,
            template: function (src) {
                return '<embed style="height:0" loop="false" src="' + src + '" autostart="true" hidden="true"/>';
            },
            play: function (url, options) {
                if (!this.enabled)
                    return;
                var settings = $.extend({
                    url: url,
                    timeout: 2000
                }, options);
    
                if (settings.track) {
                    if (this.tracks[settings.track]) {
                        var current = this.tracks[settings.track];
                        // TODO check when Stop is avaiable, certainly not on a jQuery object
                        current.Stop && current.Stop();
                        current.remove();
                    }
                }
    
                var element = $(this.template(settings.url));
    
                element.appendTo("body");
    
                if (settings.track) {
                    this.tracks[settings.track] = element;
                }
    
                if (options) {
                    setTimeout(function () {
                        element.remove();
                    }, options.timeout)
                }
    
                return element;
            }
        };*/

        service.talk = function (val) {
            /*var url = "http://api.voicerss.org/?key=c9826c9707fa4c56a29b3792e56596b0&src=" + encodeURIComponent(val) + "&hl=en-us&c=wav";
            console.log("talk");
            var audio = document.getElementById("audioID");
            audio.setAttribute('src', url);
            audio.load();
            audio.play();*/

            /*var audio = document.createElement("audio");
            audio.setAttribute('src', url);
            audio.load();        
            audio.play();*/

            window.parent.postMessage({ voice: { value: val } }, "http://localhost:3333");

        };

        return service;
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('keyLib', ['$rootScope', function ($rootScope) {
        var local = {};

        local.listen = function () {
            local.lib["77"].status = speechService.startStopMic(local.lib['77'].status);
        }

        local.lib = null;

        return local.lib;
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('styleLib', [function ($rootScope) {
        var lib = {};

        lib.style1 = [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#4d1111"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "color": "#ffffff",
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "color": "#bbbbbb"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#080000"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#99d7e3"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
        ];

        return lib;
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('tempConfLib', [function () {


        return [
            {
                "ID": 1,
                "isActive": true,
                "MeberID": 1,
                "MemberName": "Member1",
                "Apps": [
                    {
                        "ID": 1,
                        "ConfigID": 1,
                        "Data": JSON.stringify({ "TimeZone": "TOBEADDED" }),
                        "isActive": true,
                        "Name": "time",
                        "pTop": "0px",
                        "pLeft": "0px"
                    }, {
                        "ID": 2,
                        "ConfigID": 2,
                        "Data": JSON.stringify({ "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4" }),
                        "Name": "calendar",
                        "isActive": true,
                        "pTop": "0px",
                        "pLeft": "1440px"
                        /*"pLeft":"1000px"*/
                    }, {
                        "ID": 3,
                        "ConfigID": 3,
                        "Data": JSON.stringify({ "Location": "Kortrijk,be" }),
                        "isActive": true,
                        "Name": "weather",
                        "pTop": "318px",
                        "pLeft": "0px"
                    }, {
                        "ID": 4,
                        "ConfigID": 4,
                        "Data": JSON.stringify({ "URL": "http://feeds.nieuwsblad.be/nieuws/snelnieuws?format=xml" }),
                        "isActive": true,
                        "Name": "news",
                        "pTop": "689px",
                        "pLeft": "1440px"
                        /*"pLeft": "500px",
                        "pTop": "400px"*/
                    }, {
                        "ID": 5,
                        "ConfigID": 5,
                        "Data": JSON.stringify({ "text": "Welcome to the future of IT" }),
                        "isActive": true,
                        "Name": "compliment",
                        "pLeft": "562px",
                        "pTop": "515px"
                    }, {
                        "ID": 500,
                        "ConfigID": 500,
                        "Data": JSON.stringify({ "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"] }),
                        "isActive": true,
                        "Name": "reminders",
                        "pTop": "950px",
                        "pLeft": "684px"
                    }, {
                        "ID": 222,
                        "ConfigID": 222,
                        "Data": JSON.stringify(null),
                        "isActive": true,
                        "Name": "timer",
                        "pTop": "53px",
                        "pLeft": "836px"
                    }, {
                        "ID": 444,
                        "ConfigID": 444,
                        "Data": JSON.stringify(null),
                        "isActive": true,
                        "Name": "qod",
                        "pTop": "918px",
                        "pLeft": "0px",
                    }
                ]
            },
            {
                "ID": 2,
                "isActive": true,
                "MeberID": 2,
                "MemberName": "Member2",
                "Apps": [
                    {
                        "ID": 1,
                        "ConfigID": 1,
                        "Data": JSON.stringify({ "TimeZone": "TOBEADDED" }),
                        "isActive": true,
                        "Name": "time",
                        "pTop": "0px",
                        "pLeft": "0px"
                    }, {
                        "ID": 2,
                        "ConfigID": 2,
                        "Data": JSON.stringify({ "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4" }),
                        "Name": "calendar",
                        "isActive": true,
                        "pTop": "0px",
                        "pLeft": "1440px"
                    }, {
                        "ID": 3,
                        "ConfigID": 3,
                        "Data": JSON.stringify({ "Location": "Kortrijk,be" }),
                        "isActive": true,
                        "Name": "weather",
                        "pTop": "318px",
                        "pLeft": "0px"
                    }, {
                        "ID": 4,
                        "ConfigID": 4,
                        "Data": JSON.stringify({ "URL": "http://www.hln.be/rss.xml" }),
                        "isActive": true,
                        "Name": "news",
                        "pTop": "689px",
                        "pLeft": "1440px"
                    }, {
                        "ID": 5,
                        "ConfigID": 5,
                        "Data": JSON.stringify({ "text": "Welcome to the future of IT" }),
                        "isActive": true,
                        "Name": "compliment",
                        "pLeft": "562px",
                        "pTop": "515px"
                    }, {
                        "ID": 500,
                        "ConfigID": 500,
                        "Data": JSON.stringify({ "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"] }),
                        "isActive": true,
                        "Name": "reminders",
                        "pTop": "950px",
                        "pLeft": "684px"
                    }, {
                        "ID": 222,
                        "ConfigID": 222,
                        "Data": JSON.stringify(null),
                        "isActive": true,
                        "Name": "timer",
                        "pTop": "53px",
                        "pLeft": "0px"
                    }, {
                        "ID": 333,
                        "ConfigID": 333,
                        "Data": JSON.stringify({ "from": "Graaf Karel de Goedelaan 38, Kortrijk", "to": "Kontich, veldkant 33A" }),
                        "isActive": true,
                        "Name": "traffic",
                        "pTop": "864px",
                        "pLeft": "0px"
                    }
                ]
            }
        ];




        /*return [
                {
                    "ID": 0,
                    "isActive": true,
                    "MeberID": "Member1",
                    "MemberName": "Member1",
                    "Time":
                        {
                            "ID": 1,
                            "TimeZone": "TOBEADDED",
                            "pTop": "10px",
                            "pLeft": "45px"
                        },
                    "Calendar":
                        {
                            "ID": 1,
                            "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4",
                            "pTop": "30px",
                            "pLeft": "1440px"
                        },
                    "Weather":
                        {
                            "ID": 1,
                            "Location": "Kortrijk,be",
                            "pTop": "300px",
                            "pLeft": "10px"
                        },
                    "News":
                        {
                            "ID": 1,
                            "URL": "http://www.hln.be/rss.xml",
                            "pTop": "650px",
                            "pLeft": "1440px"
                        },
                    "compliment":
                        {
                            "ID": 3,
                            "text": "Welcome to the future of IT",
                            "pLeft": "0px",
                            "pTop": "515px"
                        },
                    "reminders":
                        {
                            "ID": 500,
                            "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"],
                            "pTop": "950px",
                            "pLeft": "0px"
                        },
                    "timer":
                        {
                            "ID": 222,
                            "pTop": "50px",
                            "pLeft": "0px"
                        },
                    "qod":
                        {
                            "ID": 444,
                            "pTop": "910px",
                            "pLeft": "10px",
                        }
    
                },
                {
                    "ID": 0,
                    "UserID": 0,
                    "Time":
                        {
                            "ID": 1,
                            "TimeZone": "TOBEADDED",
                            "pTop": "10px",
                            "pLeft": "45px"
                        },
                    "Calendar":
                        {
                            "ID": 1,
                            "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4",
                            "pTop": "30px",
                            "pLeft": "1440px"
                        },
                    "Weather":
                        {
                            "ID": 1,
                            "Location": "Kortrijk,be",
                            "pTop": "300px",
                            "pLeft": "10px"
                        },
                    "News":
                        {
                            "ID": 1,
                            "URL": "http://www.hln.be/rss.xml",
                            "pTop": "450px",
                            "pLeft": "1440px"
                        },
                    "compliment":
                        {
                            "ID": 3,
                            "text": "Changing your reflection",
                            "pLeft": "0px",
                            "pTop": "515px"
                        },
                    "reminders":
                        {
                            "ID": 500,
                            "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"],
                            "pTop": "950px",
                            "pLeft": "0px"
                        },
                    "timer":
                        {
                            "ID": 222,
                            "pTop": "50px",
                            "pLeft": "0px"
                        },
                    "traffic":
                        {
                            "ID": 333,
                            "pTop": "150px",
                            "pLeft": "350px"
                        }
                },
                {
                    "ID": 0,
                    "UserID": 0,
                    "Time":
                        {
                            "ID": 1,
                            "TimeZone": "TOBEADDED",
                            "pTop": "10px",
                            "pLeft": "45px"
                        },
                    "Calendar":
                        {
                            "ID": 1,
                            "URL": "https://www.googleapis.com/calendar/v3/calendars/njseea92o8odc971dgunvtoaco%40group.calendar.google.com/events?&key=AIzaSyAawABJun_uk9-j10X9KxlI07r56bf7s-4",
                            "pTop": "30px",
                            "pLeft": "1440px"
                        },
                    "Weather":
                        {
                            "ID": 1,
                            "Location": "Kortrijk,be",
                            "pTop": "600px",
                            "pLeft": "10px"
                        },
                    "News":
                        {
                            "ID": 1,
                            "URL": "http://www.hln.be/rss.xml",
                            "pTop": "650px",
                            "pLeft": "1440px"
                        },
                    "compliment":
                        {
                            "ID": 3,
                            "text": "Changing your reflection",
                            "pLeft": "0px",
                            "pTop": "515px"
                        },
                    "reminders":
                        {
                            "ID": 500,
                            "items": ["Don't forget to take out the trash!", "Can you bring milk from the store?", "Pay the bills"],
                            "pTop": "950px",
                            "pLeft": "0px"
                        },
                    "timer":
                        {
                            "ID": 222,
                            "pTop": "50px",
                            "pLeft": "0px"
                        }
                }
        ];*/
    }]);
})();
(function () {
    angular.module('mirrorApp').directive('myApp', ['confService', function (confService) {
        return {
            restrict: 'E',
            scope: {
                app: '=app',
                apps: '=apps'
            },
            templateUrl: "./app/directives/appDirective/my-app.html",
            link: function (scope, element) {

                //console.log(scope.app);

                scope.update = {};
                scope.update.func = function () {}

                element.css('top', scope.app.pTop);
                element.css('left', scope.app.pLeft);

                if (scope.app.Data)
                    scope.app.Data = JSON.parse(scope.app.Data);

                var name = scope.app.Name.toLowerCase();
                var theme = scope.app.Theme.toLowerCase();
                var orientation = scope.app.Orientation;

                scope.app.appSrc = "./app/apps/" + name + "/" + theme + "/" + name + orientation + ".html";

                scope.$watch('app.pTop', function (nv) {
                    element.css('top', nv);
                });
                scope.$watch('app.pLeft', function (nv) {
                    element.css('left', nv);
                });
                scope.$watch('app.Theme', function (nv) {
                    theme = nv;
                    scope.app.appSrc = "./app/apps/" + name + "/" + theme + "/" + name + orientation + ".html";
                });
                scope.$watch('app.Orientation', function (nv) {
                    orientation = nv;
                    scope.app.appSrc = "./app/apps/" + name + "/" + theme + "/" + name + orientation + ".html";
                });

                scope.$on("update", function (event, data) {
                    var app = confService.getAppByName(data, scope.app.Name);
                    if (app && typeof(scope.update.func) == 'function')
                        scope.update.func(app);
                });
            },
        }
    }]);
})();


(function () {
    angular.module("mirrorApp").directive('myErrSrc', function () {
        return {
            scope:{
                myErrSrc: "="
            },
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    //console.log("error bind");
                    if (attrs.src != attrs.myErrSrc) {
                        attrs.$set('src', attrs.myErrSrc);
                    }
                });

                attrs.$observe('ngSrc', function (value) {
                    //console.log("blanking", value)
                    if (!value && attrs.errSrc) {
                        attrs.$set('src', attrs.myErrSrc);
                    } else if(!value) {
                        element.css("display", "none");
                    }
                });
            }
        }
    });
})();
(function () {
    angular.module('mirrorApp').directive('myLinuxInputDirective', [function () {
        return {
            restrict: 'A',
            scope: {
                trigger: '=focus'
            },
            link: function (scope, element) {
                scope.$watch('trigger', function (value) {
                    if (value == true) {
                        element[0].focus();
                        scope.trigger = false;
                    }
                })
            }
        }
    }]);
})();
(function () {
    angular.module('mirrorApp').directive('myTemp', [function () {
        return {
            restrict: 'E',
            scope: {
                temp: '=temp',
                pre: '=pre'
            },
            templateUrl: "./app/directives/tempDirective/my-temp.html"
        }
    }]);
})();
(function () {
    angular.module('mirrorApp').directive('myHw', [function () {
        return {
            restrict: 'E',
            scope: {
                hum: '=hum',
                wind: '=wind'
            },
            templateUrl: "./app/directives/wind_humidityDirective/my-wind_hum.html"
        }
    }]);
})();