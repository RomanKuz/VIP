/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
module Interfaces {
    export interface IGameScope extends ng.IScope {
        currentUserScore: Models.Score;

        user2Score: Models.Score;

        user2DisplayName: string;

        currentWord: Models.Word;

        currentWordIndex: number;

        doMove: (variant: string) => void;

        isCurrentUserMove: boolean;

        passedWords: Array<Models.PassedWordInfo>;
        leftWords: Array<Models.Word>;
        maxLeftAndPassedWordsCount: number;

        secondsForMoveLeft: number;
        percentagesLeft: number;

        randomQuate: string;

        user2Info: Interfaces.IUserInfo;
    }
}