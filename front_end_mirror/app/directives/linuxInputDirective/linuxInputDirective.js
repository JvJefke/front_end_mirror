(function () {
    angular.module('mirrorApp').directive('myLinuxInputDirective', [function () {
        return {
            restrict: 'A',
            scope: {
                trigger: '=focus'
            },
            link: function (scope, element) {
                scope.$watch('trigger', function (value) {
                    if (value == true) {
                        element[0].focus();
                        scope.trigger = false;
                    }
                })
            }
        }
    }]);
})();