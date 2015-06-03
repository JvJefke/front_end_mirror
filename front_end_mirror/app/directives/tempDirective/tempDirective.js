(function () {
    angular.module('mirrorApp').directive('myTemp', [function () {
        return {
            restrict: 'E',
            scope: {
                temp: '=temp',
                pre: '=pre'
            },
            templateUrl: "./app/directives/tempDirective/my-temp.html"
        }
    }]);
})();