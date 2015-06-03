(function () {
    angular.module("mirrorApp").directive('myAutomaticScroll', ["dataService", function (dataService) {
        return {
            scope:{
                interval: "=myAutomaticScroll"
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

                            if (scrollHeight > totalHeight)
                                scrollHeight = 0;

                            console.log(scrollHeight);

                            $(element).animate({ scrollTop: scrollHeight });

                        }, scope.interval);
                    }
                });
            }
        }
    }]);
})();