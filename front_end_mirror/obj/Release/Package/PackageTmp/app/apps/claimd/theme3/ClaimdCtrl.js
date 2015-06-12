(function () {
    angular.module('mirrorApp').controller('newsCtrl', ['$scope', '$http', 'confService', 'claimdService', function ($scope, $http, confService, claimdService) {
        $scope.newsItems = [];
        $scope.showAll = true;
        $scope.columns = [];
        $scope.scrollInterval = 10000;
        var aantalColummns = 2;

        var aantal = parseInt($scope.app.Data.Items);
        var counter = aantal;
        var newsTimer;

        var newsCallback = function (data) {
            console.log(data);
            $scope.newsItems = data.item;
            $scope.columns = claimdService.splitNewsInColumns(data, aantalColummns);
            $scope.scrollInterval = -1;
            $scope.$apply();
            $scope.scrollInterval = 10000;
        };

        var failCallback = function () {
            if ($scope.newsItems.length > 0)
                newsCallback($scope.newsItems);
        };

        var getNews = function () {
            if($scope.app.Data.URL)
                claimdService.getNews($scope.app.Data.URL, newsCallback, failCallback);
        };

        $scope.update.func = function (app) {
            var newData = JSON.parse(app.Data);
            //console.log(newData);
            if (!(app.Data === JSON.stringify($scope.app.Data))) {
                $scope.app.Data.URL = newData.URL;
                clearInterval(newsTimer);                
                getNews();
            }
        }

        getNews();
    }]);
})();