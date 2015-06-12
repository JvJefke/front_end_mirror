(function () {
    angular.module("mirrorApp",["uiGmapgoogle-maps"])

    .controller("mirror",['$scope', '$rootScope', 'confService', 'speechService', 'keyService', function($scope, $rootScope, confService, speechService, keyService){
        $scope.apps = [];
        $scope.showAll = false;
        $scope.loader = true;

        const CONFIG_REFRESH_TIME = 5000; //60000 * 5;
        const CONFIG_FAIL_REFRESH_TIME = 5000;
       
        var loadedConf;
        var confIndex = 0;

        var setConfig = function (conf) {
            loadedConf = conf;
            if (conf) {
                if ($scope.apps.length == 0) {
                    $scope.apps = conf.value[confIndex].Apps;
                    $rootScope.apps = conf.value[confIndex].Apps;
                    $scope.loader = false;
                    $scope.showAll = true;
                    //console.log($scope.apps);
                } else {
                    confService.changeLocation(conf.value[confIndex].Apps, $scope.apps);
                    //console.log($scope.apps);
                    $scope.$broadcast("update", conf.value[confIndex].Apps);
                }                
                setTimeout(getConf, CONFIG_REFRESH_TIME);
            } else {
                setTimeout(getConf, CONFIG_FAIL_REFRESH_TIME);
            }
        }

        var failGetConf = function (data, status, headers, config) {
            console.log(data, status, headers, config);
        }

        var getConf = function(){
            confService.getConf(setConfig, failGetConf);            
        };

        $scope.keyUpEvent = function(e){
            keyService.keyUpPressed(e);
        };

        $rootScope.toggleScreen = function (obj) {
            //console.log(obj);
            if (obj && obj.on_off && obj.on_off.value) {
                if (obj.on_off.value == "on" && !$scope.showAll)
                    $scope.showAll = true;
                else if (obj.on_off.value == "off" && $scope.showAll)
                    $scope.showAll = false;
            }

        };

        $rootScope.changeUser = function changeUser(index) {
            if (index < loadedConf.value.length) {
                confIndex = index;
                var temp = loadedConf.value[index];

                $scope.apps = temp.Apps;
            }
        };    

        speechService.init();

        //window.parent.postMessage({ voice: {value:"You're looking good today"}}, "http://localhost:8080")

        getConf();

    }]);

    angular.module("mirrorApp").config(["$controllerProvider", "$provide", "$compileProvider", "uiGmapGoogleMapApiProvider", "$httpProvider", function ($controllerProvider, $provide, $compileProvider, GoogleMapApi, $httpProvider) {
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

        GoogleMapApi.configure({
            key: 'AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });

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