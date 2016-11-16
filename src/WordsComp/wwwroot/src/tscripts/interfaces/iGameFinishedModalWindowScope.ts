/// <reference path="../common.ts" />
module Interfaces {
    export interface IGameFinishedModalWindowScope extends ng.IScope {
        message: string,

        playAgain: () => void;
        close: () => void;
    }
}