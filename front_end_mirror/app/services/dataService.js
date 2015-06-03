(function () {
    angular.module('mirrorApp').factory('dataService', ['$http', function ($http) {
        var local = {};
        var service = {
            getData: getData,
            postData: postData,
            getJSONFromXML: getJSONFromXML,
            getUrlFromRSS: getUrlFromRSS
        };

        function getData(sSource, callback, errCallback, extraData) {
            $http.get(encodeURI(sSource)).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config, extraData);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config, extraData);
            });
        };

        function postData(sSource, indata, callback, errCallback) {
            $http.post(encodeURI(sSource), indata).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config);
            });
        };

        function postData(request, callback, errCallback) {
            $http(request).success(function (data, status, headers, config) {
                if (callback)
                    callback(data, status, headers, config);
            }).error(function (data, status, headers, config) {
                if (errCallback)
                    errCallback(data, status, headers, config);
            });
        };

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

        function getUrlFromRSS(item) {
            var item = JSON.stringify(item);
            var counter = local.extensionLib.length - 1;
            var val;

            while (!val && counter >= 0) {
                if (item.indexOf(local.extensionLib[counter]) != -1)
                    val = local.getUrlFromPosition(item, local.extensionLib[counter])
                counter--;
            }

            return val;

        };

        local.extensionLib = [".jpg", ".png", ".gif", ".jpeg", ".tiff", ".svg"]

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