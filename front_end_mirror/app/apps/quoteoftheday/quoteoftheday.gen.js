(function () {
    angular.module('mirrorApp').controller('qodCtrl', ['$scope', '$rootScope', 'qodService', function ($scope, $rootScope, qodService) {
        $scope.qod = "";

        var setQod = function (data) {
            $scope.qod = data.contents.quote;
            $scope.author = data.contents.author;
        }

        var failQod = function (a,b,c,d) {
            console.log(a,b,c,d)
        }

        var init = function () {
            qodService.getQod(setQod, failQod);
        }

        init();
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('qodService', ['$http', 'dataService', function ($http, dataService) {
        var local = {};
        var service = {
            getQod: getQod
        };

        function getQod(callback, failCallback) {
            dataService.getData("http://api.theysaidso.com/qod.json", callback, failCallback);
        }

        return service;
    }]);
})();
(function () {
    angular.module('mirrorApp').controller('qodCtrl', ['$scope', '$rootScope', 'qodService', function ($scope, $rootScope, qodService) {
        $scope.qod = "";

        var setQod = function (data) {
            $scope.qod = data.contents.quote;
            $scope.author = data.contents.author;
        }

        var failQod = function (a,b,c,d) {
            console.log(a,b,c,d)
        }

        var init = function () {
            qodService.getQod(setQod, failQod);
        }

        init();
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('qodService', ['$http', 'dataService', function ($http, dataService) {
        var local = {};
        var service = {
            getQod: getQod
        };

        function getQod(callback, failCallback) {
            dataService.getData("http://api.theysaidso.com/qod.json", callback, failCallback);
        }

        return service;
    }]);
})();
(function () {
    angular.module('mirrorApp').controller('qodCtrl', ['$scope', '$rootScope', 'qodService', function ($scope, $rootScope, qodService) {
        $scope.qod = "";

        var setQod = function (data) {
            $scope.qod = data.contents.quote;
            $scope.author = data.contents.author;
        }

        var failQod = function (a,b,c,d) {
            console.log(a,b,c,d)
        }

        var init = function () {
            qodService.getQod(setQod, failQod);
        }

        init();
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('qodService', ['$http', 'dataService', function ($http, dataService) {
        var local = {};
        var service = {
            getQod: getQod
        };

        function getQod(callback, failCallback) {
            dataService.getData("http://api.theysaidso.com/qod.json", callback, failCallback);
        }

        return service;
    }]);
})();
!function(){angular.module("mirrorApp").controller("qodCtrl",["$scope","$rootScope","qodService",function(o,t,n){o.qod="";var r=function(t){o.qod=t.contents.quote,o.author=t.contents.author},e=function(o,t,n,r){console.log(o,t,n,r)},c=function(){n.getQod(r,e)};c()}])}(),function(){angular.module("mirrorApp").factory("qodService",["$http","dataService",function(o,t){function n(o,n){t.getData("http://api.theysaidso.com/qod.json",o,n)}var r={getQod:n};return r}])}();
!function(){angular.module("mirrorApp").controller("qodCtrl",["$scope","$rootScope","qodService",function(o,t,n){o.qod="";var r=function(t){o.qod=t.contents.quote,o.author=t.contents.author},e=function(o,t,n,r){console.log(o,t,n,r)},c=function(){n.getQod(r,e)};c()}])}(),function(){angular.module("mirrorApp").factory("qodService",["$http","dataService",function(o,t){function n(o,n){t.getData("http://api.theysaidso.com/qod.json",o,n)}var r={getQod:n};return r}])}(),function(){angular.module("mirrorApp").controller("qodCtrl",["$scope","$rootScope","qodService",function(o,t,n){o.qod="";var r=function(t){o.qod=t.contents.quote,o.author=t.contents.author},e=function(o,t,n,r){console.log(o,t,n,r)},c=function(){n.getQod(r,e)};c()}])}(),function(){angular.module("mirrorApp").factory("qodService",["$http","dataService",function(o,t){function n(o,n){t.getData("http://api.theysaidso.com/qod.json",o,n)}var r={getQod:n};return r}])}(),!function(){angular.module("mirrorApp").controller("qodCtrl",["$scope","$rootScope","qodService",function(o,t,n){o.qod="";var r=function(t){o.qod=t.contents.quote,o.author=t.contents.author},e=function(o,t,n,r){console.log(o,t,n,r)},c=function(){n.getQod(r,e)};c()}])}(),function(){angular.module("mirrorApp").factory("qodService",["$http","dataService",function(o,t){function n(o,n){t.getData("http://api.theysaidso.com/qod.json",o,n)}var r={getQod:n};return r}])}();