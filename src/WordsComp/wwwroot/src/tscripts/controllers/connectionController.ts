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
        private $log: ng.ILogService;
        private displayNameCookieKey: string;
        private levelCookieKey: string;
        private existingRoomId: string;
        private guidRegex: RegExp;
        private roomIdFromUrl: string;

        static $inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$rootScope", "Services.CookieService", "$log"];
        constructor(connectionHubService: Interfaces.IConnectToGame, 
                    $scope: Interfaces.IConnectToGameScope, 
                    stateHandler: Interfaces.IStateHandler,
                    $rootScope: Interfaces.IRootScope,
                    coockieService: Interfaces.ICookieService,
                    $log: ng.ILogService) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$rootScope = $rootScope;
            this.coockieService = coockieService;
            this.displayNameCookieKey = "displayName";
            this.levelCookieKey = "levelName";
            this.guidRegex = new RegExp("^[{(]?[0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12}[)}]?$", "i"); // ignore case
            this.$log = $log;
            this.initializeViewModel();
        }

        private initializeViewModel():void {
            this.stateHandler.setConnectToGameScope(this.$scope);

            this.connectionHubService.onUserLeft(data => this.onUserLeft.call(this, data));
            this.connectionHubService.onGroupFulled(data => this.onGroupFulled.call(this, data));
            this.connectionHubService.onConnectedToGroup(data => this.onConnectedToGroup.call(this, data));
            this.$scope.connectToGroup = () => this.connectToGroup.call(this, false, null);
            this.$scope.createAndConnectToCustomRoom = () => this.connectToGroup.call(this, true, null);
            this.$scope.connectToExistingRoom = () => this.connectToGroup.call(this, true, this.roomIdFromUrl);

            this.connectionHubService.onConnectToHub(value => {
                this.stateHandler.setUserId(value);
            });
            this.connectionHubService.onDisconnectedFromHub(() => this.stateHandler.handleDisconnectedFromHub());
            
            this.$scope.levels = [
                                  {level: Models.Level.Beginer, name: "Новачок"},
                                  {level: Models.Level.Intermediate, name: "Средний"},
                                  {level: Models.Level.Advanced, name: "Высокий"}
                                 ];
            this.$scope.changeLevel = (level: Models.ILevelNamePair) => this.$rootScope.level = level;

            let displayNameFromCookies = "Случайный игрок";
            let levelFromCookies = 2; // Intermediate by default
            try {
                let cookieValue = this.coockieService.getCookie(this.displayNameCookieKey);
                if (cookieValue !== "") {
                    displayNameFromCookies = cookieValue;
                }

                cookieValue = this.coockieService.getCookie(this.levelCookieKey);
                if (cookieValue !== "") {
                    levelFromCookies = parseInt(cookieValue) || levelFromCookies;
                }
            }
            catch (error) {
                this.$log.error(error);
            }

            this.$rootScope.displayName = displayNameFromCookies;
            this.$rootScope.level = this.$scope.levels[levelFromCookies - 1]; 
            this.$scope.urlWithRoomId = window.location.pathname;
            this.roomIdFromUrl = this.obtainRoomIdFromUrl();
            this.$scope.startModalState = Interfaces.StartGameModalState.startNewGame;

            if (this.roomIdFromUrl !== "") {
                this.stateHandler.showConnectToRoomWindow();
            } else {
                this.stateHandler.showStartGameWindow();
            }

            this.$rootScope.$toObservable('userId')
                           .select(change => change.newValue as string)
                           .where(id => id != null || id !== "")
                           .subscribe(id => this.$rootScope.urlForRoom = this.generateUrlForRoom(this.roomIdFromUrl !== ""
                                ? this.roomIdFromUrl 
                                : id));
            this.$rootScope.$toObservable('gameMode')
                           .select(change => change.newValue as Interfaces.GameMode)
                           .where(gameMode => gameMode === Interfaces.GameMode.onlineWithEverybody)
                           .subscribe(_ => this.$rootScope.urlForRoom = "");
        }

        private obtainRoomIdFromUrl(): string {
            let pathArray = window.location.pathname.split( '/' );
            let id = pathArray[1] || "";

            return id.match(this.guidRegex) ? id : "";
        }

        private onGroupFulled(groupInfo: Models.Group): void {
            this.groupInfo = groupInfo;
            this.stateHandler.handleGroupFulled();
        }

        private onUserLeft(groupInfo: Models.Group): void {
            this.groupInfo = null;
            this.stateHandler.handleUser2LeftGroup();
        }

        private connectToGroup(isGameWithFriend: boolean, groupId: string): void {
            let displayName = this.stateHandler.getUserDisplayName();
            let level = this.$rootScope.level.level;

            try {
                this.coockieService.setCookie(this.displayNameCookieKey, displayName);
                this.coockieService.setCookie(this.levelCookieKey, level);
            }
            catch (error) {
                this.$log.error(error);
            }

            this.$rootScope.gameMode = isGameWithFriend
                ? Interfaces.GameMode.withFriend
                : Interfaces.GameMode.onlineWithEverybody;

            var promise = this.connectionHubService.connectToNewGroup(displayName,
                                                                      level,
                                                                      isGameWithFriend || false,
                                                                      groupId);
            this.stateHandler.handleConnectionToGroup(promise);
        }

        private onConnectedToGroup(userId: string): void {
            this.stateHandler.setUserId(userId);
            this.stateHandler.handleUserAddedToGroup();
        }

        private generateUrlForRoom(roomId: string): string {
            return "http://" + window.location.host + "/" + roomId;
        }
    }

    angular.module(Common.GetConstants().appName).controller("controllers.ConnectToGameController", ConnectToGameController);
} 