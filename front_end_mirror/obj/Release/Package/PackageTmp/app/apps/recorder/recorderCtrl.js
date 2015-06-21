(function () {
    angular.module('mirrorApp').controller('recorderCtrl', ['$scope', 'speechService', function ($scope, speechService) {
        $scope.showRecorder = false;

        function recorderHide() {
            $scope.showRecorder = false;
        };

        function recorderShow() {
            $scope.showRecorder = true;
        };

        speechService.registerMic(recorderShow, recorderHide);

    }]);
})();