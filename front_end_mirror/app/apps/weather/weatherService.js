(function () {
    angular.module('mirrorApp').factory('weatherService', ['$http', 'dataService', function ($http, dataService) {
        var service = {};
        var local = {};

        service.getWeatherData = function (data, callback, failCallback) {
            dataService.getData("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + data.Location + "&cnt=" + data.Items + "&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7", callback, failCallback);
        };

        service.getCurrentWeatherData = function (data, callback, failCallback) {
            dataService.getData("http://api.openweathermap.org/data/2.5/weather?q=" + data.Location + "&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7", callback, failCallback);
        };

        service.getDay = function (index) {
            if (index === 0)
                return "Today";

            var currDay = new Date().getDay();
            var day = currDay + index;

            if (day >= local.dayMap.length)
                day = day - local.dayMap.length + 1;

            return local.dayMap[day];
        };

        service.getImgOfWeather = function (name) {
            if (!name)
                return;

            for (item in local.imgMap) {
                if (local.imgMap[item].name == name.substr(0, 2)) {
                    //console.log(local.imgMap[item]);
                    return local.imgMap[item].img;
                }
            }
        };

        service.getDay = function (index) {
            if (index === 0)
                return "Today";

            var currDay = new Date().getDay();
            var day = currDay + index;

            if (day >= local.dayMap.length)
                day = day - local.dayMap.length;

            return local.dayMap[day];
        };

        local.imgMap = [
            { name: '01', img: 'clear.svg' },
            { name: '02', img: 'few_clouds.svg' },
            { name: '03', img: 'scattered_clouds.svg' },
            { name: '04', img: 'broken_clouds.svg' },
            { name: '09', img: 'shower_rain.svg' },
            { name: '10', img: 'rain.svg' },
            { name: '11', img: 'thunderstorm.svg' },
            { name: '13', img: 'snow.svg' },
            { name: '50', img: 'mist.svg' }
        ];

        local.dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return service;
    }]);
})();