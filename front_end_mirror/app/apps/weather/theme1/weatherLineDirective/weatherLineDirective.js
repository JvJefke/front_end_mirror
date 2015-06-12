(function () {
    angular.module('mirrorApp').directive('myWLine', [function () {
        return {
            restrict: 'E',
            scope: {
                lineLength: '=myLength',
                orientation: "=myOrientation"
            },
            link: function (scope, element) {
                //console.log(scope.orientation);
                scope.$watch("lineLength", function (newVal, oldVal) {
                    switch (scope.orientation) {
                        case 1:
                            //console.log(scope.lineLength + "px");
                            element.css("height", scope.lineLength + "px");
                            break;
                        case 0:
                            var l = scope.lineLength * 1.34;
                            element.css("width", l + "px");
                            break;
                    }

                });
            }
        }
    }]);
})();