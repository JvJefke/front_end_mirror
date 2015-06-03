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