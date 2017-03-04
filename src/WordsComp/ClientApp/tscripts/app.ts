/// <reference path="common.ts" />
module App {
    var constants = Common.GetConstants();
    var app = angular.module(constants.appName, ['ui.bootstrap.modal', 'ngAnimate', 'angularSpinner', 'rx', 'satellizer', 'ui.bootstrap-slider', 'ngRoute']);
    app.config(['usSpinnerConfigProvider', '$authProvider', '$routeProvider', 
        function (usSpinnerConfigProvider: any, $authProvider: any, $routeProvider: any) {
            usSpinnerConfigProvider.setDefaults({color: '#5B91DE'});

            $authProvider.facebook({
                clientId: '237707193331170'
            });

            $authProvider.google({
                clientId: '120933698219-um98tatsibhb70ip9209ravjut28tsfm.apps.googleusercontent.com'
            });

            $routeProvider.when("/", {
                templateUrl : "gamePage.html"
            });
        }]);
    app.directive('userInfo', function(){
      return {
        restrict: 'E',
        templateUrl: 'userInfoTemplate.html'
      }
    });
    export function GetApp(): ng.IModule {
        return app;
    }
}