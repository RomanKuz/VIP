/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
module controllers {
    export class ConnectToGameController {
        private connectionHubService: Interfaces.IConnectToGame;
        private $scope: Interfaces.IConnectToGameScope;
        private groupInfo: Models.Group;
        private stateHandler: Interfaces.IStateHandler;
        private $rootScope: Interfaces.IRootScope;

        static $inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$rootScope"];
        constructor(connectionHubService: Interfaces.IConnectToGame, $scope: Interfaces.IConnectToGameScope, 
                    stateHandler: Interfaces.IStateHandler,
                    $rootScope: Interfaces.IRootScope) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$rootScope = $rootScope;
            this.initializeViewModel();
        }

        private initializeViewModel():void {
            this.stateHandler.setConnectToGameScope(this.$scope);

            this.connectionHubService.onUserLeft(data => this.onUserLeft.call(this, data));
            this.connectionHubService.onGroupFulled(data => this.onGroupFulled.call(this, data));
            this.connectionHubService.onConnectedToGroup(data => this.onConnectedToGroup.call(this, data));
            this.$scope.connectToGroup = () => this.connectToGroup.apply(this);

            var promise = this.connectionHubService.connectToHub().done(value => {
                this.stateHandler.setUserId(value);
            });
            this.stateHandler.handleConnectionToHub(promise);
            this.$scope.levels = [
                                  {level: Models.Level.Beginer, name: "Новачок"},
                                  {level: Models.Level.Intermediate, name: "Средний"},
                                  {level: Models.Level.Advanced, name: "Высокий"}
                                 ];
            this.$rootScope.level = this.$scope.levels[1];
            this.$scope.changeLevel = (level: Models.ILevelNamePair) => this.$rootScope.level = level;
            this.$rootScope.displayName = "Случайный игрок"
        }

        private onGroupFulled(groupInfo: Models.Group): void {
            this.groupInfo = groupInfo;
            this.stateHandler.handleGroupFulled();
        }

        private onUserLeft(groupInfo: Models.Group): void {
            this.groupInfo = null;
            this.stateHandler.handleUser2LeftGroup();
        }

        private connectToGroup(): void {
            var promise = this.connectionHubService.connectToNewGroup(this.stateHandler.getUserDisplayName(),
                                                                      this.$rootScope.level.level);
            this.stateHandler.handleConnectionToGroup(promise);
        }

        private onConnectedToGroup(userId: string): void {
            this.stateHandler.setUserId(userId);
            this.stateHandler.handleUserAddedToGroup();
        }
    }

    angular.module(Common.GetConstants().appName).controller("controllers.ConnectToGameController", ConnectToGameController);
} 