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
        private wordsCountCoockieKey: string;
        private existingRoomId: string;
        private roomIdFromUrl: string;
        private roomLevelFromUrl: Models.Level;
        private roomWordsCount: number;
        private createdRoomId: string;
        private $auth: any;
        private $http: ng.IHttpService;
        private $location: ng.ILocationService;
        private $routeParams: any;

        static $inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$rootScope", "Services.CookieService", "$log", "$auth", "$http", "$location", "$routeParams"];
        constructor(connectionHubService: Interfaces.IConnectToGame, 
                    $scope: Interfaces.IConnectToGameScope, 
                    stateHandler: Interfaces.IStateHandler,
                    $rootScope: Interfaces.IRootScope,
                    coockieService: Interfaces.ICookieService,
                    $log: ng.ILogService,
                    $auth: any,
                    $http: ng.IHttpService,
                    $location: ng.ILocationService,
                    $routeParams: any) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$rootScope = $rootScope;
            this.coockieService = coockieService;
            this.displayNameCookieKey = "dN";
            this.levelCookieKey = "lN";
            this.wordsCountCoockieKey = "wC";
            this.$log = $log;
            this.$auth = $auth;
            this.$http = $http;
            this.$location = $location;
            this.$routeParams = $routeParams;
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
                    this.$rootScope.$broadcast('logout');
                }, (error) => this.$log.error(error));
            };
            this.$scope.dissconnectFromGroup = () => {
                if (this.$rootScope.gameMode !== Interfaces.GameMode.withFriend) {
                    return;
                }
                this.$location.search({});
                this.stateHandler.showStartGameWindow();
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
            debugger;
            this.roomIdFromUrl = this.$routeParams.roomId;
            this.roomLevelFromUrl = parseInt(this.$routeParams.level);
            this.roomWordsCount = parseInt(this.$routeParams.wordsCount);

            if (this.roomLevelFromUrl) {
                this.$rootScope.roomOptions.roomLevelFromUrl = this.$scope.levels.filter(v => v.level === this.roomLevelFromUrl)[0];
                this.$rootScope.roomOptions.wordsCount = this.roomWordsCount;
            }
            this.$scope.startModalState = Interfaces.StartGameModalState.startNewGame;

            if (this.roomIdFromUrl) {
                this.$rootScope.gameMode = Interfaces.GameMode.withFriend;
                this.stateHandler.showConnectToRoomWindow();
                this.$rootScope.roomOptions.urlForRoom = this.getCurrentUrl();
            } else {
                this.$rootScope.gameMode = Interfaces.GameMode.onlineWithEverybody;
                this.stateHandler.showStartGameWindow();
            }

            this.$rootScope.$toObservable('gameMode')
                           .select(change => change.newValue as Interfaces.GameMode)
                           .where(gameMode => gameMode === Interfaces.GameMode.onlineWithEverybody)
                           .subscribe(_ => this.$rootScope.roomOptions.urlForRoom = "");

            this.$scope.wordsCountConfig = {
                minValue: 5,
                maxValue: 25,
                step: 5,
                wordsCountFilter: parseInt(this.coockieService.getCookie(this.wordsCountCoockieKey)) || 5
            };
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

        private getSegmentFromUrl(index: number): string {
            var pathArray = window.location.pathname.split( '/' );
            return pathArray[index];
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
                this.coockieService.setCookie(this.wordsCountCoockieKey, this.$scope.wordsCountConfig.wordsCountFilter)
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
                                                                      this.$scope.wordsCountConfig.wordsCountFilter,
                                                                      this.$rootScope.isLoggedIn)
                                                   .done(() => {
                                                       if (isGameWithFriend 
                                                           && !groupId) {
                                                               this.createdRoomId = this.createdRoomId || rootScope.userId;
                                                               this.$location.search({roomId: this.createdRoomId, level: this.$rootScope.level.level, wordsCount: this.$scope.wordsCountConfig.wordsCountFilter});
                                                               this.$rootScope.roomOptions.urlForRoom = this.getCurrentUrl();
                                                           }
                                                   });
            this.stateHandler.handleConnectionToGroup(promise);
        }

        private onConnectedToGroup(userId: string): void {
            this.stateHandler.setUserId(userId);
            this.stateHandler.handleUserAddedToGroup();
        }

        private getCurrentUrl(): string {
            return window.location.protocol + "//" + window.location.host + this.$location.url();
        }
    }

    angular.module(Common.GetConstants().appName).controller("controllers.ConnectToGameController", ConnectToGameController);
} 