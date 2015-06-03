(function () {
    angular.module('mirrorApp').factory('complimentService', ['$http', 'dataService', function ($http, dataService) {
        var service = {
            getRandomCompliment : getRandomCompliment
        };
        var local = {
            getRandomCompliment: getRandom
        };

        // Service functions

        function getRandomCompliment(arr) {
            return local.getRandomCompliment(arr);
        }

        // local functions

        function getRandom(arr) {
            var index = Math.round(Math.random() * (arr.length - 1));
            return arr[index];
        }

        return service;
    }]);
})();