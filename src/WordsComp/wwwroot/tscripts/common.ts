/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/signalr/index.d.ts" />
/// <reference path="../../typings/globals/es6-shim/index.d.ts" />
module Common {
    export class Constants {
        public appName: string;
        public hubConnectToGroupMethodName: string;
        public connectedToGroup: string;
        public leftGroup: string;
        public groupFulled: string;
        public competitionHub: string;

        constructor() {
            this.appName = "gameApp"
            this.hubConnectToGroupMethodName = "connect";
            this.connectedToGroup = "userAdded";
            this.leftGroup = "userLeft";
            this.groupFulled = "groupFulled";
            this.competitionHub = "competitionHub";
        }
    }
    
    export function  GetConstants():Constants {
        return new Constants();
    }
}