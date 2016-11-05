/// <reference path="../interfaces.ts" />
module Services {
    interface IModalSettings extends ng.ui.bootstrap.IModalSettings {

        /** Sets the aria-describedby property on the modal. 
         * The value should be an id (without the leading #) pointing to the element that describes your modal. 
         * Typically, this will be the text on your modal,
         *  but does not include something the user would interact with, 
         * like buttons or a form. 
         * Omitting this option will not impact sighted users but will weaken your accessibility support. */
        ariaDescribedBy: string;

        /** Sets the aria-labelledby property on the modal. 
         * The value should be an id (without the leading #) pointing to the element that labels your modal. 
         * Typically, this will be a header element. 
         * Omitting this option will not impact sighted users but will weaken your accessibility support. */
        ariaLabelledBy: string;
    }

    export class StateHandlerService implements Interfaces.IStateHandler {
        private constants: Common.Constants;
        private $rootScope: Interfaces.IRootScope;
        private $modal: angular.ui.bootstrap.IModalService;
        private connectToGameScope: Interfaces.IConnectToGameScope;
        private groupFulledObservable: Rx.Subject<any>;
        private addedToGroupObservable: Rx.Subject<any>;
        private userLeftGroupObservable: Rx.Subject<any>;
        private gameStartedObservable: Rx.Subject<any>;

        private startGameModalInstance: angular.ui.bootstrap.IModalServiceInstance;

        static $inject = ["$rootScope", "$uibModal"];
        constructor($rootScope: Interfaces.IRootScope, $modal: angular.ui.bootstrap.IModalService) {
            this.constants = Common.GetConstants();
            this.$modal = $modal;
            this.$rootScope = $rootScope;
            this.$rootScope.isStartGamePage = false;
            this.$rootScope.userId = null;
            this.groupFulledObservable = new Rx.Subject<any>();
            this.addedToGroupObservable = new Rx.Subject<any>();
            this.userLeftGroupObservable = new Rx.Subject<any>();
            this.gameStartedObservable = new Rx.Subject<any>();
        }

        private callInDigestLoop(action:() => void) {
            if (this.$rootScope.$$phase) {
                action();
            } else {
                this.$rootScope.$apply(() => {
                    action();
                })
            }
        }

        private showStartGameModal(): void {
            var opt = {} as ng.ui.bootstrap.IModalSettings;
                opt.scope = this.connectToGameScope;
                opt.templateUrl = "connectToGroup.html";
                opt.windowTemplateUrl = "windowTemplate.html";
                opt.backdrop = "static";
                opt.keyboard = false;
                opt.animation = true;
                opt.size = "lg";
                this.startGameModalInstance = this.$modal.open(opt);
        }

        private showGameFinishedModalWindow(isWin?: boolean, isDraw?: boolean): void {
            if (isWin === undefined && isDraw === undefined) {
                throw "One of boolean flags should be specified";
            }

            var connectToGameScope = this.connectToGameScope;
            var opt = {} as ng.ui.bootstrap.IModalSettings;
                opt.controller = function($scope: Interfaces.IGameFinishedModalWindowScope) {
                    $scope.playAgain = connectToGameScope.connectToGroup;

                    if (isDraw) {
                        $scope.message = "It is draw. Good job :D!\nDo you want to play again?";
                    } else if (isWin) {
                        $scope.message = "Congratulation! You have won!\nDo you want to play again?";
                    } else {
                        $scope.message = "You have lost, but who cares :). It was fun.\nDo you want to play again?";
                    }
                }
                opt.templateUrl = "gameFinished.html";
                opt.windowTemplateUrl = "windowTemplate.html";
                opt.backdrop = "static";
                opt.keyboard = false;
                opt.animation = true;
                opt.size = "lg";
                this.startGameModalInstance = this.$modal.open(opt);
        }

        public setConnectToGameScope(connectToGameScope: Interfaces.IConnectToGameScope): void {
            this.connectToGameScope = connectToGameScope;
        }

        public handleConnectionToGroup(promise: JQueryPromise<any>): void {
            promise.fail((error) => {
                console.log("smth bad happened: " + error);
            });

            promise.done(() => {
                if (this.startGameModalInstance) {
                    this.startGameModalInstance.close();
                    this.startGameModalInstance = null;

                    this.callInDigestLoop(() => {
                        this.$rootScope.addedToGroupPromise = this.addedToGroupObservable
                                                                  .take(1)
                                                                  .toPromise() as Promise<any>;
                        
                        this.groupFulledObservable
                            .take(1)
                            .subscribe(() => {
                                this.callInDigestLoop(() => {
                                    this.$rootScope.loadingGamePromise = Rx.Observable.merge(this.userLeftGroupObservable.take(1),
                                                                                             this.gameStartedObservable.take(1))
                                                                                      .take(1)
                                                                                      .toPromise() as Promise<any>;
                                });
                            });

                        this.$rootScope.user2ConnectedPromise = this.groupFulledObservable
                                                                    .take(1)
                                                                    .toPromise() as Promise<any>;
                                                                    
                        this.$rootScope.isStartGamePage = true;
                    });
                }
            });

            this.callInDigestLoop(() => {
                this.connectToGameScope.connectToGroupPromise = promise;
            });
        }

        public handleUserAddedToGroup(): void {
            this.addedToGroupObservable.onNext({});
        }

        public handleConnectionToHub(promise: JQueryPromise<any>): void {
            promise.fail(() => {
                console.log("smth bad happened");
            });

            promise.done(() => {
                    this.callInDigestLoop(() => {
                        this.showStartGameModal();
                    });
            });

            this.callInDigestLoop(() => {
                this.$rootScope.connectToHubPromise = promise;
            });
        }

        public handleGameFinished(isWin?: boolean, isDraw?: boolean): void {
            this.callInDigestLoop(() => {
                this.$rootScope.isStartGamePage = false;
                this.showGameFinishedModalWindow(isWin, isDraw);
            });
        }

        public handleGroupFulled(): void {
            this.callInDigestLoop(() => {
                this.groupFulledObservable.onNext({});
            });
        }
        
        public handleGameStarted(): void {
            this.callInDigestLoop(() => {
                this.$rootScope.isStartGamePage = true;
                this.gameStartedObservable.onNext({});

                if (this.startGameModalInstance) {
                    this.startGameModalInstance.close();
                    this.startGameModalInstance = null;
                }
            });
        }

        public getUserId(): string {
            return this.$rootScope.userId;
        }

        public setUserId(userId: string): void {
            this.$rootScope.userId = userId;
        }

        public handleUser2LeftGroup(): void {
            this.callInDigestLoop(() => {
                this.userLeftGroupObservable.onNext({});
                this.$rootScope.isStartGamePage = false;
                this.showStartGameModal();
            });
        }

        public getUserDisplayName(): string {
            return this.$rootScope.displayName;
        }
    }

    angular.module(Common.GetConstants().appName).service("Services.StateHandlerService", StateHandlerService);
}