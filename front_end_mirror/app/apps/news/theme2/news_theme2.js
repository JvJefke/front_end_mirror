(function () {
    angular.module('mirrorApp').controller('newsCtrl', ['$scope', '$http', 'confService', 'newsService', function ($scope, $http, confService, newsService) {
        $scope.newsItems = [];
        $scope.showAll = true;
        $scope.columns = [];
        $scope.scrollInterval = $scope.app.Data.Rate * 1000;

        var aantalColummns = 2;
        var aantal = parseInt($scope.app.Data.Items);
        var counter = aantal;
        var newsTimer;

        var newsCallback = function (data) {
            $scope.newsItems = data.item;
            $scope.columns = newsService.splitNewsInColumns(data, aantalColummns);
            $scope.scrollInterval = -1;
            $scope.$apply();
            $scope.scrollInterval = $scope.app.Data.Rate * 1000;
        };

        var failCallback = function () {
            if ($scope.newsItems.length > 0)
                newsCallback($scope.newsItems);
        };

        var getNews = function () {
            if($scope.app.Data.URL)
                newsService.getNews($scope.app.Data.URL, newsCallback, failCallback);
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
(function () {
    angular.module('mirrorApp').controller('newsCtrl', ['$scope', '$http', 'confService', 'newsService', function ($scope, $http, confService, newsService) {
        $scope.newsItems = [];
        $scope.showAll = true;
        $scope.columns = [];
        $scope.scrollInterval = $scope.app.Data.Rate * 1000;

        var aantalColummns = 2;
        var aantal = parseInt($scope.app.Data.Items);
        var counter = aantal;
        var newsTimer;

        var newsCallback = function (data) {
            $scope.newsItems = data.item;
            $scope.columns = newsService.splitNewsInColumns(data, aantalColummns);
            $scope.scrollInterval = -1;
            $scope.$apply();
            $scope.scrollInterval = $scope.app.Data.Rate * 1000;
        };

        var failCallback = function () {
            if ($scope.newsItems.length > 0)
                newsCallback($scope.newsItems);
        };

        var getNews = function () {
            if($scope.app.Data.URL)
                newsService.getNews($scope.app.Data.URL, newsCallback, failCallback);
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
(function () {
    angular.module('mirrorApp').controller('newsCtrl', ['$scope', '$http', 'confService', 'newsService', function ($scope, $http, confService, newsService) {
        $scope.newsItems = [];
        $scope.showAll = true;
        $scope.columns = [];
        $scope.scrollInterval = $scope.app.Data.Rate * 1000;

        var aantalColummns = 2;
        var aantal = parseInt($scope.app.Data.Items);
        var counter = aantal;
        var newsTimer;

        var newsCallback = function (data) {
            $scope.newsItems = data.item;
            $scope.columns = newsService.splitNewsInColumns(data, aantalColummns);
            $scope.scrollInterval = -1;
            $scope.$apply();
            $scope.scrollInterval = $scope.app.Data.Rate * 1000;
        };

        var failCallback = function () {
            if ($scope.newsItems.length > 0)
                newsCallback($scope.newsItems);
        };

        var getNews = function () {
            if($scope.app.Data.URL)
                newsService.getNews($scope.app.Data.URL, newsCallback, failCallback);
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
!function(){angular.module("mirrorApp").controller("newsCtrl",["$scope","$http","confService","newsService",function(a,t,e,n){a.newsItems=[],a.showAll=!0,a.columns=[],a.scrollInterval=1e3*a.app.Data.Rate;var s,l=2,p=(parseInt(a.app.Data.Items),function(t){a.newsItems=t.item,a.columns=n.splitNewsInColumns(t,l),a.scrollInterval=-1,a.$apply(),a.scrollInterval=1e3*a.app.Data.Rate}),r=function(){a.newsItems.length>0&&p(a.newsItems)},o=function(){a.app.Data.URL&&n.getNews(a.app.Data.URL,p,r)};a.update.func=function(t){var e=JSON.parse(t.Data);t.Data!==JSON.stringify(a.app.Data)&&(a.app.Data.URL=e.URL,clearInterval(s),o())},o()}])}();
!function(){angular.module("mirrorApp").controller("newsCtrl",["$scope","$http","confService","newsService",function(a,t,e,n){a.newsItems=[],a.showAll=!0,a.columns=[],a.scrollInterval=1e3*a.app.Data.Rate;var s,l=2,p=(parseInt(a.app.Data.Items),function(t){a.newsItems=t.item,a.columns=n.splitNewsInColumns(t,l),a.scrollInterval=-1,a.$apply(),a.scrollInterval=1e3*a.app.Data.Rate}),r=function(){a.newsItems.length>0&&p(a.newsItems)},o=function(){a.app.Data.URL&&n.getNews(a.app.Data.URL,p,r)};a.update.func=function(t){var e=JSON.parse(t.Data);t.Data!==JSON.stringify(a.app.Data)&&(a.app.Data.URL=e.URL,clearInterval(s),o())},o()}])}(),function(){angular.module("mirrorApp").controller("newsCtrl",["$scope","$http","confService","newsService",function(a,t,e,n){a.newsItems=[],a.showAll=!0,a.columns=[],a.scrollInterval=1e3*a.app.Data.Rate;var s,l=2,p=(parseInt(a.app.Data.Items),function(t){a.newsItems=t.item,a.columns=n.splitNewsInColumns(t,l),a.scrollInterval=-1,a.$apply(),a.scrollInterval=1e3*a.app.Data.Rate}),r=function(){a.newsItems.length>0&&p(a.newsItems)},o=function(){a.app.Data.URL&&n.getNews(a.app.Data.URL,p,r)};a.update.func=function(t){var e=JSON.parse(t.Data);t.Data!==JSON.stringify(a.app.Data)&&(a.app.Data.URL=e.URL,clearInterval(s),o())},o()}])}(),!function(){angular.module("mirrorApp").controller("newsCtrl",["$scope","$http","confService","newsService",function(a,t,e,n){a.newsItems=[],a.showAll=!0,a.columns=[],a.scrollInterval=1e3*a.app.Data.Rate;var s,l=2,p=(parseInt(a.app.Data.Items),function(t){a.newsItems=t.item,a.columns=n.splitNewsInColumns(t,l),a.scrollInterval=-1,a.$apply(),a.scrollInterval=1e3*a.app.Data.Rate}),r=function(){a.newsItems.length>0&&p(a.newsItems)},o=function(){a.app.Data.URL&&n.getNews(a.app.Data.URL,p,r)};a.update.func=function(t){var e=JSON.parse(t.Data);t.Data!==JSON.stringify(a.app.Data)&&(a.app.Data.URL=e.URL,clearInterval(s),o())},o()}])}();