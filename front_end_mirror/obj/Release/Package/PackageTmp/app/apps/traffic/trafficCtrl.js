(function () {
    angular.module('mirrorApp').controller('trafficCtrl', ['$scope', '$rootScope', "trafficService", "styleLib", "uiGmapGoogleMapApi", "$sce", function ($scope, $rootScope, trafficService, styleLib, googleMapsApi, $sce) {
        /*$scope.map = { hiddenClass: ".hide", center: { latitude: 51.219053, longitude: 4.404418 }, zoom: 14, showTraffic: true, refresh:false };
        $scope.options = { styles: styleLib.style1, disableDefaultUI: true };
        $scope.layer = { type: "trafficLayer" };
        $scope.line = {};*/
        $scope.mapURL;
        $scope.refresh;
        $scope.mapURL = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/directions?origin=" + $scope.app.Data.from + "&destination=" + $scope.app.Data.to + "&key=AIzaSyBa0fvSoqhnkwmyNYlh5eYIULzTv-FlVHQ");
        //var directionDisplay;
        //var directionService = new google.maps.DirectionService();

        /*var setDirectionValues = function (map, data) {
            $scope.line = {
                path: data.points,
                geodesic: true,
                stroke: {
                    color: '#0000FF',
                    opacity: 0.5,
                    weight: 2
                }
            }
    
            refresh();
        }*/

        var refresh = function () {
            $scope.refresh = true;
        }

        refresh();
        var timer = setInterval(refresh, 300000);

        /*googleMapsApi.then(function (map) {
           
            //trafficService.getTrafficInfo(map, "Kortrijk", "Brussel", setDirectionValues, null);
                    
    
            /*directionDisplay.setMap(maps);
            var request = {
                origin: "Gent",
                destiniation: "Kortrijk",
                travelMode: google.maps.travelMode.DRIVING
            };
            directionService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
    
        });*/
    }]);
})();