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
        }

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
                if(item)
                    retTemp.push(item);
            }

            return retTemp;
        }

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
        }

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

(function () {
    angular.module("mirrorApp").directive('myAutomaticClaimdScroll', ["dataService", function (dataService) {
        return {
            scope:{
                interval: "=myAutomaticClaimdScroll",
                func: "=refreshFunc"
            },
            restrict: 'A',
            link: function (scope, element, attrs) {
                var scrollHeight;
                var totalHeight;
                var elHeight;
                var timer;

                scope.$watch("interval", function (val) {
                    clearInterval(timer);
                    $(element).animate({ scrollTop: 0 });
                    scrollHeight = 0;
                    if (scope.interval > 1) {
                        timer = setInterval(function () {

                            elHeight = parseInt(getComputedStyle(element[0].parentNode).getPropertyValue("height").slice(0, -2));
                            totalHeight = parseInt(getComputedStyle(element[0].querySelector(".news_column")).getPropertyValue("height").slice(0, -2));

                            scrollHeight += elHeight * 0.7;                           

                            if (scrollHeight > totalHeight - 40) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = -15;
                                }                               
                            }

                            $(element[0].querySelectorAll(".news_column")).css({
                                "margin-top": -scrollHeight + "px",
                                "transition": "1s ease-in-out"
                            });

                        }, scope.interval);
                    }else if(scope.interval < -1){
                        timer = setInterval(function () {

                            elHeight = parseInt(getComputedStyle(element[0].parentNode).getPropertyValue("width"));
                            totalHeight = parseInt(element[0].querySelector(".news_column").scrollWidth);

                            scrollHeight += elHeight -14;

                            if (scrollHeight > totalHeight - 40) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = 0;
                                }
                            }

                            var columns = element[0].querySelectorAll(".news_column");

                            for(var index in columns){
                                $(columns[index].querySelector(".news_container")).css({
                                    "margin-left": -scrollHeight + "px",
                                    "transition": "1s ease-in-out"
                                });
                            }

                        }, scope.interval * -1);
                    }
                });
            }
        }
    }]);
})();
!function(){angular.module("mirrorApp").controller("claimdCtrl",["$scope","confService","claimdService",function(e,t,n){e.newsItems=[],e.showAll=!0,e.columns=[],e.scrollInterval=r;const r=1e4,a=18e5;var o,i=2,l=function(t){e.newsItems=t.response.newestItems,e.columns=n.splitNewsInColumns(e.newsItems,i),e.scrollInterval=0,e.$apply(),e.scrollInterval=r,o=setTimeout(s,a)},c=function(){e.newsItems.length>0?l(e.newsItems):setTimeout(s,2e3)},s=function(){clearInterval(o),n.getNews(l,c)};e.update.func=function(t){var n=JSON.parse(t.Data);t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data.URL=n.URL,s())},s()}])}(),function(){angular.module("mirrorApp").factory("claimdService",["$http","dataService",function(e,t){function n(e,n){var r;return e?(r=n?n:o.mainErrCallback,void t.getData("https://claimd.azurewebsites.net/api/items/home",e,n)):void console.log("Niet alle parameters zijn correct meegegeven.")}function r(e,t,n){for(var r=[],a=0;t>a;a++){var o=n[e+a];o&&r.push(o)}return r}function a(e,t){for(var n=[],r=0;r<e.length;r+=t)for(var a=0;t>a;a++)n[a]||n.push([]),n[a].push(e[r+a]);return n}var o={},i={getNews:n,getShowNewsItems:r,splitNewsInColumns:a};return o.mainErrCallback=function(e,t,n,r){console.log("There has been an error while retrieving data",e,t,n,r)},i}])}(),function(){angular.module("mirrorApp").directive("myClaimdImg",["dataService",function(e){return{restrict:"A",link:function(e,t,n){var r=n.item;r?t.attr("src",r):t.css("display","none")}}}])}(),function(){angular.module("mirrorApp").directive("myAutomaticClaimdScroll",["dataService",function(e){return{scope:{interval:"=myAutomaticClaimdScroll",func:"=refreshFunc"},restrict:"A",link:function(e,t,n){var r,a,o,i;e.$watch("interval",function(n){clearInterval(i),$(t).animate({scrollTop:0}),r=0,e.interval>1?i=setInterval(function(){if(o=parseInt(getComputedStyle(t[0].parentNode).getPropertyValue("height").slice(0,-2)),a=parseInt(getComputedStyle(t[0].querySelector(".news_column")).getPropertyValue("height").slice(0,-2)),r+=.7*o,r>a-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(i);r=-15}$(t[0].querySelectorAll(".news_column")).css({"margin-top":-r+"px",transition:"1s ease-in-out"})},e.interval):e.interval<-1&&(i=setInterval(function(){if(o=parseInt(getComputedStyle(t[0].parentNode).getPropertyValue("width")),a=parseInt(t[0].querySelector(".news_column").scrollWidth),r+=o-14,r>a-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(i);r=0}var n=t[0].querySelectorAll(".news_column");for(var l in n)$(n[l].querySelector(".news_container")).css({"margin-left":-r+"px",transition:"1s ease-in-out"})},-1*e.interval))})}}}])}();
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
        }

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
                if(item)
                    retTemp.push(item);
            }

            return retTemp;
        }

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
        }

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

