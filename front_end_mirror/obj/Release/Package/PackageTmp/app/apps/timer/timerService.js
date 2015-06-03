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