(function () {
    angular.module("mirrorApp", [])

    .controller("mirror",['$scope', 'confService', 'speechService', 'keyService', function($scope, confService, speechService, keyService){
       
        $scope.apps = [];
        $scope.showAll = false;
        $scope.loader = true;
        $scope.showUser = false;
        $scope.username = "user 1";

        // refresh times in ms
        const CONFIG_REFRESH_TIME = 10000; //60000 * 5;
        const CONFIG_FAIL_REFRESH_TIME = 5000;
        const USER_ID_SHOW_TIME = 5000;
       
        var loadedConf;
        var confIndex = 0;
        var userTimeout;


        // Gebruik configuratie na het inladen.
        var setConfig = function (conf, bool) {
            loadedConf = conf;

            if (conf) {

                // Indien configuratie nog niet bestaat
                if ($scope.apps.length == 0 || bool) {

                    // laat apps in scope variabele voor directives
                    $scope.apps = conf.value[confIndex].Apps;

                    // hide loader
                    $scope.loader = false;

                    // toon alle apps
                    $scope.showAll = true;

                    // toon username voor x aantal seconden
                    $scope.username = "user " + loadedConf.value[confIndex].MemberName;
                    $scope.showUser = true;
                    clearTimeout(userTimeout);
                    userTimeout = setTimeout(function () { $scope.showUser = false; }, USER_ID_SHOW_TIME);

                } else { // indien configuratie reeds aanwezig is

                    // verwijder of voeg apps toe indien nodig
                    confService.addDeleteApps(conf.value[confIndex].Apps, $scope.apps);

                    // verander waarden van appconfigs indien nodig
                    confService.changeVals(conf.value[confIndex].Apps, $scope.apps);

                    // laat directives weten dat er een update van de configuratie is
                    $scope.$broadcast("update", conf.value[confIndex].Apps);
                }

                // herniew config op na x aantal seconden bij success
                setTimeout(getConf, CONFIG_REFRESH_TIME);
            } else {

                // herniew config op na x aantal seconden bij fail
                setTimeout(getConf, CONFIG_FAIL_REFRESH_TIME);
            }
        };

        var failGetConf = function (data, status, headers, config) {
            console.log(data, status, headers, config);
        };

        // haal nieuwe configuratie op via de confService
        var getConf = function(){
            confService.getConf(setConfig, failGetConf);            
        };

        // vang keyboard input events op, en stuur ze door naar de keyService
        $scope.keyUpEvent = function(e){
            keyService.keyUpPressed(e);
        };

        // toon alle apps of verberg ze allemaal (functie wordt opgeroepen via de speechService)
        function toggleScreen(obj) {

            // check of obj de juiste waarden bevat
            if (obj && obj.on_off && obj.on_off.value) {

                // indien de waarde 'on' is meegegeven en de apps zijn verborgen --> toon alle apps
                if (obj.on_off.value == "on" && !$scope.showAll)
                    $scope.showAll = true;

                // indien de waarde 'off' is meegegeven en de apps zijn zichtbaar --> verberg alle apps
                else if (obj.on_off.value == "off" && $scope.showAll)
                    $scope.showAll = false;
            }
        };      

        // cycle door users (functie wordt opgeroepen via de keyService)
        function cycleUser() {
            confIndex += 1;
            if (confIndex >= loadedConf.value.length) {
                confIndex = 0;
            }
            setConfig(loadedConf, true);
        };

        // registreer toetsenbord knop dat moet opgevangen worden.
        keyService.registerKey("83", "cycleUser", cycleUser); 

        // registreer spraak functie
        speechService.registerSpeechFunction("clear", "main", toggleScreen);

        // start speechrecognition
        speechService.init();

        // haal configuratie op
        getConf();

    }]);

    angular.module("mirrorApp").config(["$controllerProvider", "$provide", "$compileProvider", "$httpProvider", function ($controllerProvider, $provide, $compileProvider, $httpProvider) {

        // zorg ervoor dat controllers, services, factories, values en directives naa bootstrap kunnen gebruikt worden

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

        // configuratie nodig om met onze api te kunnen communiceren

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