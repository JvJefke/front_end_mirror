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




(function () {
    angular.module('mirrorApp').factory('calendarService', ['$http', 'dataService', "authService", "mainFormatService", function ($http, dataService, authService, mfService) {
        var local = {};
        var service = {
            getCalendar: getCalendar,
            formatData: formatData
        };

        function getCalendar(data, callback) {
            if (!data || !data.refresh_token || !callback) {
                console.log("Service.getCalendar : no refresh token received from te server or no callback method given.");
                return;
            }

            local.getAccessToken(data, function (token) { local.getData(token, data, callback) });
        };

        function formatData(data, aantal) {
            return local.limit(local.sort(data), aantal);
        };

        local.getData = function (token, data, callback) {

            var url = "https://www.googleapis.com/calendar/v3/calendars/" + data.calendarID + "/events?timeMin=" + mfService.ISODateString(new Date()) + "&maxResults=9&orderBy=startTime&singleEvents=true";

            var req = {
                method: "GET",
                url: url,
                headers:{Authorization : "Bearer " + JSON.parse(token).access_token}
            }

            dataService.postData(req, callback, local.mainErrCallback);
        }

        local.getAccessToken = function (data, callback) {
            var token = authService.getToken();
            if (!token) {
                setTimeout(function () { authService.auth(function () { service.getCalendar(refresh_token, callback) }) }, 2000);
                return;
            }

            var req = {
                method: 'POST',
                url: 'http://apimate.azurewebsites.net/api/calendar/getrefreshtoken',
                data: JSON.stringify({ Code: data.refresh_token }),
                contentType: 'application/json;',
                headers: { Authorization: "Bearer " + token }
            }

            dataService.postData(req, callback, local.mainErrCallback);
        }

        local.mainErrCallback = function (data, status, headers, config) {
            console.log("There has been an error while retrieving data", data, status, headers, config);
        };

        local.sort = function (arrCall) {
            var result = [];

            for (var item in arrCall.items) {
                var dateString = arrCall.items[item].start.dateTime;
                if (!dateString)
                    dateString = arrCall.items[item].start.date;
               
                var itemDate = new Date(dateString);

                var catDate = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate(), 0, 0, 0, 0);
                var isAvailable = false;

                for (resItem in result) {

                    if (result[resItem].catDate.getFullYear() == catDate.getFullYear() && result[resItem].catDate.getMonth() == catDate.getMonth() && result[resItem].catDate.getDate() == catDate.getDate()) {

                        isAvailable = true;
                        result[resItem].items.push(arrCall.items[item]);

                    }

                }

                if (!isAvailable)
                    result.push({ catDate: catDate, items: [arrCall.items[item]] });
                
            }

            return result;
        };

        local.limit = function (arr, aantal) {
            var counter = 0;
            var temp = [];

            for (i in arr) {
                counter += 1;

                if (counter < aantal) {
                    if (arr[i].items.length < aantal - counter) {
                        temp.push(arr[i]);
                        counter += arr[i].items.length;
                    } else {
                        var t = arr[i];
                        t.items = t.items.slice(0, aantal - counter);
                        temp.push(t);
                        counter += t.items.length;
                    }
                }
            }

            return temp;
        };

        return service;
    }]);
})();
!function(){angular.module("mirrorApp").controller("calendarCtrl",["$scope","$http","confService","calendarService",function(e,t,a,r){function n(){i(),s=setInterval(i,c)}function i(){r.getCalendar(e.app.Data,o)}function o(t){e.items=r.formatData(t,e.app.Data.Items)}e.items=[];var s;const c=36e5;e.update.func=function(t){t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data=JSON.parse(t.Data),i())},n()}])}(),function(){angular.module("mirrorApp").factory("calendarService",["$http","dataService","authService","mainFormatService",function(e,t,a,r){function n(e,t){return e&&e.refresh_token&&t?void s.getAccessToken(e,function(a){s.getData(a,e,t)}):void console.log("Service.getCalendar : no refresh token received from te server or no callback method given.")}function o(e,t){return s.limit(s.sort(e),t)}var s={},c={getCalendar:n,formatData:o};return s.getData=function(e,a,n){var i="https://www.googleapis.com/calendar/v3/calendars/"+a.calendarID+"/events?timeMin="+r.ISODateString(new Date)+"&maxResults=9&orderBy=startTime&singleEvents=true",o={method:"GET",url:i,headers:{Authorization:"Bearer "+JSON.parse(e).access_token}};t.postData(o,n,s.mainErrCallback)},s.getAccessToken=function(e,r){var n=a.getToken();if(!n)return void setTimeout(function(){a.auth(function(){c.getCalendar(refresh_token,r)})},2e3);var i={method:"POST",url:"http://apimate.azurewebsites.net/api/calendar/getrefreshtoken",data:JSON.stringify({Code:e.refresh_token}),contentType:"application/json;",headers:{Authorization:"Bearer "+n}};t.postData(i,r,s.mainErrCallback)},s.mainErrCallback=function(e,t,a,r){console.log("There has been an error while retrieving data",e,t,a,r)},s.sort=function(e){var t=[];for(var a in e.items){var r=e.items[a].start.dateTime;r||(r=e.items[a].start.date);var n=new Date(r),i=new Date(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0,0),o=!1;for(resItem in t)t[resItem].catDate.getFullYear()==i.getFullYear()&&t[resItem].catDate.getMonth()==i.getMonth()&&t[resItem].catDate.getDate()==i.getDate()&&(o=!0,t[resItem].items.push(e.items[a]));o||t.push({catDate:i,items:[e.items[a]]})}return t},s.limit=function(e,t){var a=0,r=[];for(i in e)if(a+=1,t>a)if(e[i].items.length<t-a)r.push(e[i]),a+=e[i].items.length;else{var n=e[i];n.items=n.items.slice(0,t-a),r.push(n),a+=n.items.length}return r},c}])}();
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




