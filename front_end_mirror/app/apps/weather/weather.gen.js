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
!function(){angular.module("mirrorApp").controller("weatherCtrl",["$scope","weatherService",function(a,e){a.showAll=!0,a.weatherData=[],a.curr,a.showNow=!1,a.showDays=!1,a.numberOfItems=0,a.lineLength=0;const t=108e5,n=6e4;var r=function(e){a.weatherData=e,(1!=a.app.Data.ShowToday||a.curr&&a.curr.weather)&&(a.showDays=!0,2==a.app.Data.ShowToday&&(a.showNow=!1)),setTimeout(g,t)},o=function(e){a.curr=e,(2!=a.app.Data.ShowToday||a.weatherData&&a.weatherData.list)&&(a.showNow=!0,1==a.app.Data.ShowToday&&(a.showDays=!1)),setTimeout(s,n)},i=function(){console.log("Failed to get week weather data, trying again..."),setTimeout(g,2e3)},c=function(){console.log("Failed to get curr weather data, trying again..."),setTimeout(s,2e3)},g=function(){console.log("week_refresh"),e.getWeatherData(a.app.Data,r,i)},s=function(){console.log("now_data"),e.getCurrentWeatherData(a.app.Data,o,c)},u=function(){var e=parseInt(a.app.Data.Items);a.lineLength=1>=e?0:70*e,1==a.app.Data.ShowToday?s():2==a.app.Data.ShowToday?g():(s(),g(),a.lineLength+=140)};a.weatherImg=function(a){return e.getImgOfWeather(a)},a.day=function(a){return e.getDay(a)};setInterval(u,108e6);a.update.func=function(e){if(e.Data!==JSON.stringify(a.app.Data)&&e.Data){var t=JSON.parse(e.Data);a.app.Data=t,u()}},u()}])}(),function(){angular.module("mirrorApp").factory("weatherService",["$http","dataService",function(a,e){var t={},n={};return t.getWeatherData=function(a,t,n){e.getData("http://api.openweathermap.org/data/2.5/forecast/daily?q="+a.Location+"&cnt="+a.Items+"&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7",t,n)},t.getCurrentWeatherData=function(a,t,n){e.getData("http://api.openweathermap.org/data/2.5/weather?q="+a.Location+"&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7",t,n)},t.getDay=function(a){if(0===a)return"Today";var e=(new Date).getDay(),t=e+a;return t>=n.dayMap.length&&(t=t-n.dayMap.length+1),n.dayMap[t]},t.getImgOfWeather=function(a){if(a)for(item in n.imgMap)if(n.imgMap[item].name==a.substr(0,2))return n.imgMap[item].img},t.getDay=function(a){if(0===a)return"Today";var e=(new Date).getDay(),t=e+a;return t>=n.dayMap.length&&(t-=n.dayMap.length),n.dayMap[t]},n.imgMap=[{name:"01",img:"clear.svg"},{name:"02",img:"few_clouds.svg"},{name:"03",img:"scattered_clouds.svg"},{name:"04",img:"broken_clouds.svg"},{name:"09",img:"shower_rain.svg"},{name:"10",img:"rain.svg"},{name:"11",img:"thunderstorm.svg"},{name:"13",img:"snow.svg"},{name:"50",img:"mist.svg"}],n.dayMap=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t}])}(),function(){angular.module("mirrorApp").directive("myWLine",[function(){return{restrict:"E",scope:{lineLength:"=myLength",orientation:"=myOrientation"},link:function(a,e){a.$watch("lineLength",function(t,n){switch(a.orientation){case 1:e.css("height",a.lineLength+"px");break;case 0:var r=1.34*a.lineLength;e.css("width",r+"px")}})}}}])}();
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
!function(){angular.module("mirrorApp").controller("weatherCtrl",["$scope","weatherService",function(a,e){a.showAll=!0,a.weatherData=[],a.curr,a.showNow=!1,a.showDays=!1,a.numberOfItems=0,a.lineLength=0;const t=108e5,n=6e4;var r=function(e){a.weatherData=e,(1!=a.app.Data.ShowToday||a.curr&&a.curr.weather)&&(a.showDays=!0,2==a.app.Data.ShowToday&&(a.showNow=!1)),setTimeout(g,t)},o=function(e){a.curr=e,(2!=a.app.Data.ShowToday||a.weatherData&&a.weatherData.list)&&(a.showNow=!0,1==a.app.Data.ShowToday&&(a.showDays=!1)),setTimeout(s,n)},i=function(){console.log("Failed to get week weather data, trying again..."),setTimeout(g,2e3)},c=function(){console.log("Failed to get curr weather data, trying again..."),setTimeout(s,2e3)},g=function(){console.log("week_refresh"),e.getWeatherData(a.app.Data,r,i)},s=function(){console.log("now_data"),e.getCurrentWeatherData(a.app.Data,o,c)},u=function(){var e=parseInt(a.app.Data.Items);a.lineLength=1>=e?0:70*e,1==a.app.Data.ShowToday?s():2==a.app.Data.ShowToday?g():(s(),g(),a.lineLength+=140)};a.weatherImg=function(a){return e.getImgOfWeather(a)},a.day=function(a){return e.getDay(a)};setInterval(u,108e6);a.update.func=function(e){if(e.Data!==JSON.stringify(a.app.Data)&&e.Data){var t=JSON.parse(e.Data);a.app.Data=t,u()}},u()}])}(),function(){angular.module("mirrorApp").factory("weatherService",["$http","dataService",function(a,e){var t={},n={};return t.getWeatherData=function(a,t,n){e.getData("http://api.openweathermap.org/data/2.5/forecast/daily?q="+a.Location+"&cnt="+a.Items+"&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7",t,n)},t.getCurrentWeatherData=function(a,t,n){e.getData("http://api.openweathermap.org/data/2.5/weather?q="+a.Location+"&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7",t,n)},t.getDay=function(a){if(0===a)return"Today";var e=(new Date).getDay(),t=e+a;return t>=n.dayMap.length&&(t=t-n.dayMap.length+1),n.dayMap[t]},t.getImgOfWeather=function(a){if(a)for(item in n.imgMap)if(n.imgMap[item].name==a.substr(0,2))return n.imgMap[item].img},t.getDay=function(a){if(0===a)return"Today";var e=(new Date).getDay(),t=e+a;return t>=n.dayMap.length&&(t-=n.dayMap.length),n.dayMap[t]},n.imgMap=[{name:"01",img:"clear.svg"},{name:"02",img:"few_clouds.svg"},{name:"03",img:"scattered_clouds.svg"},{name:"04",img:"broken_clouds.svg"},{name:"09",img:"shower_rain.svg"},{name:"10",img:"rain.svg"},{name:"11",img:"thunderstorm.svg"},{name:"13",img:"snow.svg"},{name:"50",img:"mist.svg"}],n.dayMap=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t}])}(),function(){angular.module("mirrorApp").directive("myWLine",[function(){return{restrict:"E",scope:{lineLength:"=myLength",orientation:"=myOrientation"},link:function(a,e){a.$watch("lineLength",function(t,n){switch(a.orientation){case 1:e.css("height",a.lineLength+"px");break;case 0:var r=1.34*a.lineLength;e.css("width",r+"px")}})}}}])}(),!function(){angular.module("mirrorApp").controller("weatherCtrl",["$scope","weatherService",function(a,e){a.showAll=!0,a.weatherData=[],a.curr,a.showNow=!1,a.showDays=!1,a.numberOfItems=0,a.lineLength=0;const t=108e5,n=6e4;var r=function(e){a.weatherData=e,(1!=a.app.Data.ShowToday||a.curr&&a.curr.weather)&&(a.showDays=!0,2==a.app.Data.ShowToday&&(a.showNow=!1)),setTimeout(g,t)},o=function(e){a.curr=e,(2!=a.app.Data.ShowToday||a.weatherData&&a.weatherData.list)&&(a.showNow=!0,1==a.app.Data.ShowToday&&(a.showDays=!1)),setTimeout(s,n)},i=function(){console.log("Failed to get week weather data, trying again..."),setTimeout(g,2e3)},c=function(){console.log("Failed to get curr weather data, trying again..."),setTimeout(s,2e3)},g=function(){console.log("week_refresh"),e.getWeatherData(a.app.Data,r,i)},s=function(){console.log("now_data"),e.getCurrentWeatherData(a.app.Data,o,c)},u=function(){var e=parseInt(a.app.Data.Items);a.lineLength=1>=e?0:70*e,1==a.app.Data.ShowToday?s():2==a.app.Data.ShowToday?g():(s(),g(),a.lineLength+=140)};a.weatherImg=function(a){return e.getImgOfWeather(a)},a.day=function(a){return e.getDay(a)},setInterval(u,108e6),a.update.func=function(e){if(e.Data!==JSON.stringify(a.app.Data)&&e.Data){var t=JSON.parse(e.Data);a.app.Data=t,u()}},u()}])}(),function(){angular.module("mirrorApp").factory("weatherService",["$http","dataService",function(a,e){var t={},n={};return t.getWeatherData=function(a,t,n){e.getData("http://api.openweathermap.org/data/2.5/forecast/daily?q="+a.Location+"&cnt="+a.Items+"&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7",t,n)},t.getCurrentWeatherData=function(a,t,n){e.getData("http://api.openweathermap.org/data/2.5/weather?q="+a.Location+"&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7",t,n)},t.getDay=function(a){if(0===a)return"Today";var e=(new Date).getDay(),t=e+a;return t>=n.dayMap.length&&(t=t-n.dayMap.length+1),n.dayMap[t]},t.getImgOfWeather=function(a){if(a)for(item in n.imgMap)if(n.imgMap[item].name==a.substr(0,2))return n.imgMap[item].img},t.getDay=function(a){if(0===a)return"Today";var e=(new Date).getDay(),t=e+a;return t>=n.dayMap.length&&(t-=n.dayMap.length),n.dayMap[t]},n.imgMap=[{name:"01",img:"clear.svg"},{name:"02",img:"few_clouds.svg"},{name:"03",img:"scattered_clouds.svg"},{name:"04",img:"broken_clouds.svg"},{name:"09",img:"shower_rain.svg"},{name:"10",img:"rain.svg"},{name:"11",img:"thunderstorm.svg"},{name:"13",img:"snow.svg"},{name:"50",img:"mist.svg"}],n.dayMap=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t}])}(),function(){angular.module("mirrorApp").directive("myWLine",[function(){return{restrict:"E",scope:{lineLength:"=myLength",orientation:"=myOrientation"},link:function(a,e){a.$watch("lineLength",function(t,n){switch(a.orientation){case 1:e.css("height",a.lineLength+"px");break;case 0:var r=1.34*a.lineLength;e.css("width",r+"px")}})}}}])}(),function(){angular.module("mirrorApp").controller("weatherCtrl",["$scope","weatherService",function(a,e){a.showAll=!0,a.weatherData=[],a.curr,a.showNow=!1,a.showDays=!1,a.numberOfItems=0,a.lineLength=0;const t=108e5,n=6e4;var r=function(e){a.weatherData=e,(1!=a.app.Data.ShowToday||a.curr&&a.curr.weather)&&(a.showDays=!0,2==a.app.Data.ShowToday&&(a.showNow=!1)),setTimeout(g,t)},o=function(e){a.curr=e,(2!=a.app.Data.ShowToday||a.weatherData&&a.weatherData.list)&&(a.showNow=!0,1==a.app.Data.ShowToday&&(a.showDays=!1)),setTimeout(s,n)},i=function(){console.log("Failed to get week weather data, trying again..."),setTimeout(g,2e3)},c=function(){console.log("Failed to get curr weather data, trying again..."),setTimeout(s,2e3)},g=function(){console.log("week_refresh"),e.getWeatherData(a.app.Data,r,i)},s=function(){console.log("now_data"),e.getCurrentWeatherData(a.app.Data,o,c)},u=function(){var e=parseInt(a.app.Data.Items);a.lineLength=1>=e?0:70*e,1==a.app.Data.ShowToday?s():2==a.app.Data.ShowToday?g():(s(),g(),a.lineLength+=140)};a.weatherImg=function(a){return e.getImgOfWeather(a)},a.day=function(a){return e.getDay(a)};setInterval(u,108e6);a.update.func=function(e){if(e.Data!==JSON.stringify(a.app.Data)&&e.Data){var t=JSON.parse(e.Data);a.app.Data=t,u()}},u()}])}(),function(){angular.module("mirrorApp").factory("weatherService",["$http","dataService",function(a,e){var t={},n={};return t.getWeatherData=function(a,t,n){e.getData("http://api.openweathermap.org/data/2.5/forecast/daily?q="+a.Location+"&cnt="+a.Items+"&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7",t,n)},t.getCurrentWeatherData=function(a,t,n){e.getData("http://api.openweathermap.org/data/2.5/weather?q="+a.Location+"&units=metric&mode=json&APPID=c7d757dcd68f0c72d6c80b8f680adca7",t,n)},t.getDay=function(a){if(0===a)return"Today";var e=(new Date).getDay(),t=e+a;return t>=n.dayMap.length&&(t=t-n.dayMap.length+1),n.dayMap[t]},t.getImgOfWeather=function(a){if(a)for(item in n.imgMap)if(n.imgMap[item].name==a.substr(0,2))return n.imgMap[item].img},t.getDay=function(a){if(0===a)return"Today";var e=(new Date).getDay(),t=e+a;return t>=n.dayMap.length&&(t-=n.dayMap.length),n.dayMap[t]},n.imgMap=[{name:"01",img:"clear.svg"},{name:"02",img:"few_clouds.svg"},{name:"03",img:"scattered_clouds.svg"},{name:"04",img:"broken_clouds.svg"},{name:"09",img:"shower_rain.svg"},{name:"10",img:"rain.svg"},{name:"11",img:"thunderstorm.svg"},{name:"13",img:"snow.svg"},{name:"50",img:"mist.svg"}],n.dayMap=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t}])}(),function(){angular.module("mirrorApp").directive("myWLine",[function(){return{restrict:"E",scope:{lineLength:"=myLength",orientation:"=myOrientation"},link:function(a,e){a.$watch("lineLength",function(t,n){switch(a.orientation){case 1:e.css("height",a.lineLength+"px");break;case 0:var r=1.34*a.lineLength;e.css("width",r+"px")}})}}}])}();
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