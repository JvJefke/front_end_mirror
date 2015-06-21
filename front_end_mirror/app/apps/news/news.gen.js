
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

(function () {
    angular.module("mirrorApp").directive('myAutomaticScroll', ["dataService", function (dataService) {
        return {
            scope:{
                interval: "=myAutomaticScroll",
                func: "=refreshFunc"
            },
            restrict: 'As',
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

                            if (scrollHeight != 0)
                                scrollHeight += elHeight - 15;
                            else
                                scrollHeight += elHeight -30;

                            if (scrollHeight > totalHeight - 60) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = -15;
                                }
                            }

                            var columns = element[0].querySelectorAll(".news_column");

                            for(var index in columns){
                                $(columns[index].querySelector(".news_container")).css({
                                    "margin-left": -scrollHeight + "px",
                                    "transition": "1s ease-in-out"
                                });
                            }                           

                            console.log(scrollHeight);

                        }, scope.interval * -1);
                    }
                });
            }
        }
    }]);
})();
!function(){angular.module("mirrorApp").factory("newsService",["dataService",function(e){function r(r,t,n){var i;return r&&t?(i=n?n:o.mainErrCallback,void e.getJSONFromXML(r,t,i)):void console.log("Niet alle parameters zijn correct meegegeven.")}function t(e,r,t){for(var n=[],o=0;r>o;o++){var i=t[e+o];n.push(i?i:{title:"",src:""})}return n}function n(e,r){for(var t=[],n=0;n<e.item.length;n+=r)for(var o=0;r>o;o++)t[o]||t.push([]),t[o].push(e.item[n+o]);return t}var o={},i={getNews:r,getShowNewsItems:t,splitNewsInColumns:n};return o.mainErrCallback=function(e,r,t,n){console.log("There has been an error while retrieving data",e,r,t,n)},i}])}(),function(){angular.module("mirrorApp").directive("myNewsImg",["dataService",function(e){return{restrict:"A",link:function(r,t,n){var o=e.getUrlFromRSS(n.item);o?t.attr("src",o):t.css("display","none")}}}])}(),function(){angular.module("mirrorApp").directive("myAutomaticScroll",["dataService",function(e){return{scope:{interval:"=myAutomaticScroll",func:"=refreshFunc"},restrict:"As",link:function(e,r,t){var n,o,i,a;e.$watch("interval",function(t){clearInterval(a),$(r).animate({scrollTop:0}),n=0,e.interval>1?a=setInterval(function(){if(i=parseInt(getComputedStyle(r[0].parentNode).getPropertyValue("height").slice(0,-2)),o=parseInt(getComputedStyle(r[0].querySelector(".news_column")).getPropertyValue("height").slice(0,-2)),n+=.7*i,n>o-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(a);n=-15}$(r[0].querySelectorAll(".news_column")).css({"margin-top":-n+"px",transition:"1s ease-in-out"})},e.interval):e.interval<-1&&(a=setInterval(function(){if(i=parseInt(getComputedStyle(r[0].parentNode).getPropertyValue("width")),o=parseInt(r[0].querySelector(".news_column").scrollWidth),n+=0!=n?i-15:i-30,n>o-60){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(a);n=-15}var t=r[0].querySelectorAll(".news_column");for(var l in t)$(t[l].querySelector(".news_container")).css({"margin-left":-n+"px",transition:"1s ease-in-out"});console.log(n)},-1*e.interval))})}}}])}();
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

