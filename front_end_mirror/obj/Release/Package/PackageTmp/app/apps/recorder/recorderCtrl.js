(function () {
    angular.module('mirrorApp').controller('recorderCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.showRecorder = false;

        $rootScope.recorderToggle = function () {
            $scope.showRecorder = !$scope.showRecorder;
        };

        $rootScope.recorderHide = function () {
            $scope.showRecorder = false;
        };

        $rootScope.recorderShow = function () {
            $scope.showRecorder = true;
        };

    }]);
})();