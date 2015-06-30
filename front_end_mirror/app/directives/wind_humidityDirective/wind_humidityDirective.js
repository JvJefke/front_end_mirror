(function () {
    // achteraf vervangen door expressies
    angular.module('mirrorApp').directive('myHw', [function () {
        return {
            restrict: 'E',
            scope: {
                hum: '=hum',
                wind: '=wind'
            },
            templateUrl: "./app/directives/wind_humidityDirective/my-wind_hum.html"
        }
    }]);
})();