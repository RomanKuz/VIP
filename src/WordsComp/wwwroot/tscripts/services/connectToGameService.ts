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

        public doMove(moveOrder: number, word: string, variant:string): JQueryPromise<Models.MoveResult> {
            return this.hub.invoke(this.constants.doMove, moveOrder, word, variant);
        }

        public passMove(moveOrder: number): JQueryPromise<Models.MoveResult> {
            return this.hub.invoke(this.constants.passMove, moveOrder);
        }

        public connectToNewGroup(displayName: string, level: Models.Level): JQueryPromise<any> {
            return this.hub.invoke(this.constants.hubConnectToGroupMethodName, displayName, level);
        }

        public onConnectedToGroup(callBack:(userId: string) => void): void {
            this.hub.on(this.constants.connectedToGroup, (msg) => callBack(msg));
        }

        public onGroupFulled(callBack:(group: Models.Group) => void): void {
            this.hub.on(this.constants.groupFulled, (msg) => callBack(msg));
        }

        public onUserLeft(callBack:(group: Models.Group) => void): void {
            this.hub.on(this.constants.leftGroup, (msg) => callBack(msg[0]));
        }

        public gameStarted(callBack:(group: Models.Game) => void): void {
            this.hub.on(this.constants.gameStarted, (msg) => {
                callBack(msg);
            });
        }

        public didMove(callBack:(moveRes: Models.MoveResult) => void): void {
            this.hub.on(this.constants.didMove, (msg) => callBack(msg));
        }

        public gameFinished(callBack:(group: Models.Game) => void): void {
            this.hub.on(this.constants.gameFinished, (msg) => callBack(msg[0]));
        }
    }

    angular.module(Common.GetConstants().appName).service("Services.ConnectToGameService", ConnectToGameService);
}