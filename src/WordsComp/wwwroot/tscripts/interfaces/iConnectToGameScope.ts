/// <reference path="../common.ts" />
module Interfaces {
    export interface IConnectToGameScope extends ng.IScope {
        isConnectingToHub: boolean;
        isConnectedToHubSuccessfully: boolean;

        isConnectingToGroup: boolean;
        isConnectedToGroup: boolean;

        connectToGroup: () => void;
    }
}