/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
module controllers {
    export class ConnectToGameController {
        private connectionHubService: Interfaces.IConnectToGame;
        private $scope: Interfaces.IConnectToGameScope;
        private groupInfo: Models.Group;
        private stateHandler: Interfaces.IStateHandler;
        private $rootScope: Interfaces.IRootScope;
        private coockieService: Interfaces.ICookieService;

        static $inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$rootScope", "Services.CookieService"];
        constructor(connectionHubService: Interfaces.IConnectToGame, 
                    $scope: Interfaces.IConnectToGameScope, 
                    stateHandler: Interfaces.IStateHandler,
                    $rootScope: Interfaces.IRootScope,
                    coockieService: Interfaces.ICookieService) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$rootScope = $rootScope;
            this.coockieService = coockieService;
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

            var displayNameFromCookies = "Случайный игрок";
            try {
                let cookieValue = this.coockieService.getCookie("displayName");
                if (cookieValue !== "") {
                    displayNameFromCookies = cookieValue;
                }
            }
            catch (error) {
                console.log(error);
            }

            this.$rootScope.displayName = displayNameFromCookies;
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
            let displayName = this.stateHandler.getUserDisplayName();

            try {
                this.coockieService.setCookie("displayName", displayName);
            }
            catch (error) {
                console.log(error);
            }

            var promise = this.connectionHubService.connectToNewGroup(displayName,
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