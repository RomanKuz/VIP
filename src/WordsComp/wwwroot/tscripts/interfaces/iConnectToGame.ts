/// <reference path="../common.ts" />
module Interfaces {
    export interface IConnectToGame {
        connectToHub: () => JQueryPromise<any>;

        connectToNewGroup: () => JQueryPromise<any>

        onConnectedToGroup: (callBack:(group: Models.Group) => void) => void;

        onGroupFulled: (callBack:(group: Models.Group) => void) => void;

        onUserLeft: (callBack:(group: Models.Group) => void) => void;
    }
}