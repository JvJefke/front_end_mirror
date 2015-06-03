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