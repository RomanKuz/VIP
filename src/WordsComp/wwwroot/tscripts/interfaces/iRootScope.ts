/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
module Interfaces {
    export interface IRootScope extends ng.IScope {
        connectToHubPromise: JQueryPromise<any>;
        loadingGamePromise: Promise<any>;
        addedToGroupPromise: Promise<any>;
        user2ConnectedPromise: Promise<any>;

        isStartGamePage: boolean;

        userId: string;
        displayName: string;
        level: Models.ILevelNamePair;
    }
}