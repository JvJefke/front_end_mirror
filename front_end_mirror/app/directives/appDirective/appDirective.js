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

                //console.log(scope.app);

                // Maak een update object aan dat de controller kan overerven indien het update events wil opvangen.
                scope.update = {};
                scope.update.func = function () {}

                // Plaats de app volgensd de config
                element.css('top', scope.app.pTop);
                element.css('left', scope.app.pLeft);

                // Maak van de data string in de app een JSON object
                if (scope.app.Data)
                    scope.app.Data = JSON.parse(scope.app.Data);

                // Delen nodigom de source te bepalen
                var name = scope.app.Name.toLowerCase();
                var theme = scope.app.Theme.toLowerCase();
                var orientation = scope.app.Orientation;

                // Stel source (HTML file) van de app in
                scope.app.appSrc = "./app/apps/" + name + "/" + theme + "/" + name + orientation + ".html";

                // kijk voor veranderingen in de app config die relevant zijn voor de directive
                scope.$watch('app.pTop', function (nv) {
                    element.css('top', nv);
                });
                scope.$watch('app.pLeft', function (nv) {
                    element.css('left', nv);
                });
                scope.$watch('app.Theme', function (nv) {
                    theme = nv;
                    scope.app.appSrc = "./app/apps/" + name + "/" + theme + "/" + name + orientation + ".html";
                });
                scope.$watch('app.Orientation', function (nv) {
                    orientation = nv;
                    scope.app.appSrc = "./app/apps/" + name + "/" + theme + "/" + name + orientation + ".html";
                });

                // Vang het update event op en voor de scope.update funcctie uit. (kan gedefinieerd zijn in de controller van de app)
                scope.$on("update", function (event, data) {
                    var app = confService.getAppByName(data, scope.app.Name);
                    if (app && typeof(scope.update.func) == 'function')
                        scope.update.func(app);
                });
            },
        }
    }]);
})();

