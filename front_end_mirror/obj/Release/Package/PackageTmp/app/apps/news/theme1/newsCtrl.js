(function () {
    angular.module('mirrorApp').controller('newsCtrl', ['$scope', '$http', 'confService', 'newsService', function ($scope, $http, confService, newsService) {
        $scope.newsItems = [];
        $scope.newNewsItems = [];
        $scope.showedNewsItems = [];
        $scope.showAll = true;

        var aantal = 0; 
        var counter = 0;
        var newsTimer;

        //console.log($scope.app);

        var changeNews = function () {
            //console.log("counter: ", counter);
            //console.log("aantal: ", aantal);

            $scope.showedNewsItems = [];
            $scope.showedNewsItems = newsService.getShowNewsItems(counter, aantal, $scope.newsItems);
            $scope.$apply();

            counter += aantal;

            //console.log(counter);
            //console.log($scope.newsItems.length)

            if (counter >= $scope.newsItems.length - 1) {
                //console.log("refresh data");
                counter = aantal;
                setTimeout(getNews, 10000);
            }
        };

        var newsCallback = function (data) {
            //console.log(data);
            //console.log("callback");
            $scope.newsItems = data.item;
            $scope.showedNewsItems = newsService.getShowNewsItems(0, aantal, $scope.newsItems);
            $scope.$apply();

            clearInterval(newsTimer);
            newsTimer = setInterval(changeNews, 10000);
        };

        var failCallback = function () {
            if ($scope.newsItems.length > 0)
                newsCallback($scope.newsItems);
        };

        var getNews = function () {
            //console.log("getNews");
            aantal = parseInt($scope.app.Data.Items);
            counter = aantal;
            if($scope.app.Data.URL)
                newsService.getNews($scope.app.Data.URL, newsCallback, failCallback);
        };

        $scope.update.func = function (app) {
            var newData = JSON.parse(app.Data);
            //console.log(newData);
            if (!(app.Data === JSON.stringify($scope.app.Data))) {
                $scope.app.Data = newData;
                clearInterval(newsTimer);
                getNews();
            }
        }

        getNews();
    }]);
})();