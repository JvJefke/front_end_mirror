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
        };
    }]);
})();
