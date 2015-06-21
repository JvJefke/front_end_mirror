(function () {
    angular.module('mirrorApp').controller('timeCtrl', ['$scope', function ($scope) {
        $scope.time = changeTime();

        function changeTime() {
            offset = (new Date().getTimezoneOffset() / 60);
            $scope.time = (new Date().setHours(new Date().getHours() + offset + $scope.app.Data.Offset));
            if (!$scope.$$phase) {
                $scope.$apply();
            }
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
!function(){angular.module("mirrorApp").controller("timeCtrl",["$scope",function(e){function t(){offset=(new Date).getTimezoneOffset()/60,e.time=(new Date).setHours((new Date).getHours()+offset+e.app.Data.Offset),e.$$phase||e.$apply()}e.time=t();setInterval(t,1e3);e.update.func=function(t){var a=JSON.parse(t.Data);e.app.Data=a}}])}();
(function () {
    angular.module('mirrorApp').controller('timeCtrl', ['$scope', function ($scope) {
        $scope.time = changeTime();

        function changeTime() {
            offset = (new Date().getTimezoneOffset() / 60);
            $scope.time = (new Date().setHours(new Date().getHours() + offset + $scope.app.Data.Offset));
            if (!$scope.$$phase) {
                $scope.$apply();
            }
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
!function(){angular.module("mirrorApp").controller("timeCtrl",["$scope",function(e){function t(){offset=(new Date).getTimezoneOffset()/60,e.time=(new Date).setHours((new Date).getHours()+offset+e.app.Data.Offset),e.$$phase||e.$apply()}e.time=t();setInterval(t,1e3);e.update.func=function(t){var a=JSON.parse(t.Data);e.app.Data=a}}])}(),!function(){angular.module("mirrorApp").controller("timeCtrl",["$scope",function(e){function t(){offset=(new Date).getTimezoneOffset()/60,e.time=(new Date).setHours((new Date).getHours()+offset+e.app.Data.Offset),e.$$phase||e.$apply()}e.time=t(),setInterval(t,1e3),e.update.func=function(t){var a=JSON.parse(t.Data);e.app.Data=a}}])}(),function(){angular.module("mirrorApp").controller("timeCtrl",["$scope",function(e){function t(){offset=(new Date).getTimezoneOffset()/60,e.time=(new Date).setHours((new Date).getHours()+offset+e.app.Data.Offset),e.$$phase||e.$apply()}e.time=t();setInterval(t,1e3);e.update.func=function(t){var a=JSON.parse(t.Data);e.app.Data=a}}])}();
(function () {
    angular.module('mirrorApp').controller('timeCtrl', ['$scope', function ($scope) {
        $scope.time = changeTime();

        function changeTime() {
            offset = (new Date().getTimezoneOffset() / 60);
            $scope.time = (new Date().setHours(new Date().getHours() + offset + $scope.app.Data.Offset));
            if (!$scope.$$phase) {
                $scope.$apply();
            }
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