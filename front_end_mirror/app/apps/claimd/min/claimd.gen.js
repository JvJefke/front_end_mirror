(function () {
    angular.module('mirrorApp').controller('claimdCtrl', ['$scope', 'confService', 'claimdService', function ($scope, confService, claimdService) {
        $scope.newsItems = [];
        $scope.showAll = true;
        $scope.columns = [];
        $scope.scrollInterval = SCROLL_INTERVAL;

        const SCROLL_INTERVAL = 10000;
        const REFRESH_INTERVAL = 60000 * 30;

        var aantalColummns = 2;
        var newsTimer;

        var newsCallback = function (data) {
            $scope.newsItems = data.response.newestItems;
            $scope.columns = claimdService.splitNewsInColumns($scope.newsItems, aantalColummns);
            $scope.scrollInterval = 0;
            $scope.$apply();
            $scope.scrollInterval = SCROLL_INTERVAL;
            newsTimer = setTimeout(getNews, REFRESH_INTERVAL);
        };

        var failCallback = function () {
            if ($scope.newsItems.length > 0)
                newsCallback($scope.newsItems);
            else
                setTimeout(getNews, 2000);
        };

        var getNews = function () {
            clearInterval(newsTimer);
            claimdService.getNews(newsCallback, failCallback);
        };

        $scope.update.func = function (app) {
            var newData = JSON.parse(app.Data);

            if (!(app.Data === JSON.stringify($scope.app.Data))) {
                $scope.app.Data.URL = newData.URL;
                getNews();
            }
        };

        getNews();
    }]);
})();
(function () {
    angular.module('mirrorApp').factory('claimdService', ['$http', 'dataService', function ($http, dataService) {
        var local = {};
        var service = {
            getNews: getNews,
            getShowNewsItems: getShowNewsItems,
            splitNewsInColumns: splitNewsInColumns,
        };

        function getNews(callback, failCallback) {
            var fail;

            if (!callback) {
                console.log("Niet alle parameters zijn correct meegegeven.");
                return;
            }

            if (failCallback)
                fail = failCallback;
            else
                fail = local.mainErrCallback;

            dataService.getData("https://claimd.azurewebsites.net/api/items/home", callback, failCallback);
        };

        function getShowNewsItems(counter, aantal, newsItems) {
            var retTemp = [];
            for (var i = 0; i < aantal; i++) {
                var item = newsItems[counter + i];
                if (item)
                    retTemp.push(item);
            }

            return retTemp;
        };

        function splitNewsInColumns(arr, aantal) {
            var returnArr = [];
            for (var i = 0; i < arr.length ; i += aantal) {
                for (var ii = 0; ii < aantal; ii++) {
                    if (!returnArr[ii])
                        returnArr.push([]);
                    returnArr[ii].push(arr[i + ii]);
                }
            }
            return returnArr;
        };

        local.mainErrCallback = function (data, status, headers, config) {
            console.log("There has been an error while retrieving data", data, status, headers, config);
        };

        return service;
    }]);
})();

(function () {
    angular.module("mirrorApp").directive('myClaimdImg', ["dataService", function (dataService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var img = attrs.item;

                if (!img)
                    element.css("display", "none");
                else
                    element.attr("src", img);
            }
        }
    }]);
})();
