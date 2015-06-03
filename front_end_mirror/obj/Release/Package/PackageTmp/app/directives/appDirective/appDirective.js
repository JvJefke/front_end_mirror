(function () {
    angular.module('mirrorApp').directive('myApp', ['confService', function (confService) {
        return {
            restrict: 'E',
            scope: {
                app: '=app',
                apps: '=apps'
            },
            templateUrl: "./app/directives/appDirective/my-app.html",
            link: function (scope, element) {
                scope.update = {};
                scope.update.func = function () {}

                element.css('top', scope.app.pTop);
                element.css('left', scope.app.pLeft);
                if (scope.app.Data)
                    scope.app.Data = JSON.parse(scope.app.Data);
                var name = scope.app.Name.toLowerCase();
                scope.app.appSrc = "./app/apps/" + name + "/" + name + ".html";

                scope.$watch('app.pTop', function (nv) {
                    //console.log("renewing pTop ...");
                    element.css('top', nv);
                });

                scope.$watch('app.pLeft', function (nv) {
                    //console.log("renewing pLeft ...");
                    //console.log(nv);
                    element.css('left', nv);
                });

                scope.$on("update", function (event, data) {
                    var app = confService.getAppByName(data, scope.app.Name);
                    if (app && typeof(scope.update.func) == 'function')
                        scope.update.func(app);
                });
            },
        }
    }]);
})();

