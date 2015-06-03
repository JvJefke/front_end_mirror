(function(){
    angular.module('mirrorApp').controller('calendarCtrl', ['$scope', '$http', 'confService', 'calendarService', function ($scope, $http, confService, calendarService) {
        $scope.items = [];
        var timer;
        const CALENDAR_REFRESH_INTERVAL = 3600000;

        function init() {
            getCalendarData();
            timer = setInterval(getCalendarData, CALENDAR_REFRESH_INTERVAL)
        }

        function getCalendarData() {
            calendarService.getCalendar($scope.app.Data, updateCalendar);
        }

        function updateCalendar (data) {
            //console.log(data);
            $scope.items = calendarService.formatData(data, $scope.app.Data.Items);
        };

        $scope.update.func = function (data) {
            //console.log(data.Data);
            //console.log(JSON.stringify($scope.app.Data));
            if (!(data.Data === JSON.stringify($scope.app.Data))) {                
                $scope.app.Data = JSON.parse(data.Data);
                getCalendarData();
            }
        }

        init();
    }]);
})();