(function () {
    angular.module('mirrorApp').factory('calendarService', ['$http', 'dataService', "authService", "mainFormatService", function ($http, dataService, authService, mfService) {
        var local = {};
        var service = {
            getCalendar: getCalendar,
            formatData: formatData
        };

        function getCalendar(data, callback) {
            if (!data || !data.refresh_token || !callback) {
                console.log("Service.getCalendar : no refresh token received from te server or no callback method given.");
                return;
            }

            local.getAccessToken(data, function (token) { local.getData(token, data, callback) });
        };

        function formatData(data, aantal) {
            return local.limit(local.sort(data), aantal);
        };

        local.getData = function (token, data, callback) {

            var url = "https://www.googleapis.com/calendar/v3/calendars/" + data.calendarID + "/events?timeMin=" + mfService.ISODateString(new Date()) + "&maxResults=9&orderBy=startTime&singleEvents=true";

            var req = {
                method: "GET",
                url: url,
                headers:{Authorization : "Bearer " + JSON.parse(token).access_token}
            }

            dataService.postData(req, callback, local.mainErrCallback);
        }

        local.getAccessToken = function (data, callback) {
            var token = authService.getToken();
            if (!token) {
                setTimeout(function () { authService.auth(function () { service.getCalendar(refresh_token, callback) }) }, 2000);
                return;
            }

            var req = {
                method: 'POST',
                url: 'http://apimate.azurewebsites.net/api/calendar/getrefreshtoken',
                data: JSON.stringify({ Code: data.refresh_token }),
                contentType: 'application/json;',
                headers: { Authorization: "Bearer " + token }
            }

            dataService.postData(req, callback, local.mainErrCallback);
        }

        local.mainErrCallback = function (data, status, headers, config) {
            console.log("There has been an error while retrieving data", data, status, headers, config);
        };

        local.sort = function (arrCall) {
            var result = [];

            for (var item in arrCall.items) {
                var dateString = arrCall.items[item].start.dateTime;
                if (!dateString)
                    dateString = arrCall.items[item].start.date;
               
                var itemDate = new Date(dateString);

                var catDate = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate(), 0, 0, 0, 0);
                var isAvailable = false;

                for (resItem in result) {

                    if (result[resItem].catDate.getFullYear() == catDate.getFullYear() && result[resItem].catDate.getMonth() == catDate.getMonth() && result[resItem].catDate.getDate() == catDate.getDate()) {

                        isAvailable = true;
                        result[resItem].items.push(arrCall.items[item]);

                    }

                }

                if (!isAvailable)
                    result.push({ catDate: catDate, items: [arrCall.items[item]] });
                
            }

            return result;
        };

        local.limit = function (arr, aantal) {
            var counter = 0;
            var temp = [];

            for (i in arr) {
                counter += 1;

                if (counter < aantal) {
                    if (arr[i].items.length < aantal - counter) {
                        temp.push(arr[i]);
                        counter += arr[i].items.length;
                    } else {
                        var t = arr[i];
                        t.items = t.items.slice(0, aantal - counter);
                        temp.push(t);
                        counter += t.items.length;
                    }
                }
            }

            return temp;
        };

        return service;
    }]);
})();
!function(){angular.module("mirrorApp").controller("calendarCtrl",["$scope","$http","confService","calendarService",function(e,t,a,r){function n(){i(),s=setInterval(i,c)}function i(){r.getCalendar(e.app.Data,o)}function o(t){e.items=r.formatData(t,e.app.Data.Items)}e.items=[];var s;const c=36e5;e.update.func=function(t){t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data=JSON.parse(t.Data),i())},n()}])}(),function(){angular.module("mirrorApp").factory("calendarService",["$http","dataService","authService","mainFormatService",function(e,t,a,r){function n(e,t){return e&&e.refresh_token&&t?void s.getAccessToken(e,function(a){s.getData(a,e,t)}):void console.log("Service.getCalendar : no refresh token received from te server or no callback method given.")}function o(e,t){return s.limit(s.sort(e),t)}var s={},c={getCalendar:n,formatData:o};return s.getData=function(e,a,n){var i="https://www.googleapis.com/calendar/v3/calendars/"+a.calendarID+"/events?timeMin="+r.ISODateString(new Date)+"&maxResults=9&orderBy=startTime&singleEvents=true",o={method:"GET",url:i,headers:{Authorization:"Bearer "+JSON.parse(e).access_token}};t.postData(o,n,s.mainErrCallback)},s.getAccessToken=function(e,r){var n=a.getToken();if(!n)return void setTimeout(function(){a.auth(function(){c.getCalendar(refresh_token,r)})},2e3);var i={method:"POST",url:"http://apimate.azurewebsites.net/api/calendar/getrefreshtoken",data:JSON.stringify({Code:e.refresh_token}),contentType:"application/json;",headers:{Authorization:"Bearer "+n}};t.postData(i,r,s.mainErrCallback)},s.mainErrCallback=function(e,t,a,r){console.log("There has been an error while retrieving data",e,t,a,r)},s.sort=function(e){var t=[];for(var a in e.items){var r=e.items[a].start.dateTime;r||(r=e.items[a].start.date);var n=new Date(r),i=new Date(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0,0),o=!1;for(resItem in t)t[resItem].catDate.getFullYear()==i.getFullYear()&&t[resItem].catDate.getMonth()==i.getMonth()&&t[resItem].catDate.getDate()==i.getDate()&&(o=!0,t[resItem].items.push(e.items[a]));o||t.push({catDate:i,items:[e.items[a]]})}return t},s.limit=function(e,t){var a=0,r=[];for(i in e)if(a+=1,t>a)if(e[i].items.length<t-a)r.push(e[i]),a+=e[i].items.length;else{var n=e[i];n.items=n.items.slice(0,t-a),r.push(n),a+=n.items.length}return r},c}])}(),!function(){angular.module("mirrorApp").controller("calendarCtrl",["$scope","$http","confService","calendarService",function(e,t,a,r){function n(){i(),s=setInterval(i,c)}function i(){r.getCalendar(e.app.Data,o)}function o(t){e.items=r.formatData(t,e.app.Data.Items)}e.items=[];var s;const c=36e5;e.update.func=function(t){t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data=JSON.parse(t.Data),i())},n()}])}(),function(){angular.module("mirrorApp").factory("calendarService",["$http","dataService","authService","mainFormatService",function(e,t,a,r){function n(e,t){return e&&e.refresh_token&&t?void s.getAccessToken(e,function(a){s.getData(a,e,t)}):void console.log("Service.getCalendar : no refresh token received from te server or no callback method given.")}function o(e,t){return s.limit(s.sort(e),t)}var s={},c={getCalendar:n,formatData:o};return s.getData=function(e,a,n){var i="https://www.googleapis.com/calendar/v3/calendars/"+a.calendarID+"/events?timeMin="+r.ISODateString(new Date)+"&maxResults=9&orderBy=startTime&singleEvents=true",o={method:"GET",url:i,headers:{Authorization:"Bearer "+JSON.parse(e).access_token}};t.postData(o,n,s.mainErrCallback)},s.getAccessToken=function(e,r){var n=a.getToken();if(!n)return void setTimeout(function(){a.auth(function(){c.getCalendar(refresh_token,r)})},2e3);var i={method:"POST",url:"http://apimate.azurewebsites.net/api/calendar/getrefreshtoken",data:JSON.stringify({Code:e.refresh_token}),contentType:"application/json;",headers:{Authorization:"Bearer "+n}};t.postData(i,r,s.mainErrCallback)},s.mainErrCallback=function(e,t,a,r){console.log("There has been an error while retrieving data",e,t,a,r)},s.sort=function(e){var t=[];for(var a in e.items){var r=e.items[a].start.dateTime;r||(r=e.items[a].start.date);var n=new Date(r),i=new Date(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0,0),o=!1;for(resItem in t)t[resItem].catDate.getFullYear()==i.getFullYear()&&t[resItem].catDate.getMonth()==i.getMonth()&&t[resItem].catDate.getDate()==i.getDate()&&(o=!0,t[resItem].items.push(e.items[a]));o||t.push({catDate:i,items:[e.items[a]]})}return t},s.limit=function(e,t){var a=0,r=[];for(i in e)if(a+=1,t>a)if(e[i].items.length<t-a)r.push(e[i]),a+=e[i].items.length;else{var n=e[i];n.items=n.items.slice(0,t-a),r.push(n),a+=n.items.length}return r},c}])}(),function(){angular.module("mirrorApp").controller("calendarCtrl",["$scope","$http","confService","calendarService",function(e,t,a,r){function n(){i(),s=setInterval(i,c)}function i(){r.getCalendar(e.app.Data,o)}function o(t){e.items=r.formatData(t,e.app.Data.Items)}e.items=[];var s;const c=36e5;e.update.func=function(t){t.Data!==JSON.stringify(e.app.Data)&&(e.app.Data=JSON.parse(t.Data),i())},n()}])}(),function(){angular.module("mirrorApp").factory("calendarService",["$http","dataService","authService","mainFormatService",function(e,t,a,r){function n(e,t){return e&&e.refresh_token&&t?void s.getAccessToken(e,function(a){s.getData(a,e,t)}):void console.log("Service.getCalendar : no refresh token received from te server or no callback method given.")}function o(e,t){return s.limit(s.sort(e),t)}var s={},c={getCalendar:n,formatData:o};return s.getData=function(e,a,n){var i="https://www.googleapis.com/calendar/v3/calendars/"+a.calendarID+"/events?timeMin="+r.ISODateString(new Date)+"&maxResults=9&orderBy=startTime&singleEvents=true",o={method:"GET",url:i,headers:{Authorization:"Bearer "+JSON.parse(e).access_token}};t.postData(o,n,s.mainErrCallback)},s.getAccessToken=function(e,r){var n=a.getToken();if(!n)return void setTimeout(function(){a.auth(function(){c.getCalendar(refresh_token,r)})},2e3);var i={method:"POST",url:"http://apimate.azurewebsites.net/api/calendar/getrefreshtoken",data:JSON.stringify({Code:e.refresh_token}),contentType:"application/json;",headers:{Authorization:"Bearer "+n}};t.postData(i,r,s.mainErrCallback)},s.mainErrCallback=function(e,t,a,r){console.log("There has been an error while retrieving data",e,t,a,r)},s.sort=function(e){var t=[];for(var a in e.items){var r=e.items[a].start.dateTime;r||(r=e.items[a].start.date);var n=new Date(r),i=new Date(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0,0),o=!1;for(resItem in t)t[resItem].catDate.getFullYear()==i.getFullYear()&&t[resItem].catDate.getMonth()==i.getMonth()&&t[resItem].catDate.getDate()==i.getDate()&&(o=!0,t[resItem].items.push(e.items[a]));o||t.push({catDate:i,items:[e.items[a]]})}return t},s.limit=function(e,t){var a=0,r=[];for(i in e)if(a+=1,t>a)if(e[i].items.length<t-a)r.push(e[i]),a+=e[i].items.length;else{var n=e[i];n.items=n.items.slice(0,t-a),r.push(n),a+=n.items.length}return r},c}])}();
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




