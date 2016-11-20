/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
module Interfaces {
    export interface IRootScope extends ng.IScope {
        
        isStartGamePage: boolean;

        userId: string;
        displayName: string;
        level: Models.ILevelNamePair;
    }
}