(function () {
    angular.module('mirrorApp').factory('keyService', ['speechService', '$rootScope', function (speechService, $rootScope) {
        var local = {};
        var service = {
            keyUpPressed : keyUpPressed
        };

        function keyUpPressed(event) {
            console.log(event.keyCode);
            /*var audio = document.getElementById("audioID");
    
            audio.play();*/
            if (local.lib['' + event.keyCode])
                local.lib['' + event.keyCode].func();
        };

        function listen() {
            local.lib["77"].status = speechService.startStopMic(local.lib['77'].status);
        };

        local.lib = {
            '77': {
                name: "speech",
                func: listen,
                status: true
            },
            '67': {
                name: "compliment",
                func: function () { $rootScope.showCompliment() },
                status: true
            },
            '49': {
                name: "key1",
                func: function () { $rootScope.changeUser(0); },
                status: true
            },
            '50': {
                name: "key2",
                func: function () { $rootScope.changeUser(1); },
                status: true
            },
            '51': {
                name: "key3",
                func: function () { $rootScope.changeUser(2); },
                status: true
            },
            '52': {
                name: "key4",
                func: function () { $rootScope.changeUser(3); },
                status: true
            },
            '53': {
                name: "key5",
                func: function () { $rootScope.changeUser(4); },
                status: true
            },
            '54': {
                name: "key6",
                func: function () { $rootScope.changeUser(5); },
                status: true
            },
            '55': {
                name: "key7",
                func: function () { $rootScope.changeUser(6); },
                status: true
            },
            '56': {
                name: "key8",
                func: function () { $rootScope.changeUser(7); },
                status: true
            },
            '57': {
                name: "key9",
                func: function () { $rootScope.changeUser(8); },
                status: true
            },
            '48': {
                name: "key0",
                func: function () { $rootScope.changeUser(9); },
                status: true
            }
        };

        return service;
    }]);
})();