(function () {
    angular.module('mirrorApp').factory('calendarService', ['$http', 'dataService', "authService", "mainFormatService", function ($http, dataService, authService, mfService) {
        var local = {};
        var service = {
            getCalendar: getCalendar,
            formatData: formatData
        };

        function getCalendar(data, callback) {
            if (!data || !data.refresh_token || !callback) {
                console.log("Service.getCalendar : no refresh token received from te server or no callback method given.");
                return;
            }

            local.getAccessToken(data, function (token) { local.getData(token, data, callback) });
        };

        function formatData(data, aantal) {
            return local.limit(local.sort(data), aantal);
        };

        local.getData = function (token, data, callback) {

            var url = "https://www.googleapis.com/calendar/v3/calendars/" + data.calendarID + "/events?timeMin=" + mfService.ISODateString(new Date()) + "&maxResults=9&orderBy=startTime&singleEvents=true";

            var req = {
                method: "GET",
                url: url,
                headers:{Authorization : "Bearer " + JSON.parse(token).access_token}
            }

            dataService.postData(req, callback, local.mainErrCallback);
        }

        local.getAccessToken = function (data, callback) {
            var token = authService.getToken();
            if (!token) {
                setTimeout(function () { authService.auth(function () { service.getCalendar(refresh_token, callback) }) }, 2000);
                return;
            }

            var req = {
                method: 'POST',
                url: 'http://apimate.azurewebsites.net/api/calendar/getrefreshtoken',
                data: JSON.stringify({ Code: data.refresh_token }),
                contentType: 'application/json;',
                headers: { Authorization: "Bearer " + token }
            }

            dataService.postData(req, callback, local.mainErrCallback);
        }

        local.mainErrCallback = function (data, status, headers, config) {
            console.log("There has been an error while retrieving data", data, status, headers, config);
        };

        local.sort = function (arrCall) {
            var result = [];

            for (var item in arrCall.items) {
                var dateString = arrCall.items[item].start.dateTime;
                if (!dateString)
                    dateString = arrCall.items[item].start.date;
               
                var itemDate = new Date(dateString);

                var catDate = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate(), 0, 0, 0, 0);
                var isAvailable = false;

                for (resItem in result) {

                    if (result[resItem].catDate.getFullYear() == catDate.getFullYear() && result[resItem].catDate.getMonth() == catDate.getMonth() && result[resItem].catDate.getDate() == catDate.getDate()) {

                        isAvailable = true;
                        result[resItem].items.push(arrCall.items[item]);

                    }

                }

                if (!isAvailable)
                    result.push({ catDate: catDate, items: [arrCall.items[item]] });
                
            }

            return result;
        };

        local.limit = function (arr, aantal) {
            var counter = 0;
            var temp = [];

            for (i in arr) {
                counter += 1;

                if (counter < aantal) {
                    if (arr[i].items.length < aantal - counter) {
                        temp.push(arr[i]);
                        counter += arr[i].items.length;
                    } else {
                        var t = arr[i];
                        t.items = t.items.slice(0, aantal - counter);
                        temp.push(t);
                        counter += t.items.length;
                    }
                }
            }

            return temp;
        };

        return service;
    }]);
})();