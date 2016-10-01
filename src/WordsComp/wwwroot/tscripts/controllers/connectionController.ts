/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
module controllers {
    export class ConnectToGameController {
        private connectionHubService: Interfaces.IConnectToGame;
        private $scope: Interfaces.IConnectToGameScope;
        private userId: string;

        static $inject = ["Services.ConnectToGameService", "$scope"];
        constructor(connectionHubService: Interfaces.IConnectToGame, $scope: Interfaces.IConnectToGameScope) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.initializeViewModel();
        }

        private initializeViewModel():void {
            this.$scope.isConnectingToHub = true;
            this.$scope.isConnectedToHubSuccessfully = null;

            var res = null;
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

                this.connectionHubService.onUserLeft(this.onUserLeft);
                this.$scope.connectToGroup = () => this.connectToGroup.apply(this);
        }

        private onUserLeft(): void {
            this.$scope.$apply(() => {
                      this.$scope.isConnectedToGroup = false;
                    });
        }

        private connectToGroup(): void {
            this.$scope.isConnectingToGroup = true;
            this.$scope.isConnectedToGroup = null;

            this.connectionHubService.connectToNewGroup().done(g => {
                this.$scope.$apply(() => {
                      this.$scope.isConnectedToGroup = true;
                    });
            }).fail(() => {
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