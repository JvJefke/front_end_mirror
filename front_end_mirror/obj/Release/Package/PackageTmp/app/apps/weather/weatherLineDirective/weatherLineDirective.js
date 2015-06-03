(function () {
    angular.module('mirrorApp').directive('myWLineHeight', [function () {
        return {
            restrict: 'A',
            scope: {
                lineHeight: '=myWLineHeight'
            },
            link: function (scope, element) {
                scope.$watch("lineHeight", function (newVal, oldVal) {
                    element.css("height", scope.lineHeight + "px");
                });
            }
        }
    }]);
})();