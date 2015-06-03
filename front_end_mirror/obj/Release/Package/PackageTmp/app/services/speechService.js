(function () {
    angular.module('mirrorApp').factory('speechService', ['$rootScope', 'confService', function ($rootScope, confService) {
        var local = {};
        var service = {
            init: init,
            startStopMic: startStopMic
        };

        function init() {
            local.mic = new Wit.Microphone();
            local.info = function (msg) {
                console.log("info", msg);
            };
            local.error = function (msg) {
                console.log("err:", msg);
            };
            local.mic.onready = function () {
                local.info("Microphone is ready to record");
            };
            local.mic.onaudiostart = function () {
                local.info("Recording started");
            };
            local.mic.onaudioend = function () {
                local.info("Recording stopped, processing started");
            };
            local.mic.onresult = function (intent, entities) {
                //console.log("intent:", intent);
                //console.log("entities:", entities);

                if (local.lib[intent])
                    local.lib[intent].func(entities);
                else
                    console.log("function does not exist for the command: " + intent);

            };
            local.mic.onerror = function (err) {
                local.error("Error: " + err);
            };
            local.mic.onconnecting = function () {
                local.info("Microphone is connecting");
            };
            local.mic.ondisconnected = function () {
                local.info("Microphone is not connected");
            };

            local.mic.connect("7YH3Q2CYLASQKAV6NHURHPZOQTFYA47N");

            // mic.start();
            // mic.stop();

            /*function kv (k, v) {
                if (toString.call(v) !== "[object String]") {
                    v = JSON.stringify(v);
                }
                return k + "=" + v + "\n";
            }*/
        };

        function startStopMic(bool) {
            if (bool) {
                local.mic.stop();
                $rootScope.recorderHide();
            } else {
                local.mic.start()
                $rootScope.recorderShow();
            }

            return !bool;
        };

        local.lib = {
            'zet_timer': {
                'appName': 'timer',
                'func': function (obj) {
                    //console.log($rootScope);
                    //console.log($rootScope.setTimer);
                    $rootScope.setTimer(obj);
                }
            },
            'show_compliment': {
                'appName': 'compliment',
                'func': function (obj) {
                    $rootScope.showCompliment();
                }
            }, 'clear': {
                'appName': 'main',
                'func': function (obj) {
                    $rootScope.toggleScreen(obj);
                }
            }
        };

        return service;
    }]);
})();