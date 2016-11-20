/// <reference path="../interfaces.ts" />
/// <reference path="../mixins/ngScheduler.ts" />
module Services {
    function toPromiseCustom<T>(observable: Rx.IObservable<T>, $scope: ng.IScope, id?: string): JQueryPromise <any> {
        let deffered = $.Deferred();
        observable.subscribe(() => {
                if (!$scope.$$phase) {
                    if (id === "test") {
                        debugger;
                    }
                    $scope.$apply(() => deffered.resolve());
                } else {
                    if (id === "test") {
                        debugger;
                    }
                    deffered.resolve();
                }
            });

        return deffered;
    }

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
        private $gameScope: Interfaces.IGameScope;
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

        public setUpGameScope($gameScope: Interfaces.IGameScope): void {
            this.$gameScope = $gameScope;
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
            let opt = {} as ng.ui.bootstrap.IModalSettings;
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

            let connectToGameScope = this.connectToGameScope;
            let opt = {} as ng.ui.bootstrap.IModalSettings;
                opt.controller = function($scope: Interfaces.IGameFinishedModalWindowScope) {
                    $scope.playAgain = connectToGameScope.connectToGroup;

                    if (isDraw) {
                        $scope.message = "Ничья. Отличная игра :D!\nХотите сыграть ещё раз?";
                    } else if (isWin) {
                        $scope.message = "Поздравления! Вы выиграли!\nХотите сыграть ещё раз?";
                    } else {
                        $scope.message = "Даже если проиграл, преобретенный опыт останется навсегда с тобой и станет твоей наградой :)\nХотите сыграть ещё раз?";
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
            this.callInDigestLoop(() => {
                        let addedToGroup = this.addedToGroupObservable
                                                        .take(1);

                        this.$gameScope.addedToGroupPromise = toPromiseCustom(addedToGroup, this.$gameScope);

                        addedToGroup.subscribe(() => {
                            if (this.startGameModalInstance) {
                                this.startGameModalInstance.close();
                                this.startGameModalInstance = null;
                            }

                            this.$rootScope.isStartGamePage = true;
                        });
                        
                        let groupFulled = this.groupFulledObservable
                                              .take(1);

                        debugger;
                        // BUG: For some reason somethimes is not resolved
                        this.$gameScope.user2ConnectedPromise = toPromiseCustom(groupFulled, this.$gameScope, "test");

                        groupFulled.subscribe(() => {
                                this.$gameScope.loadingGamePromise = toPromiseCustom(Rx.Observable.merge(this.userLeftGroupObservable.take(1),
                                                                                                         this.gameStartedObservable.take(1))
                                                                                                  .take(1), this.$gameScope);
                            });

                        this.connectToGameScope.connectToGroupPromise = promise;
            });

            promise.fail((error) => {
                console.log("smth bad happened: " + error);
            })
        }

        public handleUserAddedToGroup(): void {
            this.addedToGroupObservable.onNext({});
        }

        public showStartGameWindow(): void {
            this.callInDigestLoop(() => {
                        this.showStartGameModal();
                    });
        }

        public handleGameFinished(isWin?: boolean, isDraw?: boolean): void {
            this.callInDigestLoop(() => {
                this.$rootScope.isStartGamePage = false;
                this.showGameFinishedModalWindow(isWin, isDraw);
            });
        }

        public handleGroupFulled(): void {
            // TODO: Better to implement scheduler to subscribe within ng scope
            this.callInDigestLoop(() => {
                debugger;
                this.groupFulledObservable.onNext({});
            });
        }
        
        public handleGameStarted(): void {
            this.callInDigestLoop(() => {
                this.$rootScope.isStartGamePage = true;

                if (this.startGameModalInstance) {
                    this.startGameModalInstance.close();
                    this.startGameModalInstance = null;
                }
            });

            this.gameStartedObservable.onNext({});
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

        public handleDisconnectedFromHub(): void {
            if (this.$rootScope.isStartGamePage) {
                this.callInDigestLoop(() => {
                    // TODO: Show somehow that something was wrong with connection
                    this.$rootScope.isStartGamePage = false;
                    this.showStartGameModal();
                });
            }
        }
    }

    angular.module(Common.GetConstants().appName).service("Services.StateHandlerService", StateHandlerService);
}