(function () {
    'use strict';

    angular
        .module('avitoHeadroom',[])
        .directive('avitoHeadroom', headroom);
    headroom.$inject = ['$timeout', '$window', 'screenSize'];
    function headroom($timeout, $window, screenSize) {
        return {
            restrict: 'EA',
            scope: {
                tolerance: '=',
                offset: '=',
                classes: '=',
                scroller: '@',
                nextElement:'@'
            },
            link: function (scope, element) {

                screenSize.rules = {
                    smallScreen: '(max-width: 840px)'
                };

                if (screenSize.is('smallScreen')) {
                    //use HeadRoom only on smallScreens
                    scope.$watch(function(){
                        return angular.element(element).next()[0].offsetTop;
                    },callback);
                    angular.element($window).bind("resize", callback);
                }

                function callback(){

                    init();

                }
                function init() {
                    var options = {};
                    angular.forEach(Headroom.options, function (value, key) {
                        options[key] = scope[key] || Headroom.options[key];
                    });
                    options.scroller = window;
                    options['offset'] = angular.element(element).next()[0].offsetTop - 54;
                    var headroom = new Headroom(element[0], options);
                    headroom.init();
                    scope.$on('$destroy', function () {
                        headroom.destroy();
                    });
                }

            }
        };
    }
})();
