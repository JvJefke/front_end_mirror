(function () {

    // Deze service behandeld de spraakherkenning

    angular.module('mirrorApp').factory('speechService', ['$rootScope', 'confService', 'talkService', function ($rootScope, confService, talkService) {
        var local = {};
        var service = {
            init: init,
            startStopMic: startStopMic,
            registerSpeechFunction: registerSpeechFunction,
            registerMic: registerMic
        };

        // Start speechrecognition
        function init() {
            // Maak lokaal wit.ai microphone object aan
            local.mic = new Wit.Microphone();

            // Alle events die kunnen opgevangen worden
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

            // Wanneer er een resultaat ontvangen is
            local.mic.onresult = function (intent, entities) {

               // Indien de naam van het spraakcommando in onze lib zit, voer de toepasselijke funtie uit
                if (local.lib[intent])
                    local.lib[intent].func(entities);

                // Functie bestaat niet in de code
                else
                    console.log("function does not exist for the command: " + intent);

            };
            local.mic.onerror = function (err) {
                local.error("Error: " + err);
            };
            local.mic.onconnecting = function () {
                local.info("Microphone is connecting");

                // Bij het connecteren van de spiegel wordt er een event gestuurd naar de parent waarin deze site draaid. 
                // Deze geeft aan dat de de popup voor spraakherkenning nu gecreërd zal worden
                setTimeout(function () {
                    window.parent.postMessage({ speech: true }, "http://localhost:3333");
                }, 7000);
            };
            local.mic.ondisconnected = function () {
                local.info("Microphone is not connected");
                local.connect(2000);
            };

            // Connecteer de mic na 10 sec. Er zit delay op om de spiegel tijd te geven om op te starten. 
            // Indien dit niet gedaan wordt zal de popup van de browser niet correct behandeld worden
            local.connect(10000);
        };

        // Connecteer de mic na 10 sec. Er zit delay op om de spiegel tijd te geven om op te starten. 
        // Indien dit niet gedaan wordt zal de popup van de browser niet correct behandeld worden
        local.connect = function(time){
            setTimeout(function () { local.mic.connect("7YH3Q2CYLASQKAV6NHURHPZOQTFYA47N") }, time);
        }

        // Start of stop het luisteren (uitgevoerd door de keyService)
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

        // Functie om spraakfuncties te registreren. Deze wordt dan toegevoegd aan het lokaal lib object
        function registerSpeechFunction(name, appName, func) {
            local.lib[name] = {
                'appName': appName,
                'func': func
            }
        }

        // Wordt voor het moment niet gebruikt
        function registerMic(funcTrue, funcFalse) {
            local.micLib[true] = funcTrue;
            local.micLib[false] = funcFalse;
        }

        // Dit is het standaard lib object. De objecten die hier inzitten zijn objecten die niet gekoppeld zijn aan een app.
        // De meeste zijn louter voor presentatiedoeleinden
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

        // Wordt voor het moment niet gebruikt.
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