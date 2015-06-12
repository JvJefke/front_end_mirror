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
