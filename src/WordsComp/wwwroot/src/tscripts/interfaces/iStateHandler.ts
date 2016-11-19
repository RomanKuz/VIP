module Interfaces {
    export interface IStateHandler {
        handleGameFinished(isWin?: boolean, isDraw?: boolean): void;

        handleConnectionToGroup(promise: JQueryPromise<any>): void;
        handleUserAddedToGroup(): void;
        handleGroupFulled(): void;

        handleUser2LeftGroup(): void;
        
        handleGameStarted(): void;

        showStartGameWindow(): void;

        getUserId(): string;
        setUserId(userId: string): void;
        getUserDisplayName(): string;

        setConnectToGameScope(connectToGameScope: Interfaces.IConnectToGameScope): void;

        handleDisconnectedFromHub(): void;
    }
}