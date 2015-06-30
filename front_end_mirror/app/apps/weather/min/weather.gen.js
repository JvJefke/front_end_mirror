(function(){
    angular.module('mirrorApp').controller('weatherCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {
        $scope.showAll = true;
        $scope.weatherData = [];
        $scope.curr;
        $scope.showNow = false;
        $scope.showDays = false;
        $scope.numberOfItems = 0;
        $scope.lineLength = 0;

        const REFRESH_DAYS_INTERVAL = 60000 * 60 * 3;
        const REFRESH_CURR_INTERVAL = 60000;

        var setData = function (data) {
            $scope.weatherData = data;
            if (($scope.app.Data.ShowToday != 1) || ($scope.curr && $scope.curr.weather)) {
                $scope.showDays = true;
                if ($scope.app.Data.ShowToday == 2)
                    $scope.showNow = false;
            }
            setTimeout(getWeekData, REFRESH_DAYS_INTERVAL);
        };

        var setCurrData = function(data){
            $scope.curr = data;
            if (($scope.app.Data.ShowToday != 2) || ($scope.weatherData && $scope.weatherData.list)) {
                $scope.showNow = true;
                if ($scope.app.Data.ShowToday == 1)
                    $scope.showDays = false;
            }
            setTimeout(getNowData, REFRESH_CURR_INTERVAL);
        }

        var failWeek = function () {
            console.log("Failed to get week weather data, trying again...")
            setTimeout(getWeekData, 2000);
        }

        var failNow = function () {
            console.log("Failed to get curr weather data, trying again...")
            setTimeout(getNowData, 2000);
        }

        var getWeekData = function () {
            console.log("week_refresh");
            weatherService.getWeatherData($scope.app.Data, setData, failWeek)
        };

        var getNowData = function () {
            console.log("now_data");
            weatherService.getCurrentWeatherData($scope.app.Data, setCurrData, failNow);
        };

        var getData = function () {
            var numberOfLines = parseInt($scope.app.Data.Items);
            $scope.lineLength = ((numberOfLines <= 1) ? 0 : numberOfLines * 70);

            if ($scope.app.Data.ShowToday == 1)
                getNowData();
            else if ($scope.app.Data.ShowToday == 2)
                getWeekData();
            else {
                getNowData();
                getWeekData();
                $scope.lineLength += 140;
            }

        };

        $scope.weatherImg = function(name){
            return weatherService.getImgOfWeather(name);
        };

        $scope.day = function(index){
            return weatherService.getDay(index);
        };

        var getNowDataRepeater = setInterval(getData, 108000000);

        $scope.update.func = function (app) {
            if (!(app.Data === JSON.stringify($scope.app.Data))) {
                if (app.Data) {
                    var data = JSON.parse(app.Data);
                    $scope.app.Data = data;
                    getData();
                }
            }
        }

        getData();
    }]);
})();
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