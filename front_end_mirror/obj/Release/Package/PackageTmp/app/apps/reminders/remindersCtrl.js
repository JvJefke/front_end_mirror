(function () {
    angular.module('mirrorApp').controller('remindersCtrl', ['$scope', function ($scope, $http, confService) {
        var reminders = $scope.app.Data.items;
        //console.log("reminders", reminders);
        var index = 0;
        $scope.selectedReminder = reminders[0];

        var cycle = function () {
            index += 1;
            if (index >= reminders.length)
                index = 0;

            $scope.selectedReminder = reminders[index];
        };

        var reminderInterval = setInterval(cycle, 10000);
    }]);
})();