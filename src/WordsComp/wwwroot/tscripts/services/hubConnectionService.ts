/// <reference path="../interfaces.ts" />
module Services {
    export class HubConnectionService implements Interfaces.IHubConnection {
        private static connection: SignalR.Hub.Connection;

        public getConnection(): SignalR.Hub.Connection {
            if (!HubConnectionService.connection) {
                HubConnectionService.connection = $.hubConnection("/signalr", { useDefaultPath: false });
                HubConnectionService.connection.logging = true;
            }
            return HubConnectionService.connection;
        }
    }
    angular.module(Common.GetConstants().appName).service("Services.HubConnectionService", HubConnectionService);
}