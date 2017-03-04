module Models {
    export enum Level {
        Beginer = 1,

        Intermediate = 2,

        Advanced = 3
    }

    export interface ILevelNamePair {
        name: string;
        level: Models.Level;
    }
}