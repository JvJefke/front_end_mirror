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