(function () {
    angular.module('mirrorApp').controller('newsCtrl', ['$scope', '$http', 'confService', 'newsService', function ($scope, $http, confService, newsService) {
        $scope.newsItems = [];
        $scope.newNewsItems = [];
        $scope.showedNewsItems = [];
        $scope.showAll = true;

        var aantal = 0; 
        var counter = 0;
        var interval = $scope.app.Data.Rate * 1000;
        var newsTimer;

        var changeNews = function () {
            $scope.showedNewsItems = [];
            $scope.showedNewsItems = newsService.getShowNewsItems(counter, aantal, $scope.newsItems);
            $scope.$apply();

            counter += aantal;

            if (counter >= $scope.newsItems.length - 1) {
                counter = aantal;
                setTimeout(getNews, 10000);
            }
        };

        var newsCallback = function (data) {
            $scope.newsItems = data.item;
            $scope.showedNewsItems = newsService.getShowNewsItems(0, aantal, $scope.newsItems);
            $scope.$apply();

            clearInterval(newsTimer);
            newsTimer = setInterval(changeNews, interval);
        };

        var failCallback = function () {
            if ($scope.newsItems.length > 0)
                newsCallback($scope.newsItems);
        };

        var getNews = function () {
            aantal = parseInt($scope.app.Data.Items);
            counter = aantal;
            if($scope.app.Data.URL)
                newsService.getNews($scope.app.Data.URL, newsCallback, failCallback);
        };

        $scope.update.func = function (app) {
            var newData = JSON.parse(app.Data);

            if (!(app.Data === JSON.stringify($scope.app.Data))) {
                $scope.app.Data = newData;
                interval = $scope.app.Data.Rate * 1000;
                clearInterval(newsTimer);
                getNews();
            }
        }

        getNews();
    }]);
})();