(function(){
    angular.module('mirrorApp').controller('weatherCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {
        $scope.showAll = true;
        $scope.weatherData = [];
        $scope.curr;
        $scope.showNow = false;
        $scope.showDays = false;
        $scope.numberOfItems = 0;

        const REFRESH_DAYS_INTERVAL = 60000 * 60;
        const REFRESH_CURR_INTERVAL = 10000

        var setData = function (data) {
            $scope.weatherData = data;
            if (($scope.app.Data.ShowToday != 1) || ($scope.curr && $scope.curr.weather)) {
                $scope.showDays = true;
                //$scope.showAll = true;
                if ($scope.app.Data.ShowToday == 2)
                    $scope.showNow = false;
            }
        };

        var setCurrData = function(data){
            $scope.curr = data;
            if (($scope.app.Data.ShowToday != 2) || ($scope.weatherData && $scope.weatherData.list)) {
                $scope.showNow = true;
                //$scope.showAll = true;
                if ($scope.app.Data.ShowToday == 1)
                    $scope.showDays = false;
            }                
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
            weatherService.getWeatherData($scope.app.Data, setData, function () { setTimeout(setData, REFRESH_DAYS_INTERVAL); }, failWeek)
        };

        var getNowData = function(){
            weatherService.getCurrentWeatherData($scope.app.Data, setCurrData, function () { setTimeout(setCurrData, REFRESH_CURR_INTERVAL); }, failNow);
        };

        var getData = function () {
            var numberOfLines = parseInt($scope.app.Data.Items);
            $scope.lineHeight = ((numberOfLines <= 1) ? 0 : numberOfLines * 70);

            if ($scope.app.Data.ShowToday == 1)
                getNowData();
            else if ($scope.app.Data.ShowToday == 2)
                getWeekData();
            else {
                getNowData();
                getWeekData();
                $scope.lineHeight += 140;
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