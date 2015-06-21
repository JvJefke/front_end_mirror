(function () {
    angular.module('mirrorApp').controller('complimentCtrl', ['$scope', "keyService", "complimentService", "talkService", "speechService", function ($scope, keyService, complimentService, talkService, speechService) {
        $scope.compliment = "";
        $scope.showCompliment = false;
        $scope.size = complimentService.getSize($scope.app.Data.Font);
        var complimentTimeout;

        const DURATION = 10000;

        showCompliment();

        function showCompliment() {
            if ($scope.showCompliment == true) {
                clearTimeout(complimentTimeout);
                setComplimentTimeout();
            } else {
                $scope.compliment = complimentService.getRandomCompliment($scope.app.Data.Items);
                $scope.showCompliment = true;
                setComplimentTimeout();
                talkService.talk($scope.compliment);
            }
        }; 

        function setComplimentTimeout() {
            complimentTimeout = setTimeout(function () { $scope.showCompliment = false }, DURATION);
        }

        keyService.registerKey("67", "compliment", showCompliment);
        speechService.registerSpeechFunction("show_compliment", "compliment", showCompliment);

        $scope.update.func = function (app) {
            if (JSON.stringify($scope.app.Data) != app.Data) {
                $scope.app.Data = JSON.parse(app.Data);
                $scope.size = complimentService.getSize($scope.app.Data.Font);
            }
            
        };
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('complimentService', ['$http', 'dataService', function ($http, dataService) {
        var service = {
            getRandomCompliment: getRandomCompliment,
            getSize: getSize
        };
        var local = {
            getRandomCompliment: getRandom
        };

        // Service functions

        function getRandomCompliment(arr) {
            return local.getRandomCompliment(arr);
        }

        var sizeLib = ["small", "medium", "big"];

        function getSize(id) {
            return sizeLib[id - 1];
        }

        // local functions

        function getRandom(arr) {
            var index = Math.round(Math.random() * (arr.length - 1));
            return arr[index];
        }

        return service;
    }]);
})();
!function(){angular.module("mirrorApp").controller("complimentCtrl",["$scope","keyService","complimentService","talkService","speechService",function(e,t,n,o,i){function m(){1==e.showCompliment?(clearTimeout(r),a()):(e.compliment=n.getRandomCompliment(e.app.Data.Items),e.showCompliment=!0,a(),o.talk(e.compliment))}function a(){r=setTimeout(function(){e.showCompliment=!1},p)}e.compliment="",e.showCompliment=!1,e.size=n.getSize(e.app.Data.Font);var r;const p=1e4;m(),t.registerKey("67","compliment",m),i.registerSpeechFunction("show_compliment","compliment",m),e.update.func=function(t){JSON.stringify(e.app.Data)!=t.Data&&(e.app.Data=JSON.parse(t.Data),e.size=n.getSize(e.app.Data.Font))}}])}(),function(){angular.module("mirrorApp").factory("complimentService",["$http","dataService",function(e,t){function n(e){return a.getRandomCompliment(e)}function o(e){return r[e-1]}function i(e){var t=Math.round(Math.random()*(e.length-1));return e[t]}var m={getRandomCompliment:n,getSize:o},a={getRandomCompliment:i},r=["small","medium","big"];return m}])}();
(function () {
    angular.module('mirrorApp').controller('complimentCtrl', ['$scope', "keyService", "complimentService", "talkService", "speechService", function ($scope, keyService, complimentService, talkService, speechService) {
        $scope.compliment = "";
        $scope.showCompliment = false;
        $scope.size = complimentService.getSize($scope.app.Data.Font);
        var complimentTimeout;

        const DURATION = 10000;

        showCompliment();

        function showCompliment() {
            if ($scope.showCompliment == true) {
                clearTimeout(complimentTimeout);
                setComplimentTimeout();
            } else {
                $scope.compliment = complimentService.getRandomCompliment($scope.app.Data.Items);
                $scope.showCompliment = true;
                setComplimentTimeout();
                talkService.talk($scope.compliment);
            }
        }; 

        function setComplimentTimeout() {
            complimentTimeout = setTimeout(function () { $scope.showCompliment = false }, DURATION);
        }

        keyService.registerKey("67", "compliment", showCompliment);
        speechService.registerSpeechFunction("show_compliment", "compliment", showCompliment);

        $scope.update.func = function (app) {
            if (JSON.stringify($scope.app.Data) != app.Data) {
                $scope.app.Data = JSON.parse(app.Data);
                $scope.size = complimentService.getSize($scope.app.Data.Font);
            }
            
        };
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('complimentService', ['$http', 'dataService', function ($http, dataService) {
        var service = {
            getRandomCompliment: getRandomCompliment,
            getSize: getSize
        };
        var local = {
            getRandomCompliment: getRandom
        };

        // Service functions

        function getRandomCompliment(arr) {
            return local.getRandomCompliment(arr);
        }

        var sizeLib = ["small", "medium", "big"];

        function getSize(id) {
            return sizeLib[id - 1];
        }

        // local functions

        function getRandom(arr) {
            var index = Math.round(Math.random() * (arr.length - 1));
            return arr[index];
        }

        return service;
    }]);
})();
!function(){angular.module("mirrorApp").controller("complimentCtrl",["$scope","keyService","complimentService","talkService","speechService",function(e,t,n,o,i){function m(){1==e.showCompliment?(clearTimeout(r),a()):(e.compliment=n.getRandomCompliment(e.app.Data.Items),e.showCompliment=!0,a(),o.talk(e.compliment))}function a(){r=setTimeout(function(){e.showCompliment=!1},p)}e.compliment="",e.showCompliment=!1,e.size=n.getSize(e.app.Data.Font);var r;const p=1e4;m(),t.registerKey("67","compliment",m),i.registerSpeechFunction("show_compliment","compliment",m),e.update.func=function(t){JSON.stringify(e.app.Data)!=t.Data&&(e.app.Data=JSON.parse(t.Data),e.size=n.getSize(e.app.Data.Font))}}])}(),function(){angular.module("mirrorApp").factory("complimentService",["$http","dataService",function(e,t){function n(e){return a.getRandomCompliment(e)}function o(e){return r[e-1]}function i(e){var t=Math.round(Math.random()*(e.length-1));return e[t]}var m={getRandomCompliment:n,getSize:o},a={getRandomCompliment:i},r=["small","medium","big"];return m}])}(),!function(){angular.module("mirrorApp").controller("complimentCtrl",["$scope","keyService","complimentService","talkService","speechService",function(e,t,n,o,i){function m(){1==e.showCompliment?(clearTimeout(r),a()):(e.compliment=n.getRandomCompliment(e.app.Data.Items),e.showCompliment=!0,a(),o.talk(e.compliment))}function a(){r=setTimeout(function(){e.showCompliment=!1},p)}e.compliment="",e.showCompliment=!1,e.size=n.getSize(e.app.Data.Font);var r;const p=1e4;m(),t.registerKey("67","compliment",m),i.registerSpeechFunction("show_compliment","compliment",m),e.update.func=function(t){JSON.stringify(e.app.Data)!=t.Data&&(e.app.Data=JSON.parse(t.Data),e.size=n.getSize(e.app.Data.Font))}}])}(),function(){angular.module("mirrorApp").factory("complimentService",["$http","dataService",function(e,t){function n(e){return a.getRandomCompliment(e)}function o(e){return r[e-1]}function i(e){var t=Math.round(Math.random()*(e.length-1));return e[t]}var m={getRandomCompliment:n,getSize:o},a={getRandomCompliment:i},r=["small","medium","big"];return m}])}(),function(){angular.module("mirrorApp").controller("complimentCtrl",["$scope","keyService","complimentService","talkService","speechService",function(e,t,n,o,i){function m(){1==e.showCompliment?(clearTimeout(r),a()):(e.compliment=n.getRandomCompliment(e.app.Data.Items),e.showCompliment=!0,a(),o.talk(e.compliment))}function a(){r=setTimeout(function(){e.showCompliment=!1},p)}e.compliment="",e.showCompliment=!1,e.size=n.getSize(e.app.Data.Font);var r;const p=1e4;m(),t.registerKey("67","compliment",m),i.registerSpeechFunction("show_compliment","compliment",m),e.update.func=function(t){JSON.stringify(e.app.Data)!=t.Data&&(e.app.Data=JSON.parse(t.Data),e.size=n.getSize(e.app.Data.Font))}}])}(),function(){angular.module("mirrorApp").factory("complimentService",["$http","dataService",function(e,t){function n(e){return a.getRandomCompliment(e)}function o(e){return r[e-1]}function i(e){var t=Math.round(Math.random()*(e.length-1));return e[t]}var m={getRandomCompliment:n,getSize:o},a={getRandomCompliment:i},r=["small","medium","big"];return m}])}();
(function () {
    angular.module('mirrorApp').controller('complimentCtrl', ['$scope', "keyService", "complimentService", "talkService", "speechService", function ($scope, keyService, complimentService, talkService, speechService) {
        $scope.compliment = "";
        $scope.showCompliment = false;
        $scope.size = complimentService.getSize($scope.app.Data.Font);
        var complimentTimeout;

        const DURATION = 10000;

        showCompliment();

        function showCompliment() {
            if ($scope.showCompliment == true) {
                clearTimeout(complimentTimeout);
                setComplimentTimeout();
            } else {
                $scope.compliment = complimentService.getRandomCompliment($scope.app.Data.Items);
                $scope.showCompliment = true;
                setComplimentTimeout();
                talkService.talk($scope.compliment);
            }
        }; 

        function setComplimentTimeout() {
            complimentTimeout = setTimeout(function () { $scope.showCompliment = false }, DURATION);
        }

        keyService.registerKey("67", "compliment", showCompliment);
        speechService.registerSpeechFunction("show_compliment", "compliment", showCompliment);

        $scope.update.func = function (app) {
            if (JSON.stringify($scope.app.Data) != app.Data) {
                $scope.app.Data = JSON.parse(app.Data);
                $scope.size = complimentService.getSize($scope.app.Data.Font);
            }
            
        };
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('complimentService', ['$http', 'dataService', function ($http, dataService) {
        var service = {
            getRandomCompliment: getRandomCompliment,
            getSize: getSize
        };
        var local = {
            getRandomCompliment: getRandom
        };

        // Service functions

        function getRandomCompliment(arr) {
            return local.getRandomCompliment(arr);
        }

        var sizeLib = ["small", "medium", "big"];

        function getSize(id) {
            return sizeLib[id - 1];
        }

        // local functions

        function getRandom(arr) {
            var index = Math.round(Math.random() * (arr.length - 1));
            return arr[index];
        }

        return service;
    }]);
})();