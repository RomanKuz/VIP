/// <reference path="../common.ts" />
module Interfaces {
    export interface IConnectToGameScope extends ng.IScope {
        isConnectingToHub: boolean;
        isConnectedToHubSuccessfully: boolean;

        isConnectingToGroup: boolean;
        isConnectedToGroup: boolean;

        // true === waiting, false === new user connected, null === unknown
        isWaitingForNewUserToConnect: boolean;

        connectToGroup: () => void;
    }
}