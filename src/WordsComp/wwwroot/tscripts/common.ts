/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/signalr/index.d.ts" />
/// <reference path="../../typings/globals/es6-shim/index.d.ts" />
/// <reference path="../../typings/globals/angular-ui-bootstrap/index.d.ts" />
/// <reference path="../../typings/globals/rx/rx.d.ts" />
/// <reference path="../../typings/globals/rx.angular/index.d.ts" />
/// <reference path="../../typings/globals/angular-animate/index.d.ts" />
module Common {
    export class Constants {
        public appName: string;
        public hubConnectToGroupMethodName: string;
        public connectedToGroup: string;
        public leftGroup: string;
        public groupFulled: string;
        public competitionHub: string;
        public gameStarted: string;
        public didMove: string;
        public gameFinished: string;
        public doMove: string;
        public passMove: string;

        constructor() {
            this.appName = "gameApp"
            this.hubConnectToGroupMethodName = "connect";
            this.connectedToGroup = "userAdded";
            this.leftGroup = "userLeft";
            this.groupFulled = "groupFulled";
            this.competitionHub = "competitionHub";
            this.gameStarted = "gameStarted";
            this.didMove = "didMove";
            this.gameFinished = "gameFinished";
            this.doMove = "doMove";
            this.passMove = "passMove";
        }
    }
    
    export function  GetConstants(): Constants {
        return new Constants();
    }
}