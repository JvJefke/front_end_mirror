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
!function(){angular.module("mirrorApp").controller("remindersCtrl",["$scope",function(e,r,n){var t=e.app.Data.items,l=0;e.selectedReminder=t[0];{var a=function(){l+=1,l>=t.length&&(l=0),e.selectedReminder=t[l]};setInterval(a,1e4)}}])}();
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
!function(){angular.module("mirrorApp").controller("remindersCtrl",["$scope",function(e,r,n){var t=e.app.Data.items,l=0;e.selectedReminder=t[0];{var a=function(){l+=1,l>=t.length&&(l=0),e.selectedReminder=t[l]};setInterval(a,1e4)}}])}(),!function(){angular.module("mirrorApp").controller("remindersCtrl",["$scope",function(e,r,n){var t=e.app.Data.items,l=0;e.selectedReminder=t[0];var a=function(){l+=1,l>=t.length&&(l=0),e.selectedReminder=t[l]};setInterval(a,1e4)}])}(),function(){angular.module("mirrorApp").controller("remindersCtrl",["$scope",function(e,r,n){var t=e.app.Data.items,l=0;e.selectedReminder=t[0];{var a=function(){l+=1,l>=t.length&&(l=0),e.selectedReminder=t[l]};setInterval(a,1e4)}}])}();
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