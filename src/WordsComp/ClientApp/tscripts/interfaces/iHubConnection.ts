/// <reference path="../common.ts" />
module Interfaces {
    export interface IHubConnection {
        getConnection: () => SignalR.Hub.Connection
    }
}