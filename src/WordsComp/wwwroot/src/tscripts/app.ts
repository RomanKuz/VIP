/// <reference path="common.ts" />
module App {
    var constants = Common.GetConstants();
    var app = angular.module(constants.appName, ['ui.bootstrap.modal', 'ngAnimate', 'angularSpinner', 'rx']);
    app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
        usSpinnerConfigProvider.setDefaults({color: '#5B91DE'});
    }]);
    export function GetApp(): ng.IModule {
        return app;
    }
}