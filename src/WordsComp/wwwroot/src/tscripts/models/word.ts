/// <reference path="./translateVariant.ts" />
module Models {
    export class Word {
        public word: string;

        public translateVariants: Array<TranslateVariant>

        public explanationQuotes: Array<string>

        public definition: string;

        public shortWordRepresentation: string;
    }
}