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
!function(){angular.module("mirrorApp").controller("timerCtrl",["$scope","speechService","timerService","talkService",function(e,r,t,i){function n(r){clearInterval(m),o=r.duration.value,e.timer=t.formatTimer(o),e.showTimer=!0,m=setInterval(c,1e3),i.talk("Setting timer for "+r.duration.body)}e.showTimer=!1,e.timer=0;var o,m,a=function(){e.timer="TIMER EXPIRED!",setTimeout(function(){e.showTimer=!1},5e3),i.talk("Timer has expired!")},c=function(){o-=1,o>=0?e.timer=t.formatTimer(o):(a(),clearInterval(m)),e.$apply()};r.registerSpeechFunction("zet_timer","timer",n)}])}(),function(){angular.module("mirrorApp").factory("timerService",["confService","mainFormatService",function(e,r){function t(e){return r.formatTime(e)}var i={formatTimer:t};return i}])}();
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
!function(){angular.module("mirrorApp").controller("timerCtrl",["$scope","speechService","timerService","talkService",function(e,r,t,i){function n(r){clearInterval(m),o=r.duration.value,e.timer=t.formatTimer(o),e.showTimer=!0,m=setInterval(c,1e3),i.talk("Setting timer for "+r.duration.body)}e.showTimer=!1,e.timer=0;var o,m,a=function(){e.timer="TIMER EXPIRED!",setTimeout(function(){e.showTimer=!1},5e3),i.talk("Timer has expired!")},c=function(){o-=1,o>=0?e.timer=t.formatTimer(o):(a(),clearInterval(m)),e.$apply()};r.registerSpeechFunction("zet_timer","timer",n)}])}(),function(){angular.module("mirrorApp").factory("timerService",["confService","mainFormatService",function(e,r){function t(e){return r.formatTime(e)}var i={formatTimer:t};return i}])}(),!function(){angular.module("mirrorApp").controller("timerCtrl",["$scope","speechService","timerService","talkService",function(e,r,t,i){function n(r){clearInterval(m),o=r.duration.value,e.timer=t.formatTimer(o),e.showTimer=!0,m=setInterval(c,1e3),i.talk("Setting timer for "+r.duration.body)}e.showTimer=!1,e.timer=0;var o,m,a=function(){e.timer="TIMER EXPIRED!",setTimeout(function(){e.showTimer=!1},5e3),i.talk("Timer has expired!")},c=function(){o-=1,o>=0?e.timer=t.formatTimer(o):(a(),clearInterval(m)),e.$apply()};r.registerSpeechFunction("zet_timer","timer",n)}])}(),function(){angular.module("mirrorApp").factory("timerService",["confService","mainFormatService",function(e,r){function t(e){return r.formatTime(e)}var i={formatTimer:t};return i}])}(),function(){angular.module("mirrorApp").controller("timerCtrl",["$scope","speechService","timerService","talkService",function(e,r,t,i){function n(r){clearInterval(m),o=r.duration.value,e.timer=t.formatTimer(o),e.showTimer=!0,m=setInterval(c,1e3),i.talk("Setting timer for "+r.duration.body)}e.showTimer=!1,e.timer=0;var o,m,a=function(){e.timer="TIMER EXPIRED!",setTimeout(function(){e.showTimer=!1},5e3),i.talk("Timer has expired!")},c=function(){o-=1,o>=0?e.timer=t.formatTimer(o):(a(),clearInterval(m)),e.$apply()};r.registerSpeechFunction("zet_timer","timer",n)}])}(),function(){angular.module("mirrorApp").factory("timerService",["confService","mainFormatService",function(e,r){function t(e){return r.formatTime(e)}var i={formatTimer:t};return i}])}();
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