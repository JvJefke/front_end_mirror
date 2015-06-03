(function () {
    angular.module('mirrorApp').controller('timeCtrl', ['$scope', function ($scope) {
        $scope.time = changeTime();

        function changeTime() {
            offset = (new Date().getTimezoneOffset() / 60);
            $scope.time = (new Date().setHours(new Date().getHours() + offset + $scope.app.Data.Offset));
        };

        var timeInterval = setInterval(changeTime, 1000);

        $scope.update.func = function (app) {
            var data = JSON.parse(app.Data);
            $scope.app.Data = data;
            //console.log($scope.app.Data.Offset);
            //console.log((new Date().getTimezoneOffset() / 60));
        }
    }]);
})();