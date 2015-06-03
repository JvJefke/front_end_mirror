(function () {
    angular.module('mirrorApp').factory('keyLib', ['$rootScope', function ($rootScope) {
        var local = {};

        local.listen = function () {
            local.lib["77"].status = speechService.startStopMic(local.lib['77'].status);
        }

        local.lib = null;

        return local.lib;
    }]);
})();