(function () {
    angular.module("mirrorApp").directive('myAutomaticClaimdScroll', ["dataService", function (dataService) {
        return {
            scope:{
                interval: "=myAutomaticClaimdScroll",
                func: "=refreshFunc"
            },
            restrict: 'A',
            link: function (scope, element, attrs) {
                var scrollHeight;
                var totalHeight;
                var elHeight;
                var timer;

                scope.$watch("interval", function (val) {
                    clearInterval(timer);
                    $(element).animate({ scrollTop: 0 });
                    scrollHeight = 0;
                    if (scope.interval > 1) {
                        timer = setInterval(function () {

                            elHeight = parseInt(getComputedStyle(element[0].parentNode).getPropertyValue("height").slice(0, -2));
                            totalHeight = parseInt(getComputedStyle(element[0].querySelector(".news_column")).getPropertyValue("height").slice(0, -2));

                            scrollHeight += elHeight * 0.7;                           

                            if (scrollHeight > totalHeight - 40) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = -15;
                                }                               
                            }

                            $(element[0].querySelectorAll(".news_column")).css({
                                "margin-top": -scrollHeight + "px",
                                "transition": "1s ease-in-out"
                            });

                        }, scope.interval);
                    }else if(scope.interval < -1){
                        timer = setInterval(function () {

                            elHeight = parseInt(getComputedStyle(element[0].parentNode).getPropertyValue("width"));
                            totalHeight = parseInt(element[0].querySelector(".news_column").scrollWidth);

                            scrollHeight += elHeight -14;

                            if (scrollHeight > totalHeight - 40) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = 0;
                                }
                            }

                            var columns = element[0].querySelectorAll(".news_column");

                            for(var index in columns){
                                $(columns[index].querySelector(".news_container")).css({
                                    "margin-left": -scrollHeight + "px",
                                    "transition": "1s ease-in-out"
                                });
                            }

                        }, scope.interval * -1);
                    }
                });
            }
        }
    }]);
})();
!function(){angular.module("mirrorApp").controller("claimdCtrl",["$scope","confService","claimdService",function(e,t,n){e.newsItems=[],e.showAll=!0,e.columns=[],e.scrollInterval=r;const r=1e4,a=18e5;var o,i=2,l=function(t){e.newsItems=t.response.newestItems,e.columns=n.splitNewsInColumns(e.newsItems,i),e.scrollInterval=0,e.$apply(),e.scrollInterval=r,o=setTimeout(s,a)},c=function(){e.newsItems.length>0?l(e.newsItems):setTimeout(s,2e3)},s=function(){clearInterval(o),n.getNews(l,c)};e.update.func=function(t){var n=JSON.parse(t.Data);t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data.URL=n.URL,s())},s()}])}(),function(){angular.module("mirrorApp").factory("claimdService",["$http","dataService",function(e,t){function n(e,n){var r;return e?(r=n?n:o.mainErrCallback,void t.getData("https://claimd.azurewebsites.net/api/items/home",e,n)):void console.log("Niet alle parameters zijn correct meegegeven.")}function r(e,t,n){for(var r=[],a=0;t>a;a++){var o=n[e+a];o&&r.push(o)}return r}function a(e,t){for(var n=[],r=0;r<e.length;r+=t)for(var a=0;t>a;a++)n[a]||n.push([]),n[a].push(e[r+a]);return n}var o={},i={getNews:n,getShowNewsItems:r,splitNewsInColumns:a};return o.mainErrCallback=function(e,t,n,r){console.log("There has been an error while retrieving data",e,t,n,r)},i}])}(),function(){angular.module("mirrorApp").directive("myClaimdImg",["dataService",function(e){return{restrict:"A",link:function(e,t,n){var r=n.item;r?t.attr("src",r):t.css("display","none")}}}])}(),function(){angular.module("mirrorApp").directive("myAutomaticClaimdScroll",["dataService",function(e){return{scope:{interval:"=myAutomaticClaimdScroll",func:"=refreshFunc"},restrict:"A",link:function(e,t,n){var r,a,o,i;e.$watch("interval",function(n){clearInterval(i),$(t).animate({scrollTop:0}),r=0,e.interval>1?i=setInterval(function(){if(o=parseInt(getComputedStyle(t[0].parentNode).getPropertyValue("height").slice(0,-2)),a=parseInt(getComputedStyle(t[0].querySelector(".news_column")).getPropertyValue("height").slice(0,-2)),r+=.7*o,r>a-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(i);r=-15}$(t[0].querySelectorAll(".news_column")).css({"margin-top":-r+"px",transition:"1s ease-in-out"})},e.interval):e.interval<-1&&(i=setInterval(function(){if(o=parseInt(getComputedStyle(t[0].parentNode).getPropertyValue("width")),a=parseInt(t[0].querySelector(".news_column").scrollWidth),r+=o-14,r>a-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(i);r=0}var n=t[0].querySelectorAll(".news_column");for(var l in n)$(n[l].querySelector(".news_container")).css({"margin-left":-r+"px",transition:"1s ease-in-out"})},-1*e.interval))})}}}])}(),!function(){angular.module("mirrorApp").controller("claimdCtrl",["$scope","confService","claimdService",function(e,t,n){e.newsItems=[],e.showAll=!0,e.columns=[],e.scrollInterval=r;const r=1e4,a=18e5;var o,i=2,l=function(t){e.newsItems=t.response.newestItems,e.columns=n.splitNewsInColumns(e.newsItems,i),e.scrollInterval=0,e.$apply(),e.scrollInterval=r,o=setTimeout(s,a)},c=function(){e.newsItems.length>0?l(e.newsItems):setTimeout(s,2e3)},s=function(){clearInterval(o),n.getNews(l,c)};e.update.func=function(t){var n=JSON.parse(t.Data);t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data.URL=n.URL,s())},s()}])}(),function(){angular.module("mirrorApp").factory("claimdService",["$http","dataService",function(e,t){function n(e,n){var r;return e?(r=n?n:o.mainErrCallback,void t.getData("https://claimd.azurewebsites.net/api/items/home",e,n)):void console.log("Niet alle parameters zijn correct meegegeven.")}function r(e,t,n){for(var r=[],a=0;t>a;a++){var o=n[e+a];o&&r.push(o)}return r}function a(e,t){for(var n=[],r=0;r<e.length;r+=t)for(var a=0;t>a;a++)n[a]||n.push([]),n[a].push(e[r+a]);return n}var o={},i={getNews:n,getShowNewsItems:r,splitNewsInColumns:a};return o.mainErrCallback=function(e,t,n,r){console.log("There has been an error while retrieving data",e,t,n,r)},i}])}(),function(){angular.module("mirrorApp").directive("myClaimdImg",["dataService",function(e){return{restrict:"A",link:function(e,t,n){var r=n.item;r?t.attr("src",r):t.css("display","none")}}}])}(),function(){angular.module("mirrorApp").directive("myAutomaticClaimdScroll",["dataService",function(e){return{scope:{interval:"=myAutomaticClaimdScroll",func:"=refreshFunc"},restrict:"A",link:function(e,t,n){var r,a,o,i;e.$watch("interval",function(n){clearInterval(i),$(t).animate({scrollTop:0}),r=0,e.interval>1?i=setInterval(function(){if(o=parseInt(getComputedStyle(t[0].parentNode).getPropertyValue("height").slice(0,-2)),a=parseInt(getComputedStyle(t[0].querySelector(".news_column")).getPropertyValue("height").slice(0,-2)),r+=.7*o,r>a-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(i);r=-15}$(t[0].querySelectorAll(".news_column")).css({"margin-top":-r+"px",transition:"1s ease-in-out"})},e.interval):e.interval<-1&&(i=setInterval(function(){if(o=parseInt(getComputedStyle(t[0].parentNode).getPropertyValue("width")),a=parseInt(t[0].querySelector(".news_column").scrollWidth),r+=o-14,r>a-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(i);r=0}var n=t[0].querySelectorAll(".news_column");for(var l in n)$(n[l].querySelector(".news_container")).css({"margin-left":-r+"px",transition:"1s ease-in-out"})},-1*e.interval))})}}}])}(),function(){angular.module("mirrorApp").controller("claimdCtrl",["$scope","confService","claimdService",function(e,t,n){e.newsItems=[],e.showAll=!0,e.columns=[],e.scrollInterval=r;const r=1e4,a=18e5;var o,i=2,l=function(t){e.newsItems=t.response.newestItems,e.columns=n.splitNewsInColumns(e.newsItems,i),e.scrollInterval=0,e.$apply(),e.scrollInterval=r,o=setTimeout(s,a)},c=function(){e.newsItems.length>0?l(e.newsItems):setTimeout(s,2e3)},s=function(){clearInterval(o),n.getNews(l,c)};e.update.func=function(t){var n=JSON.parse(t.Data);t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data.URL=n.URL,s())},s()}])}(),function(){angular.module("mirrorApp").factory("claimdService",["$http","dataService",function(e,t){function n(e,n){var r;return e?(r=n?n:o.mainErrCallback,void t.getData("https://claimd.azurewebsites.net/api/items/home",e,n)):void console.log("Niet alle parameters zijn correct meegegeven.")}function r(e,t,n){for(var r=[],a=0;t>a;a++){var o=n[e+a];o&&r.push(o)}return r}function a(e,t){for(var n=[],r=0;r<e.length;r+=t)for(var a=0;t>a;a++)n[a]||n.push([]),n[a].push(e[r+a]);return n}var o={},i={getNews:n,getShowNewsItems:r,splitNewsInColumns:a};return o.mainErrCallback=function(e,t,n,r){console.log("There has been an error while retrieving data",e,t,n,r)},i}])}(),function(){angular.module("mirrorApp").directive("myClaimdImg",["dataService",function(e){return{restrict:"A",link:function(e,t,n){var r=n.item;r?t.attr("src",r):t.css("display","none")}}}])}(),function(){angular.module("mirrorApp").directive("myAutomaticClaimdScroll",["dataService",function(e){return{scope:{interval:"=myAutomaticClaimdScroll",func:"=refreshFunc"},restrict:"A",link:function(e,t,n){var r,a,o,i;e.$watch("interval",function(n){clearInterval(i),$(t).animate({scrollTop:0}),r=0,e.interval>1?i=setInterval(function(){if(o=parseInt(getComputedStyle(t[0].parentNode).getPropertyValue("height").slice(0,-2)),a=parseInt(getComputedStyle(t[0].querySelector(".news_column")).getPropertyValue("height").slice(0,-2)),r+=.7*o,r>a-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(i);r=-15}$(t[0].querySelectorAll(".news_column")).css({"margin-top":-r+"px",transition:"1s ease-in-out"})},e.interval):e.interval<-1&&(i=setInterval(function(){if(o=parseInt(getComputedStyle(t[0].parentNode).getPropertyValue("width")),a=parseInt(t[0].querySelector(".news_column").scrollWidth),r+=o-14,r>a-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(i);r=0}var n=t[0].querySelectorAll(".news_column");for(var l in n)$(n[l].querySelector(".news_container")).css({"margin-left":-r+"px",transition:"1s ease-in-out"})},-1*e.interval))})}}}])}();
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
        }

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
                if(item)
                    retTemp.push(item);
            }

            return retTemp;
        }

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
        }

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

