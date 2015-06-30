(function () {
    angular.module('mirrorApp').controller('timerCtrl', ['$scope', 'speechService', 'timerService', 'talkService', function ($scope, speechService, timerService, talkService) {
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

            if (timer >= 0)
                $scope.timer = timerService.formatTimer(timer);
            else {
                endTimer();
                clearInterval(interval);
            }

            $scope.$apply();
        };


        function setTimer(obj) {
            clearInterval(interval);
            timer = obj.duration.value;
            $scope.timer = timerService.formatTimer(timer);
            $scope.showTimer = true;
            interval = setInterval(tick, 1000);
            talkService.talk("Setting timer for " + obj.duration.body);
        };

        speechService.registerSpeechFunction("zet_timer", "timer", setTimer);
        
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('timerService', ['confService', 'mainFormatService', function (confService, mfService) {
        var service = {
            formatTimer: formatTimer
        };

        function formatTimer(sTimer) {
            return mfService.formatTime(sTimer);
        };

        return service;
    }]);
})();