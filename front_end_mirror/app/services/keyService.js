(function () {
    angular.module('mirrorApp').factory('keyService', ['speechService', '$rootScope', function (speechService, $rootScope) {
        var local = {};
        var service = {
            keyUpPressed: keyUpPressed,
            registerKey: registerKey
        };

        function keyUpPressed(event) {
            console.log(event.keyCode);

            if (local.lib['' + event.keyCode])
                local.lib['' + event.keyCode].func();
        };

        function registerKey(key, name, func) {
            local.lib[key] = {
                name: name,
                func: func,
                status: true
            }
        }

        function listen() {
            local.lib["77"].status = speechService.startStopMic(local.lib['77'].status);
        };       

        local.lib = {
            '77': {
                name: "speech",
                func: listen,
                status: false
            },
            '67': {
                name: "compliment",
                func: function () { $rootScope.showCompliment() },
                status: true
            }            
        };

        return service;
    }]);
})();