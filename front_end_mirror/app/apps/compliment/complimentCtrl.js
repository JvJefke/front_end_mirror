(function () {
    angular.module('mirrorApp').controller('complimentCtrl', ['$scope', "$rootScope", "complimentService", "talkService", "confService", function ($scope, $rootScope, complimentService, talkService, confService) {
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

        $rootScope.showCompliment = function () {
            //console.log("giving compliment...");
            showCompliment();
        };

        $scope.update.func = function (app) {
            if (JSON.stringify($scope.app.Data) != app.Data) {
                $scope.app.Data = JSON.parse(app.Data);
                $scope.size = complimentService.getSize($scope.app.Data.Font);
            }
            
        };
    }]);
})();