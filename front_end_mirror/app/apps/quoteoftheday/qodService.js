(function () {
    angular.module('mirrorApp').factory('qodService', ['$http', 'dataService', function ($http, dataService) {
        var local = {};
        var service = {
            getQod: getQod
        };

        function getQod(callback, failCallback) {
            dataService.getData("http://api.theysaidso.com/qod.json", callback, failCallback);
        }

        return service;
    }]);
})();