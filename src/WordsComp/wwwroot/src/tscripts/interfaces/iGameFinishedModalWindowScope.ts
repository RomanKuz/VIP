/// <reference path="../common.ts" />
module Interfaces {
    export interface IGameFinishedModalWindowScope extends ng.IScope {
        message: string;
        passedWords: Array<Models.PassedWordInfo>;
        wrongAttemps: Array<Models.PassedWordInfo>;

        playAgain: () => void;
        playAgainDisplayMsg: string;
        shouldShowCancelButton: boolean;

        close: () => void;
    }
}