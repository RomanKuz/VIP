/// <reference path="../typings/globals/angular/index.d.ts" />
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/signalr/index.d.ts" />
/// <reference path="../typings/globals/es6-shim/index.d.ts" />
/// <reference path="../typings/globals/angular-ui-bootstrap/index.d.ts" />
/// <reference path="../../node_modules/rx/ts/rx.d.ts" />
/// <reference path="../typings/globals/rx.angular/index.d.ts" />
/// <reference path="../typings/globals/angular-animate/index.d.ts" />
var Common;
(function (Common) {
    var Constants = (function () {
        function Constants() {
            this.appName = "gameApp";
            this.hubConnectToGroupMethodName = "connect";
            this.connectedToGroup = "userAdded";
            this.leftGroup = "userLeft";
            this.groupFulled = "groupFulled";
            this.competitionHub = "competitionHub";
            this.gameStarted = "gameStarted";
            this.didMove = "didMove";
            this.gameFinished = "gameFinished";
            this.doMove = "doMove";
            this.passMove = "passMove";
        }
        return Constants;
    }());
    Common.Constants = Constants;
    function GetConstants() {
        return new Constants();
    }
    Common.GetConstants = GetConstants;
})(Common || (Common = {}));
/// <reference path="../common.ts" />
var Mixins;
(function (Mixins) {
    function actionWrapper($scope, action) {
        return function (scheduler, state) {
            if (!$scope.$$phase) {
                var value_1;
                $scope.$apply(function () {
                    value_1 = action(scheduler, state);
                });
                return value_1;
            }
            return action(scheduler, state);
        };
    }
    var NgScheduler = (function () {
        function NgScheduler($scope) {
            this.immediateScheduler = Rx.Scheduler.immediate;
            this.$scope = $scope;
        }
        NgScheduler.prototype.now = function () {
            return this.immediateScheduler.now();
        };
        /**
          * Schedules an action to be executed.
          * @param state State passed to the action to be executed.
          * @param {Function} action Action to be executed.
          * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
          */
        NgScheduler.prototype.schedule = function (state, action) {
            return this.immediateScheduler.schedule(state, actionWrapper(this.$scope, action));
        };
        /**
         * Schedules an action to be executed after dueTime.
         * @param state State passed to the action to be executed.
         * @param {Function} action Action to be executed.
         * @param {Number} dueTime Relative time after which to execute the action.
         * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
         */
        NgScheduler.prototype.scheduleFuture = function (state, dueTime, action) {
            throw new Error("Not supported");
        };
        /**
         * Schedules an action to be executed recursively.
         * @param {Mixed} state State passed to the action to be executed.
         * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in recursive invocation state.
         * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
         */
        NgScheduler.prototype.scheduleRecursive = function (state, action) {
            throw new Error("Not supported");
        };
        /**
         * Schedules an action to be executed recursively after a specified relative due time.
         * @param {Mixed} state State passed to the action to be executed.
         * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
         * @param {Number}dueTime Relative time after which to execute the action for the first time.
         * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
         */
        NgScheduler.prototype.scheduleRecursiveFuture = function (state, dueTime, action) {
            throw new Error("Not supported");
        };
        /**
         * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
         * @param {Mixed} state Initial state passed to the action upon the first iteration.
         * @param {Number} period Period for running the work periodically.
         * @param {Function} action Action to be executed, potentially updating the state.
         * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
         */
        NgScheduler.prototype.schedulePeriodic = function (state, period, action) {
            throw new Error("Not supported");
        };
        NgScheduler.prototype.catch = function (handler) {
            return this.immediateScheduler.catch(handler);
        };
        return NgScheduler;
    }());
    Mixins.NgScheduler = NgScheduler;
})(Mixins || (Mixins = {}));
/// <reference path="common.ts" />
var App;
(function (App) {
    var constants = Common.GetConstants();
    var app = angular.module(constants.appName, ['ui.bootstrap.modal', 'cgBusy', 'ngAnimate']);
    function GetApp() {
        return app;
    }
    App.GetApp = GetApp;
})(App || (App = {}));
var Models;
(function (Models) {
    var User = (function () {
        function User() {
        }
        return User;
    }());
    Models.User = User;
})(Models || (Models = {}));
/// <reference path="./User.ts" />
var Models;
(function (Models) {
    var Group = (function () {
        function Group() {
        }
        return Group;
    }());
    Models.Group = Group;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var Score = (function () {
        function Score() {
        }
        return Score;
    }());
    Models.Score = Score;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var TranslateVariant = (function () {
        function TranslateVariant() {
            this.variant = null;
            this.isTrue = false;
            this.isSelected = false;
        }
        return TranslateVariant;
    }());
    Models.TranslateVariant = TranslateVariant;
})(Models || (Models = {}));
/// <reference path="./translateVariant.ts" />
var Models;
(function (Models) {
    var Word = (function () {
        function Word() {
        }
        return Word;
    }());
    Models.Word = Word;
})(Models || (Models = {}));
/// <reference path="./score.ts" />
/// <reference path="./word.ts" />
var Models;
(function (Models) {
    var Game = (function () {
        function Game() {
        }
        return Game;
    }());
    Models.Game = Game;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var GameResult = (function () {
        function GameResult() {
        }
        return GameResult;
    }());
    Models.GameResult = GameResult;
})(Models || (Models = {}));
/// <reference path="./gameResult.ts" />
var Models;
(function (Models) {
    var MoveResult = (function () {
        function MoveResult() {
        }
        return MoveResult;
    }());
    Models.MoveResult = MoveResult;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var PassedWordInfo = (function () {
        function PassedWordInfo() {
        }
        return PassedWordInfo;
    }());
    Models.PassedWordInfo = PassedWordInfo;
})(Models || (Models = {}));
var Models;
(function (Models) {
    (function (Level) {
        Level[Level["Beginer"] = 1] = "Beginer";
        Level[Level["Intermediate"] = 2] = "Intermediate";
        Level[Level["Advanced"] = 3] = "Advanced";
    })(Models.Level || (Models.Level = {}));
    var Level = Models.Level;
})(Models || (Models = {}));
// Used to reference model files
/// <reference path="./User.ts" />
/// <reference path="./Group.ts" />
/// <reference path="./game.ts" />
/// <reference path="./moveResult.ts" />
/// <reference path="./gameResult.ts" />
/// <reference path="./passedWordInfo.ts" />
/// <reference path="./level.ts" /> 
/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
/// <reference path="../common.ts" />
/// <reference path="../common.ts" />
/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
/// <reference path="../common.ts" />
/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
/// <reference path="./interfaces/iConnectToGame.ts" />
/// <reference path="./interfaces/iConnectToGameScope.ts" />
/// <reference path="./interfaces/iHubConnection.ts" />
/// <reference path="./interfaces/iRootScope.ts" />
/// <reference path="./interfaces/iGameScope.ts" />
/// <reference path="./interfaces/iStateHandler.ts" />
/// <reference path="./interfaces/iGameFinishedModalWindowScope.ts" />
/// <reference path="./models/models.ts" /> 
/// <reference path="../interfaces.ts" />
var Services;
(function (Services) {
    var ConnectToGameService = (function () {
        function ConnectToGameService(hubConnectionService) {
            this.constants = Common.GetConstants();
            this.connection = hubConnectionService.getConnection();
            this.hub = this.connection.createHubProxy(this.constants.competitionHub);
        }
        ConnectToGameService.prototype.connectToHub = function () {
            return this.hub.connection.start();
        };
        ConnectToGameService.prototype.doMove = function (moveOrder, word, variant) {
            return this.hub.invoke(this.constants.doMove, moveOrder, word, variant);
        };
        ConnectToGameService.prototype.passMove = function (moveOrder) {
            return this.hub.invoke(this.constants.passMove, moveOrder);
        };
        ConnectToGameService.prototype.connectToNewGroup = function (displayName, level) {
            return this.hub.invoke(this.constants.hubConnectToGroupMethodName, displayName, level);
        };
        ConnectToGameService.prototype.onConnectedToGroup = function (callBack) {
            this.hub.on(this.constants.connectedToGroup, function (msg) { return callBack(msg); });
        };
        ConnectToGameService.prototype.onGroupFulled = function (callBack) {
            this.hub.on(this.constants.groupFulled, function (msg) { return callBack(msg); });
        };
        ConnectToGameService.prototype.onUserLeft = function (callBack) {
            this.hub.on(this.constants.leftGroup, function (msg) { return callBack(msg[0]); });
        };
        ConnectToGameService.prototype.gameStarted = function (callBack) {
            this.hub.on(this.constants.gameStarted, function (msg) {
                callBack(msg);
            });
        };
        ConnectToGameService.prototype.didMove = function (callBack) {
            this.hub.on(this.constants.didMove, function (msg) { return callBack(msg); });
        };
        ConnectToGameService.prototype.gameFinished = function (callBack) {
            this.hub.on(this.constants.gameFinished, function (msg) { return callBack(msg[0]); });
        };
        ConnectToGameService.$inject = ["Services.HubConnectionService"];
        return ConnectToGameService;
    }());
    Services.ConnectToGameService = ConnectToGameService;
    angular.module(Common.GetConstants().appName).service("Services.ConnectToGameService", ConnectToGameService);
})(Services || (Services = {}));
/// <reference path="../interfaces.ts" />
var Services;
(function (Services) {
    var HubConnectionService = (function () {
        function HubConnectionService() {
        }
        HubConnectionService.prototype.getConnection = function () {
            if (!HubConnectionService.connection) {
                HubConnectionService.connection = $.hubConnection("/signalr", { useDefaultPath: false });
                HubConnectionService.connection.logging = true;
            }
            return HubConnectionService.connection;
        };
        return HubConnectionService;
    }());
    Services.HubConnectionService = HubConnectionService;
    angular.module(Common.GetConstants().appName).service("Services.HubConnectionService", HubConnectionService);
})(Services || (Services = {}));
/// <reference path="../interfaces.ts" />
/// <reference path="../mixins/ngScheduler.ts" />
var Services;
(function (Services) {
    function toPromiseCustom(observable) {
        var promise = new Promise(function (resolve) {
            observable.subscribe(function () {
                resolve({});
            });
        });
        return promise;
    }
    var StateHandlerService = (function () {
        function StateHandlerService($rootScope, $modal) {
            this.constants = Common.GetConstants();
            this.$modal = $modal;
            this.$rootScope = $rootScope;
            this.$rootScope.isStartGamePage = false;
            this.$rootScope.userId = null;
            this.groupFulledObservable = new Rx.Subject();
            this.addedToGroupObservable = new Rx.Subject();
            this.userLeftGroupObservable = new Rx.Subject();
            this.gameStartedObservable = new Rx.Subject();
        }
        StateHandlerService.prototype.callInDigestLoop = function (action) {
            if (this.$rootScope.$$phase) {
                action();
            }
            else {
                this.$rootScope.$apply(function () {
                    action();
                });
            }
        };
        StateHandlerService.prototype.showStartGameModal = function () {
            var opt = {};
            opt.scope = this.connectToGameScope;
            opt.templateUrl = "connectToGroup.html";
            opt.windowTemplateUrl = "windowTemplate.html";
            opt.backdrop = "static";
            opt.keyboard = false;
            opt.animation = true;
            opt.size = "lg";
            this.startGameModalInstance = this.$modal.open(opt);
        };
        StateHandlerService.prototype.showGameFinishedModalWindow = function (isWin, isDraw) {
            if (isWin === undefined && isDraw === undefined) {
                throw "One of boolean flags should be specified";
            }
            var connectToGameScope = this.connectToGameScope;
            var opt = {};
            opt.controller = function ($scope) {
                $scope.playAgain = connectToGameScope.connectToGroup;
                if (isDraw) {
                    $scope.message = "Ничья. Отличная игра :D!\nХотите сыграть ещё раз?";
                }
                else if (isWin) {
                    $scope.message = "Поздравления! Вы выиграли!\nХотите сыграть ещё раз?";
                }
                else {
                    $scope.message = "Даже если проиграл, преобретенный опыт останется навсегда с тобой и станет твоей наградой :)\nХотите сыграть ещё раз?";
                }
            };
            opt.templateUrl = "gameFinished.html";
            opt.windowTemplateUrl = "windowTemplate.html";
            opt.backdrop = "static";
            opt.keyboard = false;
            opt.animation = true;
            opt.size = "lg";
            this.startGameModalInstance = this.$modal.open(opt);
        };
        StateHandlerService.prototype.setConnectToGameScope = function (connectToGameScope) {
            this.connectToGameScope = connectToGameScope;
        };
        StateHandlerService.prototype.handleConnectionToGroup = function (promise) {
            var _this = this;
            promise.fail(function (error) {
                console.log("smth bad happened: " + error);
            });
            this.callInDigestLoop(function () {
                _this.callInDigestLoop(function () {
                    var addedToGroup = _this.addedToGroupObservable
                        .take(1);
                    _this.$rootScope.addedToGroupPromise = toPromiseCustom(addedToGroup);
                    addedToGroup.subscribe(function () {
                        if (_this.startGameModalInstance) {
                            _this.startGameModalInstance.close();
                            _this.startGameModalInstance = null;
                        }
                    });
                    var groupFulled = _this.groupFulledObservable
                        .take(1);
                    // BUG: For some reason somethimes is not resolved
                    _this.$rootScope.user2ConnectedPromise = toPromiseCustom(groupFulled);
                    groupFulled.subscribe(function () {
                        _this.$rootScope.loadingGamePromise = toPromiseCustom(Rx.Observable.merge(_this.userLeftGroupObservable.take(1), _this.gameStartedObservable.take(1))
                            .take(1));
                    });
                    _this.$rootScope.isStartGamePage = true;
                });
            });
            this.callInDigestLoop(function () {
                _this.connectToGameScope.connectToGroupPromise = promise;
            });
        };
        StateHandlerService.prototype.handleUserAddedToGroup = function () {
            this.addedToGroupObservable.onNext({});
        };
        StateHandlerService.prototype.handleConnectionToHub = function (promise) {
            var _this = this;
            promise.fail(function () {
                console.log("smth bad happened");
            });
            promise.done(function () {
                _this.callInDigestLoop(function () {
                    _this.showStartGameModal();
                });
            });
            this.callInDigestLoop(function () {
                _this.$rootScope.connectToHubPromise = promise;
            });
        };
        StateHandlerService.prototype.handleGameFinished = function (isWin, isDraw) {
            var _this = this;
            this.callInDigestLoop(function () {
                _this.$rootScope.isStartGamePage = false;
                _this.showGameFinishedModalWindow(isWin, isDraw);
            });
        };
        StateHandlerService.prototype.handleGroupFulled = function () {
            var _this = this;
            // TODO: Better to implement scheduler to subscribe within ng scope
            this.callInDigestLoop(function () {
                _this.groupFulledObservable.onNext({});
            });
        };
        StateHandlerService.prototype.handleGameStarted = function () {
            var _this = this;
            this.callInDigestLoop(function () {
                _this.$rootScope.isStartGamePage = true;
                if (_this.startGameModalInstance) {
                    _this.startGameModalInstance.close();
                    _this.startGameModalInstance = null;
                }
            });
            this.gameStartedObservable.onNext({});
        };
        StateHandlerService.prototype.getUserId = function () {
            return this.$rootScope.userId;
        };
        StateHandlerService.prototype.setUserId = function (userId) {
            this.$rootScope.userId = userId;
        };
        StateHandlerService.prototype.handleUser2LeftGroup = function () {
            var _this = this;
            this.callInDigestLoop(function () {
                _this.userLeftGroupObservable.onNext({});
                _this.$rootScope.isStartGamePage = false;
                _this.showStartGameModal();
            });
        };
        StateHandlerService.prototype.getUserDisplayName = function () {
            return this.$rootScope.displayName;
        };
        StateHandlerService.$inject = ["$rootScope", "$uibModal"];
        return StateHandlerService;
    }());
    Services.StateHandlerService = StateHandlerService;
    angular.module(Common.GetConstants().appName).service("Services.StateHandlerService", StateHandlerService);
})(Services || (Services = {}));
/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
var controllers;
(function (controllers) {
    var ConnectToGameController = (function () {
        function ConnectToGameController(connectionHubService, $scope, stateHandler, $rootScope) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$rootScope = $rootScope;
            this.initializeViewModel();
        }
        ConnectToGameController.prototype.initializeViewModel = function () {
            var _this = this;
            this.stateHandler.setConnectToGameScope(this.$scope);
            this.connectionHubService.onUserLeft(function (data) { return _this.onUserLeft.call(_this, data); });
            this.connectionHubService.onGroupFulled(function (data) { return _this.onGroupFulled.call(_this, data); });
            this.connectionHubService.onConnectedToGroup(function (data) { return _this.onConnectedToGroup.call(_this, data); });
            this.$scope.connectToGroup = function () { return _this.connectToGroup.apply(_this); };
            var promise = this.connectionHubService.connectToHub().done(function (value) {
                _this.stateHandler.setUserId(value);
            });
            this.stateHandler.handleConnectionToHub(promise);
            this.$scope.levels = [
                { level: Models.Level.Beginer, name: "Новачок" },
                { level: Models.Level.Intermediate, name: "Средний" },
                { level: Models.Level.Advanced, name: "Высокий" }
            ];
            this.$rootScope.level = this.$scope.levels[1];
            this.$scope.changeLevel = function (level) { return _this.$rootScope.level = level; };
            this.$rootScope.displayName = "Случайный игрок";
        };
        ConnectToGameController.prototype.onGroupFulled = function (groupInfo) {
            this.groupInfo = groupInfo;
            this.stateHandler.handleGroupFulled();
        };
        ConnectToGameController.prototype.onUserLeft = function (groupInfo) {
            this.groupInfo = null;
            this.stateHandler.handleUser2LeftGroup();
        };
        ConnectToGameController.prototype.connectToGroup = function () {
            var promise = this.connectionHubService.connectToNewGroup(this.stateHandler.getUserDisplayName(), this.$rootScope.level.level);
            this.stateHandler.handleConnectionToGroup(promise);
        };
        ConnectToGameController.prototype.onConnectedToGroup = function (userId) {
            this.stateHandler.setUserId(userId);
            this.stateHandler.handleUserAddedToGroup();
        };
        ConnectToGameController.$inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$rootScope"];
        return ConnectToGameController;
    }());
    controllers.ConnectToGameController = ConnectToGameController;
    angular.module(Common.GetConstants().appName).controller("controllers.ConnectToGameController", ConnectToGameController);
})(controllers || (controllers = {}));
/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
var controllers;
(function (controllers) {
    var GameController = (function () {
        function GameController(connectionHubService, $scope, stateHandler, $interval, $timeout) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$interval = $interval;
            this.secondsForMove = 10;
            this.$timeout = $timeout;
            this.initializeViewModel();
        }
        GameController.prototype.initializeViewModel = function () {
            var _this = this;
            this.connectionHubService.gameStarted(function (data) { return _this.startGame.call(_this, data); });
            this.connectionHubService.didMove(function (data) { return _this.user2didMove.call(_this, data); });
            this.$scope.doMove = function (variant) { return _this.doMove.call(_this, variant); };
            this.connectionHubService.onUserLeft(function () { return _this.onUserLeft.call(_this); });
            this.unsetGameInfo();
        };
        GameController.prototype.onUserLeft = function () {
            this.stopTimer();
            this.unsetGameInfo();
        };
        GameController.prototype.unsetGameInfo = function () {
            var _this = this;
            this.gameInfo = null;
            this.callInDigestLoop(function () {
                _this.$scope.currentWord = null;
                _this.$scope.secondsForMoveLeft = null;
                _this.$scope.percentagesLeft = null;
                _this.$scope.isCurrentUserMove = null;
                _this.$scope.currentUserScore = null;
                _this.$scope.passedWords = [];
                _this.$scope.leftWords = [];
            });
        };
        GameController.prototype.startGame = function (game) {
            var _this = this;
            this.gameInfo = game;
            this.words = game.words;
            var isUser1 = game.user1.userId === this.stateHandler.getUserId();
            this.userNum = isUser1 ? 1 : 2;
            this.$scope.$apply(function () {
                _this.$scope.currentUserScore = isUser1 ? game.user1Score : game.user2Score;
                _this.$scope.user2Score = !isUser1 ? game.user1Score : game.user2Score;
                _this.$scope.user2DisplayName = !isUser1 ? game.user1.displayName : game.user2.displayName;
                _this.$scope.currentWordIndex = 0;
                _this.$scope.currentWord = _this.words[0];
                _this.setVarinatsOrder();
                _this.$scope.isCurrentUserMove = (isUser1 && _this.gameInfo.currentMove === 1)
                    || (!isUser1 && _this.gameInfo.currentMove === 2);
                function shuffle(arr) {
                    var array = arr.slice(0);
                    var m = array.length, t, i;
                    // While there remain elements to shuffle
                    while (m) {
                        // Pick a remaining element…
                        i = Math.floor(Math.random() * m--);
                        // And swap it with the current element.
                        t = array[m];
                        array[m] = array[i];
                        array[i] = t;
                    }
                    return array;
                }
                _this.$scope.leftWords = shuffle(_this.words.slice(1));
            });
            this.stateHandler.handleGameStarted();
            this.startTimer();
        };
        GameController.prototype.callInDigestLoop = function (action) {
            if (this.$scope.$$phase) {
                action();
            }
            else {
                this.$scope.$apply(function () {
                    action();
                });
            }
        };
        GameController.prototype.startTimer = function () {
            var _this = this;
            if (this.timerPromise) {
                throw "Previous timer should be stopped";
            }
            this.callInDigestLoop(function () {
                _this.$scope.secondsForMoveLeft = _this.secondsForMove;
                _this.$scope.percentagesLeft = 100;
            });
            this.timerPromise = this.$interval(function () {
                _this.$scope.secondsForMoveLeft--;
                _this.$scope.percentagesLeft = _this.$scope.secondsForMoveLeft / 10 * 100;
                if (_this.$scope.secondsForMoveLeft === 0
                    && _this.$scope.isCurrentUserMove) {
                    _this.passMove();
                }
            }, 1000, 10);
        };
        GameController.prototype.stopTimer = function () {
            if (!this.timerPromise) {
                return;
            }
            this.$interval.cancel(this.timerPromise);
            this.timerPromise = null;
        };
        GameController.prototype.user2didMove = function (moveRes) {
            var _this = this;
            this.$scope.$apply(function () {
                _this.handleMove(moveRes, false);
            });
        };
        GameController.prototype.passMove = function () {
            var _this = this;
            this.connectionHubService.passMove(this.userNum)
                .done(function (moveResult) {
                _this.$scope.$apply(function () {
                    _this.handleMove(moveResult, true);
                });
            });
        };
        GameController.prototype.doMove = function (variant) {
            var _this = this;
            // a way to handle multiple click
            if (this.$scope.currentWord.translateVariants.filter(function (v) { return v.isSelected; })
                .length !== 0) {
                return;
            }
            this.stopTimer();
            if (this.$scope.secondsForMoveLeft === 0) {
                // should be handled by timer callback
                return;
            }
            var selectedVar = this.$scope.currentWord.translateVariants.filter(function (v) { return v.variant === variant; })[0];
            if (!selectedVar) {
                console.log('Incorrect var selected');
            }
            else {
                selectedVar.isSelected = true;
            }
            this.connectionHubService.doMove(this.userNum, this.$scope.currentWord.word, variant)
                .done(function (moveResult) {
                _this.$scope.$apply(function () {
                    _this.handleMove(moveResult, true);
                });
            });
        };
        GameController.prototype.handleMove = function (moveRes, isCurrentUserMove) {
            var _this = this;
            this.stopTimer();
            var currentUserScore = this.userNum === 1 ? this.gameInfo.user1Score : this.gameInfo.user2Score;
            var user2Score = this.userNum === 1 ? this.gameInfo.user2Score : this.gameInfo.user1Score;
            var score = isCurrentUserMove ? currentUserScore : user2Score;
            if (!moveRes.isCorrect) {
                console.error(moveRes.errorMessage);
            }
            else if (moveRes.isSuccessful) {
                score.successfulMoves++;
            }
            else {
                score.wrongMoves++;
            }
            if (moveRes.selectedVariantIndex !== -1) {
                this.$scope.currentWord.translateVariants[moveRes.selectedVariantIndex].isSelected = true;
            }
            if (this.userNum === 1) {
                this.$scope.currentUserScore = this.gameInfo.user1Score;
                this.$scope.user2Score = this.gameInfo.user2Score;
            }
            else {
                this.$scope.currentUserScore = this.gameInfo.user2Score;
                this.$scope.user2Score = this.gameInfo.user1Score;
            }
            this.$timeout(function () {
                _this.$scope.isCurrentUserMove = !isCurrentUserMove;
                _this.$scope.currentWordIndex++;
                if (isCurrentUserMove) {
                    var passedWord = new Models.PassedWordInfo();
                    passedWord.word = _this.$scope.currentWord.word;
                    passedWord.answer = _this.$scope.currentWord.translateVariants
                        .filter(function (i) { return i.isTrue; })
                        .shift()
                        .variant;
                    passedWord.wasPassed = moveRes.isSuccessful;
                    _this.$scope.passedWords.push(passedWord);
                }
                function removeFromArrayIf(arr, callback) {
                    var i = 0;
                    while (i < arr.length) {
                        if (callback(arr[i], i)) {
                            arr.splice(i, 1);
                            return;
                        }
                        else {
                            ++i;
                        }
                    }
                }
                _this.$scope.currentWord = _this.gameInfo.words[_this.$scope.currentWordIndex];
                _this.setVarinatsOrder();
                removeFromArrayIf(_this.$scope.leftWords, function (w) { return w.word === _this.$scope.currentWord.word; });
                if (moveRes.isLastMove) {
                    _this.stateHandler.handleGameFinished(_this.$scope.currentUserScore.successfulMoves > _this.$scope.user2Score.successfulMoves, _this.$scope.currentUserScore.successfulMoves == _this.$scope.user2Score.successfulMoves);
                    _this.unsetGameInfo();
                }
                else {
                    _this.startTimer();
                }
            }, 1000, true); // delay to let user see the result of move
        };
        GameController.prototype.setVarinatsOrder = function () {
            if (!this.$scope.currentWord) {
                return;
            }
            this.$scope.currentWord.translateVariants.forEach(function (value, index) { return value.order = index + 1; });
        };
        GameController.$inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$interval", '$timeout'];
        return GameController;
    }());
    controllers.GameController = GameController;
    angular.module(Common.GetConstants().appName).controller("controllers.GameController", GameController);
})(controllers || (controllers = {}));
/// <reference path="../common.ts" />
/// <reference path="../app.ts" />
;
// App.GetApp().animation('.words-left-item', function():angular.animate.IAnimateCallbackObject {
//     return {
//         leave: function(element: JQuery, done: Function) {
//             let $element = $(element);
//             var targetPos = getWordContainerPostion();
//             // $element.animate({
//             //     opasity: 0,
//             //     top: targetPos.y,
//             //     left: targetPos.x
//             // }, done);
//             done();
//             return function(isCancelled: boolean) {
//                 if (isCancelled) {
//                     $element.stop();
//                 }
//             }
//         }
//     };
// })
function getWordContainerPostion() {
    var $element = $('#word-element');
    return {
        x: $element.offset().left,
        y: $element.offset().top
    };
}
/// <reference path="../common.ts" />
$(function () {
    // http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
    $('#word, .word-left-item-caption').attr('unselectable', 'on')
        .css({ '-moz-user-select': '-moz-none',
        '-o-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none'
    }).bind('selectstart', function () { return false; });
});
/// <reference path="../common.ts" />
$(function () {
    $(document).keypress(function (e) {
        if (e.which === 13) {
            $(".btn-submit:visible").first().click();
        }
        else if (e.which >= 48 && e.which <= 57) {
            var numPressed_1 = e.which - 48;
            $('.translateVariant:visible').filter(function (index, elem) { return $(elem).data('order') === numPressed_1; })
                .first()
                .click();
        }
    });
});
/// <reference path="../common.ts" />
$(function () {
    $('#user2variants').bind('DOMNodeInserted', function () { return $('.translateVariant.nohover').tooltip(); });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy90c2NyaXB0cy9jb21tb24udHMiLCJzcmMvdHNjcmlwdHMvbWl4aW5zL25nU2NoZWR1bGVyLnRzIiwic3JjL3RzY3JpcHRzL2FwcC50cyIsInNyYy90c2NyaXB0cy9tb2RlbHMvVXNlci50cyIsInNyYy90c2NyaXB0cy9tb2RlbHMvZ3JvdXAudHMiLCJzcmMvdHNjcmlwdHMvbW9kZWxzL3Njb3JlLnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy90cmFuc2xhdGVWYXJpYW50LnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy93b3JkLnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy9nYW1lLnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy9nYW1lUmVzdWx0LnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy9tb3ZlUmVzdWx0LnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy9wYXNzZWRXb3JkSW5mby50cyIsInNyYy90c2NyaXB0cy9tb2RlbHMvbGV2ZWwudHMiLCJzcmMvdHNjcmlwdHMvbW9kZWxzL21vZGVscy50cyIsInNyYy90c2NyaXB0cy9pbnRlcmZhY2VzL2lDb25uZWN0VG9HYW1lLnRzIiwic3JjL3RzY3JpcHRzL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWVTY29wZS50cyIsInNyYy90c2NyaXB0cy9pbnRlcmZhY2VzL2lHYW1lRmluaXNoZWRNb2RhbFdpbmRvd1Njb3BlLnRzIiwic3JjL3RzY3JpcHRzL2ludGVyZmFjZXMvaUdhbWVTY29wZS50cyIsInNyYy90c2NyaXB0cy9pbnRlcmZhY2VzL2lIdWJDb25uZWN0aW9uLnRzIiwic3JjL3RzY3JpcHRzL2ludGVyZmFjZXMvaVJvb3RTY29wZS50cyIsInNyYy90c2NyaXB0cy9pbnRlcmZhY2VzLnRzIiwic3JjL3RzY3JpcHRzL3NlcnZpY2VzL2Nvbm5lY3RUb0dhbWVTZXJ2aWNlLnRzIiwic3JjL3RzY3JpcHRzL3NlcnZpY2VzL2h1YkNvbm5lY3Rpb25TZXJ2aWNlLnRzIiwic3JjL3RzY3JpcHRzL3NlcnZpY2VzL3N0YXRlSGFuZGxlclNlcnZpY2UudHMiLCJzcmMvdHNjcmlwdHMvY29udHJvbGxlcnMvY29ubmVjdGlvbkNvbnRyb2xsZXIudHMiLCJzcmMvdHNjcmlwdHMvY29udHJvbGxlcnMvZ2FtZUNvbnRyb2xsZXIudHMiLCJzcmMvdHNjcmlwdHMvYW5pbWF0aW9ucy93b3Jkc0xlZnRBbmltYXRpb24udHMiLCJzcmMvdHNjcmlwdHMvZG9tL2Rpc2FibGVTZWxlY3Rpb24udHMiLCJzcmMvdHNjcmlwdHMvZG9tL2tleWJvYXJkQmluZGluZ3MudHMiLCJzcmMvdHNjcmlwdHMvZG9tL3Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELDZEQUE2RDtBQUM3RCw4REFBOEQ7QUFDOUQsK0RBQStEO0FBQy9ELDJFQUEyRTtBQUMzRSx5REFBeUQ7QUFDekQsaUVBQWlFO0FBQ2pFLHNFQUFzRTtBQUN0RSxJQUFPLE1BQU0sQ0FnQ1o7QUFoQ0QsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNYO1FBYUk7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQTtZQUN4QixJQUFJLENBQUMsMkJBQTJCLEdBQUcsU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7WUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztZQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMvQixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQTFCQSxBQTBC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QUMsQ0FBQztBQUN6RCxDQUFDLENBQUMsQ0FBQTtBQ1hGLHFDQUFxQztBQUNyQyxDQUFDLENBQUM7SUFDRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQUEsQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxZQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLElBQUksSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssWUFBVSxFQUFwQyxDQUFvQyxDQUFDO2lCQUN2RixLQUFLLEVBQUU7aUJBQ1AsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUNaSCxxQ0FBcUM7QUFDckMsQ0FBQyxDQUFDO0lBQ0UsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGNBQU0sT0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO0FBQ3pHLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImN1c3RvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2dsb2JhbHMvYW5ndWxhci9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZ2xvYmFscy9qcXVlcnkvaW5kZXguZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2dsb2JhbHMvc2lnbmFsci9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZ2xvYmFscy9lczYtc2hpbS9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZ2xvYmFscy9hbmd1bGFyLXVpLWJvb3RzdHJhcC9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9yeC90cy9yeC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZ2xvYmFscy9yeC5hbmd1bGFyL2luZGV4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9nbG9iYWxzL2FuZ3VsYXItYW5pbWF0ZS9pbmRleC5kLnRzXCIgLz5cclxubW9kdWxlIENvbW1vbiB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgICAgICBwdWJsaWMgYXBwTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBodWJDb25uZWN0VG9Hcm91cE1ldGhvZE5hbWU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgY29ubmVjdGVkVG9Hcm91cDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBsZWZ0R3JvdXA6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZ3JvdXBGdWxsZWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgY29tcGV0aXRpb25IdWI6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZ2FtZVN0YXJ0ZWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZGlkTW92ZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBnYW1lRmluaXNoZWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZG9Nb3ZlOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIHBhc3NNb3ZlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcE5hbWUgPSBcImdhbWVBcHBcIlxyXG4gICAgICAgICAgICB0aGlzLmh1YkNvbm5lY3RUb0dyb3VwTWV0aG9kTmFtZSA9IFwiY29ubmVjdFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZFRvR3JvdXAgPSBcInVzZXJBZGRlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRHcm91cCA9IFwidXNlckxlZnRcIjtcclxuICAgICAgICAgICAgdGhpcy5ncm91cEZ1bGxlZCA9IFwiZ3JvdXBGdWxsZWRcIjtcclxuICAgICAgICAgICAgdGhpcy5jb21wZXRpdGlvbkh1YiA9IFwiY29tcGV0aXRpb25IdWJcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhcnRlZCA9IFwiZ2FtZVN0YXJ0ZWRcIjtcclxuICAgICAgICAgICAgdGhpcy5kaWRNb3ZlID0gXCJkaWRNb3ZlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUZpbmlzaGVkID0gXCJnYW1lRmluaXNoZWRcIjtcclxuICAgICAgICAgICAgdGhpcy5kb01vdmUgPSBcImRvTW92ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3NNb3ZlID0gXCJwYXNzTW92ZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uICBHZXRDb25zdGFudHMoKTogQ29uc3RhbnRzIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbnN0YW50cygpO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbm1vZHVsZSBNaXhpbnMge1xyXG4gICAgZnVuY3Rpb24gYWN0aW9uV3JhcHBlcjxUU3RhdGU+KCRzY29wZTogbmcuSVNjb3BlLCBhY3Rpb246IChzY2hlZHVsZXI6IFJ4LklTY2hlZHVsZXIsIHN0YXRlOiBUU3RhdGUpID0+IFJ4LklEaXNwb3NhYmxlKTogXHJcbiAgICAoc2NoZWR1bGVyOiBSeC5JU2NoZWR1bGVyLCBzdGF0ZTogVFN0YXRlKSA9PiBSeC5JRGlzcG9zYWJsZSAge1xyXG4gICAgICAgIHJldHVybiAoc2NoZWR1bGVyOiBSeC5JU2NoZWR1bGVyLCBzdGF0ZTogVFN0YXRlKTogUnguSURpc3Bvc2FibGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoISRzY29wZS4kJHBoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IFJ4LklEaXNwb3NhYmxlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBhY3Rpb24oc2NoZWR1bGVyLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKHNjaGVkdWxlciwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTmdTY2hlZHVsZXIgaW1wbGVtZW50cyBSeC5JU2NoZWR1bGVyIHtcclxuICAgICAgICBwcml2YXRlIGltbWVkaWF0ZVNjaGVkdWxlcjogUnguSVNjaGVkdWxlcjtcclxuICAgICAgICBwcml2YXRlICRzY29wZTogbmcuSVNjb3BlO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IG5nLklTY29wZSkge1xyXG4gICAgICAgICAgICB0aGlzLmltbWVkaWF0ZVNjaGVkdWxlciA9IFJ4LlNjaGVkdWxlci5pbW1lZGlhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm93KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVNjaGVkdWxlci5ub3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgKiBTY2hlZHVsZXMgYW4gYWN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxyXG4gICAgICAgICAgKiBAcGFyYW0gc3RhdGUgU3RhdGUgcGFzc2VkIHRvIHRoZSBhY3Rpb24gdG8gYmUgZXhlY3V0ZWQuXHJcbiAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gYmUgZXhlY3V0ZWQuXHJcbiAgICAgICAgICAqIEByZXR1cm5zIHtEaXNwb3NhYmxlfSBUaGUgZGlzcG9zYWJsZSBvYmplY3QgdXNlZCB0byBjYW5jZWwgdGhlIHNjaGVkdWxlZCBhY3Rpb24gKGJlc3QgZWZmb3J0KS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgc2NoZWR1bGU8VFN0YXRlPihzdGF0ZTogVFN0YXRlLCBhY3Rpb246IChzY2hlZHVsZXI6IFJ4LklTY2hlZHVsZXIsIHN0YXRlOiBUU3RhdGUpID0+IFJ4LklEaXNwb3NhYmxlKTogUnguSURpc3Bvc2FibGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVTY2hlZHVsZXIuc2NoZWR1bGUoc3RhdGUsIGFjdGlvbldyYXBwZXIodGhpcy4kc2NvcGUsIGFjdGlvbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2NoZWR1bGVzIGFuIGFjdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciBkdWVUaW1lLlxyXG4gICAgICAgICAqIEBwYXJhbSBzdGF0ZSBTdGF0ZSBwYXNzZWQgdG8gdGhlIGFjdGlvbiB0byBiZSBleGVjdXRlZC5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24gQWN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdWVUaW1lIFJlbGF0aXZlIHRpbWUgYWZ0ZXIgd2hpY2ggdG8gZXhlY3V0ZSB0aGUgYWN0aW9uLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwb3NhYmxlfSBUaGUgZGlzcG9zYWJsZSBvYmplY3QgdXNlZCB0byBjYW5jZWwgdGhlIHNjaGVkdWxlZCBhY3Rpb24gKGJlc3QgZWZmb3J0KS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBzY2hlZHVsZUZ1dHVyZTxUU3RhdGU+KHN0YXRlOiBUU3RhdGUsIGR1ZVRpbWU6IG51bWJlciB8IERhdGUsIGFjdGlvbjogKHNjaGVkdWxlcjogUnguSVNjaGVkdWxlciwgc3RhdGU6IFRTdGF0ZSkgPT4gUnguSURpc3Bvc2FibGUpOiBSeC5JRGlzcG9zYWJsZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY2hlZHVsZXMgYW4gYWN0aW9uIHRvIGJlIGV4ZWN1dGVkIHJlY3Vyc2l2ZWx5LlxyXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IHN0YXRlIFN0YXRlIHBhc3NlZCB0byB0aGUgYWN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gZXhlY3V0ZSByZWN1cnNpdmVseS4gVGhlIGxhc3QgcGFyYW1ldGVyIHBhc3NlZCB0byB0aGUgYWN0aW9uIGlzIHVzZWQgdG8gdHJpZ2dlciByZWN1cnNpdmUgc2NoZWR1bGluZyBvZiB0aGUgYWN0aW9uLCBwYXNzaW5nIGluIHJlY3Vyc2l2ZSBpbnZvY2F0aW9uIHN0YXRlLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwb3NhYmxlfSBUaGUgZGlzcG9zYWJsZSBvYmplY3QgdXNlZCB0byBjYW5jZWwgdGhlIHNjaGVkdWxlZCBhY3Rpb24gKGJlc3QgZWZmb3J0KS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBzY2hlZHVsZVJlY3Vyc2l2ZTxUU3RhdGU+KHN0YXRlOiBUU3RhdGUsIGFjdGlvbjogKHN0YXRlOiBUU3RhdGUsIGFjdGlvbjogKHN0YXRlOiBUU3RhdGUpID0+IHZvaWQpID0+IHZvaWQpOiBSeC5JRGlzcG9zYWJsZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY2hlZHVsZXMgYW4gYWN0aW9uIHRvIGJlIGV4ZWN1dGVkIHJlY3Vyc2l2ZWx5IGFmdGVyIGEgc3BlY2lmaWVkIHJlbGF0aXZlIGR1ZSB0aW1lLlxyXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IHN0YXRlIFN0YXRlIHBhc3NlZCB0byB0aGUgYWN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gZXhlY3V0ZSByZWN1cnNpdmVseS4gVGhlIGxhc3QgcGFyYW1ldGVyIHBhc3NlZCB0byB0aGUgYWN0aW9uIGlzIHVzZWQgdG8gdHJpZ2dlciByZWN1cnNpdmUgc2NoZWR1bGluZyBvZiB0aGUgYWN0aW9uLCBwYXNzaW5nIGluIHRoZSByZWN1cnNpdmUgZHVlIHRpbWUgYW5kIGludm9jYXRpb24gc3RhdGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ZHVlVGltZSBSZWxhdGl2ZSB0aW1lIGFmdGVyIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGFjdGlvbiBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcbiAgICAgICAgICogQHJldHVybnMge0Rpc3Bvc2FibGV9IFRoZSBkaXNwb3NhYmxlIG9iamVjdCB1c2VkIHRvIGNhbmNlbCB0aGUgc2NoZWR1bGVkIGFjdGlvbiAoYmVzdCBlZmZvcnQpLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNjaGVkdWxlUmVjdXJzaXZlRnV0dXJlPFRTdGF0ZSwgVFRpbWUgZXh0ZW5kcyBudW1iZXIgfCBEYXRlPihzdGF0ZTogVFN0YXRlLCBkdWVUaW1lOiBUVGltZSwgYWN0aW9uOiAoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiAoc3RhdGU6IFRTdGF0ZSwgZHVlVGltZTogVFRpbWUpID0+IHZvaWQpID0+IHZvaWQpOiBSeC5JRGlzcG9zYWJsZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY2hlZHVsZXMgYSBwZXJpb2RpYyBwaWVjZSBvZiB3b3JrIGJ5IGR5bmFtaWNhbGx5IGRpc2NvdmVyaW5nIHRoZSBzY2hlZHVsZXIncyBjYXBhYmlsaXRpZXMuIFRoZSBwZXJpb2RpYyB0YXNrIHdpbGwgYmUgc2NoZWR1bGVkIHVzaW5nIHdpbmRvdy5zZXRJbnRlcnZhbCBmb3IgdGhlIGJhc2UgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtNaXhlZH0gc3RhdGUgSW5pdGlhbCBzdGF0ZSBwYXNzZWQgdG8gdGhlIGFjdGlvbiB1cG9uIHRoZSBmaXJzdCBpdGVyYXRpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHBlcmlvZCBQZXJpb2QgZm9yIHJ1bm5pbmcgdGhlIHdvcmsgcGVyaW9kaWNhbGx5LlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gYmUgZXhlY3V0ZWQsIHBvdGVudGlhbGx5IHVwZGF0aW5nIHRoZSBzdGF0ZS5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcG9zYWJsZX0gVGhlIGRpc3Bvc2FibGUgb2JqZWN0IHVzZWQgdG8gY2FuY2VsIHRoZSBzY2hlZHVsZWQgcmVjdXJyaW5nIGFjdGlvbiAoYmVzdCBlZmZvcnQpLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNjaGVkdWxlUGVyaW9kaWM8VFN0YXRlPihzdGF0ZTogVFN0YXRlLCBwZXJpb2Q6IG51bWJlciwgYWN0aW9uOiAoc3RhdGU6IFRTdGF0ZSkgPT4gVFN0YXRlKTogUnguSURpc3Bvc2FibGUge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VwcG9ydGVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2F0Y2goaGFuZGxlcjogRnVuY3Rpb24pOiBSeC5JU2NoZWR1bGVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlU2NoZWR1bGVyLmNhdGNoKGhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb21tb24udHNcIiAvPlxyXG5tb2R1bGUgQXBwIHtcclxuICAgIHZhciBjb25zdGFudHMgPSBDb21tb24uR2V0Q29uc3RhbnRzKCk7XHJcbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoY29uc3RhbnRzLmFwcE5hbWUsIFsndWkuYm9vdHN0cmFwLm1vZGFsJywnY2dCdXN5JywgJ25nQW5pbWF0ZSddKTtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0QXBwKCk6IG5nLklNb2R1bGUge1xyXG4gICAgICAgIHJldHVybiBhcHA7XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBVc2VyIHtcclxuICAgICAgICBwdWJsaWMgdXNlcklkOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmc7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Vc2VyLnRzXCIgLz5cclxubW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgR3JvdXAge1xyXG4gICAgICAgIHB1YmxpYyBncm91cElkOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyB1c2Vyc0xpc3Q6IEFycmF5PE1vZGVscy5Vc2VyPlxyXG4gICAgfVxyXG59IiwibW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgU2NvcmUge1xyXG4gICAgICAgIHB1YmxpYyBzdWNjZXNzZnVsTW92ZXM6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHVibGljIHdyb25nTW92ZXM6IG51bWJlcjtcclxuICAgIH1cclxufSIsIm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVZhcmlhbnQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhcmlhbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzVHJ1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2YXJpYW50OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc1RydWU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc1NlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgb3JkZXI6IG51bWJlcjtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3RyYW5zbGF0ZVZhcmlhbnQudHNcIiAvPlxyXG5tb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBXb3JkIHtcclxuICAgICAgICBwdWJsaWMgd29yZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgdHJhbnNsYXRlVmFyaWFudHM6IEFycmF5PFRyYW5zbGF0ZVZhcmlhbnQ+XHJcblxyXG4gICAgICAgIHB1YmxpYyBleHBsYW5hdGlvblF1b3RlczogQXJyYXk8c3RyaW5nPlxyXG5cclxuICAgICAgICBwdWJsaWMgZGVmaW5pdGlvbjogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2hvcnRXb3JkUmVwcmVzZW50YXRpb246IHN0cmluZztcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3Njb3JlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vd29yZC50c1wiIC8+XHJcbm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgICAgIHB1YmxpYyB1c2VyMTogVXNlcjtcclxuXHJcbiAgICAgICAgcHVibGljIHVzZXIyOiBVc2VyO1xyXG5cclxuICAgICAgICBwdWJsaWMgY3VycmVudE1vdmU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHVibGljIHdvcmRzOiBBcnJheTxXb3JkPlxyXG5cclxuICAgICAgICBwdWJsaWMgdXNlcjFTY29yZTogU2NvcmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyB1c2VyMlNjb3JlOiBTY29yZTtcclxuICAgIH1cclxufSIsIm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVSZXN1bHQge1xyXG4gICAgICAgIHB1YmxpYyB3aW5uZXI6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGlzRHJhdzogYm9vbGVhbjtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2dhbWVSZXN1bHQudHNcIiAvPlxyXG5tb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNb3ZlUmVzdWx0IHtcclxuICAgICAgICBwdWJsaWMgaXNTdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgaXNDb3JyZWN0OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0xhc3RNb3ZlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2FtZVJlc3VsdDogTW9kZWxzLkdhbWVSZXN1bHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZWxlY3RlZFZhcmlhbnRJbmRleDogbnVtYmVyO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgUGFzc2VkV29yZEluZm8ge1xyXG4gICAgICAgIHB1YmxpYyB3b3JkOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGFuc3dlcjogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgd2FzUGFzc2VkOiBib29sZWFuO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgZW51bSBMZXZlbCB7XHJcbiAgICAgICAgQmVnaW5lciA9IDEsXHJcblxyXG4gICAgICAgIEludGVybWVkaWF0ZSA9IDIsXHJcblxyXG4gICAgICAgIEFkdmFuY2VkID0gM1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUxldmVsTmFtZVBhaXIge1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBsZXZlbDogTW9kZWxzLkxldmVsO1xyXG4gICAgfVxyXG59IiwiLy8gVXNlZCB0byByZWZlcmVuY2UgbW9kZWwgZmlsZXNcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vVXNlci50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0dyb3VwLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZ2FtZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL21vdmVSZXN1bHQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9nYW1lUmVzdWx0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vcGFzc2VkV29yZEluZm8udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9sZXZlbC50c1wiIC8+IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbHMvbW9kZWxzLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29ubmVjdFRvR2FtZSB7XHJcbiAgICAgICAgY29ubmVjdFRvSHViOiAoKSA9PiBKUXVlcnlQcm9taXNlPGFueT47XHJcblxyXG4gICAgICAgIGNvbm5lY3RUb05ld0dyb3VwOiAoZGlzcGxheU5hbWU6IHN0cmluZywgbGV2ZWw6IE1vZGVscy5MZXZlbCkgPT4gSlF1ZXJ5UHJvbWlzZTxhbnk+XHJcblxyXG4gICAgICAgIGRvTW92ZTogKG1vdmVPcmRlcjogbnVtYmVyLCB3b3JkOiBzdHJpbmcsIHZhcmlhbnQ6c3RyaW5nKSA9PiBKUXVlcnlQcm9taXNlPE1vZGVscy5Nb3ZlUmVzdWx0PlxyXG5cclxuICAgICAgICBwYXNzTW92ZTogKG1vdmVPcmRlcjogbnVtYmVyKSA9PiBKUXVlcnlQcm9taXNlPE1vZGVscy5Nb3ZlUmVzdWx0PlxyXG5cclxuICAgICAgICBvbkNvbm5lY3RlZFRvR3JvdXA6IChjYWxsQmFjazoodXNlcklkOiBzdHJpbmcpID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIG9uR3JvdXBGdWxsZWQ6IChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgb25Vc2VyTGVmdDogKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdyb3VwKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBnYW1lU3RhcnRlZDogKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdhbWUpID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIGRpZE1vdmU6IChjYWxsQmFjazoobW92ZVJlczogTW9kZWxzLk1vdmVSZXN1bHQpID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIGdhbWVGaW5pc2hlZDogKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdhbWUpID0+IHZvaWQpID0+IHZvaWQ7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29ubmVjdFRvR2FtZVNjb3BlIGV4dGVuZHMgbmcuSVNjb3BlIHtcclxuICAgICAgICBjb25uZWN0VG9Hcm91cDogKCkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgY29ubmVjdFRvR3JvdXBQcm9taXNlOiBKUXVlcnlQcm9taXNlPGFueT47XHJcblxyXG4gICAgICAgIGxldmVsczogQXJyYXk8TW9kZWxzLklMZXZlbE5hbWVQYWlyPjtcclxuICAgICAgICBjaGFuZ2VMZXZlbDogKGxldmVsOiBNb2RlbHMuSUxldmVsTmFtZVBhaXIpID0+IHZvaWQ7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR2FtZUZpbmlzaGVkTW9kYWxXaW5kb3dTY29wZSBleHRlbmRzIG5nLklTY29wZSB7XHJcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxyXG5cclxuICAgICAgICBwbGF5QWdhaW46ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgY2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21vZGVscy9tb2RlbHMudHNcIiAvPlxyXG5tb2R1bGUgSW50ZXJmYWNlcyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHYW1lU2NvcGUgZXh0ZW5kcyBuZy5JU2NvcGUge1xyXG4gICAgICAgIGN1cnJlbnRVc2VyU2NvcmU6IE1vZGVscy5TY29yZTtcclxuXHJcbiAgICAgICAgdXNlcjJTY29yZTogTW9kZWxzLlNjb3JlO1xyXG5cclxuICAgICAgICB1c2VyMkRpc3BsYXlOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGN1cnJlbnRXb3JkOiBNb2RlbHMuV29yZDtcclxuXHJcbiAgICAgICAgY3VycmVudFdvcmRJbmRleDogbnVtYmVyO1xyXG5cclxuICAgICAgICBkb01vdmU6ICh2YXJpYW50OiBzdHJpbmcpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIGlzQ3VycmVudFVzZXJNb3ZlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwYXNzZWRXb3JkczogQXJyYXk8TW9kZWxzLlBhc3NlZFdvcmRJbmZvPjtcclxuICAgICAgICBsZWZ0V29yZHM6IEFycmF5PE1vZGVscy5Xb3JkPjtcclxuXHJcbiAgICAgICAgc2Vjb25kc0Zvck1vdmVMZWZ0OiBudW1iZXI7XHJcbiAgICAgICAgcGVyY2VudGFnZXNMZWZ0OiBudW1iZXI7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJSHViQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgZ2V0Q29ubmVjdGlvbjogKCkgPT4gU2lnbmFsUi5IdWIuQ29ubmVjdGlvblxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbHMvbW9kZWxzLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUm9vdFNjb3BlIGV4dGVuZHMgbmcuSVNjb3BlIHtcclxuICAgICAgICBjb25uZWN0VG9IdWJQcm9taXNlOiBKUXVlcnlQcm9taXNlPGFueT47XHJcbiAgICAgICAgbG9hZGluZ0dhbWVQcm9taXNlOiBQcm9taXNlIDxhbnk+O1xyXG4gICAgICAgIGFkZGVkVG9Hcm91cFByb21pc2U6IFByb21pc2UgPGFueT47XHJcbiAgICAgICAgdXNlcjJDb25uZWN0ZWRQcm9taXNlOiBQcm9taXNlIDxhbnk+O1xyXG5cclxuICAgICAgICBpc1N0YXJ0R2FtZVBhZ2U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHVzZXJJZDogc3RyaW5nO1xyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgbGV2ZWw6IE1vZGVscy5JTGV2ZWxOYW1lUGFpcjtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbnRlcmZhY2VzL2lDb25uZWN0VG9HYW1lU2NvcGUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbnRlcmZhY2VzL2lIdWJDb25uZWN0aW9uLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pUm9vdFNjb3BlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pR2FtZVNjb3BlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pU3RhdGVIYW5kbGVyLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pR2FtZUZpbmlzaGVkTW9kYWxXaW5kb3dTY29wZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL21vZGVscy9tb2RlbHMudHNcIiAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxubW9kdWxlIFNlcnZpY2VzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBDb25uZWN0VG9HYW1lU2VydmljZSBpbXBsZW1lbnRzIEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWUge1xyXG4gICAgICAgIHByaXZhdGUgaHViOiBTaWduYWxSLkh1Yi5Qcm94eTtcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3Rpb246IFNpZ25hbFIuSHViLkNvbm5lY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdGFudHM6IENvbW1vbi5Db25zdGFudHM7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiU2VydmljZXMuSHViQ29ubmVjdGlvblNlcnZpY2VcIl07XHJcbiAgICAgICAgY29uc3RydWN0b3IoaHViQ29ubmVjdGlvblNlcnZpY2U6IEludGVyZmFjZXMuSUh1YkNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zdGFudHMgPSBDb21tb24uR2V0Q29uc3RhbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGh1YkNvbm5lY3Rpb25TZXJ2aWNlLmdldENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5odWIgPSB0aGlzLmNvbm5lY3Rpb24uY3JlYXRlSHViUHJveHkodGhpcy5jb25zdGFudHMuY29tcGV0aXRpb25IdWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbm5lY3RUb0h1YigpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odWIuY29ubmVjdGlvbi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvTW92ZShtb3ZlT3JkZXI6IG51bWJlciwgd29yZDogc3RyaW5nLCB2YXJpYW50OnN0cmluZyk6IEpRdWVyeVByb21pc2U8TW9kZWxzLk1vdmVSZXN1bHQ+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHViLmludm9rZSh0aGlzLmNvbnN0YW50cy5kb01vdmUsIG1vdmVPcmRlciwgd29yZCwgdmFyaWFudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcGFzc01vdmUobW92ZU9yZGVyOiBudW1iZXIpOiBKUXVlcnlQcm9taXNlPE1vZGVscy5Nb3ZlUmVzdWx0PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh1Yi5pbnZva2UodGhpcy5jb25zdGFudHMucGFzc01vdmUsIG1vdmVPcmRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29ubmVjdFRvTmV3R3JvdXAoZGlzcGxheU5hbWU6IHN0cmluZywgbGV2ZWw6IE1vZGVscy5MZXZlbCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh1Yi5pbnZva2UodGhpcy5jb25zdGFudHMuaHViQ29ubmVjdFRvR3JvdXBNZXRob2ROYW1lLCBkaXNwbGF5TmFtZSwgbGV2ZWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29ubmVjdGVkVG9Hcm91cChjYWxsQmFjazoodXNlcklkOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5odWIub24odGhpcy5jb25zdGFudHMuY29ubmVjdGVkVG9Hcm91cCwgKG1zZykgPT4gY2FsbEJhY2sobXNnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25Hcm91cEZ1bGxlZChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5ncm91cEZ1bGxlZCwgKG1zZykgPT4gY2FsbEJhY2sobXNnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25Vc2VyTGVmdChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5sZWZ0R3JvdXAsIChtc2cpID0+IGNhbGxCYWNrKG1zZ1swXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdhbWVTdGFydGVkKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdhbWUpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5odWIub24odGhpcy5jb25zdGFudHMuZ2FtZVN0YXJ0ZWQsIChtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKG1zZyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRpZE1vdmUoY2FsbEJhY2s6KG1vdmVSZXM6IE1vZGVscy5Nb3ZlUmVzdWx0KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaHViLm9uKHRoaXMuY29uc3RhbnRzLmRpZE1vdmUsIChtc2cpID0+IGNhbGxCYWNrKG1zZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdhbWVGaW5pc2hlZChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5HYW1lKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaHViLm9uKHRoaXMuY29uc3RhbnRzLmdhbWVGaW5pc2hlZCwgKG1zZykgPT4gY2FsbEJhY2sobXNnWzBdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKENvbW1vbi5HZXRDb25zdGFudHMoKS5hcHBOYW1lKS5zZXJ2aWNlKFwiU2VydmljZXMuQ29ubmVjdFRvR2FtZVNlcnZpY2VcIiwgQ29ubmVjdFRvR2FtZVNlcnZpY2UpO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2ludGVyZmFjZXMudHNcIiAvPlxyXG5tb2R1bGUgU2VydmljZXMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEh1YkNvbm5lY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgSW50ZXJmYWNlcy5JSHViQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY29ubmVjdGlvbjogU2lnbmFsUi5IdWIuQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldENvbm5lY3Rpb24oKTogU2lnbmFsUi5IdWIuQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgICAgIGlmICghSHViQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgSHViQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGlvbiA9ICQuaHViQ29ubmVjdGlvbihcIi9zaWduYWxyXCIsIHsgdXNlRGVmYXVsdFBhdGg6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgSHViQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGlvbi5sb2dnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSHViQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbmd1bGFyLm1vZHVsZShDb21tb24uR2V0Q29uc3RhbnRzKCkuYXBwTmFtZSkuc2VydmljZShcIlNlcnZpY2VzLkh1YkNvbm5lY3Rpb25TZXJ2aWNlXCIsIEh1YkNvbm5lY3Rpb25TZXJ2aWNlKTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21peGlucy9uZ1NjaGVkdWxlci50c1wiIC8+XHJcbm1vZHVsZSBTZXJ2aWNlcyB7XHJcbiAgICBmdW5jdGlvbiB0b1Byb21pc2VDdXN0b208VD4ob2JzZXJ2YWJsZTogUnguSU9ic2VydmFibGU8VD4pOiBQcm9taXNlIDxhbnk+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4ocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoe30pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJmYWNlIElNb2RhbFNldHRpbmdzIGV4dGVuZHMgbmcudWkuYm9vdHN0cmFwLklNb2RhbFNldHRpbmdzIHtcclxuXHJcbiAgICAgICAgLyoqIFNldHMgdGhlIGFyaWEtZGVzY3JpYmVkYnkgcHJvcGVydHkgb24gdGhlIG1vZGFsLiBcclxuICAgICAgICAgKiBUaGUgdmFsdWUgc2hvdWxkIGJlIGFuIGlkICh3aXRob3V0IHRoZSBsZWFkaW5nICMpIHBvaW50aW5nIHRvIHRoZSBlbGVtZW50IHRoYXQgZGVzY3JpYmVzIHlvdXIgbW9kYWwuIFxyXG4gICAgICAgICAqIFR5cGljYWxseSwgdGhpcyB3aWxsIGJlIHRoZSB0ZXh0IG9uIHlvdXIgbW9kYWwsXHJcbiAgICAgICAgICogIGJ1dCBkb2VzIG5vdCBpbmNsdWRlIHNvbWV0aGluZyB0aGUgdXNlciB3b3VsZCBpbnRlcmFjdCB3aXRoLCBcclxuICAgICAgICAgKiBsaWtlIGJ1dHRvbnMgb3IgYSBmb3JtLiBcclxuICAgICAgICAgKiBPbWl0dGluZyB0aGlzIG9wdGlvbiB3aWxsIG5vdCBpbXBhY3Qgc2lnaHRlZCB1c2VycyBidXQgd2lsbCB3ZWFrZW4geW91ciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuICovXHJcbiAgICAgICAgYXJpYURlc2NyaWJlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBTZXRzIHRoZSBhcmlhLWxhYmVsbGVkYnkgcHJvcGVydHkgb24gdGhlIG1vZGFsLiBcclxuICAgICAgICAgKiBUaGUgdmFsdWUgc2hvdWxkIGJlIGFuIGlkICh3aXRob3V0IHRoZSBsZWFkaW5nICMpIHBvaW50aW5nIHRvIHRoZSBlbGVtZW50IHRoYXQgbGFiZWxzIHlvdXIgbW9kYWwuIFxyXG4gICAgICAgICAqIFR5cGljYWxseSwgdGhpcyB3aWxsIGJlIGEgaGVhZGVyIGVsZW1lbnQuIFxyXG4gICAgICAgICAqIE9taXR0aW5nIHRoaXMgb3B0aW9uIHdpbGwgbm90IGltcGFjdCBzaWdodGVkIHVzZXJzIGJ1dCB3aWxsIHdlYWtlbiB5b3VyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC4gKi9cclxuICAgICAgICBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZUhhbmRsZXJTZXJ2aWNlIGltcGxlbWVudHMgSW50ZXJmYWNlcy5JU3RhdGVIYW5kbGVyIHtcclxuICAgICAgICBwcml2YXRlIGNvbnN0YW50czogQ29tbW9uLkNvbnN0YW50cztcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IEludGVyZmFjZXMuSVJvb3RTY29wZTtcclxuICAgICAgICBwcml2YXRlICRtb2RhbDogYW5ndWxhci51aS5ib290c3RyYXAuSU1vZGFsU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RUb0dhbWVTY29wZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZVNjb3BlO1xyXG4gICAgICAgIHByaXZhdGUgZ3JvdXBGdWxsZWRPYnNlcnZhYmxlOiBSeC5TdWJqZWN0PGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSBhZGRlZFRvR3JvdXBPYnNlcnZhYmxlOiBSeC5TdWJqZWN0PGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyTGVmdEdyb3VwT2JzZXJ2YWJsZTogUnguU3ViamVjdDxhbnk+O1xyXG4gICAgICAgIHByaXZhdGUgZ2FtZVN0YXJ0ZWRPYnNlcnZhYmxlOiBSeC5TdWJqZWN0PGFueT47XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhcnRHYW1lTW9kYWxJbnN0YW5jZTogYW5ndWxhci51aS5ib290c3RyYXAuSU1vZGFsU2VydmljZUluc3RhbmNlO1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRyb290U2NvcGVcIiwgXCIkdWliTW9kYWxcIl07XHJcbiAgICAgICAgY29uc3RydWN0b3IoJHJvb3RTY29wZTogSW50ZXJmYWNlcy5JUm9vdFNjb3BlLCAkbW9kYWw6IGFuZ3VsYXIudWkuYm9vdHN0cmFwLklNb2RhbFNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zdGFudHMgPSBDb21tb24uR2V0Q29uc3RhbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJG1vZGFsID0gJG1vZGFsO1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuaXNTdGFydEdhbWVQYWdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS51c2VySWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwRnVsbGVkT2JzZXJ2YWJsZSA9IG5ldyBSeC5TdWJqZWN0PGFueT4oKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRlZFRvR3JvdXBPYnNlcnZhYmxlID0gbmV3IFJ4LlN1YmplY3Q8YW55PigpO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJMZWZ0R3JvdXBPYnNlcnZhYmxlID0gbmV3IFJ4LlN1YmplY3Q8YW55PigpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGFydGVkT2JzZXJ2YWJsZSA9IG5ldyBSeC5TdWJqZWN0PGFueT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FsbEluRGlnZXN0TG9vcChhY3Rpb246KCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kcm9vdFNjb3BlLiQkcGhhc2UpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dTdGFydEdhbWVNb2RhbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IG9wdCA9IHt9IGFzIG5nLnVpLmJvb3RzdHJhcC5JTW9kYWxTZXR0aW5ncztcclxuICAgICAgICAgICAgICAgIG9wdC5zY29wZSA9IHRoaXMuY29ubmVjdFRvR2FtZVNjb3BlO1xyXG4gICAgICAgICAgICAgICAgb3B0LnRlbXBsYXRlVXJsID0gXCJjb25uZWN0VG9Hcm91cC5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICBvcHQud2luZG93VGVtcGxhdGVVcmwgPSBcIndpbmRvd1RlbXBsYXRlLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIG9wdC5iYWNrZHJvcCA9IFwic3RhdGljXCI7XHJcbiAgICAgICAgICAgICAgICBvcHQua2V5Ym9hcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG9wdC5hbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb3B0LnNpemUgPSBcImxnXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UgPSB0aGlzLiRtb2RhbC5vcGVuKG9wdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dHYW1lRmluaXNoZWRNb2RhbFdpbmRvdyhpc1dpbj86IGJvb2xlYW4sIGlzRHJhdz86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKGlzV2luID09PSB1bmRlZmluZWQgJiYgaXNEcmF3ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwiT25lIG9mIGJvb2xlYW4gZmxhZ3Mgc2hvdWxkIGJlIHNwZWNpZmllZFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY29ubmVjdFRvR2FtZVNjb3BlID0gdGhpcy5jb25uZWN0VG9HYW1lU2NvcGU7XHJcbiAgICAgICAgICAgIGxldCBvcHQgPSB7fSBhcyBuZy51aS5ib290c3RyYXAuSU1vZGFsU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICBvcHQuY29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZTogSW50ZXJmYWNlcy5JR2FtZUZpbmlzaGVkTW9kYWxXaW5kb3dTY29wZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wbGF5QWdhaW4gPSBjb25uZWN0VG9HYW1lU2NvcGUuY29ubmVjdFRvR3JvdXA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RyYXcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcItCd0LjRh9GM0Y8uINCe0YLQu9C40YfQvdCw0Y8g0LjQs9GA0LAgOkQhXFxu0KXQvtGC0LjRgtC1INGB0YvQs9GA0LDRgtGMINC10YnRkSDRgNCw0Lc/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1dpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwi0J/QvtC30LTRgNCw0LLQu9C10L3QuNGPISDQktGLINCy0YvQuNCz0YDQsNC70LghXFxu0KXQvtGC0LjRgtC1INGB0YvQs9GA0LDRgtGMINC10YnRkSDRgNCw0Lc/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcItCU0LDQttC1INC10YHQu9C4INC/0YDQvtC40LPRgNCw0LssINC/0YDQtdC+0LHRgNC10YLQtdC90L3Ri9C5INC+0L/Ri9GCINC+0YHRgtCw0L3QtdGC0YHRjyDQvdCw0LLRgdC10LPQtNCwINGBINGC0L7QsdC+0Lkg0Lgg0YHRgtCw0L3QtdGCINGC0LLQvtC10Lkg0L3QsNCz0YDQsNC00L7QuSA6KVxcbtCl0L7RgtC40YLQtSDRgdGL0LPRgNCw0YLRjCDQtdGJ0ZEg0YDQsNC3P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdC50ZW1wbGF0ZVVybCA9IFwiZ2FtZUZpbmlzaGVkLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIG9wdC53aW5kb3dUZW1wbGF0ZVVybCA9IFwid2luZG93VGVtcGxhdGUuaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgb3B0LmJhY2tkcm9wID0gXCJzdGF0aWNcIjtcclxuICAgICAgICAgICAgICAgIG9wdC5rZXlib2FyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgb3B0LmFuaW1hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvcHQuc2l6ZSA9IFwibGdcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZSA9IHRoaXMuJG1vZGFsLm9wZW4ob3B0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRDb25uZWN0VG9HYW1lU2NvcGUoY29ubmVjdFRvR2FtZVNjb3BlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lU2NvcGUpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9HYW1lU2NvcGUgPSBjb25uZWN0VG9HYW1lU2NvcGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlQ29ubmVjdGlvblRvR3JvdXAocHJvbWlzZTogSlF1ZXJ5UHJvbWlzZTxhbnk+KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHByb21pc2UuZmFpbCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic210aCBiYWQgaGFwcGVuZWQ6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRkZWRUb0dyb3VwID0gdGhpcy5hZGRlZFRvR3JvdXBPYnNlcnZhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRha2UoMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuYWRkZWRUb0dyb3VwUHJvbWlzZSA9IHRvUHJvbWlzZUN1c3RvbShhZGRlZFRvR3JvdXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWRUb0dyb3VwLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFydEdhbWVNb2RhbEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEdhbWVNb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEdhbWVNb2RhbEluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBGdWxsZWQgPSB0aGlzLmdyb3VwRnVsbGVkT2JzZXJ2YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRha2UoMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCVUc6IEZvciBzb21lIHJlYXNvbiBzb21ldGhpbWVzIGlzIG5vdCByZXNvbHZlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUudXNlcjJDb25uZWN0ZWRQcm9taXNlID0gdG9Qcm9taXNlQ3VzdG9tKGdyb3VwRnVsbGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwRnVsbGVkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmxvYWRpbmdHYW1lUHJvbWlzZSA9IHRvUHJvbWlzZUN1c3RvbShSeC5PYnNlcnZhYmxlLm1lcmdlKHRoaXMudXNlckxlZnRHcm91cE9ic2VydmFibGUudGFrZSgxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhcnRlZE9ic2VydmFibGUudGFrZSgxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50YWtlKDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmlzU3RhcnRHYW1lUGFnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvR2FtZVNjb3BlLmNvbm5lY3RUb0dyb3VwUHJvbWlzZSA9IHByb21pc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZVVzZXJBZGRlZFRvR3JvdXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkZWRUb0dyb3VwT2JzZXJ2YWJsZS5vbk5leHQoe30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUNvbm5lY3Rpb25Ub0h1Yihwcm9taXNlOiBKUXVlcnlQcm9taXNlPGFueT4pOiB2b2lkIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic210aCBiYWQgaGFwcGVuZWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTdGFydEdhbWVNb2RhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuY29ubmVjdFRvSHViUHJvbWlzZSA9IHByb21pc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUdhbWVGaW5pc2hlZChpc1dpbj86IGJvb2xlYW4sIGlzRHJhdz86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5pc1N0YXJ0R2FtZVBhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dhbWVGaW5pc2hlZE1vZGFsV2luZG93KGlzV2luLCBpc0RyYXcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVHcm91cEZ1bGxlZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogQmV0dGVyIHRvIGltcGxlbWVudCBzY2hlZHVsZXIgdG8gc3Vic2NyaWJlIHdpdGhpbiBuZyBzY29wZVxyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cEZ1bGxlZE9ic2VydmFibGUub25OZXh0KHt9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVHYW1lU3RhcnRlZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5pc1N0YXJ0R2FtZVBhZ2UgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXJ0ZWRPYnNlcnZhYmxlLm9uTmV4dCh7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VXNlcklkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRyb290U2NvcGUudXNlcklkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldFVzZXJJZCh1c2VySWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUudXNlcklkID0gdXNlcklkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZVVzZXIyTGVmdEdyb3VwKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyTGVmdEdyb3VwT2JzZXJ2YWJsZS5vbk5leHQoe30pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmlzU3RhcnRHYW1lUGFnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U3RhcnRHYW1lTW9kYWwoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VXNlckRpc3BsYXlOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRyb290U2NvcGUuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKENvbW1vbi5HZXRDb25zdGFudHMoKS5hcHBOYW1lKS5zZXJ2aWNlKFwiU2VydmljZXMuU3RhdGVIYW5kbGVyU2VydmljZVwiLCBTdGF0ZUhhbmRsZXJTZXJ2aWNlKTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW50ZXJmYWNlcy50c1wiIC8+XHJcbm1vZHVsZSBjb250cm9sbGVycyB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ29ubmVjdFRvR2FtZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdGlvbkh1YlNlcnZpY2U6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWU7XHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWVTY29wZTtcclxuICAgICAgICBwcml2YXRlIGdyb3VwSW5mbzogTW9kZWxzLkdyb3VwO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGVIYW5kbGVyOiBJbnRlcmZhY2VzLklTdGF0ZUhhbmRsZXI7XHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBJbnRlcmZhY2VzLklSb290U2NvcGU7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiU2VydmljZXMuQ29ubmVjdFRvR2FtZVNlcnZpY2VcIiwgXCIkc2NvcGVcIiwgXCJTZXJ2aWNlcy5TdGF0ZUhhbmRsZXJTZXJ2aWNlXCIsIFwiJHJvb3RTY29wZVwiXTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uSHViU2VydmljZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZSwgJHNjb3BlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lU2NvcGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlSGFuZGxlcjogSW50ZXJmYWNlcy5JU3RhdGVIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGU6IEludGVyZmFjZXMuSVJvb3RTY29wZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlID0gY29ubmVjdGlvbkh1YlNlcnZpY2U7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlciA9IHN0YXRlSGFuZGxlcjtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVmlld01vZGVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemVWaWV3TW9kZWwoKTp2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuc2V0Q29ubmVjdFRvR2FtZVNjb3BlKHRoaXMuJHNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2Uub25Vc2VyTGVmdChkYXRhID0+IHRoaXMub25Vc2VyTGVmdC5jYWxsKHRoaXMsIGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5vbkdyb3VwRnVsbGVkKGRhdGEgPT4gdGhpcy5vbkdyb3VwRnVsbGVkLmNhbGwodGhpcywgZGF0YSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLm9uQ29ubmVjdGVkVG9Hcm91cChkYXRhID0+IHRoaXMub25Db25uZWN0ZWRUb0dyb3VwLmNhbGwodGhpcywgZGF0YSkpO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5jb25uZWN0VG9Hcm91cCA9ICgpID0+IHRoaXMuY29ubmVjdFRvR3JvdXAuYXBwbHkodGhpcyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2UuY29ubmVjdFRvSHViKCkuZG9uZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlci5zZXRVc2VySWQodmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuaGFuZGxlQ29ubmVjdGlvblRvSHViKHByb21pc2UpO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5sZXZlbHMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGV2ZWw6IE1vZGVscy5MZXZlbC5CZWdpbmVyLCBuYW1lOiBcItCd0L7QstCw0YfQvtC6XCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xldmVsOiBNb2RlbHMuTGV2ZWwuSW50ZXJtZWRpYXRlLCBuYW1lOiBcItCh0YDQtdC00L3QuNC5XCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xldmVsOiBNb2RlbHMuTGV2ZWwuQWR2YW5jZWQsIG5hbWU6IFwi0JLRi9GB0L7QutC40LlcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmxldmVsID0gdGhpcy4kc2NvcGUubGV2ZWxzWzFdO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5jaGFuZ2VMZXZlbCA9IChsZXZlbDogTW9kZWxzLklMZXZlbE5hbWVQYWlyKSA9PiB0aGlzLiRyb290U2NvcGUubGV2ZWwgPSBsZXZlbDtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmRpc3BsYXlOYW1lID0gXCLQodC70YPRh9Cw0LnQvdGL0Lkg0LjQs9GA0L7QulwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uR3JvdXBGdWxsZWQoZ3JvdXBJbmZvOiBNb2RlbHMuR3JvdXApOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cEluZm8gPSBncm91cEluZm87XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZUdyb3VwRnVsbGVkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uVXNlckxlZnQoZ3JvdXBJbmZvOiBNb2RlbHMuR3JvdXApOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cEluZm8gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlci5oYW5kbGVVc2VyMkxlZnRHcm91cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0VG9Hcm91cCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLmNvbm5lY3RUb05ld0dyb3VwKHRoaXMuc3RhdGVIYW5kbGVyLmdldFVzZXJEaXNwbGF5TmFtZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmxldmVsLmxldmVsKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuaGFuZGxlQ29ubmVjdGlvblRvR3JvdXAocHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQ29ubmVjdGVkVG9Hcm91cCh1c2VySWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlci5zZXRVc2VySWQodXNlcklkKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuaGFuZGxlVXNlckFkZGVkVG9Hcm91cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZShDb21tb24uR2V0Q29uc3RhbnRzKCkuYXBwTmFtZSkuY29udHJvbGxlcihcImNvbnRyb2xsZXJzLkNvbm5lY3RUb0dhbWVDb250cm9sbGVyXCIsIENvbm5lY3RUb0dhbWVDb250cm9sbGVyKTtcclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2ludGVyZmFjZXMudHNcIiAvPlxyXG5tb2R1bGUgY29udHJvbGxlcnMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVDb250cm9sbGVyIHtcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3Rpb25IdWJTZXJ2aWNlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lO1xyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBJbnRlcmZhY2VzLklHYW1lU2NvcGU7XHJcbiAgICAgICAgcHJpdmF0ZSBnYW1lSW5mbzogTW9kZWxzLkdhbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZUhhbmRsZXI6IEludGVyZmFjZXMuSVN0YXRlSGFuZGxlcjtcclxuICAgICAgICBwcml2YXRlIHdvcmRzOiBBcnJheTxNb2RlbHMuV29yZD5cclxuICAgICAgICBwcml2YXRlIHVzZXJOdW06IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlICRpbnRlcnZhbDogbmcuSUludGVydmFsU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIHNlY29uZHNGb3JNb3ZlOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSB0aW1lclByb21pc2U6IG5nLklQcm9taXNlPGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlO1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtcIlNlcnZpY2VzLkNvbm5lY3RUb0dhbWVTZXJ2aWNlXCIsIFwiJHNjb3BlXCIsIFwiU2VydmljZXMuU3RhdGVIYW5kbGVyU2VydmljZVwiLCBcIiRpbnRlcnZhbFwiLCAnJHRpbWVvdXQnXTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uSHViU2VydmljZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZSwgJHNjb3BlOiBJbnRlcmZhY2VzLklHYW1lU2NvcGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlSGFuZGxlcjogSW50ZXJmYWNlcy5JU3RhdGVIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICRpbnRlcnZhbDogbmcuSUludGVydmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2UgPSBjb25uZWN0aW9uSHViU2VydmljZTtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyID0gc3RhdGVIYW5kbGVyO1xyXG4gICAgICAgICAgICB0aGlzLiRpbnRlcnZhbCA9ICRpbnRlcnZhbDtcclxuICAgICAgICAgICAgdGhpcy5zZWNvbmRzRm9yTW92ZSA9IDEwO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXdNb2RlbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplVmlld01vZGVsKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2UuZ2FtZVN0YXJ0ZWQoZGF0YSA9PiB0aGlzLnN0YXJ0R2FtZS5jYWxsKHRoaXMsIGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5kaWRNb3ZlKGRhdGEgPT4gdGhpcy51c2VyMmRpZE1vdmUuY2FsbCh0aGlzLCBkYXRhKSk7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmRvTW92ZSA9ICh2YXJpYW50OiBzdHJpbmcpID0+IHRoaXMuZG9Nb3ZlLmNhbGwodGhpcywgdmFyaWFudCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2Uub25Vc2VyTGVmdCgoKSA9PiB0aGlzLm9uVXNlckxlZnQuY2FsbCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zZXRHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvblVzZXJMZWZ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2V0R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdW5zZXRHYW1lSW5mbygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSW5mbyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFdvcmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2Vjb25kc0Zvck1vdmVMZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnBlcmNlbnRhZ2VzTGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pc0N1cnJlbnRVc2VyTW92ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50VXNlclNjb3JlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnBhc3NlZFdvcmRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5sZWZ0V29yZHMgPSBbXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXJ0R2FtZShnYW1lOiBNb2RlbHMuR2FtZSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJbmZvID0gZ2FtZTtcclxuICAgICAgICAgICAgdGhpcy53b3JkcyA9IGdhbWUud29yZHM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpc1VzZXIxID0gZ2FtZS51c2VyMS51c2VySWQgPT09IHRoaXMuc3RhdGVIYW5kbGVyLmdldFVzZXJJZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJOdW0gPSBpc1VzZXIxID8gMSA6IDI7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50VXNlclNjb3JlID0gaXNVc2VyMSA/IGdhbWUudXNlcjFTY29yZSA6IGdhbWUudXNlcjJTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnVzZXIyU2NvcmUgPSAhaXNVc2VyMSA/IGdhbWUudXNlcjFTY29yZSA6IGdhbWUudXNlcjJTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnVzZXIyRGlzcGxheU5hbWUgPSAhaXNVc2VyMSA/IGdhbWUudXNlcjEuZGlzcGxheU5hbWUgOiBnYW1lLnVzZXIyLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFdvcmRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50V29yZCA9IHRoaXMud29yZHNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhcmluYXRzT3JkZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ3VycmVudFVzZXJNb3ZlID0gKGlzVXNlcjEgJiYgdGhpcy5nYW1lSW5mby5jdXJyZW50TW92ZSA9PT0gMSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICghaXNVc2VyMSAmJiB0aGlzLmdhbWVJbmZvLmN1cnJlbnRNb3ZlID09PSAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2h1ZmZsZShhcnI6IEFycmF5PE1vZGVscy5Xb3JkPik6IEFycmF5PE1vZGVscy5Xb3JkPiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBhcnIuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbSA9IGFycmF5Lmxlbmd0aCwgdCwgaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnTigKZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbS0tKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBhcnJheVttXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVttXSA9IGFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2ldID0gdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5sZWZ0V29yZHMgPSBzaHVmZmxlKHRoaXMud29yZHMuc2xpY2UoMSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZUdhbWVTdGFydGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYWxsSW5EaWdlc3RMb29wKGFjdGlvbjooKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZS4kJHBoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXJ0VGltZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJQcmV2aW91cyB0aW1lciBzaG91bGQgYmUgc3RvcHBlZFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2Vjb25kc0Zvck1vdmVMZWZ0ID0gdGhpcy5zZWNvbmRzRm9yTW92ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnBlcmNlbnRhZ2VzTGVmdCA9IDEwMDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVyUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlY29uZHNGb3JNb3ZlTGVmdC0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGVyY2VudGFnZXNMZWZ0ID0gdGhpcy4kc2NvcGUuc2Vjb25kc0Zvck1vdmVMZWZ0IC8gMTAgKiAxMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlLnNlY29uZHNGb3JNb3ZlTGVmdCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuJHNjb3BlLmlzQ3VycmVudFVzZXJNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzTW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDAwLCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0b3BUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVyUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwodGhpcy50aW1lclByb21pc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyUHJvbWlzZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVzZXIyZGlkTW92ZShtb3ZlUmVzOiBNb2RlbHMuTW92ZVJlc3VsdCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlKG1vdmVSZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHBhc3NNb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLnBhc3NNb3ZlKHRoaXMudXNlck51bSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChtb3ZlUmVzdWx0Ok1vZGVscy5Nb3ZlUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlKG1vdmVSZXN1bHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvTW92ZSh2YXJpYW50OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy8gYSB3YXkgdG8gaGFuZGxlIG11bHRpcGxlIGNsaWNrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZS5jdXJyZW50V29yZC50cmFuc2xhdGVWYXJpYW50cy5maWx0ZXIodiA9PiB2LmlzU2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZS5zZWNvbmRzRm9yTW92ZUxlZnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRpbWVyIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFZhciA9IHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkLnRyYW5zbGF0ZVZhcmlhbnRzLmZpbHRlcih2ID0+IHYudmFyaWFudCA9PT0gdmFyaWFudClbMF07XHJcbiAgICAgICAgICAgIGlmICghc2VsZWN0ZWRWYXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbmNvcnJlY3QgdmFyIHNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZhci5pc1NlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5kb01vdmUodGhpcy51c2VyTnVtLCB0aGlzLiRzY29wZS5jdXJyZW50V29yZC53b3JkLCB2YXJpYW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKG1vdmVSZXN1bHQ6TW9kZWxzLk1vdmVSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmUobW92ZVJlc3VsdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGFuZGxlTW92ZShtb3ZlUmVzOiBNb2RlbHMuTW92ZVJlc3VsdCwgaXNDdXJyZW50VXNlck1vdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VXNlclNjb3JlID0gdGhpcy51c2VyTnVtID09PSAxID8gdGhpcy5nYW1lSW5mby51c2VyMVNjb3JlIDogdGhpcy5nYW1lSW5mby51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICB2YXIgdXNlcjJTY29yZSA9IHRoaXMudXNlck51bSA9PT0gMSA/IHRoaXMuZ2FtZUluZm8udXNlcjJTY29yZSA6IHRoaXMuZ2FtZUluZm8udXNlcjFTY29yZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IGlzQ3VycmVudFVzZXJNb3ZlID8gY3VycmVudFVzZXJTY29yZSA6IHVzZXIyU2NvcmU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1vdmVSZXMuaXNDb3JyZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1vdmVSZXMuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlUmVzLmlzU3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmUuc3VjY2Vzc2Z1bE1vdmVzKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZS53cm9uZ01vdmVzKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtb3ZlUmVzLnNlbGVjdGVkVmFyaWFudEluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFdvcmQudHJhbnNsYXRlVmFyaWFudHNbbW92ZVJlcy5zZWxlY3RlZFZhcmlhbnRJbmRleF0uaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJOdW0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUgPSB0aGlzLmdhbWVJbmZvLnVzZXIxU2NvcmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS51c2VyMlNjb3JlID0gdGhpcy5nYW1lSW5mby51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFVzZXJTY29yZSA9IHRoaXMuZ2FtZUluZm8udXNlcjJTY29yZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnVzZXIyU2NvcmUgPSB0aGlzLmdhbWVJbmZvLnVzZXIxU2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDdXJyZW50VXNlck1vdmUgPSAhaXNDdXJyZW50VXNlck1vdmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50V29yZEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDdXJyZW50VXNlck1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFzc2VkV29yZCA9IG5ldyBNb2RlbHMuUGFzc2VkV29yZEluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXNzZWRXb3JkLndvcmQgPSB0aGlzLiRzY29wZS5jdXJyZW50V29yZC53b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhc3NlZFdvcmQuYW5zd2VyID0gdGhpcy4kc2NvcGUuY3VycmVudFdvcmQudHJhbnNsYXRlVmFyaWFudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihpID0+IGkuaXNUcnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2hpZnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFyaWFudDtcclxuICAgICAgICAgICAgICAgICAgICBwYXNzZWRXb3JkLndhc1Bhc3NlZCA9IG1vdmVSZXMuaXNTdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnBhc3NlZFdvcmRzLnB1c2gocGFzc2VkV29yZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUZyb21BcnJheUlmKGFycjogQXJyYXk8TW9kZWxzLldvcmQ+LCBjYWxsYmFjazogKGFyZzogTW9kZWxzLldvcmQsIGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJbaV0sIGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkID0gdGhpcy5nYW1lSW5mby53b3Jkc1t0aGlzLiRzY29wZS5jdXJyZW50V29yZEluZGV4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFyaW5hdHNPcmRlcigpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUFycmF5SWYodGhpcy4kc2NvcGUubGVmdFdvcmRzLCB3ID0+IHcud29yZCA9PT0gdGhpcy4kc2NvcGUuY3VycmVudFdvcmQud29yZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1vdmVSZXMuaXNMYXN0TW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZUdhbWVGaW5pc2hlZCh0aGlzLiRzY29wZS5jdXJyZW50VXNlclNjb3JlLnN1Y2Nlc3NmdWxNb3ZlcyA+IHRoaXMuJHNjb3BlLnVzZXIyU2NvcmUuc3VjY2Vzc2Z1bE1vdmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50VXNlclNjb3JlLnN1Y2Nlc3NmdWxNb3ZlcyA9PSB0aGlzLiRzY29wZS51c2VyMlNjb3JlLnN1Y2Nlc3NmdWxNb3Zlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNldEdhbWVJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDAwLCB0cnVlKTsgLy8gZGVsYXkgdG8gbGV0IHVzZXIgc2VlIHRoZSByZXN1bHQgb2YgbW92ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHNldFZhcmluYXRzT3JkZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kc2NvcGUuY3VycmVudFdvcmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFdvcmQudHJhbnNsYXRlVmFyaWFudHMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZS5vcmRlciA9IGluZGV4ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKENvbW1vbi5HZXRDb25zdGFudHMoKS5hcHBOYW1lKS5jb250cm9sbGVyKFwiY29udHJvbGxlcnMuR2FtZUNvbnRyb2xsZXJcIiwgR2FtZUNvbnRyb2xsZXIpO1xyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYXBwLnRzXCIgLz5cclxuaW50ZXJmYWNlIFBvaW50IHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxufTtcclxuXHJcbi8vIEFwcC5HZXRBcHAoKS5hbmltYXRpb24oJy53b3Jkcy1sZWZ0LWl0ZW0nLCBmdW5jdGlvbigpOmFuZ3VsYXIuYW5pbWF0ZS5JQW5pbWF0ZUNhbGxiYWNrT2JqZWN0IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgbGVhdmU6IGZ1bmN0aW9uKGVsZW1lbnQ6IEpRdWVyeSwgZG9uZTogRnVuY3Rpb24pIHtcclxuLy8gICAgICAgICAgICAgbGV0ICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuLy8gICAgICAgICAgICAgdmFyIHRhcmdldFBvcyA9IGdldFdvcmRDb250YWluZXJQb3N0aW9uKCk7XHJcbi8vICAgICAgICAgICAgIC8vICRlbGVtZW50LmFuaW1hdGUoe1xyXG4vLyAgICAgICAgICAgICAvLyAgICAgb3Bhc2l0eTogMCxcclxuLy8gICAgICAgICAgICAgLy8gICAgIHRvcDogdGFyZ2V0UG9zLnksXHJcbi8vICAgICAgICAgICAgIC8vICAgICBsZWZ0OiB0YXJnZXRQb3MueFxyXG4vLyAgICAgICAgICAgICAvLyB9LCBkb25lKTtcclxuLy8gICAgICAgICAgICAgZG9uZSgpO1xyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGlzQ2FuY2VsbGVkOiBib29sZWFuKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5zdG9wKCk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9O1xyXG4vLyB9KVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFdvcmRDb250YWluZXJQb3N0aW9uKCk6IFBvaW50IHtcclxuICAgIGxldCAkZWxlbWVudCA9ICQoJyN3b3JkLWVsZW1lbnQnKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6ICRlbGVtZW50Lm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgeTogJGVsZW1lbnQub2Zmc2V0KCkudG9wXHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxuJCgoKSA9PiB7XHJcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI3MDAwMDAvaG93LXRvLWRpc2FibGUtdGV4dC1zZWxlY3Rpb24tdXNpbmctanF1ZXJ5XHJcbiAgICAkKCcjd29yZCwgLndvcmQtbGVmdC1pdGVtLWNhcHRpb24nKS5hdHRyKCd1bnNlbGVjdGFibGUnLCdvbicpXHJcbiAgICAgLmNzcyh7Jy1tb3otdXNlci1zZWxlY3QnOictbW96LW5vbmUnLFxyXG4gICAgICAgICAgICctby11c2VyLXNlbGVjdCc6J25vbmUnLFxyXG4gICAgICAgICAgICcta2h0bWwtdXNlci1zZWxlY3QnOidub25lJywgLyogeW91IGNvdWxkIGFsc28gcHV0IHRoaXMgaW4gYSBjbGFzcyAqL1xyXG4gICAgICAgICAgICctd2Via2l0LXVzZXItc2VsZWN0Jzonbm9uZScsLyogYW5kIGFkZCB0aGUgQ1NTIGNsYXNzIGhlcmUgaW5zdGVhZCAqL1xyXG4gICAgICAgICAgICctbXMtdXNlci1zZWxlY3QnOidub25lJyxcclxuICAgICAgICAgICAndXNlci1zZWxlY3QnOidub25lJ1xyXG4gICAgIH0pLmJpbmQoJ3NlbGVjdHN0YXJ0JywgZnVuY3Rpb24oKXsgcmV0dXJuIGZhbHNlOyB9KTtcclxufSkiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxuJCgoKSA9PiB7XHJcbiAgICAkKGRvY3VtZW50KS5rZXlwcmVzcyhlID0+IHtcclxuICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcclxuICAgICAgICAgICAgJChcIi5idG4tc3VibWl0OnZpc2libGVcIikuZmlyc3QoKS5jbGljaygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS53aGljaCA+PSA0OCAmJiBlLndoaWNoIDw9IDU3KSB7XHJcbiAgICAgICAgICAgIGxldCBudW1QcmVzc2VkID0gZS53aGljaCAtIDQ4O1xyXG4gICAgICAgICAgICAkKCcudHJhbnNsYXRlVmFyaWFudDp2aXNpYmxlJykuZmlsdGVyKChpbmRleCwgZWxlbSkgPT4gJChlbGVtKS5kYXRhKCdvcmRlcicpID09PSBudW1QcmVzc2VkKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxuJCgoKSA9PiB7XHJcbiAgICAkKCcjdXNlcjJ2YXJpYW50cycpLmJpbmQoJ0RPTU5vZGVJbnNlcnRlZCcsICgpID0+ICgkKCcudHJhbnNsYXRlVmFyaWFudC5ub2hvdmVyJykgYXMgYW55KS50b29sdGlwKCkpO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
