/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
module controllers {
    export class ConnectToGameController {
        private connectionHubService: Interfaces.IConnectToGame;
        private $scope: Interfaces.IConnectToGameScope;
        private userId: string;
        private groupInfo: Models.Group;

        static $inject = ["Services.ConnectToGameService", "$scope"];
        constructor(connectionHubService: Interfaces.IConnectToGame, $scope: Interfaces.IConnectToGameScope) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.initializeViewModel();
        }

        private initializeViewModel():void {
            this.$scope.isConnectingToHub = true;
            this.$scope.isConnectedToHubSuccessfully = null;

            this.connectionHubService.onUserLeft(data => this.onUserLeft.call(this, data));
            this.connectionHubService.onGroupFulled(data => this.onGroupFulled.call(this, data));
            this.$scope.connectToGroup = () => this.connectToGroup.apply(this);

            this.connectionHubService.connectToHub().done(value => {
                    this.$scope.$apply(() => {
                        this.userId = value;
                        this.$scope.isConnectedToHubSuccessfully = true;
                    })
                }).always(() => {
                    this.$scope.$apply(() => {
                        this.$scope.isConnectingToHub = false;
                    })
                }).fail(() => {
                    this.$scope.$apply(() => {
                       this.$scope.isConnectedToHubSuccessfully = false; 
                    });
                })
        }

        private onGroupFulled(groupInfo: Models.Group): void {
            this.$scope.$apply(() => {
                      this.$scope.isConnectedToGroup = false;
                      this.userId = null;
                      this.groupInfo = null;
                      this.$scope.isWaitingForNewUserToConnect = false;
                    });
        }

        private onUserLeft(groupInfo: Models.Group): void {
            this.$scope.$apply(() => {
                      this.$scope.isConnectedToGroup = false;
                      this.userId = null;
                      this.groupInfo = null;
                      this.$scope.isWaitingForNewUserToConnect = true;
                    });
        }

        private connectToGroup(): void {
            this.$scope.isConnectingToGroup = true;
            this.$scope.isConnectedToGroup = null;

            this.connectionHubService.connectToNewGroup().done(userId => {
                this.$scope.$apply(() => {
                      this.$scope.isConnectedToGroup = true;
                      this.userId = userId;
                    });
            }).fail(error => {
                this.$scope.$apply(() => {
                      this.$scope.isConnectedToGroup = false;
                    });
            }).always(() => {
                this.$scope.$apply(() => {
                      this.$scope.isConnectingToGroup = false;
                    });
            });
        }
    }

    angular.module(Common.GetConstants().appName).controller("controllers.ConnectToGameController", ConnectToGameController);
} 