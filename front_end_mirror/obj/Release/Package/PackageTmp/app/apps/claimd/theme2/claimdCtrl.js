(function () {
    angular.module('mirrorApp').controller('claimdCtrl', ['$scope', 'confService', 'claimdService', function ($scope, confService, claimdService) {
        $scope.newsItems = [];
        $scope.showAll = true;
        $scope.columns = [];
        $scope.scrollInterval = 10000;

        var aantalColummns = 2;
        var newsTimer;

        var newsCallback = function (data) {
            $scope.newsItems = data.response.newestItems;
            $scope.columns = claimdService.splitNewsInColumns($scope.newsItems, aantalColummns);
            $scope.scrollInterval = 0;
            $scope.$apply();
            $scope.scrollInterval = 10000;
        };

        var failCallback = function () {
            console.log("fail");
            if ($scope.newsItems.length > 0)
                newsCallback($scope.newsItems);
        };

        var getNews = function () {
            claimdService.getNews(newsCallback, failCallback);
        };

        $scope.update.func = function (app) {
            var newData = JSON.parse(app.Data);

            if (!(app.Data === JSON.stringify($scope.app.Data))) {
                $scope.app.Data.URL = newData.URL;
                clearInterval(newsTimer);                
                getNews();
            }
        }

        getNews();
    }]);
})();