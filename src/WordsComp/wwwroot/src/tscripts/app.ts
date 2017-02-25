/// <reference path="common.ts" />
module App {
    var constants = Common.GetConstants();
    var app = angular.module(constants.appName, ['ui.bootstrap.modal', 'ngAnimate', 'angularSpinner', 'rx', 'satellizer', 'ui.bootstrap-slider']);
    app.config(['usSpinnerConfigProvider', '$authProvider', function (usSpinnerConfigProvider, $authProvider) {
        usSpinnerConfigProvider.setDefaults({color: '#5B91DE'});

        $authProvider.facebook({
            clientId: '237707193331170'
        });

        $authProvider.google({
            clientId: '120933698219-um98tatsibhb70ip9209ravjut28tsfm.apps.googleusercontent.com'
        });
    }]);
    export function GetApp(): ng.IModule {
        return app;
    }
}