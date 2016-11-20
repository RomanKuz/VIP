/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
module Interfaces {
    export interface IGameScope extends ng.IScope {
        loadingGamePromise: JQueryPromise <any>;
        addedToGroupPromise: JQueryPromise <any>;
        user2ConnectedPromise: JQueryPromise <any>;

        currentUserScore: Models.Score;

        user2Score: Models.Score;

        user2DisplayName: string;

        currentWord: Models.Word;

        currentWordIndex: number;

        doMove: (variant: string) => void;

        isCurrentUserMove: boolean;

        passedWords: Array<Models.PassedWordInfo>;
        leftWords: Array<Models.Word>;

        secondsForMoveLeft: number;
        percentagesLeft: number;
    }
}