(function () {
    angular.module("mirrorApp").directive('myAutomaticScroll', ["dataService", function (dataService) {
        return {
            scope:{
                interval: "=myAutomaticScroll",
                func: "=refreshFunc"
            },
            restrict: 'As',
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

                            if (scrollHeight != 0)
                                scrollHeight += elHeight - 15;
                            else
                                scrollHeight += elHeight -30;

                            if (scrollHeight > totalHeight - 60) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = -15;
                                }
                            }

                            var columns = element[0].querySelectorAll(".news_column");

                            for(var index in columns){
                                $(columns[index].querySelector(".news_container")).css({
                                    "margin-left": -scrollHeight + "px",
                                    "transition": "1s ease-in-out"
                                });
                            }                           

                            console.log(scrollHeight);

                        }, scope.interval * -1);
                    }
                });
            }
        }
    }]);
})();
!function(){angular.module("mirrorApp").factory("newsService",["dataService",function(e){function r(r,t,n){var i;return r&&t?(i=n?n:o.mainErrCallback,void e.getJSONFromXML(r,t,i)):void console.log("Niet alle parameters zijn correct meegegeven.")}function t(e,r,t){for(var n=[],o=0;r>o;o++){var i=t[e+o];n.push(i?i:{title:"",src:""})}return n}function n(e,r){for(var t=[],n=0;n<e.item.length;n+=r)for(var o=0;r>o;o++)t[o]||t.push([]),t[o].push(e.item[n+o]);return t}var o={},i={getNews:r,getShowNewsItems:t,splitNewsInColumns:n};return o.mainErrCallback=function(e,r,t,n){console.log("There has been an error while retrieving data",e,r,t,n)},i}])}(),function(){angular.module("mirrorApp").directive("myNewsImg",["dataService",function(e){return{restrict:"A",link:function(r,t,n){var o=e.getUrlFromRSS(n.item);o?t.attr("src",o):t.css("display","none")}}}])}(),function(){angular.module("mirrorApp").directive("myAutomaticScroll",["dataService",function(e){return{scope:{interval:"=myAutomaticScroll",func:"=refreshFunc"},restrict:"As",link:function(e,r,t){var n,o,i,a;e.$watch("interval",function(t){clearInterval(a),$(r).animate({scrollTop:0}),n=0,e.interval>1?a=setInterval(function(){if(i=parseInt(getComputedStyle(r[0].parentNode).getPropertyValue("height").slice(0,-2)),o=parseInt(getComputedStyle(r[0].querySelector(".news_column")).getPropertyValue("height").slice(0,-2)),n+=.7*i,n>o-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(a);n=-15}$(r[0].querySelectorAll(".news_column")).css({"margin-top":-n+"px",transition:"1s ease-in-out"})},e.interval):e.interval<-1&&(a=setInterval(function(){if(i=parseInt(getComputedStyle(r[0].parentNode).getPropertyValue("width")),o=parseInt(r[0].querySelector(".news_column").scrollWidth),n+=0!=n?i-15:i-30,n>o-60){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(a);n=-15}var t=r[0].querySelectorAll(".news_column");for(var l in t)$(t[l].querySelector(".news_container")).css({"margin-left":-n+"px",transition:"1s ease-in-out"});console.log(n)},-1*e.interval))})}}}])}(),!function(){angular.module("mirrorApp").factory("newsService",["dataService",function(e){function r(r,t,n){var i;return r&&t?(i=n?n:o.mainErrCallback,void e.getJSONFromXML(r,t,i)):void console.log("Niet alle parameters zijn correct meegegeven.")}function t(e,r,t){for(var n=[],o=0;r>o;o++){var i=t[e+o];n.push(i?i:{title:"",src:""})}return n}function n(e,r){for(var t=[],n=0;n<e.item.length;n+=r)for(var o=0;r>o;o++)t[o]||t.push([]),t[o].push(e.item[n+o]);return t}var o={},i={getNews:r,getShowNewsItems:t,splitNewsInColumns:n};return o.mainErrCallback=function(e,r,t,n){console.log("There has been an error while retrieving data",e,r,t,n)},i}])}(),function(){angular.module("mirrorApp").directive("myNewsImg",["dataService",function(e){return{restrict:"A",link:function(r,t,n){var o=e.getUrlFromRSS(n.item);o?t.attr("src",o):t.css("display","none")}}}])}(),function(){angular.module("mirrorApp").directive("myAutomaticScroll",["dataService",function(e){return{scope:{interval:"=myAutomaticScroll",func:"=refreshFunc"},restrict:"As",link:function(e,r,t){var n,o,i,a;e.$watch("interval",function(t){clearInterval(a),$(r).animate({scrollTop:0}),n=0,e.interval>1?a=setInterval(function(){if(i=parseInt(getComputedStyle(r[0].parentNode).getPropertyValue("height").slice(0,-2)),o=parseInt(getComputedStyle(r[0].querySelector(".news_column")).getPropertyValue("height").slice(0,-2)),n+=.7*i,n>o-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(a);n=-15}$(r[0].querySelectorAll(".news_column")).css({"margin-top":-n+"px",transition:"1s ease-in-out"})},e.interval):e.interval<-1&&(a=setInterval(function(){if(i=parseInt(getComputedStyle(r[0].parentNode).getPropertyValue("width")),o=parseInt(r[0].querySelector(".news_column").scrollWidth),n+=0!=n?i-15:i-30,n>o-60){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(a);n=-15}var t=r[0].querySelectorAll(".news_column");for(var l in t)$(t[l].querySelector(".news_container")).css({"margin-left":-n+"px",transition:"1s ease-in-out"});console.log(n)},-1*e.interval))})}}}])}(),function(){angular.module("mirrorApp").factory("newsService",["dataService",function(e){function r(r,t,n){var i;return r&&t?(i=n?n:o.mainErrCallback,void e.getJSONFromXML(r,t,i)):void console.log("Niet alle parameters zijn correct meegegeven.")}function t(e,r,t){for(var n=[],o=0;r>o;o++){var i=t[e+o];n.push(i?i:{title:"",src:""})}return n}function n(e,r){for(var t=[],n=0;n<e.item.length;n+=r)for(var o=0;r>o;o++)t[o]||t.push([]),t[o].push(e.item[n+o]);return t}var o={},i={getNews:r,getShowNewsItems:t,splitNewsInColumns:n};return o.mainErrCallback=function(e,r,t,n){console.log("There has been an error while retrieving data",e,r,t,n)},i}])}(),function(){angular.module("mirrorApp").directive("myNewsImg",["dataService",function(e){return{restrict:"A",link:function(r,t,n){var o=e.getUrlFromRSS(n.item);o?t.attr("src",o):t.css("display","none")}}}])}(),function(){angular.module("mirrorApp").directive("myAutomaticScroll",["dataService",function(e){return{scope:{interval:"=myAutomaticScroll",func:"=refreshFunc"},restrict:"As",link:function(e,r,t){var n,o,i,a;e.$watch("interval",function(t){clearInterval(a),$(r).animate({scrollTop:0}),n=0,e.interval>1?a=setInterval(function(){if(i=parseInt(getComputedStyle(r[0].parentNode).getPropertyValue("height").slice(0,-2)),o=parseInt(getComputedStyle(r[0].querySelector(".news_column")).getPropertyValue("height").slice(0,-2)),n+=.7*i,n>o-40){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(a);n=-15}$(r[0].querySelectorAll(".news_column")).css({"margin-top":-n+"px",transition:"1s ease-in-out"})},e.interval):e.interval<-1&&(a=setInterval(function(){if(i=parseInt(getComputedStyle(r[0].parentNode).getPropertyValue("width")),o=parseInt(r[0].querySelector(".news_column").scrollWidth),n+=0!=n?i-15:i-30,n>o-60){if(e.func&&"function"==typeof e.func)return e.func(),void clearInterval(a);n=-15}var t=r[0].querySelectorAll(".news_column");for(var l in t)$(t[l].querySelector(".news_container")).css({"margin-left":-n+"px",transition:"1s ease-in-out"});console.log(n)},-1*e.interval))})}}}])}();
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

(function () {
    angular.module("mirrorApp").directive('myAutomaticScroll', ["dataService", function (dataService) {
        return {
            scope:{
                interval: "=myAutomaticScroll",
                func: "=refreshFunc"
            },
            restrict: 'As',
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

                            if (scrollHeight != 0)
                                scrollHeight += elHeight - 15;
                            else
                                scrollHeight += elHeight -30;

                            if (scrollHeight > totalHeight - 60) {
                                if (scope.func && typeof (scope.func) == "function") {
                                    scope.func();
                                    clearInterval(timer);
                                    return;
                                } else {
                                    scrollHeight = -15;
                                }
                            }

                            var columns = element[0].querySelectorAll(".news_column");

                            for(var index in columns){
                                $(columns[index].querySelector(".news_container")).css({
                                    "margin-left": -scrollHeight + "px",
                                    "transition": "1s ease-in-out"
                                });
                            }                           

                            console.log(scrollHeight);

                        }, scope.interval * -1);
                    }
                });
            }
        }
    }]);
})();