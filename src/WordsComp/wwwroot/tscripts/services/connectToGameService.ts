/// <reference path="../interfaces.ts" />
module Services {
    export class ConnectToGameService implements Interfaces.IConnectToGame {
        private hub: SignalR.Hub.Proxy;
        private connection: SignalR.Hub.Connection;
        private constants: Common.Constants;

        static $inject = ["Services.HubConnectionService"];
        constructor(hubConnectionService: Interfaces.IHubConnection) {
            this.constants = Common.GetConstants();
            this.connection = hubConnectionService.getConnection();
            this.hub = this.connection.createHubProxy(this.constants.competitionHub);
        }

        public connectToHub(): JQueryPromise<any> {
            return this.hub.connection.start();
        }

        public connectToNewGroup(): JQueryPromise<any> {
            return this.hub.invoke(this.constants.hubConnectToGroupMethodName);
        }

        public onConnectedToGroup(callBack:(group: Models.Group) => void): void {
            this.hub.on(this.constants.connectedToGroup, (msg) => callBack(msg[0]));
        }

        public onGroupFulled(callBack:(group: Models.Group) => void): void {
            this.hub.on(this.constants.groupFulled, (msg) => callBack(msg[0]));
        }

        public onUserLeft(callBack:(group: Models.Group) => void): void {
            this.hub.on(this.constants.leftGroup, (msg) => callBack(msg[0]));
        }
    }

    angular.module(Common.GetConstants().appName).service("Services.ConnectToGameService", ConnectToGameService);
}