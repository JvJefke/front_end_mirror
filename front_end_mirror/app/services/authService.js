(function () {
    angular.module('mirrorApp').factory('authService', ['dataService', function (dataService) {
        var local = {};
        var service = {
            auth: auth,
            getToken: getToken
        };

        function auth(callback) {
            dataService.postData(local.req, function (data) {
                localStorage.setItem("AI", JSON.stringify(data));
                callback();
            }, callback);
        };

        function getToken() {
            var info = JSON.parse(localStorage.getItem("AI"));
            if (local.checkAuhtInfo(info))
                return info.access_token;
            else
                return null;
        };

        local.checkAuhtInfo = function (info) {
            if (info && info.access_token && info[".expires"]) {
                var date = new Date(info[".expires"]);
                var treshDate = new Date().setTime(new Date().getTime() + 86400000);
                //console.log(date - treshDate);
                if ((date - treshDate) > 0) {
                    return true;
                } else {
                    console.log("Token expired, need new token");
                    return false;
                }
            } else {
                return false;
            }
        }

        local.req = {
            method: 'POST',
            url: 'http://apimate.azurewebsites.net/Token',
            headers: {
                "Content-Type": "x-www-form-urlencoded"
            },
            data: {
                "grant_type": "password",
                "username": "test1@gmail.com",
                "password": "test1234"
            }
        };

        return service;
    }]);
})();