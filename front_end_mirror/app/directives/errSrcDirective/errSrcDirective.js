(function () {
    // directive dat afbeeldings errors opvangt en ervoor zorgt dat de afbeelding geen lelijke standaardafbeelding wordt door het display attribuut op none te zetten.
    angular.module("mirrorApp").directive('myErrSrc', function () {
        return {
            scope:{
                myErrSrc: "="
            },
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    //console.log("error bind");
                    if (attrs.src != attrs.myErrSrc) {
                        attrs.$set('src', attrs.myErrSrc);
                    }
                });

                attrs.$observe('ngSrc', function (value) {
                    //console.log("blanking", value)
                    if (!value && attrs.errSrc) {
                        attrs.$set('src', attrs.myErrSrc);
                    } else if(!value) {
                        element.css("display", "none");
                    }
                });
            }
        }
    });
})();