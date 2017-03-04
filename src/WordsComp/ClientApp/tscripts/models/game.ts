/// <reference path="./score.ts" />
/// <reference path="./word.ts" />
module Models {
    export class Game {
        public user1: User;

        public user2: User;

        public currentMove: number;

        public words: Array<Word>

        public user1Score: Score;

        public user2Score: Score;
    }
}