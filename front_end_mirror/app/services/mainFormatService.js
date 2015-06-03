(function () {
    angular.module('mirrorApp').factory('mainFormatService', [function () {
        var local = {};
        var service = {
            formatTime: formatTime,
            ISODateString: ISODateString
        };

       function formatTime(sTimer) {
            var formatter;
            if (sTimer > 60) {
                var mtemp = Math.floor(sTimer / 60);
                var stemp = sTimer % 60;

                if (mtemp > 60) {
                    var utemp = Math.floor(mtemp / 60);
                    var mtemp = mtemp % 60;

                    if (utemp > 24)
                        var dtemp = Math.floor(utemp / 24);
                    var utemp = utemp % 24;
                }
            } else {
                var stemp = sTimer;
            }



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

       function ISODateString(d) {
           function pad(n) { return n < 10 ? '0' + n : n }
           return d.getUTCFullYear() + '-'
                + pad(d.getUTCMonth() + 1) + '-'
                + pad(d.getUTCDate()) + 'T'
                + pad(d.getUTCHours()) + ':'
                + pad(d.getUTCMinutes()) + ':'
                + pad(d.getUTCSeconds()) + 'Z'
       }

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