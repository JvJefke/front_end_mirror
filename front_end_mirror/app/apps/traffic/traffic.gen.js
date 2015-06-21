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
(function () {
    angular.module('mirrorApp').directive('myRefreshable', [function () {
        return {
            restrict: 'A',
            scope: {
                refresh: '=myRefreshable'
            },
            link: function (scope, element) {
                var refreshMe = function () {
                    element.attr('src', element.attr('src'));
                    console.log("refresh");
                };

                scope.$watch('refresh', function (newVal, oldVal) {
                    if (scope.refresh) {
                        scope.refresh = false;
                        refreshMe();
                    }
                });

            }
        }
    }]);

    //myMirror.directive('trafficDirective', [function () {
    //    return {
    //        restrict: 'E',
    //        templateUrl: "./app/apps/time/my-traffic.html",
    //        link: function (scope, element) {
    //            var directionsDisplay;
    //            var directionsService = new google.maps.DirectionsService();
    //            var map;

    //            function initialize() {
    //                directionsDisplay = new google.maps.DirectionsRenderer();
    //                var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    //                var mapOptions = {
    //                    zoom: 6,
    //                    center: chicago
    //                }
    //                map = new google.maps.Map(element, mapOptions);
    //                directionsDisplay.setMap(map);
    //            }

    //            function calcRoute() {
    //                var start = document.getElementById('start').value;
    //                var end = document.getElementById('end').value;
    //                var waypts = [];
    //                var checkboxArray = document.getElementById('waypoints');
    //                for (var i = 0; i < checkboxArray.length; i++) {
    //                    if (checkboxArray.options[i].selected == true) {
    //                        waypts.push({
    //                            location: checkboxArray[i].value,
    //                            stopover: true
    //                        });
    //                    }
    //                }

    //                var request = {
    //                    origin: start,
    //                    destination: end,
    //                    waypoints: waypts,
    //                    optimizeWaypoints: true,
    //                    travelMode: google.maps.TravelMode.DRIVING
    //                };
    //                directionsService.route(request, function (response, status) {
    //                    if (status == google.maps.DirectionsStatus.OK) {
    //                        directionsDisplay.setDirections(response);
    //                        var route = response.routes[0];
    //                        var summaryPanel = document.getElementById('directions_panel');
    //                        summaryPanel.innerHTML = '';
    //                        // For each route, display summary information.
    //                        for (var i = 0; i < route.legs.length; i++) {
    //                            var routeSegment = i + 1;
    //                            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
    //                            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
    //                            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
    //                            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
    //                        }
    //                    }
    //                });
    //            }

    //            google.maps.event.addDomListener(window, 'load', initialize);
    //        }
    //    }
    //}]);

})();
(function () {
    angular.module('mirrorApp').factory('trafficService', ['confService', 'mainFormatService', "dataService", function (confService, mfService, dataService) {
        var service = {
            getTrafficInfo: getTrafficInfo
        };
        var local = {};

        function getTrafficInfo(map, from, to, callback, failCallback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ "address": from }, function (data, status) { local.pointCallback(1, data, status, map, callback, failCallback); });
            geocoder.geocode({ "address": to }, function (data, status) { local.pointCallback(2, data, status, map, callback, failCallback); });
            //dataService.getData("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + from + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", function (data) { local.pointCallback(data, 1) }, failCallback);
            //dataService.getData("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + to + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", function (data) { local.pointCallback(data, 2) }, failCallback);*/

            //dataService.getData("https://maps.googleapis.com/maps/api/directions/json?departure_time=now&origin=" + from + "&destination=" + to + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", callback, failCallback)
        };

        local.getDirections = function (fromPoint, toPoint, map, callback, failCallback) {
            dataService.getData("https://api.tomtom.com/routing/1/calculateRoute/" + fromPoint[0] + "," + fromPoint[1] + ":" + toPoint[0] + "," + toPoint[1] + "/json?key=nrqqnw5ac2wx64xawpjg3r34&routeType=fastest&traffic=true&departAt=now&computeBestOrder=true", function (data) { local.getDuration(data, map, callback); }, failCallback);
        }

        local.pointCallback = function (type, data, status, map, callback, failCallback) {
            //console.log(type, data, status);
            var point = data[0].geometry.location;
            //console.log(point);
            switch (type) {
                case 1:
                    local.fromPoint = [point.k, point.B];
                    if (local.toPoint) {
                        //console.log(local, "from");
                        local.getDirections(local.fromPoint, local.toPoint, map, callback, failCallback);
                    }
                    break;
                case 2:
                    local.toPoint = [point.k, point.B];
                    if (local.fromPoint) {
                        //console.log(local, "to");
                        local.getDirections(local.fromPoint, local.toPoint, map, callback, failCallback);
                    }
                    break;
            }
        };

        local.pointsToPolyline = function (points) {
            var arr = [];
            for (var index in points) {
                //console.log(points[index]);
                arr.push(new google.maps.LatLng(points[index].latitude, points[index].longitude));
            }

            return arr;
        }

        local.getDuration = function (data, map, callback) {
            var obj = {};
            //console.log(data);

            obj.duration = { sec: data.routes[0].summary.travelTimeInSeconds, formatted: mfService.formatTime(data.routes[0].summary.travelTimeInSeconds) };
            obj.delay = { sec: data.routes[0].summary.trafficDelayInSeconds, formatted: mfService.formatTime(data.routes[0].summary.trafficDelayInSeconds) };
            obj.length = { meters: data.routes[0].summary.lengthInMeters, formatted: null };
            //obj.points = local.pointsToPolyline(data.routes[0].legs[0].points);
            obj.points = data.routes[0].legs[0].points;

            callback(map, obj);
        };

        return service;
    }]);
})();
!function(){angular.module("mirrorApp").controller("trafficCtrl",["$scope","$rootScope","trafficService","styleLib","uiGmapGoogleMapApi","$sce",function(e,t,o,r,n,a){e.mapURL,e.refresh,e.mapURL=a.trustAsResourceUrl("https://www.google.com/maps/embed/v1/directions?origin="+e.app.Data.from+"&destination="+e.app.Data.to+"&key=AIzaSyBa0fvSoqhnkwmyNYlh5eYIULzTv-FlVHQ");var i=function(){e.refresh=!0};i();setInterval(i,3e5)}])}(),function(){angular.module("mirrorApp").directive("myRefreshable",[function(){return{restrict:"A",scope:{refresh:"=myRefreshable"},link:function(e,t){var o=function(){t.attr("src",t.attr("src")),console.log("refresh")};e.$watch("refresh",function(t,r){e.refresh&&(e.refresh=!1,o())})}}}])}(),function(){angular.module("mirrorApp").factory("trafficService",["confService","mainFormatService","dataService",function(e,t,o){function r(e,t,o,r,n){var i=new google.maps.Geocoder;i.geocode({address:t},function(t,o){a.pointCallback(1,t,o,e,r,n)}),i.geocode({address:o},function(t,o){a.pointCallback(2,t,o,e,r,n)})}var n={getTrafficInfo:r},a={};return a.getDirections=function(e,t,r,n,i){o.getData("https://api.tomtom.com/routing/1/calculateRoute/"+e[0]+","+e[1]+":"+t[0]+","+t[1]+"/json?key=nrqqnw5ac2wx64xawpjg3r34&routeType=fastest&traffic=true&departAt=now&computeBestOrder=true",function(e){a.getDuration(e,r,n)},i)},a.pointCallback=function(e,t,o,r,n,i){var c=t[0].geometry.location;switch(e){case 1:a.fromPoint=[c.k,c.B],a.toPoint&&a.getDirections(a.fromPoint,a.toPoint,r,n,i);break;case 2:a.toPoint=[c.k,c.B],a.fromPoint&&a.getDirections(a.fromPoint,a.toPoint,r,n,i)}},a.pointsToPolyline=function(e){var t=[];for(var o in e)t.push(new google.maps.LatLng(e[o].latitude,e[o].longitude));return t},a.getDuration=function(e,o,r){var n={};n.duration={sec:e.routes[0].summary.travelTimeInSeconds,formatted:t.formatTime(e.routes[0].summary.travelTimeInSeconds)},n.delay={sec:e.routes[0].summary.trafficDelayInSeconds,formatted:t.formatTime(e.routes[0].summary.trafficDelayInSeconds)},n.length={meters:e.routes[0].summary.lengthInMeters,formatted:null},n.points=e.routes[0].legs[0].points,r(o,n)},n}])}();
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
(function () {
    angular.module('mirrorApp').directive('myRefreshable', [function () {
        return {
            restrict: 'A',
            scope: {
                refresh: '=myRefreshable'
            },
            link: function (scope, element) {
                var refreshMe = function () {
                    element.attr('src', element.attr('src'));
                    console.log("refresh");
                };

                scope.$watch('refresh', function (newVal, oldVal) {
                    if (scope.refresh) {
                        scope.refresh = false;
                        refreshMe();
                    }
                });

            }
        }
    }]);

    //myMirror.directive('trafficDirective', [function () {
    //    return {
    //        restrict: 'E',
    //        templateUrl: "./app/apps/time/my-traffic.html",
    //        link: function (scope, element) {
    //            var directionsDisplay;
    //            var directionsService = new google.maps.DirectionsService();
    //            var map;

    //            function initialize() {
    //                directionsDisplay = new google.maps.DirectionsRenderer();
    //                var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    //                var mapOptions = {
    //                    zoom: 6,
    //                    center: chicago
    //                }
    //                map = new google.maps.Map(element, mapOptions);
    //                directionsDisplay.setMap(map);
    //            }

    //            function calcRoute() {
    //                var start = document.getElementById('start').value;
    //                var end = document.getElementById('end').value;
    //                var waypts = [];
    //                var checkboxArray = document.getElementById('waypoints');
    //                for (var i = 0; i < checkboxArray.length; i++) {
    //                    if (checkboxArray.options[i].selected == true) {
    //                        waypts.push({
    //                            location: checkboxArray[i].value,
    //                            stopover: true
    //                        });
    //                    }
    //                }

    //                var request = {
    //                    origin: start,
    //                    destination: end,
    //                    waypoints: waypts,
    //                    optimizeWaypoints: true,
    //                    travelMode: google.maps.TravelMode.DRIVING
    //                };
    //                directionsService.route(request, function (response, status) {
    //                    if (status == google.maps.DirectionsStatus.OK) {
    //                        directionsDisplay.setDirections(response);
    //                        var route = response.routes[0];
    //                        var summaryPanel = document.getElementById('directions_panel');
    //                        summaryPanel.innerHTML = '';
    //                        // For each route, display summary information.
    //                        for (var i = 0; i < route.legs.length; i++) {
    //                            var routeSegment = i + 1;
    //                            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
    //                            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
    //                            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
    //                            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
    //                        }
    //                    }
    //                });
    //            }

    //            google.maps.event.addDomListener(window, 'load', initialize);
    //        }
    //    }
    //}]);

})();
(function () {
    angular.module('mirrorApp').factory('trafficService', ['confService', 'mainFormatService', "dataService", function (confService, mfService, dataService) {
        var service = {
            getTrafficInfo: getTrafficInfo
        };
        var local = {};

        function getTrafficInfo(map, from, to, callback, failCallback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ "address": from }, function (data, status) { local.pointCallback(1, data, status, map, callback, failCallback); });
            geocoder.geocode({ "address": to }, function (data, status) { local.pointCallback(2, data, status, map, callback, failCallback); });
            //dataService.getData("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + from + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", function (data) { local.pointCallback(data, 1) }, failCallback);
            //dataService.getData("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + to + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", function (data) { local.pointCallback(data, 2) }, failCallback);*/

            //dataService.getData("https://maps.googleapis.com/maps/api/directions/json?departure_time=now&origin=" + from + "&destination=" + to + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", callback, failCallback)
        };

        local.getDirections = function (fromPoint, toPoint, map, callback, failCallback) {
            dataService.getData("https://api.tomtom.com/routing/1/calculateRoute/" + fromPoint[0] + "," + fromPoint[1] + ":" + toPoint[0] + "," + toPoint[1] + "/json?key=nrqqnw5ac2wx64xawpjg3r34&routeType=fastest&traffic=true&departAt=now&computeBestOrder=true", function (data) { local.getDuration(data, map, callback); }, failCallback);
        }

        local.pointCallback = function (type, data, status, map, callback, failCallback) {
            //console.log(type, data, status);
            var point = data[0].geometry.location;
            //console.log(point);
            switch (type) {
                case 1:
                    local.fromPoint = [point.k, point.B];
                    if (local.toPoint) {
                        //console.log(local, "from");
                        local.getDirections(local.fromPoint, local.toPoint, map, callback, failCallback);
                    }
                    break;
                case 2:
                    local.toPoint = [point.k, point.B];
                    if (local.fromPoint) {
                        //console.log(local, "to");
                        local.getDirections(local.fromPoint, local.toPoint, map, callback, failCallback);
                    }
                    break;
            }
        };

        local.pointsToPolyline = function (points) {
            var arr = [];
            for (var index in points) {
                //console.log(points[index]);
                arr.push(new google.maps.LatLng(points[index].latitude, points[index].longitude));
            }

            return arr;
        }

        local.getDuration = function (data, map, callback) {
            var obj = {};
            //console.log(data);

            obj.duration = { sec: data.routes[0].summary.travelTimeInSeconds, formatted: mfService.formatTime(data.routes[0].summary.travelTimeInSeconds) };
            obj.delay = { sec: data.routes[0].summary.trafficDelayInSeconds, formatted: mfService.formatTime(data.routes[0].summary.trafficDelayInSeconds) };
            obj.length = { meters: data.routes[0].summary.lengthInMeters, formatted: null };
            //obj.points = local.pointsToPolyline(data.routes[0].legs[0].points);
            obj.points = data.routes[0].legs[0].points;

            callback(map, obj);
        };

        return service;
    }]);
})();
!function(){angular.module("mirrorApp").controller("trafficCtrl",["$scope","$rootScope","trafficService","styleLib","uiGmapGoogleMapApi","$sce",function(e,t,o,r,n,a){e.mapURL,e.refresh,e.mapURL=a.trustAsResourceUrl("https://www.google.com/maps/embed/v1/directions?origin="+e.app.Data.from+"&destination="+e.app.Data.to+"&key=AIzaSyBa0fvSoqhnkwmyNYlh5eYIULzTv-FlVHQ");var i=function(){e.refresh=!0};i();setInterval(i,3e5)}])}(),function(){angular.module("mirrorApp").directive("myRefreshable",[function(){return{restrict:"A",scope:{refresh:"=myRefreshable"},link:function(e,t){var o=function(){t.attr("src",t.attr("src")),console.log("refresh")};e.$watch("refresh",function(t,r){e.refresh&&(e.refresh=!1,o())})}}}])}(),function(){angular.module("mirrorApp").factory("trafficService",["confService","mainFormatService","dataService",function(e,t,o){function r(e,t,o,r,n){var i=new google.maps.Geocoder;i.geocode({address:t},function(t,o){a.pointCallback(1,t,o,e,r,n)}),i.geocode({address:o},function(t,o){a.pointCallback(2,t,o,e,r,n)})}var n={getTrafficInfo:r},a={};return a.getDirections=function(e,t,r,n,i){o.getData("https://api.tomtom.com/routing/1/calculateRoute/"+e[0]+","+e[1]+":"+t[0]+","+t[1]+"/json?key=nrqqnw5ac2wx64xawpjg3r34&routeType=fastest&traffic=true&departAt=now&computeBestOrder=true",function(e){a.getDuration(e,r,n)},i)},a.pointCallback=function(e,t,o,r,n,i){var c=t[0].geometry.location;switch(e){case 1:a.fromPoint=[c.k,c.B],a.toPoint&&a.getDirections(a.fromPoint,a.toPoint,r,n,i);break;case 2:a.toPoint=[c.k,c.B],a.fromPoint&&a.getDirections(a.fromPoint,a.toPoint,r,n,i)}},a.pointsToPolyline=function(e){var t=[];for(var o in e)t.push(new google.maps.LatLng(e[o].latitude,e[o].longitude));return t},a.getDuration=function(e,o,r){var n={};n.duration={sec:e.routes[0].summary.travelTimeInSeconds,formatted:t.formatTime(e.routes[0].summary.travelTimeInSeconds)},n.delay={sec:e.routes[0].summary.trafficDelayInSeconds,formatted:t.formatTime(e.routes[0].summary.trafficDelayInSeconds)},n.length={meters:e.routes[0].summary.lengthInMeters,formatted:null},n.points=e.routes[0].legs[0].points,r(o,n)},n}])}(),!function(){angular.module("mirrorApp").controller("trafficCtrl",["$scope","$rootScope","trafficService","styleLib","uiGmapGoogleMapApi","$sce",function(e,t,o,r,n,a){e.mapURL,e.refresh,e.mapURL=a.trustAsResourceUrl("https://www.google.com/maps/embed/v1/directions?origin="+e.app.Data.from+"&destination="+e.app.Data.to+"&key=AIzaSyBa0fvSoqhnkwmyNYlh5eYIULzTv-FlVHQ");var i=function(){e.refresh=!0};i(),setInterval(i,3e5)}])}(),function(){angular.module("mirrorApp").directive("myRefreshable",[function(){return{restrict:"A",scope:{refresh:"=myRefreshable"},link:function(e,t){var o=function(){t.attr("src",t.attr("src")),console.log("refresh")};e.$watch("refresh",function(t,r){e.refresh&&(e.refresh=!1,o())})}}}])}(),function(){angular.module("mirrorApp").factory("trafficService",["confService","mainFormatService","dataService",function(e,t,o){function r(e,t,o,r,n){var i=new google.maps.Geocoder;i.geocode({address:t},function(t,o){a.pointCallback(1,t,o,e,r,n)}),i.geocode({address:o},function(t,o){a.pointCallback(2,t,o,e,r,n)})}var n={getTrafficInfo:r},a={};return a.getDirections=function(e,t,r,n,i){o.getData("https://api.tomtom.com/routing/1/calculateRoute/"+e[0]+","+e[1]+":"+t[0]+","+t[1]+"/json?key=nrqqnw5ac2wx64xawpjg3r34&routeType=fastest&traffic=true&departAt=now&computeBestOrder=true",function(e){a.getDuration(e,r,n)},i)},a.pointCallback=function(e,t,o,r,n,i){var c=t[0].geometry.location;switch(e){case 1:a.fromPoint=[c.k,c.B],a.toPoint&&a.getDirections(a.fromPoint,a.toPoint,r,n,i);break;case 2:a.toPoint=[c.k,c.B],a.fromPoint&&a.getDirections(a.fromPoint,a.toPoint,r,n,i)}},a.pointsToPolyline=function(e){var t=[];for(var o in e)t.push(new google.maps.LatLng(e[o].latitude,e[o].longitude));return t},a.getDuration=function(e,o,r){var n={};n.duration={sec:e.routes[0].summary.travelTimeInSeconds,formatted:t.formatTime(e.routes[0].summary.travelTimeInSeconds)},n.delay={sec:e.routes[0].summary.trafficDelayInSeconds,formatted:t.formatTime(e.routes[0].summary.trafficDelayInSeconds)},n.length={meters:e.routes[0].summary.lengthInMeters,formatted:null},n.points=e.routes[0].legs[0].points,r(o,n)},n}])}(),function(){angular.module("mirrorApp").controller("trafficCtrl",["$scope","$rootScope","trafficService","styleLib","uiGmapGoogleMapApi","$sce",function(e,t,o,r,n,a){e.mapURL,e.refresh,e.mapURL=a.trustAsResourceUrl("https://www.google.com/maps/embed/v1/directions?origin="+e.app.Data.from+"&destination="+e.app.Data.to+"&key=AIzaSyBa0fvSoqhnkwmyNYlh5eYIULzTv-FlVHQ");var i=function(){e.refresh=!0};i();setInterval(i,3e5)}])}(),function(){angular.module("mirrorApp").directive("myRefreshable",[function(){return{restrict:"A",scope:{refresh:"=myRefreshable"},link:function(e,t){var o=function(){t.attr("src",t.attr("src")),console.log("refresh")};e.$watch("refresh",function(t,r){e.refresh&&(e.refresh=!1,o())})}}}])}(),function(){angular.module("mirrorApp").factory("trafficService",["confService","mainFormatService","dataService",function(e,t,o){function r(e,t,o,r,n){var i=new google.maps.Geocoder;i.geocode({address:t},function(t,o){a.pointCallback(1,t,o,e,r,n)}),i.geocode({address:o},function(t,o){a.pointCallback(2,t,o,e,r,n)})}var n={getTrafficInfo:r},a={};return a.getDirections=function(e,t,r,n,i){o.getData("https://api.tomtom.com/routing/1/calculateRoute/"+e[0]+","+e[1]+":"+t[0]+","+t[1]+"/json?key=nrqqnw5ac2wx64xawpjg3r34&routeType=fastest&traffic=true&departAt=now&computeBestOrder=true",function(e){a.getDuration(e,r,n)},i)},a.pointCallback=function(e,t,o,r,n,i){var c=t[0].geometry.location;switch(e){case 1:a.fromPoint=[c.k,c.B],a.toPoint&&a.getDirections(a.fromPoint,a.toPoint,r,n,i);break;case 2:a.toPoint=[c.k,c.B],a.fromPoint&&a.getDirections(a.fromPoint,a.toPoint,r,n,i)}},a.pointsToPolyline=function(e){var t=[];for(var o in e)t.push(new google.maps.LatLng(e[o].latitude,e[o].longitude));return t},a.getDuration=function(e,o,r){var n={};n.duration={sec:e.routes[0].summary.travelTimeInSeconds,formatted:t.formatTime(e.routes[0].summary.travelTimeInSeconds)},n.delay={sec:e.routes[0].summary.trafficDelayInSeconds,formatted:t.formatTime(e.routes[0].summary.trafficDelayInSeconds)},n.length={meters:e.routes[0].summary.lengthInMeters,formatted:null},n.points=e.routes[0].legs[0].points,r(o,n)},n}])}();
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
(function () {
    angular.module('mirrorApp').directive('myRefreshable', [function () {
        return {
            restrict: 'A',
            scope: {
                refresh: '=myRefreshable'
            },
            link: function (scope, element) {
                var refreshMe = function () {
                    element.attr('src', element.attr('src'));
                    console.log("refresh");
                };

                scope.$watch('refresh', function (newVal, oldVal) {
                    if (scope.refresh) {
                        scope.refresh = false;
                        refreshMe();
                    }
                });

            }
        }
    }]);

    //myMirror.directive('trafficDirective', [function () {
    //    return {
    //        restrict: 'E',
    //        templateUrl: "./app/apps/time/my-traffic.html",
    //        link: function (scope, element) {
    //            var directionsDisplay;
    //            var directionsService = new google.maps.DirectionsService();
    //            var map;

    //            function initialize() {
    //                directionsDisplay = new google.maps.DirectionsRenderer();
    //                var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    //                var mapOptions = {
    //                    zoom: 6,
    //                    center: chicago
    //                }
    //                map = new google.maps.Map(element, mapOptions);
    //                directionsDisplay.setMap(map);
    //            }

    //            function calcRoute() {
    //                var start = document.getElementById('start').value;
    //                var end = document.getElementById('end').value;
    //                var waypts = [];
    //                var checkboxArray = document.getElementById('waypoints');
    //                for (var i = 0; i < checkboxArray.length; i++) {
    //                    if (checkboxArray.options[i].selected == true) {
    //                        waypts.push({
    //                            location: checkboxArray[i].value,
    //                            stopover: true
    //                        });
    //                    }
    //                }

    //                var request = {
    //                    origin: start,
    //                    destination: end,
    //                    waypoints: waypts,
    //                    optimizeWaypoints: true,
    //                    travelMode: google.maps.TravelMode.DRIVING
    //                };
    //                directionsService.route(request, function (response, status) {
    //                    if (status == google.maps.DirectionsStatus.OK) {
    //                        directionsDisplay.setDirections(response);
    //                        var route = response.routes[0];
    //                        var summaryPanel = document.getElementById('directions_panel');
    //                        summaryPanel.innerHTML = '';
    //                        // For each route, display summary information.
    //                        for (var i = 0; i < route.legs.length; i++) {
    //                            var routeSegment = i + 1;
    //                            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
    //                            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
    //                            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
    //                            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
    //                        }
    //                    }
    //                });
    //            }

    //            google.maps.event.addDomListener(window, 'load', initialize);
    //        }
    //    }
    //}]);

})();
(function () {
    angular.module('mirrorApp').factory('trafficService', ['confService', 'mainFormatService', "dataService", function (confService, mfService, dataService) {
        var service = {
            getTrafficInfo: getTrafficInfo
        };
        var local = {};

        function getTrafficInfo(map, from, to, callback, failCallback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ "address": from }, function (data, status) { local.pointCallback(1, data, status, map, callback, failCallback); });
            geocoder.geocode({ "address": to }, function (data, status) { local.pointCallback(2, data, status, map, callback, failCallback); });
            //dataService.getData("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + from + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", function (data) { local.pointCallback(data, 1) }, failCallback);
            //dataService.getData("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + to + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", function (data) { local.pointCallback(data, 2) }, failCallback);*/

            //dataService.getData("https://maps.googleapis.com/maps/api/directions/json?departure_time=now&origin=" + from + "&destination=" + to + "&key=AIzaSyBNLJCL7dzCI7QeTlFVF98mZRS2Pva1e6Y", callback, failCallback)
        };

        local.getDirections = function (fromPoint, toPoint, map, callback, failCallback) {
            dataService.getData("https://api.tomtom.com/routing/1/calculateRoute/" + fromPoint[0] + "," + fromPoint[1] + ":" + toPoint[0] + "," + toPoint[1] + "/json?key=nrqqnw5ac2wx64xawpjg3r34&routeType=fastest&traffic=true&departAt=now&computeBestOrder=true", function (data) { local.getDuration(data, map, callback); }, failCallback);
        }

        local.pointCallback = function (type, data, status, map, callback, failCallback) {
            //console.log(type, data, status);
            var point = data[0].geometry.location;
            //console.log(point);
            switch (type) {
                case 1:
                    local.fromPoint = [point.k, point.B];
                    if (local.toPoint) {
                        //console.log(local, "from");
                        local.getDirections(local.fromPoint, local.toPoint, map, callback, failCallback);
                    }
                    break;
                case 2:
                    local.toPoint = [point.k, point.B];
                    if (local.fromPoint) {
                        //console.log(local, "to");
                        local.getDirections(local.fromPoint, local.toPoint, map, callback, failCallback);
                    }
                    break;
            }
        };

        local.pointsToPolyline = function (points) {
            var arr = [];
            for (var index in points) {
                //console.log(points[index]);
                arr.push(new google.maps.LatLng(points[index].latitude, points[index].longitude));
            }

            return arr;
        }

        local.getDuration = function (data, map, callback) {
            var obj = {};
            //console.log(data);

            obj.duration = { sec: data.routes[0].summary.travelTimeInSeconds, formatted: mfService.formatTime(data.routes[0].summary.travelTimeInSeconds) };
            obj.delay = { sec: data.routes[0].summary.trafficDelayInSeconds, formatted: mfService.formatTime(data.routes[0].summary.trafficDelayInSeconds) };
            obj.length = { meters: data.routes[0].summary.lengthInMeters, formatted: null };
            //obj.points = local.pointsToPolyline(data.routes[0].legs[0].points);
            obj.points = data.routes[0].legs[0].points;

            callback(map, obj);
        };

        return service;
    }]);
})();