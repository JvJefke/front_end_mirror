(function () {
    angular.module('mirrorApp').factory('speechService', ['$rootScope', 'confService', 'talkService', function ($rootScope, confService, talkService) {
        var local = {};
        var service = {
            init: init,
            startStopMic: startStopMic,
            registerSpeechFunction: registerSpeechFunction,
            registerMic: registerMic
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
                setTimeout(function () {
                    window.parent.postMessage({ speech: true }, "http://localhost:3333");
                }, 7000);
            };
            local.mic.ondisconnected = function () {
                local.info("Microphone is not connected");
                local.connect(2000);
            };

            local.connect(10000);
        };

        local.connect = function(time){
            setTimeout(function () { local.mic.connect("7YH3Q2CYLASQKAV6NHURHPZOQTFYA47N") }, time);
        }

        function startStopMic(bool) {
            if (bool) {
                local.mic.start();
                local.micLib[bool]();
            } else {
                local.mic.stop();
                local.micLib[bool]();
            }

            return !bool;
        };

        function registerSpeechFunction(name, appName, func) {
            local.lib[name] = {
                'appName': appName,
                'func': func
            }
        }

        function registerMic(funcTrue, funcFalse) {
            local.micLib[true] = funcTrue;
            local.micLib[false] = funcFalse;
        }

        local.lib = {           
            'hello': {
                'appName': 'main',
                'func': function (obj) {
                    talkService.talk("Hello everyone, I'm the mirror mate. Nice to meet you");
                }
            },
            "whatami": {
                'appName': 'main',
                'func': function (obj) {
                    talkService.talk("I'm a smart mirror that shows useful information on top of your awesome reflection.");
                }
            },
            "thankyou": {
                'appName': 'main',
                'func': function (obj) {
                    talkService.talk("You're welcome!");
                }
            }
        };

        local.micLib = {
            true: function () {
                console.log("mic still initializing ...");
            },
            false: function () {
                console.log("mic still initializing ...");
            }
        }

        return service;
    }]);
})();