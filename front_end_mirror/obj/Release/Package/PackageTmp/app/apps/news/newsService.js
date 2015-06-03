(function () {
    angular.module('mirrorApp').factory('newsService', ['$http', 'dataService', function ($http, dataService) {
        var local = {};
        var service = {
            getNews: getNews,
            getShowNewsItems: getShowNewsItems
        };

        function getNews(source, callback, failCallback) {
            var fail;

            if (!source || !callback) {
                console.log("Niet alle parameters zijn correct meegegeven.");
                return;
            }

            if (failCallback)
                fail = failCallback;
            else
                fail = local.mainErrCallback;

            dataService.getJSONFromXML(source, callback, fail);
        };

        function getShowNewsItems(counter, aantal, newsItems) {
            var retTemp = [];
            for (var i = 0; i < aantal; i++) {
                var item = newsItems[counter + i];
                //console.log(item);
                if(item)
                    retTemp.push(item);
            }

            return retTemp;
        }

        local.mainErrCallback = function (data, status, headers, config) {
            console.log("There has been an error while retrieving data", data, status, headers, config);
        };

        return service;
    }]);
})();
