/// <reference path="./gameResult.ts" />
module Models {
    export class MoveResult {
        public isSuccessful: boolean;

        public isCorrect: boolean;

        public errorMessage: string;

        public isLastMove: boolean;

        public gameResult: Models.GameResult;
    }
}