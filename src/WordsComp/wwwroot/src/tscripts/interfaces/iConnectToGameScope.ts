/// <reference path="../common.ts" />
module Interfaces {
    export interface IConnectToGameScope extends ng.IScope {
        connectToGroup: () => void;

        connectToGroupPromise: JQueryPromise<any>;

        levels: Array<Models.ILevelNamePair>;
        changeLevel: (level: Models.ILevelNamePair) => void;
    }
}