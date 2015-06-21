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
!function(){angular.module("mirrorApp").controller("newsCtrl",["$scope","$http","confService","newsService",function(e,t,s,a){e.newsItems=[],e.newNewsItems=[],e.showedNewsItems=[],e.showAll=!0;var n,p=0,w=0,o=1e3*e.app.Data.Rate,m=function(){e.showedNewsItems=[],e.showedNewsItems=a.getShowNewsItems(w,p,e.newsItems),e.$apply(),w+=p,w>=e.newsItems.length-1&&(w=p,setTimeout(l,1e4))},r=function(t){e.newsItems=t.item,e.showedNewsItems=a.getShowNewsItems(0,p,e.newsItems),e.$apply(),clearInterval(n),n=setInterval(m,o)},I=function(){e.newsItems.length>0&&r(e.newsItems)},l=function(){p=parseInt(e.app.Data.Items),w=p,e.app.Data.URL&&a.getNews(e.app.Data.URL,r,I)};e.update.func=function(t){var s=JSON.parse(t.Data);t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data=s,o=1e3*e.app.Data.Rate,clearInterval(n),l())},l()}])}();
!function(){angular.module("mirrorApp").controller("newsCtrl",["$scope","$http","confService","newsService",function(e,t,s,a){e.newsItems=[],e.newNewsItems=[],e.showedNewsItems=[],e.showAll=!0;var n,p=0,w=0,o=1e3*e.app.Data.Rate,m=function(){e.showedNewsItems=[],e.showedNewsItems=a.getShowNewsItems(w,p,e.newsItems),e.$apply(),w+=p,w>=e.newsItems.length-1&&(w=p,setTimeout(l,1e4))},r=function(t){e.newsItems=t.item,e.showedNewsItems=a.getShowNewsItems(0,p,e.newsItems),e.$apply(),clearInterval(n),n=setInterval(m,o)},I=function(){e.newsItems.length>0&&r(e.newsItems)},l=function(){p=parseInt(e.app.Data.Items),w=p,e.app.Data.URL&&a.getNews(e.app.Data.URL,r,I)};e.update.func=function(t){var s=JSON.parse(t.Data);t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data=s,o=1e3*e.app.Data.Rate,clearInterval(n),l())},l()}])}(),function(){angular.module("mirrorApp").controller("newsCtrl",["$scope","$http","confService","newsService",function(e,t,s,a){e.newsItems=[],e.newNewsItems=[],e.showedNewsItems=[],e.showAll=!0;var n,p=0,w=0,o=1e3*e.app.Data.Rate,m=function(){e.showedNewsItems=[],e.showedNewsItems=a.getShowNewsItems(w,p,e.newsItems),e.$apply(),w+=p,w>=e.newsItems.length-1&&(w=p,setTimeout(l,1e4))},r=function(t){e.newsItems=t.item,e.showedNewsItems=a.getShowNewsItems(0,p,e.newsItems),e.$apply(),clearInterval(n),n=setInterval(m,o)},I=function(){e.newsItems.length>0&&r(e.newsItems)},l=function(){p=parseInt(e.app.Data.Items),w=p,e.app.Data.URL&&a.getNews(e.app.Data.URL,r,I)};e.update.func=function(t){var s=JSON.parse(t.Data);t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data=s,o=1e3*e.app.Data.Rate,clearInterval(n),l())},l()}])}(),!function(){angular.module("mirrorApp").controller("newsCtrl",["$scope","$http","confService","newsService",function(e,t,s,a){e.newsItems=[],e.newNewsItems=[],e.showedNewsItems=[],e.showAll=!0;var n,p=0,w=0,o=1e3*e.app.Data.Rate,m=function(){e.showedNewsItems=[],e.showedNewsItems=a.getShowNewsItems(w,p,e.newsItems),e.$apply(),w+=p,w>=e.newsItems.length-1&&(w=p,setTimeout(l,1e4))},r=function(t){e.newsItems=t.item,e.showedNewsItems=a.getShowNewsItems(0,p,e.newsItems),e.$apply(),clearInterval(n),n=setInterval(m,o)},I=function(){e.newsItems.length>0&&r(e.newsItems)},l=function(){p=parseInt(e.app.Data.Items),w=p,e.app.Data.URL&&a.getNews(e.app.Data.URL,r,I)};e.update.func=function(t){var s=JSON.parse(t.Data);t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data=s,o=1e3*e.app.Data.Rate,clearInterval(n),l())},l()}])}();