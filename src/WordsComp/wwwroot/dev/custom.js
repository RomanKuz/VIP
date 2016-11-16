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
                    $scope.message = "It is draw. Good job :D!\nDo you want to play again?";
                }
                else if (isWin) {
                    $scope.message = "Congratulation! You have won!\nDo you want to play again?";
                }
                else {
                    $scope.message = "You have lost, but who cares :). It was fun.\nDo you want to play again?";
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy90c2NyaXB0cy9jb21tb24udHMiLCJzcmMvdHNjcmlwdHMvbWl4aW5zL25nU2NoZWR1bGVyLnRzIiwic3JjL3RzY3JpcHRzL2FwcC50cyIsInNyYy90c2NyaXB0cy9tb2RlbHMvVXNlci50cyIsInNyYy90c2NyaXB0cy9tb2RlbHMvZ3JvdXAudHMiLCJzcmMvdHNjcmlwdHMvbW9kZWxzL3Njb3JlLnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy90cmFuc2xhdGVWYXJpYW50LnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy93b3JkLnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy9nYW1lLnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy9nYW1lUmVzdWx0LnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy9tb3ZlUmVzdWx0LnRzIiwic3JjL3RzY3JpcHRzL21vZGVscy9wYXNzZWRXb3JkSW5mby50cyIsInNyYy90c2NyaXB0cy9tb2RlbHMvbGV2ZWwudHMiLCJzcmMvdHNjcmlwdHMvbW9kZWxzL21vZGVscy50cyIsInNyYy90c2NyaXB0cy9pbnRlcmZhY2VzL2lDb25uZWN0VG9HYW1lLnRzIiwic3JjL3RzY3JpcHRzL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWVTY29wZS50cyIsInNyYy90c2NyaXB0cy9pbnRlcmZhY2VzL2lHYW1lRmluaXNoZWRNb2RhbFdpbmRvd1Njb3BlLnRzIiwic3JjL3RzY3JpcHRzL2ludGVyZmFjZXMvaUdhbWVTY29wZS50cyIsInNyYy90c2NyaXB0cy9pbnRlcmZhY2VzL2lIdWJDb25uZWN0aW9uLnRzIiwic3JjL3RzY3JpcHRzL2ludGVyZmFjZXMvaVJvb3RTY29wZS50cyIsInNyYy90c2NyaXB0cy9pbnRlcmZhY2VzLnRzIiwic3JjL3RzY3JpcHRzL3NlcnZpY2VzL2Nvbm5lY3RUb0dhbWVTZXJ2aWNlLnRzIiwic3JjL3RzY3JpcHRzL3NlcnZpY2VzL2h1YkNvbm5lY3Rpb25TZXJ2aWNlLnRzIiwic3JjL3RzY3JpcHRzL3NlcnZpY2VzL3N0YXRlSGFuZGxlclNlcnZpY2UudHMiLCJzcmMvdHNjcmlwdHMvY29udHJvbGxlcnMvY29ubmVjdGlvbkNvbnRyb2xsZXIudHMiLCJzcmMvdHNjcmlwdHMvY29udHJvbGxlcnMvZ2FtZUNvbnRyb2xsZXIudHMiLCJzcmMvdHNjcmlwdHMvYW5pbWF0aW9ucy93b3Jkc0xlZnRBbmltYXRpb24udHMiLCJzcmMvdHNjcmlwdHMvZG9tL2Rpc2FibGVTZWxlY3Rpb24udHMiLCJzcmMvdHNjcmlwdHMvZG9tL2tleWJvYXJkQmluZGluZ3MudHMiLCJzcmMvdHNjcmlwdHMvZG9tL3Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELDZEQUE2RDtBQUM3RCw4REFBOEQ7QUFDOUQsK0RBQStEO0FBQy9ELDJFQUEyRTtBQUMzRSx5REFBeUQ7QUFDekQsaUVBQWlFO0FBQ2pFLHNFQUFzRTtBQUN0RSxJQUFPLE1BQU0sQ0FnQ1o7QUFoQ0QsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNYO1FBYUk7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQTtZQUN4QixJQUFJLENBQUMsMkJBQTJCLEdBQUcsU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7WUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztZQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMvQixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQTFCQSxBQTBC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QUMsQ0FBQztBQUN6RCxDQUFDLENBQUMsQ0FBQTtBQ1hGLHFDQUFxQztBQUNyQyxDQUFDLENBQUM7SUFDRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQUEsQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxZQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLElBQUksSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssWUFBVSxFQUFwQyxDQUFvQyxDQUFDO2lCQUN2RixLQUFLLEVBQUU7aUJBQ1AsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUNaSCxxQ0FBcUM7QUFDckMsQ0FBQyxDQUFDO0lBQ0UsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGNBQU0sT0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO0FBQ3pHLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImN1c3RvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2dsb2JhbHMvYW5ndWxhci9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZ2xvYmFscy9qcXVlcnkvaW5kZXguZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2dsb2JhbHMvc2lnbmFsci9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZ2xvYmFscy9lczYtc2hpbS9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZ2xvYmFscy9hbmd1bGFyLXVpLWJvb3RzdHJhcC9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9yeC90cy9yeC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZ2xvYmFscy9yeC5hbmd1bGFyL2luZGV4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9nbG9iYWxzL2FuZ3VsYXItYW5pbWF0ZS9pbmRleC5kLnRzXCIgLz5cclxubW9kdWxlIENvbW1vbiB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgICAgICBwdWJsaWMgYXBwTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBodWJDb25uZWN0VG9Hcm91cE1ldGhvZE5hbWU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgY29ubmVjdGVkVG9Hcm91cDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBsZWZ0R3JvdXA6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZ3JvdXBGdWxsZWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgY29tcGV0aXRpb25IdWI6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZ2FtZVN0YXJ0ZWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZGlkTW92ZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBnYW1lRmluaXNoZWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZG9Nb3ZlOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIHBhc3NNb3ZlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcE5hbWUgPSBcImdhbWVBcHBcIlxyXG4gICAgICAgICAgICB0aGlzLmh1YkNvbm5lY3RUb0dyb3VwTWV0aG9kTmFtZSA9IFwiY29ubmVjdFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZFRvR3JvdXAgPSBcInVzZXJBZGRlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRHcm91cCA9IFwidXNlckxlZnRcIjtcclxuICAgICAgICAgICAgdGhpcy5ncm91cEZ1bGxlZCA9IFwiZ3JvdXBGdWxsZWRcIjtcclxuICAgICAgICAgICAgdGhpcy5jb21wZXRpdGlvbkh1YiA9IFwiY29tcGV0aXRpb25IdWJcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhcnRlZCA9IFwiZ2FtZVN0YXJ0ZWRcIjtcclxuICAgICAgICAgICAgdGhpcy5kaWRNb3ZlID0gXCJkaWRNb3ZlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUZpbmlzaGVkID0gXCJnYW1lRmluaXNoZWRcIjtcclxuICAgICAgICAgICAgdGhpcy5kb01vdmUgPSBcImRvTW92ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3NNb3ZlID0gXCJwYXNzTW92ZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uICBHZXRDb25zdGFudHMoKTogQ29uc3RhbnRzIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbnN0YW50cygpO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbm1vZHVsZSBNaXhpbnMge1xyXG4gICAgZnVuY3Rpb24gYWN0aW9uV3JhcHBlcjxUU3RhdGU+KCRzY29wZTogbmcuSVNjb3BlLCBhY3Rpb246IChzY2hlZHVsZXI6IFJ4LklTY2hlZHVsZXIsIHN0YXRlOiBUU3RhdGUpID0+IFJ4LklEaXNwb3NhYmxlKTogXHJcbiAgICAoc2NoZWR1bGVyOiBSeC5JU2NoZWR1bGVyLCBzdGF0ZTogVFN0YXRlKSA9PiBSeC5JRGlzcG9zYWJsZSAge1xyXG4gICAgICAgIHJldHVybiAoc2NoZWR1bGVyOiBSeC5JU2NoZWR1bGVyLCBzdGF0ZTogVFN0YXRlKTogUnguSURpc3Bvc2FibGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoISRzY29wZS4kJHBoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IFJ4LklEaXNwb3NhYmxlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBhY3Rpb24oc2NoZWR1bGVyLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKHNjaGVkdWxlciwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTmdTY2hlZHVsZXIgaW1wbGVtZW50cyBSeC5JU2NoZWR1bGVyIHtcclxuICAgICAgICBwcml2YXRlIGltbWVkaWF0ZVNjaGVkdWxlcjogUnguSVNjaGVkdWxlcjtcclxuICAgICAgICBwcml2YXRlICRzY29wZTogbmcuSVNjb3BlO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IG5nLklTY29wZSkge1xyXG4gICAgICAgICAgICB0aGlzLmltbWVkaWF0ZVNjaGVkdWxlciA9IFJ4LlNjaGVkdWxlci5pbW1lZGlhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm93KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVNjaGVkdWxlci5ub3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgKiBTY2hlZHVsZXMgYW4gYWN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxyXG4gICAgICAgICAgKiBAcGFyYW0gc3RhdGUgU3RhdGUgcGFzc2VkIHRvIHRoZSBhY3Rpb24gdG8gYmUgZXhlY3V0ZWQuXHJcbiAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gYmUgZXhlY3V0ZWQuXHJcbiAgICAgICAgICAqIEByZXR1cm5zIHtEaXNwb3NhYmxlfSBUaGUgZGlzcG9zYWJsZSBvYmplY3QgdXNlZCB0byBjYW5jZWwgdGhlIHNjaGVkdWxlZCBhY3Rpb24gKGJlc3QgZWZmb3J0KS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgc2NoZWR1bGU8VFN0YXRlPihzdGF0ZTogVFN0YXRlLCBhY3Rpb246IChzY2hlZHVsZXI6IFJ4LklTY2hlZHVsZXIsIHN0YXRlOiBUU3RhdGUpID0+IFJ4LklEaXNwb3NhYmxlKTogUnguSURpc3Bvc2FibGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVTY2hlZHVsZXIuc2NoZWR1bGUoc3RhdGUsIGFjdGlvbldyYXBwZXIodGhpcy4kc2NvcGUsIGFjdGlvbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2NoZWR1bGVzIGFuIGFjdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciBkdWVUaW1lLlxyXG4gICAgICAgICAqIEBwYXJhbSBzdGF0ZSBTdGF0ZSBwYXNzZWQgdG8gdGhlIGFjdGlvbiB0byBiZSBleGVjdXRlZC5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24gQWN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdWVUaW1lIFJlbGF0aXZlIHRpbWUgYWZ0ZXIgd2hpY2ggdG8gZXhlY3V0ZSB0aGUgYWN0aW9uLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwb3NhYmxlfSBUaGUgZGlzcG9zYWJsZSBvYmplY3QgdXNlZCB0byBjYW5jZWwgdGhlIHNjaGVkdWxlZCBhY3Rpb24gKGJlc3QgZWZmb3J0KS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBzY2hlZHVsZUZ1dHVyZTxUU3RhdGU+KHN0YXRlOiBUU3RhdGUsIGR1ZVRpbWU6IG51bWJlciB8IERhdGUsIGFjdGlvbjogKHNjaGVkdWxlcjogUnguSVNjaGVkdWxlciwgc3RhdGU6IFRTdGF0ZSkgPT4gUnguSURpc3Bvc2FibGUpOiBSeC5JRGlzcG9zYWJsZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY2hlZHVsZXMgYW4gYWN0aW9uIHRvIGJlIGV4ZWN1dGVkIHJlY3Vyc2l2ZWx5LlxyXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IHN0YXRlIFN0YXRlIHBhc3NlZCB0byB0aGUgYWN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gZXhlY3V0ZSByZWN1cnNpdmVseS4gVGhlIGxhc3QgcGFyYW1ldGVyIHBhc3NlZCB0byB0aGUgYWN0aW9uIGlzIHVzZWQgdG8gdHJpZ2dlciByZWN1cnNpdmUgc2NoZWR1bGluZyBvZiB0aGUgYWN0aW9uLCBwYXNzaW5nIGluIHJlY3Vyc2l2ZSBpbnZvY2F0aW9uIHN0YXRlLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwb3NhYmxlfSBUaGUgZGlzcG9zYWJsZSBvYmplY3QgdXNlZCB0byBjYW5jZWwgdGhlIHNjaGVkdWxlZCBhY3Rpb24gKGJlc3QgZWZmb3J0KS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBzY2hlZHVsZVJlY3Vyc2l2ZTxUU3RhdGU+KHN0YXRlOiBUU3RhdGUsIGFjdGlvbjogKHN0YXRlOiBUU3RhdGUsIGFjdGlvbjogKHN0YXRlOiBUU3RhdGUpID0+IHZvaWQpID0+IHZvaWQpOiBSeC5JRGlzcG9zYWJsZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY2hlZHVsZXMgYW4gYWN0aW9uIHRvIGJlIGV4ZWN1dGVkIHJlY3Vyc2l2ZWx5IGFmdGVyIGEgc3BlY2lmaWVkIHJlbGF0aXZlIGR1ZSB0aW1lLlxyXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IHN0YXRlIFN0YXRlIHBhc3NlZCB0byB0aGUgYWN0aW9uIHRvIGJlIGV4ZWN1dGVkLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gZXhlY3V0ZSByZWN1cnNpdmVseS4gVGhlIGxhc3QgcGFyYW1ldGVyIHBhc3NlZCB0byB0aGUgYWN0aW9uIGlzIHVzZWQgdG8gdHJpZ2dlciByZWN1cnNpdmUgc2NoZWR1bGluZyBvZiB0aGUgYWN0aW9uLCBwYXNzaW5nIGluIHRoZSByZWN1cnNpdmUgZHVlIHRpbWUgYW5kIGludm9jYXRpb24gc3RhdGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ZHVlVGltZSBSZWxhdGl2ZSB0aW1lIGFmdGVyIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGFjdGlvbiBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcbiAgICAgICAgICogQHJldHVybnMge0Rpc3Bvc2FibGV9IFRoZSBkaXNwb3NhYmxlIG9iamVjdCB1c2VkIHRvIGNhbmNlbCB0aGUgc2NoZWR1bGVkIGFjdGlvbiAoYmVzdCBlZmZvcnQpLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNjaGVkdWxlUmVjdXJzaXZlRnV0dXJlPFRTdGF0ZSwgVFRpbWUgZXh0ZW5kcyBudW1iZXIgfCBEYXRlPihzdGF0ZTogVFN0YXRlLCBkdWVUaW1lOiBUVGltZSwgYWN0aW9uOiAoc3RhdGU6IFRTdGF0ZSwgYWN0aW9uOiAoc3RhdGU6IFRTdGF0ZSwgZHVlVGltZTogVFRpbWUpID0+IHZvaWQpID0+IHZvaWQpOiBSeC5JRGlzcG9zYWJsZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY2hlZHVsZXMgYSBwZXJpb2RpYyBwaWVjZSBvZiB3b3JrIGJ5IGR5bmFtaWNhbGx5IGRpc2NvdmVyaW5nIHRoZSBzY2hlZHVsZXIncyBjYXBhYmlsaXRpZXMuIFRoZSBwZXJpb2RpYyB0YXNrIHdpbGwgYmUgc2NoZWR1bGVkIHVzaW5nIHdpbmRvdy5zZXRJbnRlcnZhbCBmb3IgdGhlIGJhc2UgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtNaXhlZH0gc3RhdGUgSW5pdGlhbCBzdGF0ZSBwYXNzZWQgdG8gdGhlIGFjdGlvbiB1cG9uIHRoZSBmaXJzdCBpdGVyYXRpb24uXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHBlcmlvZCBQZXJpb2QgZm9yIHJ1bm5pbmcgdGhlIHdvcmsgcGVyaW9kaWNhbGx5LlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gYmUgZXhlY3V0ZWQsIHBvdGVudGlhbGx5IHVwZGF0aW5nIHRoZSBzdGF0ZS5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcG9zYWJsZX0gVGhlIGRpc3Bvc2FibGUgb2JqZWN0IHVzZWQgdG8gY2FuY2VsIHRoZSBzY2hlZHVsZWQgcmVjdXJyaW5nIGFjdGlvbiAoYmVzdCBlZmZvcnQpLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNjaGVkdWxlUGVyaW9kaWM8VFN0YXRlPihzdGF0ZTogVFN0YXRlLCBwZXJpb2Q6IG51bWJlciwgYWN0aW9uOiAoc3RhdGU6IFRTdGF0ZSkgPT4gVFN0YXRlKTogUnguSURpc3Bvc2FibGUge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VwcG9ydGVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2F0Y2goaGFuZGxlcjogRnVuY3Rpb24pOiBSeC5JU2NoZWR1bGVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlU2NoZWR1bGVyLmNhdGNoKGhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb21tb24udHNcIiAvPlxyXG5tb2R1bGUgQXBwIHtcclxuICAgIHZhciBjb25zdGFudHMgPSBDb21tb24uR2V0Q29uc3RhbnRzKCk7XHJcbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoY29uc3RhbnRzLmFwcE5hbWUsIFsndWkuYm9vdHN0cmFwLm1vZGFsJywnY2dCdXN5JywgJ25nQW5pbWF0ZSddKTtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0QXBwKCk6IG5nLklNb2R1bGUge1xyXG4gICAgICAgIHJldHVybiBhcHA7XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBVc2VyIHtcclxuICAgICAgICBwdWJsaWMgdXNlcklkOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmc7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Vc2VyLnRzXCIgLz5cclxubW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgR3JvdXAge1xyXG4gICAgICAgIHB1YmxpYyBncm91cElkOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyB1c2Vyc0xpc3Q6IEFycmF5PE1vZGVscy5Vc2VyPlxyXG4gICAgfVxyXG59IiwibW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgU2NvcmUge1xyXG4gICAgICAgIHB1YmxpYyBzdWNjZXNzZnVsTW92ZXM6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHVibGljIHdyb25nTW92ZXM6IG51bWJlcjtcclxuICAgIH1cclxufSIsIm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVZhcmlhbnQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhcmlhbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzVHJ1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2YXJpYW50OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc1RydWU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc1NlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgb3JkZXI6IG51bWJlcjtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3RyYW5zbGF0ZVZhcmlhbnQudHNcIiAvPlxyXG5tb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBXb3JkIHtcclxuICAgICAgICBwdWJsaWMgd29yZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgdHJhbnNsYXRlVmFyaWFudHM6IEFycmF5PFRyYW5zbGF0ZVZhcmlhbnQ+XHJcblxyXG4gICAgICAgIHB1YmxpYyBleHBsYW5hdGlvblF1b3RlczogQXJyYXk8c3RyaW5nPlxyXG5cclxuICAgICAgICBwdWJsaWMgZGVmaW5pdGlvbjogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2hvcnRXb3JkUmVwcmVzZW50YXRpb246IHN0cmluZztcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3Njb3JlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vd29yZC50c1wiIC8+XHJcbm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgICAgIHB1YmxpYyB1c2VyMTogVXNlcjtcclxuXHJcbiAgICAgICAgcHVibGljIHVzZXIyOiBVc2VyO1xyXG5cclxuICAgICAgICBwdWJsaWMgY3VycmVudE1vdmU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHVibGljIHdvcmRzOiBBcnJheTxXb3JkPlxyXG5cclxuICAgICAgICBwdWJsaWMgdXNlcjFTY29yZTogU2NvcmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyB1c2VyMlNjb3JlOiBTY29yZTtcclxuICAgIH1cclxufSIsIm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVSZXN1bHQge1xyXG4gICAgICAgIHB1YmxpYyB3aW5uZXI6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGlzRHJhdzogYm9vbGVhbjtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2dhbWVSZXN1bHQudHNcIiAvPlxyXG5tb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNb3ZlUmVzdWx0IHtcclxuICAgICAgICBwdWJsaWMgaXNTdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgaXNDb3JyZWN0OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0xhc3RNb3ZlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2FtZVJlc3VsdDogTW9kZWxzLkdhbWVSZXN1bHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZWxlY3RlZFZhcmlhbnRJbmRleDogbnVtYmVyO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgUGFzc2VkV29yZEluZm8ge1xyXG4gICAgICAgIHB1YmxpYyB3b3JkOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGFuc3dlcjogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgd2FzUGFzc2VkOiBib29sZWFuO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgZW51bSBMZXZlbCB7XHJcbiAgICAgICAgQmVnaW5lciA9IDEsXHJcblxyXG4gICAgICAgIEludGVybWVkaWF0ZSA9IDIsXHJcblxyXG4gICAgICAgIEFkdmFuY2VkID0gM1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUxldmVsTmFtZVBhaXIge1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBsZXZlbDogTW9kZWxzLkxldmVsO1xyXG4gICAgfVxyXG59IiwiLy8gVXNlZCB0byByZWZlcmVuY2UgbW9kZWwgZmlsZXNcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vVXNlci50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0dyb3VwLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZ2FtZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL21vdmVSZXN1bHQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9nYW1lUmVzdWx0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vcGFzc2VkV29yZEluZm8udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9sZXZlbC50c1wiIC8+IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbHMvbW9kZWxzLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29ubmVjdFRvR2FtZSB7XHJcbiAgICAgICAgY29ubmVjdFRvSHViOiAoKSA9PiBKUXVlcnlQcm9taXNlPGFueT47XHJcblxyXG4gICAgICAgIGNvbm5lY3RUb05ld0dyb3VwOiAoZGlzcGxheU5hbWU6IHN0cmluZywgbGV2ZWw6IE1vZGVscy5MZXZlbCkgPT4gSlF1ZXJ5UHJvbWlzZTxhbnk+XHJcblxyXG4gICAgICAgIGRvTW92ZTogKG1vdmVPcmRlcjogbnVtYmVyLCB3b3JkOiBzdHJpbmcsIHZhcmlhbnQ6c3RyaW5nKSA9PiBKUXVlcnlQcm9taXNlPE1vZGVscy5Nb3ZlUmVzdWx0PlxyXG5cclxuICAgICAgICBwYXNzTW92ZTogKG1vdmVPcmRlcjogbnVtYmVyKSA9PiBKUXVlcnlQcm9taXNlPE1vZGVscy5Nb3ZlUmVzdWx0PlxyXG5cclxuICAgICAgICBvbkNvbm5lY3RlZFRvR3JvdXA6IChjYWxsQmFjazoodXNlcklkOiBzdHJpbmcpID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIG9uR3JvdXBGdWxsZWQ6IChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgb25Vc2VyTGVmdDogKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdyb3VwKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBnYW1lU3RhcnRlZDogKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdhbWUpID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIGRpZE1vdmU6IChjYWxsQmFjazoobW92ZVJlczogTW9kZWxzLk1vdmVSZXN1bHQpID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIGdhbWVGaW5pc2hlZDogKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdhbWUpID0+IHZvaWQpID0+IHZvaWQ7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29ubmVjdFRvR2FtZVNjb3BlIGV4dGVuZHMgbmcuSVNjb3BlIHtcclxuICAgICAgICBjb25uZWN0VG9Hcm91cDogKCkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgY29ubmVjdFRvR3JvdXBQcm9taXNlOiBKUXVlcnlQcm9taXNlPGFueT47XHJcblxyXG4gICAgICAgIGxldmVsczogQXJyYXk8TW9kZWxzLklMZXZlbE5hbWVQYWlyPjtcclxuICAgICAgICBjaGFuZ2VMZXZlbDogKGxldmVsOiBNb2RlbHMuSUxldmVsTmFtZVBhaXIpID0+IHZvaWQ7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR2FtZUZpbmlzaGVkTW9kYWxXaW5kb3dTY29wZSBleHRlbmRzIG5nLklTY29wZSB7XHJcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxyXG5cclxuICAgICAgICBwbGF5QWdhaW46ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgY2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21vZGVscy9tb2RlbHMudHNcIiAvPlxyXG5tb2R1bGUgSW50ZXJmYWNlcyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHYW1lU2NvcGUgZXh0ZW5kcyBuZy5JU2NvcGUge1xyXG4gICAgICAgIGN1cnJlbnRVc2VyU2NvcmU6IE1vZGVscy5TY29yZTtcclxuXHJcbiAgICAgICAgdXNlcjJTY29yZTogTW9kZWxzLlNjb3JlO1xyXG5cclxuICAgICAgICB1c2VyMkRpc3BsYXlOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGN1cnJlbnRXb3JkOiBNb2RlbHMuV29yZDtcclxuXHJcbiAgICAgICAgY3VycmVudFdvcmRJbmRleDogbnVtYmVyO1xyXG5cclxuICAgICAgICBkb01vdmU6ICh2YXJpYW50OiBzdHJpbmcpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIGlzQ3VycmVudFVzZXJNb3ZlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwYXNzZWRXb3JkczogQXJyYXk8TW9kZWxzLlBhc3NlZFdvcmRJbmZvPjtcclxuICAgICAgICBsZWZ0V29yZHM6IEFycmF5PE1vZGVscy5Xb3JkPjtcclxuXHJcbiAgICAgICAgc2Vjb25kc0Zvck1vdmVMZWZ0OiBudW1iZXI7XHJcbiAgICAgICAgcGVyY2VudGFnZXNMZWZ0OiBudW1iZXI7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJSHViQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgZ2V0Q29ubmVjdGlvbjogKCkgPT4gU2lnbmFsUi5IdWIuQ29ubmVjdGlvblxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbHMvbW9kZWxzLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUm9vdFNjb3BlIGV4dGVuZHMgbmcuSVNjb3BlIHtcclxuICAgICAgICBjb25uZWN0VG9IdWJQcm9taXNlOiBKUXVlcnlQcm9taXNlPGFueT47XHJcbiAgICAgICAgbG9hZGluZ0dhbWVQcm9taXNlOiBQcm9taXNlIDxhbnk+O1xyXG4gICAgICAgIGFkZGVkVG9Hcm91cFByb21pc2U6IFByb21pc2UgPGFueT47XHJcbiAgICAgICAgdXNlcjJDb25uZWN0ZWRQcm9taXNlOiBQcm9taXNlIDxhbnk+O1xyXG5cclxuICAgICAgICBpc1N0YXJ0R2FtZVBhZ2U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHVzZXJJZDogc3RyaW5nO1xyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgbGV2ZWw6IE1vZGVscy5JTGV2ZWxOYW1lUGFpcjtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbnRlcmZhY2VzL2lDb25uZWN0VG9HYW1lU2NvcGUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbnRlcmZhY2VzL2lIdWJDb25uZWN0aW9uLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pUm9vdFNjb3BlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pR2FtZVNjb3BlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pU3RhdGVIYW5kbGVyLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pR2FtZUZpbmlzaGVkTW9kYWxXaW5kb3dTY29wZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL21vZGVscy9tb2RlbHMudHNcIiAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxubW9kdWxlIFNlcnZpY2VzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBDb25uZWN0VG9HYW1lU2VydmljZSBpbXBsZW1lbnRzIEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWUge1xyXG4gICAgICAgIHByaXZhdGUgaHViOiBTaWduYWxSLkh1Yi5Qcm94eTtcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3Rpb246IFNpZ25hbFIuSHViLkNvbm5lY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdGFudHM6IENvbW1vbi5Db25zdGFudHM7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiU2VydmljZXMuSHViQ29ubmVjdGlvblNlcnZpY2VcIl07XHJcbiAgICAgICAgY29uc3RydWN0b3IoaHViQ29ubmVjdGlvblNlcnZpY2U6IEludGVyZmFjZXMuSUh1YkNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zdGFudHMgPSBDb21tb24uR2V0Q29uc3RhbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGh1YkNvbm5lY3Rpb25TZXJ2aWNlLmdldENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5odWIgPSB0aGlzLmNvbm5lY3Rpb24uY3JlYXRlSHViUHJveHkodGhpcy5jb25zdGFudHMuY29tcGV0aXRpb25IdWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbm5lY3RUb0h1YigpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odWIuY29ubmVjdGlvbi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvTW92ZShtb3ZlT3JkZXI6IG51bWJlciwgd29yZDogc3RyaW5nLCB2YXJpYW50OnN0cmluZyk6IEpRdWVyeVByb21pc2U8TW9kZWxzLk1vdmVSZXN1bHQ+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHViLmludm9rZSh0aGlzLmNvbnN0YW50cy5kb01vdmUsIG1vdmVPcmRlciwgd29yZCwgdmFyaWFudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcGFzc01vdmUobW92ZU9yZGVyOiBudW1iZXIpOiBKUXVlcnlQcm9taXNlPE1vZGVscy5Nb3ZlUmVzdWx0PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh1Yi5pbnZva2UodGhpcy5jb25zdGFudHMucGFzc01vdmUsIG1vdmVPcmRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29ubmVjdFRvTmV3R3JvdXAoZGlzcGxheU5hbWU6IHN0cmluZywgbGV2ZWw6IE1vZGVscy5MZXZlbCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh1Yi5pbnZva2UodGhpcy5jb25zdGFudHMuaHViQ29ubmVjdFRvR3JvdXBNZXRob2ROYW1lLCBkaXNwbGF5TmFtZSwgbGV2ZWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29ubmVjdGVkVG9Hcm91cChjYWxsQmFjazoodXNlcklkOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5odWIub24odGhpcy5jb25zdGFudHMuY29ubmVjdGVkVG9Hcm91cCwgKG1zZykgPT4gY2FsbEJhY2sobXNnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25Hcm91cEZ1bGxlZChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5ncm91cEZ1bGxlZCwgKG1zZykgPT4gY2FsbEJhY2sobXNnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25Vc2VyTGVmdChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5sZWZ0R3JvdXAsIChtc2cpID0+IGNhbGxCYWNrKG1zZ1swXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdhbWVTdGFydGVkKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdhbWUpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5odWIub24odGhpcy5jb25zdGFudHMuZ2FtZVN0YXJ0ZWQsIChtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKG1zZyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRpZE1vdmUoY2FsbEJhY2s6KG1vdmVSZXM6IE1vZGVscy5Nb3ZlUmVzdWx0KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaHViLm9uKHRoaXMuY29uc3RhbnRzLmRpZE1vdmUsIChtc2cpID0+IGNhbGxCYWNrKG1zZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdhbWVGaW5pc2hlZChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5HYW1lKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaHViLm9uKHRoaXMuY29uc3RhbnRzLmdhbWVGaW5pc2hlZCwgKG1zZykgPT4gY2FsbEJhY2sobXNnWzBdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKENvbW1vbi5HZXRDb25zdGFudHMoKS5hcHBOYW1lKS5zZXJ2aWNlKFwiU2VydmljZXMuQ29ubmVjdFRvR2FtZVNlcnZpY2VcIiwgQ29ubmVjdFRvR2FtZVNlcnZpY2UpO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2ludGVyZmFjZXMudHNcIiAvPlxyXG5tb2R1bGUgU2VydmljZXMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEh1YkNvbm5lY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgSW50ZXJmYWNlcy5JSHViQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY29ubmVjdGlvbjogU2lnbmFsUi5IdWIuQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldENvbm5lY3Rpb24oKTogU2lnbmFsUi5IdWIuQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgICAgIGlmICghSHViQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgSHViQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGlvbiA9ICQuaHViQ29ubmVjdGlvbihcIi9zaWduYWxyXCIsIHsgdXNlRGVmYXVsdFBhdGg6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgSHViQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGlvbi5sb2dnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSHViQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbmd1bGFyLm1vZHVsZShDb21tb24uR2V0Q29uc3RhbnRzKCkuYXBwTmFtZSkuc2VydmljZShcIlNlcnZpY2VzLkh1YkNvbm5lY3Rpb25TZXJ2aWNlXCIsIEh1YkNvbm5lY3Rpb25TZXJ2aWNlKTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21peGlucy9uZ1NjaGVkdWxlci50c1wiIC8+XHJcbm1vZHVsZSBTZXJ2aWNlcyB7XHJcbiAgICBmdW5jdGlvbiB0b1Byb21pc2VDdXN0b208VD4ob2JzZXJ2YWJsZTogUnguSU9ic2VydmFibGU8VD4pOiBQcm9taXNlIDxhbnk+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4ocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoe30pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJmYWNlIElNb2RhbFNldHRpbmdzIGV4dGVuZHMgbmcudWkuYm9vdHN0cmFwLklNb2RhbFNldHRpbmdzIHtcclxuXHJcbiAgICAgICAgLyoqIFNldHMgdGhlIGFyaWEtZGVzY3JpYmVkYnkgcHJvcGVydHkgb24gdGhlIG1vZGFsLiBcclxuICAgICAgICAgKiBUaGUgdmFsdWUgc2hvdWxkIGJlIGFuIGlkICh3aXRob3V0IHRoZSBsZWFkaW5nICMpIHBvaW50aW5nIHRvIHRoZSBlbGVtZW50IHRoYXQgZGVzY3JpYmVzIHlvdXIgbW9kYWwuIFxyXG4gICAgICAgICAqIFR5cGljYWxseSwgdGhpcyB3aWxsIGJlIHRoZSB0ZXh0IG9uIHlvdXIgbW9kYWwsXHJcbiAgICAgICAgICogIGJ1dCBkb2VzIG5vdCBpbmNsdWRlIHNvbWV0aGluZyB0aGUgdXNlciB3b3VsZCBpbnRlcmFjdCB3aXRoLCBcclxuICAgICAgICAgKiBsaWtlIGJ1dHRvbnMgb3IgYSBmb3JtLiBcclxuICAgICAgICAgKiBPbWl0dGluZyB0aGlzIG9wdGlvbiB3aWxsIG5vdCBpbXBhY3Qgc2lnaHRlZCB1c2VycyBidXQgd2lsbCB3ZWFrZW4geW91ciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuICovXHJcbiAgICAgICAgYXJpYURlc2NyaWJlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBTZXRzIHRoZSBhcmlhLWxhYmVsbGVkYnkgcHJvcGVydHkgb24gdGhlIG1vZGFsLiBcclxuICAgICAgICAgKiBUaGUgdmFsdWUgc2hvdWxkIGJlIGFuIGlkICh3aXRob3V0IHRoZSBsZWFkaW5nICMpIHBvaW50aW5nIHRvIHRoZSBlbGVtZW50IHRoYXQgbGFiZWxzIHlvdXIgbW9kYWwuIFxyXG4gICAgICAgICAqIFR5cGljYWxseSwgdGhpcyB3aWxsIGJlIGEgaGVhZGVyIGVsZW1lbnQuIFxyXG4gICAgICAgICAqIE9taXR0aW5nIHRoaXMgb3B0aW9uIHdpbGwgbm90IGltcGFjdCBzaWdodGVkIHVzZXJzIGJ1dCB3aWxsIHdlYWtlbiB5b3VyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC4gKi9cclxuICAgICAgICBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZUhhbmRsZXJTZXJ2aWNlIGltcGxlbWVudHMgSW50ZXJmYWNlcy5JU3RhdGVIYW5kbGVyIHtcclxuICAgICAgICBwcml2YXRlIGNvbnN0YW50czogQ29tbW9uLkNvbnN0YW50cztcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IEludGVyZmFjZXMuSVJvb3RTY29wZTtcclxuICAgICAgICBwcml2YXRlICRtb2RhbDogYW5ndWxhci51aS5ib290c3RyYXAuSU1vZGFsU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RUb0dhbWVTY29wZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZVNjb3BlO1xyXG4gICAgICAgIHByaXZhdGUgZ3JvdXBGdWxsZWRPYnNlcnZhYmxlOiBSeC5TdWJqZWN0PGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSBhZGRlZFRvR3JvdXBPYnNlcnZhYmxlOiBSeC5TdWJqZWN0PGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyTGVmdEdyb3VwT2JzZXJ2YWJsZTogUnguU3ViamVjdDxhbnk+O1xyXG4gICAgICAgIHByaXZhdGUgZ2FtZVN0YXJ0ZWRPYnNlcnZhYmxlOiBSeC5TdWJqZWN0PGFueT47XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhcnRHYW1lTW9kYWxJbnN0YW5jZTogYW5ndWxhci51aS5ib290c3RyYXAuSU1vZGFsU2VydmljZUluc3RhbmNlO1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRyb290U2NvcGVcIiwgXCIkdWliTW9kYWxcIl07XHJcbiAgICAgICAgY29uc3RydWN0b3IoJHJvb3RTY29wZTogSW50ZXJmYWNlcy5JUm9vdFNjb3BlLCAkbW9kYWw6IGFuZ3VsYXIudWkuYm9vdHN0cmFwLklNb2RhbFNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zdGFudHMgPSBDb21tb24uR2V0Q29uc3RhbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJG1vZGFsID0gJG1vZGFsO1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuaXNTdGFydEdhbWVQYWdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS51c2VySWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwRnVsbGVkT2JzZXJ2YWJsZSA9IG5ldyBSeC5TdWJqZWN0PGFueT4oKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRlZFRvR3JvdXBPYnNlcnZhYmxlID0gbmV3IFJ4LlN1YmplY3Q8YW55PigpO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJMZWZ0R3JvdXBPYnNlcnZhYmxlID0gbmV3IFJ4LlN1YmplY3Q8YW55PigpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGFydGVkT2JzZXJ2YWJsZSA9IG5ldyBSeC5TdWJqZWN0PGFueT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FsbEluRGlnZXN0TG9vcChhY3Rpb246KCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kcm9vdFNjb3BlLiQkcGhhc2UpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dTdGFydEdhbWVNb2RhbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IG9wdCA9IHt9IGFzIG5nLnVpLmJvb3RzdHJhcC5JTW9kYWxTZXR0aW5ncztcclxuICAgICAgICAgICAgICAgIG9wdC5zY29wZSA9IHRoaXMuY29ubmVjdFRvR2FtZVNjb3BlO1xyXG4gICAgICAgICAgICAgICAgb3B0LnRlbXBsYXRlVXJsID0gXCJjb25uZWN0VG9Hcm91cC5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICBvcHQud2luZG93VGVtcGxhdGVVcmwgPSBcIndpbmRvd1RlbXBsYXRlLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIG9wdC5iYWNrZHJvcCA9IFwic3RhdGljXCI7XHJcbiAgICAgICAgICAgICAgICBvcHQua2V5Ym9hcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG9wdC5hbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb3B0LnNpemUgPSBcImxnXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UgPSB0aGlzLiRtb2RhbC5vcGVuKG9wdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dHYW1lRmluaXNoZWRNb2RhbFdpbmRvdyhpc1dpbj86IGJvb2xlYW4sIGlzRHJhdz86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKGlzV2luID09PSB1bmRlZmluZWQgJiYgaXNEcmF3ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwiT25lIG9mIGJvb2xlYW4gZmxhZ3Mgc2hvdWxkIGJlIHNwZWNpZmllZFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY29ubmVjdFRvR2FtZVNjb3BlID0gdGhpcy5jb25uZWN0VG9HYW1lU2NvcGU7XHJcbiAgICAgICAgICAgIGxldCBvcHQgPSB7fSBhcyBuZy51aS5ib290c3RyYXAuSU1vZGFsU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICBvcHQuY29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZTogSW50ZXJmYWNlcy5JR2FtZUZpbmlzaGVkTW9kYWxXaW5kb3dTY29wZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wbGF5QWdhaW4gPSBjb25uZWN0VG9HYW1lU2NvcGUuY29ubmVjdFRvR3JvdXA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RyYXcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIkl0IGlzIGRyYXcuIEdvb2Qgam9iIDpEIVxcbkRvIHlvdSB3YW50IHRvIHBsYXkgYWdhaW4/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1dpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiQ29uZ3JhdHVsYXRpb24hIFlvdSBoYXZlIHdvbiFcXG5EbyB5b3Ugd2FudCB0byBwbGF5IGFnYWluP1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJZb3UgaGF2ZSBsb3N0LCBidXQgd2hvIGNhcmVzIDopLiBJdCB3YXMgZnVuLlxcbkRvIHlvdSB3YW50IHRvIHBsYXkgYWdhaW4/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb3B0LnRlbXBsYXRlVXJsID0gXCJnYW1lRmluaXNoZWQuaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgb3B0LndpbmRvd1RlbXBsYXRlVXJsID0gXCJ3aW5kb3dUZW1wbGF0ZS5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICBvcHQuYmFja2Ryb3AgPSBcInN0YXRpY1wiO1xyXG4gICAgICAgICAgICAgICAgb3B0LmtleWJvYXJkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBvcHQuYW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG9wdC5zaXplID0gXCJsZ1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEdhbWVNb2RhbEluc3RhbmNlID0gdGhpcy4kbW9kYWwub3BlbihvcHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldENvbm5lY3RUb0dhbWVTY29wZShjb25uZWN0VG9HYW1lU2NvcGU6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWVTY29wZSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUb0dhbWVTY29wZSA9IGNvbm5lY3RUb0dhbWVTY29wZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVDb25uZWN0aW9uVG9Hcm91cChwcm9taXNlOiBKUXVlcnlQcm9taXNlPGFueT4pOiB2b2lkIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5mYWlsKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzbXRoIGJhZCBoYXBwZW5lZDogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGRlZFRvR3JvdXAgPSB0aGlzLmFkZGVkVG9Hcm91cE9ic2VydmFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGFrZSgxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5hZGRlZFRvR3JvdXBQcm9taXNlID0gdG9Qcm9taXNlQ3VzdG9tKGFkZGVkVG9Hcm91cCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRlZFRvR3JvdXAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncm91cEZ1bGxlZCA9IHRoaXMuZ3JvdXBGdWxsZWRPYnNlcnZhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGFrZSgxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJVRzogRm9yIHNvbWUgcmVhc29uIHNvbWV0aGltZXMgaXMgbm90IHJlc29sdmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS51c2VyMkNvbm5lY3RlZFByb21pc2UgPSB0b1Byb21pc2VDdXN0b20oZ3JvdXBGdWxsZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBGdWxsZWQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUubG9hZGluZ0dhbWVQcm9taXNlID0gdG9Qcm9taXNlQ3VzdG9tKFJ4Lk9ic2VydmFibGUubWVyZ2UodGhpcy51c2VyTGVmdEdyb3VwT2JzZXJ2YWJsZS50YWtlKDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGFydGVkT2JzZXJ2YWJsZS50YWtlKDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRha2UoMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuaXNTdGFydEdhbWVQYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9HYW1lU2NvcGUuY29ubmVjdFRvR3JvdXBQcm9taXNlID0gcHJvbWlzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlVXNlckFkZGVkVG9Hcm91cCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRlZFRvR3JvdXBPYnNlcnZhYmxlLm9uTmV4dCh7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlQ29ubmVjdGlvblRvSHViKHByb21pc2U6IEpRdWVyeVByb21pc2U8YW55Pik6IHZvaWQge1xyXG4gICAgICAgICAgICBwcm9taXNlLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzbXRoIGJhZCBoYXBwZW5lZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwcm9taXNlLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N0YXJ0R2FtZU1vZGFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5jb25uZWN0VG9IdWJQcm9taXNlID0gcHJvbWlzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlR2FtZUZpbmlzaGVkKGlzV2luPzogYm9vbGVhbiwgaXNEcmF3PzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmlzU3RhcnRHYW1lUGFnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93R2FtZUZpbmlzaGVkTW9kYWxXaW5kb3coaXNXaW4sIGlzRHJhdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUdyb3VwRnVsbGVkKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBCZXR0ZXIgdG8gaW1wbGVtZW50IHNjaGVkdWxlciB0byBzdWJzY3JpYmUgd2l0aGluIG5nIHNjb3BlXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwRnVsbGVkT2JzZXJ2YWJsZS5vbk5leHQoe30pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUdhbWVTdGFydGVkKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmlzU3RhcnRHYW1lUGFnZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhcnRlZE9ic2VydmFibGUub25OZXh0KHt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRVc2VySWQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJvb3RTY29wZS51c2VySWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0VXNlcklkKHVzZXJJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS51c2VySWQgPSB1c2VySWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlVXNlcjJMZWZ0R3JvdXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJMZWZ0R3JvdXBPYnNlcnZhYmxlLm9uTmV4dCh7fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuaXNTdGFydEdhbWVQYWdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTdGFydEdhbWVNb2RhbCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRVc2VyRGlzcGxheU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJvb3RTY29wZS5kaXNwbGF5TmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoQ29tbW9uLkdldENvbnN0YW50cygpLmFwcE5hbWUpLnNlcnZpY2UoXCJTZXJ2aWNlcy5TdGF0ZUhhbmRsZXJTZXJ2aWNlXCIsIFN0YXRlSGFuZGxlclNlcnZpY2UpO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxubW9kdWxlIGNvbnRyb2xsZXJzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBDb25uZWN0VG9HYW1lQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0aW9uSHViU2VydmljZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZTtcclxuICAgICAgICBwcml2YXRlICRzY29wZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZVNjb3BlO1xyXG4gICAgICAgIHByaXZhdGUgZ3JvdXBJbmZvOiBNb2RlbHMuR3JvdXA7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZUhhbmRsZXI6IEludGVyZmFjZXMuSVN0YXRlSGFuZGxlcjtcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IEludGVyZmFjZXMuSVJvb3RTY29wZTtcclxuXHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbXCJTZXJ2aWNlcy5Db25uZWN0VG9HYW1lU2VydmljZVwiLCBcIiRzY29wZVwiLCBcIlNlcnZpY2VzLlN0YXRlSGFuZGxlclNlcnZpY2VcIiwgXCIkcm9vdFNjb3BlXCJdO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb25IdWJTZXJ2aWNlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lLCAkc2NvcGU6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWVTY29wZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVIYW5kbGVyOiBJbnRlcmZhY2VzLklTdGF0ZUhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZTogSW50ZXJmYWNlcy5JUm9vdFNjb3BlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2UgPSBjb25uZWN0aW9uSHViU2VydmljZTtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyID0gc3RhdGVIYW5kbGVyO1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVWaWV3TW9kZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZVZpZXdNb2RlbCgpOnZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlci5zZXRDb25uZWN0VG9HYW1lU2NvcGUodGhpcy4kc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5vblVzZXJMZWZ0KGRhdGEgPT4gdGhpcy5vblVzZXJMZWZ0LmNhbGwodGhpcywgZGF0YSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLm9uR3JvdXBGdWxsZWQoZGF0YSA9PiB0aGlzLm9uR3JvdXBGdWxsZWQuY2FsbCh0aGlzLCBkYXRhKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2Uub25Db25uZWN0ZWRUb0dyb3VwKGRhdGEgPT4gdGhpcy5vbkNvbm5lY3RlZFRvR3JvdXAuY2FsbCh0aGlzLCBkYXRhKSk7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNvbm5lY3RUb0dyb3VwID0gKCkgPT4gdGhpcy5jb25uZWN0VG9Hcm91cC5hcHBseSh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5jb25uZWN0VG9IdWIoKS5kb25lKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLnNldFVzZXJJZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlci5oYW5kbGVDb25uZWN0aW9uVG9IdWIocHJvbWlzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmxldmVscyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsZXZlbDogTW9kZWxzLkxldmVsLkJlZ2luZXIsIG5hbWU6IFwi0J3QvtCy0LDRh9C+0LpcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGV2ZWw6IE1vZGVscy5MZXZlbC5JbnRlcm1lZGlhdGUsIG5hbWU6IFwi0KHRgNC10LTQvdC40LlcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGV2ZWw6IE1vZGVscy5MZXZlbC5BZHZhbmNlZCwgbmFtZTogXCLQktGL0YHQvtC60LjQuVwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUubGV2ZWwgPSB0aGlzLiRzY29wZS5sZXZlbHNbMV07XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNoYW5nZUxldmVsID0gKGxldmVsOiBNb2RlbHMuSUxldmVsTmFtZVBhaXIpID0+IHRoaXMuJHJvb3RTY29wZS5sZXZlbCA9IGxldmVsO1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuZGlzcGxheU5hbWUgPSBcItCh0LvRg9GH0LDQudC90YvQuSDQuNCz0YDQvtC6XCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Hcm91cEZ1bGxlZChncm91cEluZm86IE1vZGVscy5Hcm91cCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwSW5mbyA9IGdyb3VwSW5mbztcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuaGFuZGxlR3JvdXBGdWxsZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Vc2VyTGVmdChncm91cEluZm86IE1vZGVscy5Hcm91cCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwSW5mbyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZVVzZXIyTGVmdEdyb3VwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RUb0dyb3VwKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2UuY29ubmVjdFRvTmV3R3JvdXAodGhpcy5zdGF0ZUhhbmRsZXIuZ2V0VXNlckRpc3BsYXlOYW1lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUubGV2ZWwubGV2ZWwpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlci5oYW5kbGVDb25uZWN0aW9uVG9Hcm91cChwcm9taXNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Db25uZWN0ZWRUb0dyb3VwKHVzZXJJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLnNldFVzZXJJZCh1c2VySWQpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlci5oYW5kbGVVc2VyQWRkZWRUb0dyb3VwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKENvbW1vbi5HZXRDb25zdGFudHMoKS5hcHBOYW1lKS5jb250cm9sbGVyKFwiY29udHJvbGxlcnMuQ29ubmVjdFRvR2FtZUNvbnRyb2xsZXJcIiwgQ29ubmVjdFRvR2FtZUNvbnRyb2xsZXIpO1xyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW50ZXJmYWNlcy50c1wiIC8+XHJcbm1vZHVsZSBjb250cm9sbGVycyB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdGlvbkh1YlNlcnZpY2U6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWU7XHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IEludGVyZmFjZXMuSUdhbWVTY29wZTtcclxuICAgICAgICBwcml2YXRlIGdhbWVJbmZvOiBNb2RlbHMuR2FtZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRlSGFuZGxlcjogSW50ZXJmYWNlcy5JU3RhdGVIYW5kbGVyO1xyXG4gICAgICAgIHByaXZhdGUgd29yZHM6IEFycmF5PE1vZGVscy5Xb3JkPlxyXG4gICAgICAgIHByaXZhdGUgdXNlck51bTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgJGludGVydmFsOiBuZy5JSW50ZXJ2YWxTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgc2Vjb25kc0Zvck1vdmU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIHRpbWVyUHJvbWlzZTogbmcuSVByb21pc2U8YW55PjtcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2U7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiU2VydmljZXMuQ29ubmVjdFRvR2FtZVNlcnZpY2VcIiwgXCIkc2NvcGVcIiwgXCJTZXJ2aWNlcy5TdGF0ZUhhbmRsZXJTZXJ2aWNlXCIsIFwiJGludGVydmFsXCIsICckdGltZW91dCddO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb25IdWJTZXJ2aWNlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lLCAkc2NvcGU6IEludGVyZmFjZXMuSUdhbWVTY29wZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVIYW5kbGVyOiBJbnRlcmZhY2VzLklTdGF0ZUhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgJGludGVydmFsOiBuZy5JSW50ZXJ2YWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZSA9IGNvbm5lY3Rpb25IdWJTZXJ2aWNlO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIgPSBzdGF0ZUhhbmRsZXI7XHJcbiAgICAgICAgICAgIHRoaXMuJGludGVydmFsID0gJGludGVydmFsO1xyXG4gICAgICAgICAgICB0aGlzLnNlY29uZHNGb3JNb3ZlID0gMTA7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVmlld01vZGVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemVWaWV3TW9kZWwoKTp2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5nYW1lU3RhcnRlZChkYXRhID0+IHRoaXMuc3RhcnRHYW1lLmNhbGwodGhpcywgZGF0YSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLmRpZE1vdmUoZGF0YSA9PiB0aGlzLnVzZXIyZGlkTW92ZS5jYWxsKHRoaXMsIGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuZG9Nb3ZlID0gKHZhcmlhbnQ6IHN0cmluZykgPT4gdGhpcy5kb01vdmUuY2FsbCh0aGlzLCB2YXJpYW50KTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5vblVzZXJMZWZ0KCgpID0+IHRoaXMub25Vc2VyTGVmdC5jYWxsKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy51bnNldEdhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uVXNlckxlZnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zZXRHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1bnNldEdhbWVJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJbmZvID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50V29yZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zZWNvbmRzRm9yTW92ZUxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGVyY2VudGFnZXNMZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ3VycmVudFVzZXJNb3ZlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGFzc2VkV29yZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmxlZnRXb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhcnRHYW1lKGdhbWU6IE1vZGVscy5HYW1lKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUluZm8gPSBnYW1lO1xyXG4gICAgICAgICAgICB0aGlzLndvcmRzID0gZ2FtZS53b3JkcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzVXNlcjEgPSBnYW1lLnVzZXIxLnVzZXJJZCA9PT0gdGhpcy5zdGF0ZUhhbmRsZXIuZ2V0VXNlcklkKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXNlck51bSA9IGlzVXNlcjEgPyAxIDogMjtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUgPSBpc1VzZXIxID8gZ2FtZS51c2VyMVNjb3JlIDogZ2FtZS51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUudXNlcjJTY29yZSA9ICFpc1VzZXIxID8gZ2FtZS51c2VyMVNjb3JlIDogZ2FtZS51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUudXNlcjJEaXNwbGF5TmFtZSA9ICFpc1VzZXIxID8gZ2FtZS51c2VyMS5kaXNwbGF5TmFtZSA6IGdhbWUudXNlcjIuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50V29yZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkID0gdGhpcy53b3Jkc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFyaW5hdHNPcmRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDdXJyZW50VXNlck1vdmUgPSAoaXNVc2VyMSAmJiB0aGlzLmdhbWVJbmZvLmN1cnJlbnRNb3ZlID09PSAxKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCFpc1VzZXIxICYmIHRoaXMuZ2FtZUluZm8uY3VycmVudE1vdmUgPT09IDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzaHVmZmxlKGFycjogQXJyYXk8TW9kZWxzLldvcmQ+KTogQXJyYXk8TW9kZWxzLldvcmQ+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IGFyci5zbGljZSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtID0gYXJyYXkubGVuZ3RoLCB0LCBpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudOKAplxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtLS0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IGFycmF5W21dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W21dID0gYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaV0gPSB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmxlZnRXb3JkcyA9IHNodWZmbGUodGhpcy53b3Jkcy5zbGljZSgxKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuaGFuZGxlR2FtZVN0YXJ0ZWQoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNhbGxJbkRpZ2VzdExvb3AoYWN0aW9uOigpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlLiQkcGhhc2UpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhcnRUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXJQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlByZXZpb3VzIHRpbWVyIHNob3VsZCBiZSBzdG9wcGVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zZWNvbmRzRm9yTW92ZUxlZnQgPSB0aGlzLnNlY29uZHNGb3JNb3ZlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGVyY2VudGFnZXNMZWZ0ID0gMTAwO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGltZXJQcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2Vjb25kc0Zvck1vdmVMZWZ0LS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5wZXJjZW50YWdlc0xlZnQgPSB0aGlzLiRzY29wZS5zZWNvbmRzRm9yTW92ZUxlZnQgLyAxMCAqIDEwMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kc2NvcGUuc2Vjb25kc0Zvck1vdmVMZWZ0ID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy4kc2NvcGUuaXNDdXJyZW50VXNlck1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhc3NNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMDAsIDEwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RvcFRpbWVyKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZXJQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbCh0aGlzLnRpbWVyUHJvbWlzZSk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXJQcm9taXNlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXNlcjJkaWRNb3ZlKG1vdmVSZXM6IE1vZGVscy5Nb3ZlUmVzdWx0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmUobW92ZVJlcywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcGFzc01vdmUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2UucGFzc01vdmUodGhpcy51c2VyTnVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKG1vdmVSZXN1bHQ6TW9kZWxzLk1vdmVSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmUobW92ZVJlc3VsdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZG9Nb3ZlKHZhcmlhbnQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyBhIHdheSB0byBoYW5kbGUgbXVsdGlwbGUgY2xpY2tcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkLnRyYW5zbGF0ZVZhcmlhbnRzLmZpbHRlcih2ID0+IHYuaXNTZWxlY3RlZClcclxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlLnNlY29uZHNGb3JNb3ZlTGVmdCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGltZXIgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkVmFyID0gdGhpcy4kc2NvcGUuY3VycmVudFdvcmQudHJhbnNsYXRlVmFyaWFudHMuZmlsdGVyKHYgPT4gdi52YXJpYW50ID09PSB2YXJpYW50KVswXTtcclxuICAgICAgICAgICAgaWYgKCFzZWxlY3RlZFZhcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luY29ycmVjdCB2YXIgc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFyLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLmRvTW92ZSh0aGlzLnVzZXJOdW0sIHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkLndvcmQsIHZhcmlhbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgobW92ZVJlc3VsdDpNb2RlbHMuTW92ZVJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZShtb3ZlUmVzdWx0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBoYW5kbGVNb3ZlKG1vdmVSZXM6IE1vZGVscy5Nb3ZlUmVzdWx0LCBpc0N1cnJlbnRVc2VyTW92ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRVc2VyU2NvcmUgPSB0aGlzLnVzZXJOdW0gPT09IDEgPyB0aGlzLmdhbWVJbmZvLnVzZXIxU2NvcmUgOiB0aGlzLmdhbWVJbmZvLnVzZXIyU2NvcmU7XHJcbiAgICAgICAgICAgIHZhciB1c2VyMlNjb3JlID0gdGhpcy51c2VyTnVtID09PSAxID8gdGhpcy5nYW1lSW5mby51c2VyMlNjb3JlIDogdGhpcy5nYW1lSW5mby51c2VyMVNjb3JlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gaXNDdXJyZW50VXNlck1vdmUgPyBjdXJyZW50VXNlclNjb3JlIDogdXNlcjJTY29yZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbW92ZVJlcy5pc0NvcnJlY3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobW92ZVJlcy5lcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmVSZXMuaXNTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZS5zdWNjZXNzZnVsTW92ZXMrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlLndyb25nTW92ZXMrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1vdmVSZXMuc2VsZWN0ZWRWYXJpYW50SW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50V29yZC50cmFuc2xhdGVWYXJpYW50c1ttb3ZlUmVzLnNlbGVjdGVkVmFyaWFudEluZGV4XS5pc1NlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlck51bSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFVzZXJTY29yZSA9IHRoaXMuZ2FtZUluZm8udXNlcjFTY29yZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnVzZXIyU2NvcmUgPSB0aGlzLmdhbWVJbmZvLnVzZXIyU2NvcmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50VXNlclNjb3JlID0gdGhpcy5nYW1lSW5mby51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUudXNlcjJTY29yZSA9IHRoaXMuZ2FtZUluZm8udXNlcjFTY29yZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pc0N1cnJlbnRVc2VyTW92ZSA9ICFpc0N1cnJlbnRVc2VyTW92ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIGlmIChpc0N1cnJlbnRVc2VyTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXNzZWRXb3JkID0gbmV3IE1vZGVscy5QYXNzZWRXb3JkSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhc3NlZFdvcmQud29yZCA9IHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkLndvcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc2VkV29yZC5hbnN3ZXIgPSB0aGlzLiRzY29wZS5jdXJyZW50V29yZC50cmFuc2xhdGVWYXJpYW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGkgPT4gaS5pc1RydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaGlmdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC52YXJpYW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHBhc3NlZFdvcmQud2FzUGFzc2VkID0gbW92ZVJlcy5pc1N1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGFzc2VkV29yZHMucHVzaChwYXNzZWRXb3JkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRnJvbUFycmF5SWYoYXJyOiBBcnJheTxNb2RlbHMuV29yZD4sIGNhbGxiYWNrOiAoYXJnOiBNb2RlbHMuV29yZCwgaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycltpXSwgaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFdvcmQgPSB0aGlzLmdhbWVJbmZvLndvcmRzW3RoaXMuJHNjb3BlLmN1cnJlbnRXb3JkSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYXJpbmF0c09yZGVyKCk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVGcm9tQXJyYXlJZih0aGlzLiRzY29wZS5sZWZ0V29yZHMsIHcgPT4gdy53b3JkID09PSB0aGlzLiRzY29wZS5jdXJyZW50V29yZC53b3JkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobW92ZVJlcy5pc0xhc3RNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuaGFuZGxlR2FtZUZpbmlzaGVkKHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUuc3VjY2Vzc2Z1bE1vdmVzID4gdGhpcy4kc2NvcGUudXNlcjJTY29yZS5zdWNjZXNzZnVsTW92ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUuc3VjY2Vzc2Z1bE1vdmVzID09IHRoaXMuJHNjb3BlLnVzZXIyU2NvcmUuc3VjY2Vzc2Z1bE1vdmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2V0R2FtZUluZm8oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMDAsIHRydWUpOyAvLyBkZWxheSB0byBsZXQgdXNlciBzZWUgdGhlIHJlc3VsdCBvZiBtb3ZlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgc2V0VmFyaW5hdHNPcmRlcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLiRzY29wZS5jdXJyZW50V29yZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50V29yZC50cmFuc2xhdGVWYXJpYW50cy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlLm9yZGVyID0gaW5kZXggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoQ29tbW9uLkdldENvbnN0YW50cygpLmFwcE5hbWUpLmNvbnRyb2xsZXIoXCJjb250cm9sbGVycy5HYW1lQ29udHJvbGxlclwiLCBHYW1lQ29udHJvbGxlcik7XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAudHNcIiAvPlxyXG5pbnRlcmZhY2UgUG9pbnQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG59O1xyXG5cclxuLy8gQXBwLkdldEFwcCgpLmFuaW1hdGlvbignLndvcmRzLWxlZnQtaXRlbScsIGZ1bmN0aW9uKCk6YW5ndWxhci5hbmltYXRlLklBbmltYXRlQ2FsbGJhY2tPYmplY3Qge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBsZWF2ZTogZnVuY3Rpb24oZWxlbWVudDogSlF1ZXJ5LCBkb25lOiBGdW5jdGlvbikge1xyXG4vLyAgICAgICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICB2YXIgdGFyZ2V0UG9zID0gZ2V0V29yZENvbnRhaW5lclBvc3Rpb24oKTtcclxuLy8gICAgICAgICAgICAgLy8gJGVsZW1lbnQuYW5pbWF0ZSh7XHJcbi8vICAgICAgICAgICAgIC8vICAgICBvcGFzaXR5OiAwLFxyXG4vLyAgICAgICAgICAgICAvLyAgICAgdG9wOiB0YXJnZXRQb3MueSxcclxuLy8gICAgICAgICAgICAgLy8gICAgIGxlZnQ6IHRhcmdldFBvcy54XHJcbi8vICAgICAgICAgICAgIC8vIH0sIGRvbmUpO1xyXG4vLyAgICAgICAgICAgICBkb25lKCk7XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oaXNDYW5jZWxsZWQ6IGJvb2xlYW4pIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChpc0NhbmNlbGxlZCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnN0b3AoKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH07XHJcbi8vIH0pXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0V29yZENvbnRhaW5lclBvc3Rpb24oKTogUG9pbnQge1xyXG4gICAgbGV0ICRlbGVtZW50ID0gJCgnI3dvcmQtZWxlbWVudCcpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogJGVsZW1lbnQub2Zmc2V0KCkubGVmdCxcclxuICAgICAgICB5OiAkZWxlbWVudC5vZmZzZXQoKS50b3BcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4kKCgpID0+IHtcclxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjcwMDAwMC9ob3ctdG8tZGlzYWJsZS10ZXh0LXNlbGVjdGlvbi11c2luZy1qcXVlcnlcclxuICAgICQoJyN3b3JkLCAud29yZC1sZWZ0LWl0ZW0tY2FwdGlvbicpLmF0dHIoJ3Vuc2VsZWN0YWJsZScsJ29uJylcclxuICAgICAuY3NzKHsnLW1vei11c2VyLXNlbGVjdCc6Jy1tb3otbm9uZScsXHJcbiAgICAgICAgICAgJy1vLXVzZXItc2VsZWN0Jzonbm9uZScsXHJcbiAgICAgICAgICAgJy1raHRtbC11c2VyLXNlbGVjdCc6J25vbmUnLCAvKiB5b3UgY291bGQgYWxzbyBwdXQgdGhpcyBpbiBhIGNsYXNzICovXHJcbiAgICAgICAgICAgJy13ZWJraXQtdXNlci1zZWxlY3QnOidub25lJywvKiBhbmQgYWRkIHRoZSBDU1MgY2xhc3MgaGVyZSBpbnN0ZWFkICovXHJcbiAgICAgICAgICAgJy1tcy11c2VyLXNlbGVjdCc6J25vbmUnLFxyXG4gICAgICAgICAgICd1c2VyLXNlbGVjdCc6J25vbmUnXHJcbiAgICAgfSkuYmluZCgnc2VsZWN0c3RhcnQnLCBmdW5jdGlvbigpeyByZXR1cm4gZmFsc2U7IH0pO1xyXG59KSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4kKCgpID0+IHtcclxuICAgICQoZG9jdW1lbnQpLmtleXByZXNzKGUgPT4ge1xyXG4gICAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xyXG4gICAgICAgICAgICAkKFwiLmJ0bi1zdWJtaXQ6dmlzaWJsZVwiKS5maXJzdCgpLmNsaWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLndoaWNoID49IDQ4ICYmIGUud2hpY2ggPD0gNTcpIHtcclxuICAgICAgICAgICAgbGV0IG51bVByZXNzZWQgPSBlLndoaWNoIC0gNDg7XHJcbiAgICAgICAgICAgICQoJy50cmFuc2xhdGVWYXJpYW50OnZpc2libGUnKS5maWx0ZXIoKGluZGV4LCBlbGVtKSA9PiAkKGVsZW0pLmRhdGEoJ29yZGVyJykgPT09IG51bVByZXNzZWQpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLmNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4kKCgpID0+IHtcclxuICAgICQoJyN1c2VyMnZhcmlhbnRzJykuYmluZCgnRE9NTm9kZUluc2VydGVkJywgKCkgPT4gKCQoJy50cmFuc2xhdGVWYXJpYW50Lm5vaG92ZXInKSBhcyBhbnkpLnRvb2x0aXAoKSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
