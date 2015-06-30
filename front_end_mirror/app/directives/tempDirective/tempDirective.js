(function () {
    // Simpele temp directive om temperatuur goed te tonen. Kan ook met expressie uitgevoerd worden (zonder directive)
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