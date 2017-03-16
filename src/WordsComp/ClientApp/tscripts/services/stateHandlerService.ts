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
        private usSpinnerService: ISpinnerService;
        private connectToGameScope: Interfaces.IConnectToGameScope;
        private $gameScope: Interfaces.IGameScope;
        private groupFulledObservable: Rx.Subject<any>;
        private addedToGroupObservable: Rx.Subject<any>;
        private userLeftGroupObservable: Rx.Subject<any>;
        private gameStartedObservable: Rx.Subject<any>;
        private $log: ng.ILogService;
        private connectToGameService: Interfaces.IConnectToGame;

        private startGameModalInstance: angular.ui.bootstrap.IModalServiceInstance;

        static $inject = ["$rootScope", "$uibModal", "usSpinnerService", "$log", "Services.ConnectToGameService"];
        constructor($rootScope: Interfaces.IRootScope, 
                    $modal: angular.ui.bootstrap.IModalService,
                    usSpinnerService: ISpinnerService,
                    $log: ng.ILogService,
                    connectToGameService: Interfaces.IConnectToGame) {
            this.constants = Common.GetConstants();
            this.$modal = $modal;
            this.usSpinnerService = usSpinnerService;
            this.$rootScope = $rootScope;
            this.$rootScope.isStartGamePage = false;
            this.$rootScope.userId = null;
            this.$log = $log;
            this.connectToGameService = connectToGameService;
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

        public showConnectToRoomWindow(): void {
            let opt = {} as ng.ui.bootstrap.IModalSettings;
                opt.scope = this.connectToGameScope;
                opt.templateUrl = "connectToRoom.html";
                opt.windowTemplateUrl = "windowTemplate.html";
                opt.backdrop = "static";
                opt.keyboard = false;
                opt.animation = true;
                opt.size = "lg";
                this.startGameModalInstance = this.$modal.open(opt);
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

        private showGameFinishedModalWindow(isWin?: boolean, isDraw?: boolean, isUser2Left?: boolean): void {
            if (isWin === undefined && isDraw === undefined && isUser2Left === undefined) {
                throw "One of boolean flags should be specified";
            }

            let connectToGameScope = this.connectToGameScope;
            let gameScope = this.$gameScope;
            let rootScope = this.$rootScope;
            let opt = {} as ng.ui.bootstrap.IModalSettings;
                opt.controller = function($scope: Interfaces.IGameFinishedModalWindowScope) {
                    $scope.playAgain = rootScope.gameMode === Interfaces.GameMode.withFriend
                        ? connectToGameScope.connectToExistingRoom
                        : connectToGameScope.connectToGroup;

                    $scope.playAgainDisplayMsg = rootScope.gameMode === Interfaces.GameMode.withFriend
                        ? "Подключится к комнате"
                        :  "Сыграть ещё";
                    $scope.shouldShowCancelButton = rootScope.gameMode === Interfaces.GameMode.withFriend;

                    if (isDraw) {
                        $scope.message = "Ничья. Отличная игра :D!\nХотите сыграть ещё раз?";
                    } else if (isWin) {
                        $scope.message = "Поздравления! Вы выиграли!\nХотите сыграть ещё раз?";
                    } else if (isUser2Left) {
                        $scope.message = "Соперник покинул игру :(";
                    }
                    else {
                        $scope.message = "Даже если проиграл, преобретенный опыт останется навсегда с тобой и станет твоей наградой :)\nХотите сыграть ещё раз?";
                    }
                    $scope.passedWords = gameScope.passedWords.filter(v => v.wasPassed);
                    $scope.wrongAttemps = gameScope.passedWords.filter(v => !v.wasPassed);
                }
                opt.templateUrl = "gameFinished.html";
                opt.windowTemplateUrl = "windowTemplate.html";
                opt.backdrop = "static";
                opt.keyboard = false;
                opt.animation = true;
                opt.size = "lg";
                this.startGameModalInstance = this.$modal.open(opt);
        }

        private startSpin<T>(spinKey: string, observable: Rx.IObservable<T>): void {
            this.usSpinnerService.spin(spinKey);

            observable.subscribe(() => {
                this.usSpinnerService.stop(spinKey);
            });
        }

        private startSpinFromNgPromise<T>(spinKey: string, promise: ng.IPromise<T>): void {
            this.usSpinnerService.spin(spinKey);

            promise.finally(() => this.usSpinnerService.stop(spinKey));
        }

        public setConnectToGameScope(connectToGameScope: Interfaces.IConnectToGameScope): void {
            this.connectToGameScope = connectToGameScope;
        }

        public handleConnectionToGroup(promise: JQueryPromise<any>): void {
            this.startSpin('connect-to-group', Rx.Observable.fromPromise(promise));

            this.callInDigestLoop(() => {
                        this.connectToGameScope.connectToGroupErrorMessage = "";
                        let addedToGroup = this.addedToGroupObservable
                                                        .take(1);

                        addedToGroup.subscribe(() => {
                            this.closeAllWindows();
                            this.$rootScope.isStartGamePage = true;
                        });
                        
                        let groupFulled = this.groupFulledObservable
                                              .take(1);

                        this.startSpin('group-fulled', groupFulled);

                        const loadingGameSpinKey = 'loading-game';
                        groupFulled.take(1)
                                   .do(() => this.usSpinnerService.spin(loadingGameSpinKey))
                                   .concat(Rx.Observable.merge(this.userLeftGroupObservable.take(1),
                                                               this.gameStartedObservable.take(1))
                                                        .take(1))
                                   .subscribe(() => this.usSpinnerService.stop(loadingGameSpinKey));
                        
                        let onFailedToLoadGame = new Rx.Subject<any>();
                        this.connectToGameService.onFailedToLoadGame(() => onFailedToLoadGame.onNext({}));
                        onFailedToLoadGame.take(1).subscribe(() => {
                            this.usSpinnerService.stop('loading-game');
                            this.connectToGameService.stopHubConnection();
                            this.handleConnectToGroupError("Ошибка при загрузке игры. Попробуйте снова.");
                        });
            });

            promise.fail((error) => {
                this.$log.error(error);
                this.usSpinnerService.stop('loading-game');
                this.connectToGameService.stopHubConnection();
                this.handleConnectToGroupError("Упс :( Что-то пошло не так. Попробуйте снова.");
            })
        }

        private handleConnectToGroupError(erroMessage: string) {
            if (this.startGameModalInstance) {
                this.callInDigestLoop(() => 
                    this.connectToGameScope.connectToGroupErrorMessage = this.connectToGameScope.connectToGroupErrorMessage 
                    || erroMessage);
                // do not show window again if it is already shown
                return;
            }
                this.$rootScope.gameMode === Interfaces.GameMode.onlineWithEverybody 
                    ? this.showStartGameWindow()
                    : this.showConnectToRoomWindow();
                this.$rootScope.isStartGamePage = false;

                this.callInDigestLoop(() => 
                    this.connectToGameScope.connectToGroupErrorMessage = erroMessage);
        }

        private closeAllWindows(): void {
            if (this.startGameModalInstance) {
                    this.startGameModalInstance.close();
                    this.startGameModalInstance = null;
            }
        }

        public handleUserAddedToGroup(): void {
            this.addedToGroupObservable.onNext({});
        }

        public showStartGameWindow(): void {
            this.callInDigestLoop(() => {
                        this.closeAllWindows();
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
                this.showGameFinishedModalWindow(null, null, true);
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
                });
            }
        }

        public handleVocabularyWordsLoading(promise: ng.IPromise<any>) {
            this.startSpinFromNgPromise('vocabulary-spinner', promise);
        }
    }

    angular.module(Common.GetConstants().appName).service("Services.StateHandlerService", StateHandlerService);
}