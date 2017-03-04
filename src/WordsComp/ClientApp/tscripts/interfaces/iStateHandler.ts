module Interfaces {
    export enum StartGameModalState {
        startNewGame = 1,

        createNewRoom = 2
    }

    export enum GameMode {
        onlineWithEverybody = 1,

        withFriend = 2
    }

    export interface IStateHandler {
        setUpGameScope($gameScope: Interfaces.IGameScope): void;
        handleGameFinished(isWin?: boolean, isDraw?: boolean): void;

        handleConnectionToGroup(promise: JQueryPromise<any>): void;
        handleUserAddedToGroup(): void;
        handleGroupFulled(): void;

        handleUser2LeftGroup(): void;
        
        handleGameStarted(): void;

        showStartGameWindow(): void;
        showConnectToRoomWindow(): void

        getUserId(): string;
        setUserId(userId: string): void;
        getUserDisplayName(): string;

        setConnectToGameScope(connectToGameScope: Interfaces.IConnectToGameScope): void;

        handleDisconnectedFromHub(): void;
    }
}