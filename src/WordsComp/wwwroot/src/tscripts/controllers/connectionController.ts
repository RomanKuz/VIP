/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
module controllers {
    declare function jwt_decode(token: string) : any;

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
        private roomLevelFromUrl: Models.Level;
        private createdRoomId: string;
        private $auth: any;
        private $http: ng.IHttpService;

        static $inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$rootScope", "Services.CookieService", "$log", "$auth", "$http"];
        constructor(connectionHubService: Interfaces.IConnectToGame, 
                    $scope: Interfaces.IConnectToGameScope, 
                    stateHandler: Interfaces.IStateHandler,
                    $rootScope: Interfaces.IRootScope,
                    coockieService: Interfaces.ICookieService,
                    $log: ng.ILogService,
                    $auth: any,
                    $http: ng.IHttpService) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$rootScope = $rootScope;
            this.coockieService = coockieService;
            this.displayNameCookieKey = "displayName";
            this.levelCookieKey = "levelName";
            this.guidRegex = new RegExp("^roomId=[{(]?[0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12}[)}]?&level=[1-3]$", "i"); // ignore case
            this.$log = $log;
            this.$auth = $auth;
            this.$http = $http;
            this.initializeViewModel();
        }

        private initializeViewModel():void {
            this.initializeUserInfoFromCookies();
            this.stateHandler.setConnectToGameScope(this.$scope);
            this.connectionHubService.onUserLeft(data => this.onUserLeft.call(this, data));
            this.connectionHubService.onGroupFulled(data => this.onGroupFulled.call(this, data));
            this.connectionHubService.onConnectedToGroup(data => this.onConnectedToGroup.call(this, data));
            this.$scope.connectToGroup = () => this.connectToGroup.call(this, false, null);
            this.$scope.createAndConnectToCustomRoom = () => this.connectToGroup.call(this, true, null);
            this.$scope.connectToExistingRoom = (roomId?: string) => {
                    let id = roomId || this.roomIdFromUrl || this.createdRoomId;
                    if (!id || id === "") {
                        throw new Error("No room id is specified");
                    }
                    this.connectToGroup.call(this, true, roomId || this.roomIdFromUrl || this.createdRoomId,
                                             this.roomLevelFromUrl);
                }
            let cookieService = this.coockieService;
            this.$scope.authenticate = (provider:string) => {
                this.$auth.authenticate(provider).then(() => {
                    this.initializeUserInfoFromCookies();
                });
            };
            
            this.$scope.logOut = () => {
                this.$http.post('/auth/logout', null).then(() => {
                    this.$rootScope.isLoggedIn = false;
                    this.$rootScope.currentUserInfo = null;
                }, (error) => this.$log.error(error));
            };
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

            const defaultDisplayName = "Случайный игрок";
            let displayNameFromCookies = defaultDisplayName;
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

                if (displayNameFromCookies === defaultDisplayName
                    && this.$rootScope.isLoggedIn 
                    && this.$rootScope.currentUserInfo.shortExternalProfileName) {
                        displayNameFromCookies = this.$rootScope.currentUserInfo.shortExternalProfileName;
                }
            }
            catch (error) {
                this.$log.error(error);
            }

            this.$rootScope.displayName = displayNameFromCookies;
            this.$rootScope.level = this.$scope.levels[levelFromCookies - 1]; 
            this.$scope.urlWithRoomId = window.location.pathname;
            this.roomIdFromUrl = this.getParameterFromUrl("roomId");
            this.roomLevelFromUrl = parseInt(this.getParameterFromUrl("level"));

            if (this.roomLevelFromUrl) {
                this.$rootScope.roomLevelFromUrl = this.$scope.levels.filter(v => v.level === this.roomLevelFromUrl)[0];
            }
            this.$scope.startModalState = Interfaces.StartGameModalState.startNewGame;

            if (this.roomIdFromUrl !== "") {
                this.$rootScope.gameMode = Interfaces.GameMode.withFriend;
                this.stateHandler.showConnectToRoomWindow();
            } else {
                this.$rootScope.gameMode = Interfaces.GameMode.onlineWithEverybody;
                this.stateHandler.showStartGameWindow();
            }

            this.$rootScope.$toObservable('userId')
                           .select(change => change.newValue as string)
                           .where(id => id != null || id !== "")
                           .subscribe(id => this.$rootScope.urlForRoom = this.generateUrlForRoom(this.roomIdFromUrl !== ""
                                ? this.roomIdFromUrl 
                                : this.createdRoomId || id));
            this.$rootScope.$toObservable('gameMode')
                           .select(change => change.newValue as Interfaces.GameMode)
                           .where(gameMode => gameMode === Interfaces.GameMode.onlineWithEverybody)
                           .subscribe(_ => this.$rootScope.urlForRoom = "");
        }

        private initializeUserInfoFromCookies() {
            let jwt = this.coockieService.getCookie('UserClaims');
            if (jwt) {
                try {
                    let decodedToken = jwt_decode(jwt) as Interfaces.IUserInfo;
                    if (decodedToken) {
                        this.$rootScope.isLoggedIn = true;
                        this.$rootScope.currentUserInfo = decodedToken;
                    } else {
                        this.$rootScope.isLoggedIn = false;
                    }
                } catch(error) {
                    this.$log.error('error when decoding jwt: ' + error);
                }
            } else {
                this.$rootScope.isLoggedIn = false;
            }
        }

        private getParameterFromUrl(name: string): string {
            let url = location.href;
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&/]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
            return results == null ? "" : results[1];
        }

        private onGroupFulled(groupInfo: Models.Group): void {
            this.groupInfo = groupInfo;
            this.stateHandler.handleGroupFulled();
        }

        private onUserLeft(groupInfo: Models.Group): void {
            this.groupInfo = null;
        }

        private connectToGroup(isGameWithFriend: boolean, groupId: string, level: Models.Level): void {
            let displayName = this.stateHandler.getUserDisplayName();
            level = level || this.$rootScope.level.level;

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

            this.$rootScope.roomLevelFromUrl = this.$rootScope.roomLevelFromUrl
                || this.$rootScope.level;
            
            let rootScope = this.$rootScope;
            let promise = this.connectionHubService.connectToNewGroup(displayName,
                                                                      level,
                                                                      isGameWithFriend || false,
                                                                      groupId,
                                                                      this.$rootScope.isLoggedIn)
                                                   .done(() => {
                                                       if (isGameWithFriend 
                                                           && !groupId) {
                                                               this.createdRoomId = this.createdRoomId || rootScope.userId;
                                                           }
                                                   });
            this.stateHandler.handleConnectionToGroup(promise);
        }

        private onConnectedToGroup(userId: string): void {
            this.stateHandler.setUserId(userId);
            this.stateHandler.handleUserAddedToGroup();
        }

        private generateUrlForRoom(roomId: string): string {
            return "http://" + window.location.host + "/roomId=" + roomId + "&level=" + this.$rootScope.level.level;
        }
    }

    angular.module(Common.GetConstants().appName).controller("controllers.ConnectToGameController", ConnectToGameController);
} 