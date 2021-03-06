(function () {
    angular.module('mirrorApp').factory('newsService', ['dataService', function (dataService) {
        var local = {};
        var service = {
            getNews: getNews,
            getShowNewsItems: getShowNewsItems,
            splitNewsInColumns: splitNewsInColumns,
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
                if (item)
                    retTemp.push(item);
                else
                    retTemp.push({ title: "", src: "" });
            }

            return retTemp;
        }

        function splitNewsInColumns(arr, aantal) {
            var returnArr = [];
            for (var i = 0; i < arr.item.length ; i += aantal) {
                for (var ii = 0; ii < aantal; ii++) {
                    if (!returnArr[ii]) 
                        returnArr.push([]);
                    returnArr[ii].push(arr.item[i + ii]);
                }
            }
            return returnArr;
        }

        local.mainErrCallback = function (data, status, headers, config) {
            console.log("There has been an error while retrieving data", data, status, headers, config);
        };

        return service;
    }]);
})();

(function () {
    angular.module("mirrorApp").directive('myNewsImg', ["dataService", function (dataService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var img = dataService.getUrlFromRSS(attrs.item);

                if (!img)
                    element.css("display", "none");
                else
                    element.attr("src", img);
            }
        }
    }]);
})();
