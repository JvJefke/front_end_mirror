(function () {
    angular.module('mirrorApp').directive('myWLineLength', [function () {
        return {
            restrict: 'A',
            scope: {
                lineLength: '=myWLineLength',
                orientation: "="
            },
            link: function (scope, element) {
                console.log(scope.orientation);
                scope.$watch("lineLength", function (newVal, oldVal) {
                    switch (scope.orientation) {
                        case 1:
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