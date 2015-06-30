(function () {
    angular.module('mirrorApp').factory('mainFormatService', [function () {
        var local = {};
        var service = {
            formatTime: formatTime,
            ISODateString: ISODateString
        };
        
        // Tijd van timer (gegeven in sec) formateren naar een leesbaar medium voor de gebruiker
        function formatTime(sTimer) {
            var formatter;
            
            // Indien de tijd meer dan 60 sec bevat --> kijk hoeveel minuten er zijn. sTemp is het aantal overgebleven seconden
            if (sTimer > 60) {
                var mtemp = Math.floor(sTimer / 60);
                var stemp = sTimer % 60;

                // Indien er meer dan 60 minuten zijn --> kijk hoeveel uren. mTemp is het aantal overgebleven minuten
                if (mtemp > 60) {
                    var utemp = Math.floor(mtemp / 60);
                    var mtemp = mtemp % 60;

                    // Indien er meer dan 24 uren zijn --> kijk hoeveel dagen. uTemp is het aantal overgebleven uren
                    if (utemp > 24) {
                        var dtemp = Math.floor(utemp / 24);
                        var utemp = utemp % 24;
                    }
                }
            } else {
                var stemp = sTimer;
            }


            // check of er minuten, uren en dagen zijn en geef het corrensponderende formaat
            if (stemp != undefined && mtemp != undefined && utemp != undefined && dtemp != undefined)
                formatter = local.tdf(dtemp) + ":" + local.tdf(utemp) + ":" + local.tdf(mtemp) + ":" + local.tdf(stemp);
            else if (stemp != undefined && mtemp != undefined && utemp != undefined)
                formatter = local.tdf(utemp) + ":" + local.tdf(mtemp) + ":" + local.tdf(stemp);
            else if (stemp != undefined && mtemp != undefined)
                formatter = local.tdf(mtemp) + ":" + local.tdf(stemp);
            else if (stemp != undefined)
                formatter = "00:" + local.tdf(stemp);

            if (formatter)
                return formatter;
            else
                return null;
       };

        // Zet datum om naar een leesbaarformaat voor de server.
       function ISODateString(d) {
           function pad(n) { return n < 10 ? '0' + n : n }
           return d.getUTCFullYear() + '-'
                + pad(d.getUTCMonth() + 1) + '-'
                + pad(d.getUTCDate()) + 'T'
                + pad(d.getUTCHours()) + ':'
                + pad(d.getUTCMinutes()) + ':'
                + pad(d.getUTCSeconds()) + 'Z'
       }

        // Zet een nul voor het getal indien nodig
       local.tdf = function (val) {
           //console.log((""+val).length, val);
           if (val != undefined && ("" + val).length < 2) {
               return "0" + val;
           } else {
               return val;
           }
       };

        return service;
    }]);
})();