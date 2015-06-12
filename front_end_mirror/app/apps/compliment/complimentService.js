(function () {
    angular.module('mirrorApp').factory('complimentService', ['$http', 'dataService', function ($http, dataService) {
        var service = {
            getRandomCompliment: getRandomCompliment,
            getSize: getSize
        };
        var local = {
            getRandomCompliment: getRandom
        };

        // Service functions

        function getRandomCompliment(arr) {
            return local.getRandomCompliment(arr);
        }

        var sizeLib = ["small", "medium", "big"];

        function getSize(id) {
            return sizeLib[id - 1];
        }

        // local functions

        function getRandom(arr) {
            var index = Math.round(Math.random() * (arr.length - 1));
            return arr[index];
        }

        return service;
    }]);
})();