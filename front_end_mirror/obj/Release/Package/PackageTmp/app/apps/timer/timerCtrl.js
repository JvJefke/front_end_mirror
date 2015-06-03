(function () {
    angular.module('mirrorApp').controller('timerCtrl', ['$scope', '$rootScope', 'timerService', 'talkService', function ($scope, $rootScope, timerService, talkService) {
        $scope.showTimer = false;
        $scope.timer = 0;
        var timer;
        var interval;

        var endTimer = function () {
            $scope.timer = "TIMER EXPIRED!";
            setTimeout(function () { $scope.showTimer = false; }, 5000);
            talkService.talk("Timer has expired!");
        };

        var tick = function () {
            timer -= 1;
            //console.log("timer", timer);
            if (timer >= 0)
                $scope.timer = timerService.formatTimer(timer);
            else {
                endTimer();
                clearInterval(interval);
            }

            $scope.$apply();
        };

        $rootScope.setTimer = function (obj) {
            //console.log(obj);
            clearInterval(interval);
            timer = obj.duration.value;
            $scope.timer = timerService.formatTimer(timer);
            //console.log("timer", $scope.timer);
            $scope.showTimer = true;
            interval = setInterval(tick, 1000);
            talkService.talk("Setting timer for " + obj.duration.body);
        };
    }]);
})();