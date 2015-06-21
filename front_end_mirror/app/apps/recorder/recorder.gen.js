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
!function(){angular.module("mirrorApp").controller("recorderCtrl",["$scope","speechService",function(r,e){function o(){r.showRecorder=!1}function c(){r.showRecorder=!0}r.showRecorder=!1,e.registerMic(c,o)}])}();
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
!function(){angular.module("mirrorApp").controller("recorderCtrl",["$scope","speechService",function(r,e){function o(){r.showRecorder=!1}function c(){r.showRecorder=!0}r.showRecorder=!1,e.registerMic(c,o)}])}(),!function(){angular.module("mirrorApp").controller("recorderCtrl",["$scope","speechService",function(r,e){function o(){r.showRecorder=!1}function c(){r.showRecorder=!0}r.showRecorder=!1,e.registerMic(c,o)}])}(),function(){angular.module("mirrorApp").controller("recorderCtrl",["$scope","speechService",function(r,e){function o(){r.showRecorder=!1}function c(){r.showRecorder=!0}r.showRecorder=!1,e.registerMic(c,o)}])}();
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