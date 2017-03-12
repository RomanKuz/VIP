/// <reference path="common.ts" />
module App {
    var constants = Common.GetConstants();
    var app = angular.module(constants.appName, ['ui.bootstrap.modal', 'ngAnimate', 'angularSpinner', 'rx', 'satellizer', 'ui.bootstrap-slider', 'ngRoute', 'templates', 'infinite-scroll']);
    app.config(['usSpinnerConfigProvider', '$authProvider', '$routeProvider', '$locationProvider', 
        function (usSpinnerConfigProvider: any, $authProvider: any, $routeProvider: any,
                  $locationProvider: ng.ILocationProvider) {
            usSpinnerConfigProvider.setDefaults({color: '#5B91DE'});

            $authProvider.facebook({
                clientId: '237707193331170'
            });

            $authProvider.google({
                clientId: '120933698219-um98tatsibhb70ip9209ravjut28tsfm.apps.googleusercontent.com'
            });

            $routeProvider.when("/", {
                templateUrl : "gamePage.html",
                controller: "controllers.GameController"
            })
            .when("/vocabulary", {
                templateUrl : "vocabularyPage.html",
                controller: "controllers.VocabularyController"
            })
            .otherwise({
                templateUrl : "gamePage.html"
            });

            // use the HTML5 History API
            $locationProvider.html5Mode(true);
        }]);
    app.directive('userInfo', function(){
      return {
        restrict: 'E',
        templateUrl: 'userInfoTemplate.html'
      }
    });
    app.run(["$rootScope", ($rootScope: Interfaces.IRootScope) => {
        $rootScope.roomOptions = {
            roomLevelFromUrl: null,
            urlForRoom: null,
            wordsCount: null
        };
    }])
    export function GetApp(): ng.IModule {
        return app;
    }
}