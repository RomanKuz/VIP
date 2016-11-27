/// <reference path="../interfaces.ts" />
module Services {
    export class ConnectToGameService implements Interfaces.IConnectToGame {
        private hub: SignalR.Hub.Proxy;
        private connection: SignalR.Hub.Connection;
        private constants: Common.Constants;
        private onConnectedToHubCallback:(userId: string) => void

        static $inject = ["Services.HubConnectionService"];
        constructor(hubConnectionService: Interfaces.IHubConnection) {
            this.constants = Common.GetConstants();
            this.connection = hubConnectionService.getConnection();
            this.hub = this.connection.createHubProxy(this.constants.competitionHub);
        }

        private connectToHub(): JQueryPromise<any> {
            return this.hub.connection.start();
        }

        public onConnectToHub(callBack:(userId: string) => void): void {
            this.onConnectedToHubCallback = callBack;
        }

        public doMove(moveOrder: number, word: string, variant:string): JQueryPromise<Models.MoveResult> {
            return this.hub.invoke(this.constants.doMove, moveOrder, word, variant);
        }

        public passMove(moveOrder: number): JQueryPromise<Models.MoveResult> {
            return this.hub.invoke(this.constants.passMove, moveOrder);
        }

        private connectToNewGroupImpl(displayName: string, level: Models.Level) {
            return this.hub.invoke(this.constants.hubConnectToGroupMethodName, displayName, level);
        }

        public connectToNewGroup(displayName: string, 
                                 level: Models.Level, 
                                 isGameWithFriend:boolean,
                                 groupId: string): JQueryPromise<any> {
            if (this.connection.state === 4) {
                return this.connectToHub()
                        .then(values => {
                            this.onConnectedToHubCallback(values.id);
                            return this.hub.invoke(this.constants.hubConnectToGroupMethodName, 
                                                   displayName, 
                                                   level, 
                                                   isGameWithFriend,
                                                   groupId || values.id) // create new room if group id is null
                        });
            }

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

        public onDisconnectedFromHub(callBack:() => void): void {
            this.connection.disconnected(callBack);
        }

        public stopHubConnection(): void {
            if (this.connection.state !== 4) {
                this.connection.stop();
            }
        }
    }

    angular.module(Common.GetConstants().appName).service("Services.ConnectToGameService", ConnectToGameService);
}