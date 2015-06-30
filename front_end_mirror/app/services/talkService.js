(function () {

    // Deze service dient om spraak te genereren

    angular.module('mirrorApp').factory('talkService', [function (speechService, $rootScope) {
        var service = {};
        var local = {};

        //local.audio = document.createElement("audio");

        /*local.sound = {
            tracks: {},
            enabled: true,
            template: function (src) {
                return '<embed style="height:0" loop="false" src="' + src + '" autostart="true" hidden="true"/>';
            },
            play: function (url, options) {
                if (!this.enabled)
                    return;
                var settings = $.extend({
                    url: url,
                    timeout: 2000
                }, options);
    
                if (settings.track) {
                    if (this.tracks[settings.track]) {
                        var current = this.tracks[settings.track];
                        // TODO check when Stop is avaiable, certainly not on a jQuery object
                        current.Stop && current.Stop();
                        current.remove();
                    }
                }
    
                var element = $(this.template(settings.url));
    
                element.appendTo("body");
    
                if (settings.track) {
                    this.tracks[settings.track] = element;
                }
    
                if (options) {
                    setTimeout(function () {
                        element.remove();
                    }, options.timeout)
                }
    
                return element;
            }
        };*/

        service.talk = function (val) {
            /*var url = "http://api.voicerss.org/?key=c9826c9707fa4c56a29b3792e56596b0&src=" + encodeURIComponent(val) + "&hl=en-us&c=wav";
            console.log("talk");
            var audio = document.getElementById("audioID");
            audio.setAttribute('src', url);
            audio.load();
            audio.play();*/

            /*var audio = document.createElement("audio");
            audio.setAttribute('src', url);
            audio.load();        
            audio.play();*/

            // Er wordt een event gestuurt naar de parent (de localhost website die deze website draaid via een iFrame) met een object dat een voice object bevat
            // dit object stuurt de localhost door via een socket naar de node.js server.
            window.parent.postMessage({ voice: { value: val } }, "http://localhost:3333");

        };

        return service;
    }]);
})();