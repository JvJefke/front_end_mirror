(function () {
    angular.module('mirrorApp').factory('keyService', ['speechService', '$rootScope', function (speechService, $rootScope) {
        var local = {};
        var service = {
            keyUpPressed: keyUpPressed,
            registerKey: registerKey
        };

        // Voer de juiste functie uit wanneer een bepaalde knop ingeduwd is.
        function keyUpPressed(event) {
            //console.log(event.keyCode);

            if (local.lib['' + event.keyCode])
                local.lib['' + event.keyCode].func();
        };

        // Functie om een functie aan een keyCode te hangen.
        function registerKey(key, name, func) {
            local.lib[key] = {
                name: name,
                func: func,
                status: true
            }
        }

        // Standaard functie om mic te starten of te stoppen
        function listen() {
            local.lib["77"].status = speechService.startStopMic(local.lib['77'].status);
        };       

        // Lib met standaard keyfunctie.
        local.lib = {
            '77': {
                name: "speech",
                func: listen,
                status: false
            }           
        };

        return service;
    }]);
})();