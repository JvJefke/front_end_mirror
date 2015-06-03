(function () {
    angular.module('mirrorApp').controller('qodCtrl', ['$scope', '$rootScope', 'qodService', function ($scope, $rootScope, qodService) {
        $scope.qod = "";

        var setQod = function (data) {
            $scope.qod = data.contents.quote;
            $scope.author = data.contents.author;
        }

        var failQod = function (a,b,c,d) {
            console.log(a,b,c,d)
        }

        var init = function () {
            qodService.getQod(setQod, failQod);
        }

        init();
    }]);
})();