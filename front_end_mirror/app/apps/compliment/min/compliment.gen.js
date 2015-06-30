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