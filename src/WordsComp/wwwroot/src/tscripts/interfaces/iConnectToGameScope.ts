/// <reference path="../common.ts" />
module Interfaces {
    export interface IConnectToGameScope extends rx.angular.IRxScope {
        connectToGroup: () => void;
        createAndConnectToCustomRoom: () => void;
        connectToExistingRoom: () => void;

        levels: Array<Models.ILevelNamePair>;
        changeLevel: (level: Models.ILevelNamePair) => void;

        startModalState: Interfaces.StartGameModalState;
        urlWithRoomId: string;

        connectToGroupErrorMessage: string;
    }
}