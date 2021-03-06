/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
module Interfaces {
    export interface IRootScope extends rx.angular.IRxScope {
        // is set from statehandler and used by controllers
        isStartGamePage: boolean;

        // properties are set from ConnectToGameController
        // and used by GameController
        userId: string;
        displayName: string;
        level: Models.ILevelNamePair;

        gameMode: GameMode;
        roomOptions: IRoomOptions;
        
        isLoggedIn: boolean;
        currentUserInfo: Interfaces.IUserInfo;
    }

    export interface IRoomOptions {
        urlForRoom: string;
        roomLevelFromUrl: Models.ILevelNamePair;
        wordsCount: number;
    }
}