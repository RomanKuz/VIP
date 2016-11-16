/// <reference path="common.ts" />
module App {
    var constants = Common.GetConstants();
    var app = angular.module(constants.appName, ['ui.bootstrap.modal','cgBusy', 'ngAnimate']);

    export function GetApp(): ng.IModule {
        return app;
    }
}