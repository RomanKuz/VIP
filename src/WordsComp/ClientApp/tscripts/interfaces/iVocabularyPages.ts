module Interfaces {
    export interface IVocabularyPages {
        items: Array<Models.VocabularyWord>;  

        isBusy: boolean;

        getNext():void;

        clearState(): void;
    }
}