(function () {
    angular.module("mirrorApp").directive('myAutomaticClaimdScroll', ["dataService", function (dataService) {
        return {
            scope:{
                interval: "=myAutomaticClaimdScroll",
                func: "=refreshFunc"
            },
            restrict: 'A',
            link: function (scope, element, attrs) {
                var scrollHeight;
                var totalHeight;
                var elHeight;
                var timer;

                scope.$watch("interval", function (val) {
                    clearInterval(timer);
                    $(element).animate({ scrollTop: 0 });
                    scrollHeight = 0;
                    if (scope.interval > 1) {
                        timer = setInterval(function () {

                            elHeight = parseInt(getComputedStyle(element[0].parentNode).getPropertyValue("height").slice(0, -2));
                            totalHeight = parseInt(getComputedStyle(element[0].querySelector(".news_column")).getPropertyValue("height").slice(0, -2));

                            scrollHeight += elHeight * 0.7;                           

                            if (scrollHeight > totalHeight - 40) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = -15;
                                }                               
                            }

                            $(element[0].querySelectorAll(".news_column")).css({
                                "margin-top": -scrollHeight + "px",
                                "transition": "1s ease-in-out"
                            });

                        }, scope.interval);
                    }else if(scope.interval < -1){
                        timer = setInterval(function () {

                            elHeight = parseInt(getComputedStyle(element[0].parentNode).getPropertyValue("width"));
                            totalHeight = parseInt(element[0].querySelector(".news_column").scrollWidth);

                            scrollHeight += elHeight -14;

                            if (scrollHeight > totalHeight - 40) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = 0;
                                }
                            }

                            var columns = element[0].querySelectorAll(".news_column");

                            for(var index in columns){
                                $(columns[index].querySelector(".news_container")).css({
                                    "margin-left": -scrollHeight + "px",
                                    "transition": "1s ease-in-out"
                                });
                            }

                        }, scope.interval * -1);
                    }
                });
            }
        }
    }]);
})();