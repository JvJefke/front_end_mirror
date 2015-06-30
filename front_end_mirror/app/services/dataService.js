(function () {

    // Service om data op te halen.
    angular.module('mirrorApp').factory('dataService', ['$http', function ($http) {
        var local = {};
        var service = {
            getData: getData,
            postData: postData,
            getJSONFromXML: getJSONFromXML,
            getUrlFromRSS: getUrlFromRSS
        };

        // http get request
        function getData(sSource, callback, errCallback, extraData) {
            $http.get(encodeURI(sSource)).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config, extraData);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config, extraData);
            });
        };

        // http post request
        function postData(sSource, indata, callback, errCallback) {
            $http.post(encodeURI(sSource), indata).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config);
            });
        };

        // http request (alles mogelijk)
        function postData(request, callback, errCallback) {
            $http(request).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config);
            });
        };

        // get XML en zet het om naar JSON (feedToJson plugin nodig)
        function getJSONFromXML(source, callback, errCallback) {
            $.feedToJson({
                feed: source,
                success: function (data) {
                    if (callback)
                        callback(data);
                },
                error: function (data) {
                    if (errCallback)
                        errCallback(data);
                }
            });
        };       

        // functie dat naar een URL zoekt in een RSS item
        function getUrlFromRSS(item) {

            // JSON item naar string omzetten om dan te kunnen zoeken naar afbeelding extensies via stringfuncties
            var item = JSON.stringify(item);
            var counter = local.extensionLib.length - 1;
            var val;
            
            // Overloop alle waarden van het item en kijk of eenvan de extensies erin zit
            while (!val && counter >= 0) {
                if (item.indexOf(local.extensionLib[counter]) != -1)
                    val = local.getUrlFromPosition(item, local.extensionLib[counter])
                counter--;
            }

            return val;

        };

        local.extensionLib = [".jpg", ".png", ".gif", ".jpeg", ".tiff", ".svg"]

        // Indien er geverifieerd is dat er een afbeelding aanwezig is, wordt er gezocht naar de string van de afbeelding.
        local.getUrlFromPosition = function (item, type) {
            var index = item.indexOf(type);
            var endIndex = index + type.length;
            var temp = item.substring(0, endIndex);
            var lastIndex = temp.lastIndexOf("\"");
            var temp2 = temp.slice(lastIndex + 1);

            return temp2;
        }

        return service;
    }]);
})();