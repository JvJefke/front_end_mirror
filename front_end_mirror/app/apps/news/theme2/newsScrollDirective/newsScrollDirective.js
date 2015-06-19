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