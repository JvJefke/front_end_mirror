(function () {
    angular.module('mirrorApp').directive('mySec', [function () {
        return {
            restrict: 'E',
            templateUrl: "./app/apps/time/theme2/my-sec.html",
            link: function (scope, element) {
                var turner = setInterval(function () {
                    //console.log("turn");
                    var secs = new Date().getSeconds();
                    var deg = secs / 60 * 360;

                    var img = element[0].firstChild;

                    img.style.MozTransform = 'rotate(' + deg + 'deg)';
                    img.style.WebkitTransform = 'rotate(' + deg + 'deg)';
                    img.style.Transform = 'rotate(' + deg + 'deg)';
                }, 1000);
            }
        }
    }]);
})();

