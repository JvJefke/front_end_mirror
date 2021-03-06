﻿(function () {
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