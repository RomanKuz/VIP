/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
module Interfaces {
    export interface IConnectToGame {
        connectToHub: () => JQueryPromise<any>;

        connectToNewGroup: (displayName: string, level: Models.Level) => JQueryPromise<any>

        doMove: (moveOrder: number, word: string, variant:string) => JQueryPromise<Models.MoveResult>

        passMove: (moveOrder: number) => JQueryPromise<Models.MoveResult>

        onConnectedToGroup: (callBack:(userId: string) => void) => void;

        onGroupFulled: (callBack:(group: Models.Group) => void) => void;

        onUserLeft: (callBack:(group: Models.Group) => void) => void;

        gameStarted: (callBack:(group: Models.Game) => void) => void;

        didMove: (callBack:(moveRes: Models.MoveResult) => void) => void;

        gameFinished: (callBack:(group: Models.Game) => void) => void;
    }
}