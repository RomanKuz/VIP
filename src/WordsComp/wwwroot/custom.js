/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/signalr/index.d.ts" />
/// <reference path="../../typings/globals/es6-shim/index.d.ts" />
/// <reference path="../../typings/globals/angular-ui-bootstrap/index.d.ts" />
/// <reference path="../../typings/globals/rx/rx.d.ts" />
/// <reference path="../../typings/globals/rx.angular/index.d.ts" />
/// <reference path="../../typings/globals/angular-animate/index.d.ts" />
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
var Services;
(function (Services) {
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
            promise.done(function () {
                if (_this.startGameModalInstance) {
                    _this.startGameModalInstance.close();
                    _this.startGameModalInstance = null;
                    _this.callInDigestLoop(function () {
                        _this.$rootScope.addedToGroupPromise = _this.addedToGroupObservable
                            .take(1)
                            .toPromise();
                        _this.groupFulledObservable
                            .take(1)
                            .subscribe(function () {
                            _this.callInDigestLoop(function () {
                                _this.$rootScope.loadingGamePromise = Rx.Observable.merge(_this.userLeftGroupObservable.take(1), _this.gameStartedObservable.take(1))
                                    .take(1)
                                    .toPromise();
                            });
                        });
                        _this.$rootScope.user2ConnectedPromise = _this.groupFulledObservable
                            .take(1)
                            .toPromise();
                        _this.$rootScope.isStartGamePage = true;
                    });
                }
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
            this.callInDigestLoop(function () {
                _this.groupFulledObservable.onNext({});
            });
        };
        StateHandlerService.prototype.handleGameStarted = function () {
            var _this = this;
            this.callInDigestLoop(function () {
                _this.$rootScope.isStartGamePage = true;
                _this.gameStartedObservable.onNext({});
                if (_this.startGameModalInstance) {
                    _this.startGameModalInstance.close();
                    _this.startGameModalInstance = null;
                }
            });
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
        function GameController(connectionHubService, $scope, stateHandler, $interval) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$interval = $interval;
            this.secondsForMove = 10;
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
                _this.$scope.isCurrentUserMove = true;
                _this.handleMove(moveRes, false);
            });
        };
        GameController.prototype.passMove = function () {
            var _this = this;
            this.connectionHubService.passMove(this.userNum)
                .done(function (moveResult) {
                _this.$scope.$apply(function () {
                    _this.$scope.isCurrentUserMove = false;
                    _this.handleMove(moveResult, true);
                });
            });
        };
        GameController.prototype.doMove = function (variant) {
            var _this = this;
            this.stopTimer();
            if (this.$scope.secondsForMoveLeft === 0) {
                // should be handled by timer callback
                return;
            }
            this.connectionHubService.doMove(this.userNum, this.$scope.currentWord.word, variant)
                .done(function (moveResult) {
                _this.$scope.$apply(function () {
                    _this.$scope.isCurrentUserMove = false;
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
            if (this.userNum === 1) {
                this.$scope.currentUserScore = this.gameInfo.user1Score;
                this.$scope.user2Score = this.gameInfo.user2Score;
            }
            else {
                this.$scope.currentUserScore = this.gameInfo.user2Score;
                this.$scope.user2Score = this.gameInfo.user1Score;
            }
            this.$scope.currentWordIndex++;
            if (isCurrentUserMove) {
                var passedWord = new Models.PassedWordInfo();
                passedWord.word = this.$scope.currentWord.word;
                passedWord.answer = this.$scope.currentWord.translateVariants
                    .filter(function (i) { return i.isTrue; })
                    .shift()
                    .variant;
                passedWord.wasPassed = moveRes.isSuccessful;
                this.$scope.passedWords.push(passedWord);
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
            this.$scope.currentWord = this.gameInfo.words[this.$scope.currentWordIndex];
            removeFromArrayIf(this.$scope.leftWords, function (w) { return w.word === _this.$scope.currentWord.word; });
            if (moveRes.isLastMove) {
                this.stateHandler.handleGameFinished(this.$scope.currentUserScore.successfulMoves > this.$scope.user2Score.successfulMoves, this.$scope.currentUserScore.successfulMoves == this.$scope.user2Score.successfulMoves);
                this.unsetGameInfo();
            }
            else {
                this.startTimer();
            }
        };
        GameController.$inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$interval"];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd3d3Jvb3QvdHNjcmlwdHMvY29tbW9uLnRzIiwid3d3cm9vdC90c2NyaXB0cy9hcHAudHMiLCJ3d3dyb290L3RzY3JpcHRzL21vZGVscy9Vc2VyLnRzIiwid3d3cm9vdC90c2NyaXB0cy9tb2RlbHMvZ3JvdXAudHMiLCJ3d3dyb290L3RzY3JpcHRzL21vZGVscy9zY29yZS50cyIsInd3d3Jvb3QvdHNjcmlwdHMvbW9kZWxzL3RyYW5zbGF0ZVZhcmlhbnQudHMiLCJ3d3dyb290L3RzY3JpcHRzL21vZGVscy93b3JkLnRzIiwid3d3cm9vdC90c2NyaXB0cy9tb2RlbHMvZ2FtZS50cyIsInd3d3Jvb3QvdHNjcmlwdHMvbW9kZWxzL2dhbWVSZXN1bHQudHMiLCJ3d3dyb290L3RzY3JpcHRzL21vZGVscy9tb3ZlUmVzdWx0LnRzIiwid3d3cm9vdC90c2NyaXB0cy9tb2RlbHMvcGFzc2VkV29yZEluZm8udHMiLCJ3d3dyb290L3RzY3JpcHRzL21vZGVscy9sZXZlbC50cyIsInd3d3Jvb3QvdHNjcmlwdHMvbW9kZWxzL21vZGVscy50cyIsInd3d3Jvb3QvdHNjcmlwdHMvaW50ZXJmYWNlcy9pQ29ubmVjdFRvR2FtZS50cyIsInd3d3Jvb3QvdHNjcmlwdHMvaW50ZXJmYWNlcy9pQ29ubmVjdFRvR2FtZVNjb3BlLnRzIiwid3d3cm9vdC90c2NyaXB0cy9pbnRlcmZhY2VzL2lHYW1lRmluaXNoZWRNb2RhbFdpbmRvd1Njb3BlLnRzIiwid3d3cm9vdC90c2NyaXB0cy9pbnRlcmZhY2VzL2lHYW1lU2NvcGUudHMiLCJ3d3dyb290L3RzY3JpcHRzL2ludGVyZmFjZXMvaUh1YkNvbm5lY3Rpb24udHMiLCJ3d3dyb290L3RzY3JpcHRzL2ludGVyZmFjZXMvaVJvb3RTY29wZS50cyIsInd3d3Jvb3QvdHNjcmlwdHMvaW50ZXJmYWNlcy50cyIsInd3d3Jvb3QvdHNjcmlwdHMvc2VydmljZXMvY29ubmVjdFRvR2FtZVNlcnZpY2UudHMiLCJ3d3dyb290L3RzY3JpcHRzL3NlcnZpY2VzL2h1YkNvbm5lY3Rpb25TZXJ2aWNlLnRzIiwid3d3cm9vdC90c2NyaXB0cy9zZXJ2aWNlcy9zdGF0ZUhhbmRsZXJTZXJ2aWNlLnRzIiwid3d3cm9vdC90c2NyaXB0cy9jb250cm9sbGVycy9jb25uZWN0aW9uQ29udHJvbGxlci50cyIsInd3d3Jvb3QvdHNjcmlwdHMvY29udHJvbGxlcnMvZ2FtZUNvbnRyb2xsZXIudHMiLCJ3d3dyb290L3RzY3JpcHRzL2FuaW1hdGlvbnMvd29yZHNMZWZ0QW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlFQUFpRTtBQUNqRSxnRUFBZ0U7QUFDaEUsaUVBQWlFO0FBQ2pFLGtFQUFrRTtBQUNsRSw4RUFBOEU7QUFDOUUseURBQXlEO0FBQ3pELG9FQUFvRTtBQUNwRSx5RUFBeUU7QUFDekUsSUFBTyxNQUFNLENBZ0NaO0FBaENELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWDtRQWFJO1lBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUE7WUFDeEIsSUFBSSxDQUFDLDJCQUEyQixHQUFHLFNBQVMsQ0FBQztZQUM3QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7WUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDL0IsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0ExQkEsQUEwQkMsSUFBQTtJQTFCWSxnQkFBUyxZQTBCckIsQ0FBQTtJQUVEO1FBQ0ks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QWlDO0FBQ2pDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsMkJBQTJCO0FBQzNCLHNCQUFzQjtBQUV0QixzREFBc0Q7QUFDdEQscUNBQXFDO0FBQ3JDLHVDQUF1QztBQUN2QyxvQkFBb0I7QUFDcEIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixTQUFTO0FBQ1QsS0FBSztBQUdMO0lBQ0ksSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRWxDLE1BQU0sQ0FBQztRQUNILENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSTtRQUN6QixDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUc7S0FDM0IsQ0FBQTtBQUNMLENBQUMiLCJmaWxlIjoiY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3MvZ2xvYmFscy9hbmd1bGFyL2luZGV4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9nbG9iYWxzL2pxdWVyeS9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3MvZ2xvYmFscy9zaWduYWxyL2luZGV4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9nbG9iYWxzL2VzNi1zaGltL2luZGV4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9nbG9iYWxzL2FuZ3VsYXItdWktYm9vdHN0cmFwL2luZGV4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9nbG9iYWxzL3J4L3J4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9nbG9iYWxzL3J4LmFuZ3VsYXIvaW5kZXguZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2dsb2JhbHMvYW5ndWxhci1hbmltYXRlL2luZGV4LmQudHNcIiAvPlxyXG5tb2R1bGUgQ29tbW9uIHtcclxuICAgIGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG4gICAgICAgIHB1YmxpYyBhcHBOYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGh1YkNvbm5lY3RUb0dyb3VwTWV0aG9kTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBjb25uZWN0ZWRUb0dyb3VwOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGxlZnRHcm91cDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBncm91cEZ1bGxlZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBjb21wZXRpdGlvbkh1Yjogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBnYW1lU3RhcnRlZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBkaWRNb3ZlOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGdhbWVGaW5pc2hlZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBkb01vdmU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgcGFzc01vdmU6IHN0cmluZztcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwTmFtZSA9IFwiZ2FtZUFwcFwiXHJcbiAgICAgICAgICAgIHRoaXMuaHViQ29ubmVjdFRvR3JvdXBNZXRob2ROYW1lID0gXCJjb25uZWN0XCI7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkVG9Hcm91cCA9IFwidXNlckFkZGVkXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdEdyb3VwID0gXCJ1c2VyTGVmdFwiO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwRnVsbGVkID0gXCJncm91cEZ1bGxlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBldGl0aW9uSHViID0gXCJjb21wZXRpdGlvbkh1YlwiO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGFydGVkID0gXCJnYW1lU3RhcnRlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmRpZE1vdmUgPSBcImRpZE1vdmVcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lRmluaXNoZWQgPSBcImdhbWVGaW5pc2hlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmRvTW92ZSA9IFwiZG9Nb3ZlXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGFzc01vdmUgPSBcInBhc3NNb3ZlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gIEdldENvbnN0YW50cygpOiBDb25zdGFudHMge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RhbnRzKCk7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiY29tbW9uLnRzXCIgLz5cclxubW9kdWxlIEFwcCB7XHJcbiAgICB2YXIgY29uc3RhbnRzID0gQ29tbW9uLkdldENvbnN0YW50cygpO1xyXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKGNvbnN0YW50cy5hcHBOYW1lLCBbJ3VpLmJvb3RzdHJhcC5tb2RhbCcsJ2NnQnVzeScsICduZ0FuaW1hdGUnXSk7XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEFwcCgpOiBuZy5JTW9kdWxlIHtcclxuICAgICAgICByZXR1cm4gYXBwO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgVXNlciB7XHJcbiAgICAgICAgcHVibGljIHVzZXJJZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vVXNlci50c1wiIC8+XHJcbm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdyb3VwIHtcclxuICAgICAgICBwdWJsaWMgZ3JvdXBJZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgdXNlcnNMaXN0OiBBcnJheTxNb2RlbHMuVXNlcj5cclxuICAgIH1cclxufSIsIm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIFNjb3JlIHtcclxuICAgICAgICBwdWJsaWMgc3VjY2Vzc2Z1bE1vdmVzOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB3cm9uZ01vdmVzOiBudW1iZXI7XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBUcmFuc2xhdGVWYXJpYW50IHtcclxuICAgICAgICBwdWJsaWMgdmFyaWFudDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgaXNUcnVlOiBib29sZWFuO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHJhbnNsYXRlVmFyaWFudC50c1wiIC8+XHJcbm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIFdvcmQge1xyXG4gICAgICAgIHB1YmxpYyB3b3JkOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyB0cmFuc2xhdGVWYXJpYW50czogQXJyYXk8VHJhbnNsYXRlVmFyaWFudD5cclxuXHJcbiAgICAgICAgcHVibGljIGV4cGxhbmF0aW9uUXVvdGVzOiBBcnJheTxzdHJpbmc+XHJcblxyXG4gICAgICAgIHB1YmxpYyBkZWZpbml0aW9uOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzaG9ydFdvcmRSZXByZXNlbnRhdGlvbjogc3RyaW5nO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vc2NvcmUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi93b3JkLnRzXCIgLz5cclxubW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICAgICAgcHVibGljIHVzZXIxOiBVc2VyO1xyXG5cclxuICAgICAgICBwdWJsaWMgdXNlcjI6IFVzZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjdXJyZW50TW92ZTogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgd29yZHM6IEFycmF5PFdvcmQ+XHJcblxyXG4gICAgICAgIHB1YmxpYyB1c2VyMVNjb3JlOiBTY29yZTtcclxuXHJcbiAgICAgICAgcHVibGljIHVzZXIyU2NvcmU6IFNjb3JlO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIE1vZGVscyB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVJlc3VsdCB7XHJcbiAgICAgICAgcHVibGljIHdpbm5lcjogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgaXNEcmF3OiBib29sZWFuO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZ2FtZVJlc3VsdC50c1wiIC8+XHJcbm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1vdmVSZXN1bHQge1xyXG4gICAgICAgIHB1YmxpYyBpc1N1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0NvcnJlY3Q6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIGlzTGFzdE1vdmU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBnYW1lUmVzdWx0OiBNb2RlbHMuR2FtZVJlc3VsdDtcclxuICAgIH1cclxufSIsIm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIFBhc3NlZFdvcmRJbmZvIHtcclxuICAgICAgICBwdWJsaWMgd29yZDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBhbnN3ZXI6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIHdhc1Bhc3NlZDogYm9vbGVhbjtcclxuICAgIH1cclxufSIsIm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGVudW0gTGV2ZWwge1xyXG4gICAgICAgIEJlZ2luZXIgPSAxLFxyXG5cclxuICAgICAgICBJbnRlcm1lZGlhdGUgPSAyLFxyXG5cclxuICAgICAgICBBZHZhbmNlZCA9IDNcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElMZXZlbE5hbWVQYWlyIHtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgbGV2ZWw6IE1vZGVscy5MZXZlbDtcclxuICAgIH1cclxufSIsIi8vIFVzZWQgdG8gcmVmZXJlbmNlIG1vZGVsIGZpbGVzXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1VzZXIudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Hcm91cC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2dhbWUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9tb3ZlUmVzdWx0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZ2FtZVJlc3VsdC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3Bhc3NlZFdvcmRJbmZvLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vbGV2ZWwudHNcIiAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9kZWxzL21vZGVscy50c1wiIC8+XHJcbm1vZHVsZSBJbnRlcmZhY2VzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNvbm5lY3RUb0dhbWUge1xyXG4gICAgICAgIGNvbm5lY3RUb0h1YjogKCkgPT4gSlF1ZXJ5UHJvbWlzZTxhbnk+O1xyXG5cclxuICAgICAgICBjb25uZWN0VG9OZXdHcm91cDogKGRpc3BsYXlOYW1lOiBzdHJpbmcsIGxldmVsOiBNb2RlbHMuTGV2ZWwpID0+IEpRdWVyeVByb21pc2U8YW55PlxyXG5cclxuICAgICAgICBkb01vdmU6IChtb3ZlT3JkZXI6IG51bWJlciwgd29yZDogc3RyaW5nLCB2YXJpYW50OnN0cmluZykgPT4gSlF1ZXJ5UHJvbWlzZTxNb2RlbHMuTW92ZVJlc3VsdD5cclxuXHJcbiAgICAgICAgcGFzc01vdmU6IChtb3ZlT3JkZXI6IG51bWJlcikgPT4gSlF1ZXJ5UHJvbWlzZTxNb2RlbHMuTW92ZVJlc3VsdD5cclxuXHJcbiAgICAgICAgb25Db25uZWN0ZWRUb0dyb3VwOiAoY2FsbEJhY2s6KHVzZXJJZDogc3RyaW5nKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBvbkdyb3VwRnVsbGVkOiAoY2FsbEJhY2s6KGdyb3VwOiBNb2RlbHMuR3JvdXApID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIG9uVXNlckxlZnQ6IChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgZ2FtZVN0YXJ0ZWQ6IChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5HYW1lKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBkaWRNb3ZlOiAoY2FsbEJhY2s6KG1vdmVSZXM6IE1vZGVscy5Nb3ZlUmVzdWx0KSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBnYW1lRmluaXNoZWQ6IChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5HYW1lKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbm1vZHVsZSBJbnRlcmZhY2VzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNvbm5lY3RUb0dhbWVTY29wZSBleHRlbmRzIG5nLklTY29wZSB7XHJcbiAgICAgICAgY29ubmVjdFRvR3JvdXA6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIGNvbm5lY3RUb0dyb3VwUHJvbWlzZTogSlF1ZXJ5UHJvbWlzZTxhbnk+O1xyXG5cclxuICAgICAgICBsZXZlbHM6IEFycmF5PE1vZGVscy5JTGV2ZWxOYW1lUGFpcj47XHJcbiAgICAgICAgY2hhbmdlTGV2ZWw6IChsZXZlbDogTW9kZWxzLklMZXZlbE5hbWVQYWlyKSA9PiB2b2lkO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbm1vZHVsZSBJbnRlcmZhY2VzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdhbWVGaW5pc2hlZE1vZGFsV2luZG93U2NvcGUgZXh0ZW5kcyBuZy5JU2NvcGUge1xyXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuXHJcbiAgICAgICAgcGxheUFnYWluOiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIGNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RlbHMvbW9kZWxzLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR2FtZVNjb3BlIGV4dGVuZHMgbmcuSVNjb3BlIHtcclxuICAgICAgICBjdXJyZW50VXNlclNjb3JlOiBNb2RlbHMuU2NvcmU7XHJcblxyXG4gICAgICAgIHVzZXIyU2NvcmU6IE1vZGVscy5TY29yZTtcclxuXHJcbiAgICAgICAgdXNlcjJEaXNwbGF5TmFtZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjdXJyZW50V29yZDogTW9kZWxzLldvcmQ7XHJcblxyXG4gICAgICAgIGN1cnJlbnRXb3JkSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICAgICAgZG9Nb3ZlOiAodmFyaWFudDogc3RyaW5nKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBpc0N1cnJlbnRVc2VyTW92ZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcGFzc2VkV29yZHM6IEFycmF5PE1vZGVscy5QYXNzZWRXb3JkSW5mbz47XHJcbiAgICAgICAgbGVmdFdvcmRzOiBBcnJheTxNb2RlbHMuV29yZD47XHJcblxyXG4gICAgICAgIHNlY29uZHNGb3JNb3ZlTGVmdDogbnVtYmVyO1xyXG4gICAgICAgIHBlcmNlbnRhZ2VzTGVmdDogbnVtYmVyO1xyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbm1vZHVsZSBJbnRlcmZhY2VzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUh1YkNvbm5lY3Rpb24ge1xyXG4gICAgICAgIGdldENvbm5lY3Rpb246ICgpID0+IFNpZ25hbFIuSHViLkNvbm5lY3Rpb25cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9kZWxzL21vZGVscy50c1wiIC8+XHJcbm1vZHVsZSBJbnRlcmZhY2VzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVJvb3RTY29wZSBleHRlbmRzIG5nLklTY29wZSB7XHJcbiAgICAgICAgY29ubmVjdFRvSHViUHJvbWlzZTogSlF1ZXJ5UHJvbWlzZTxhbnk+O1xyXG4gICAgICAgIGxvYWRpbmdHYW1lUHJvbWlzZTogUHJvbWlzZTxhbnk+O1xyXG4gICAgICAgIGFkZGVkVG9Hcm91cFByb21pc2U6IFByb21pc2U8YW55PjtcclxuICAgICAgICB1c2VyMkNvbm5lY3RlZFByb21pc2U6IFByb21pc2U8YW55PjtcclxuXHJcbiAgICAgICAgaXNTdGFydEdhbWVQYWdlOiBib29sZWFuO1xyXG5cclxuICAgICAgICB1c2VySWQ6IHN0cmluZztcclxuICAgICAgICBkaXNwbGF5TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGxldmVsOiBNb2RlbHMuSUxldmVsTmFtZVBhaXI7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbnRlcmZhY2VzL2lDb25uZWN0VG9HYW1lLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pQ29ubmVjdFRvR2FtZVNjb3BlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pSHViQ29ubmVjdGlvbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaVJvb3RTY29wZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaUdhbWVTY29wZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaVN0YXRlSGFuZGxlci50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaUdhbWVGaW5pc2hlZE1vZGFsV2luZG93U2NvcGUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9tb2RlbHMvbW9kZWxzLnRzXCIgLz4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW50ZXJmYWNlcy50c1wiIC8+XHJcbm1vZHVsZSBTZXJ2aWNlcyB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ29ubmVjdFRvR2FtZVNlcnZpY2UgaW1wbGVtZW50cyBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lIHtcclxuICAgICAgICBwcml2YXRlIGh1YjogU2lnbmFsUi5IdWIuUHJveHk7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBTaWduYWxSLkh1Yi5Db25uZWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgY29uc3RhbnRzOiBDb21tb24uQ29uc3RhbnRzO1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtcIlNlcnZpY2VzLkh1YkNvbm5lY3Rpb25TZXJ2aWNlXCJdO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGh1YkNvbm5lY3Rpb25TZXJ2aWNlOiBJbnRlcmZhY2VzLklIdWJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc3RhbnRzID0gQ29tbW9uLkdldENvbnN0YW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBodWJDb25uZWN0aW9uU2VydmljZS5nZXRDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaHViID0gdGhpcy5jb25uZWN0aW9uLmNyZWF0ZUh1YlByb3h5KHRoaXMuY29uc3RhbnRzLmNvbXBldGl0aW9uSHViKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25uZWN0VG9IdWIoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHViLmNvbm5lY3Rpb24uc3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb01vdmUobW92ZU9yZGVyOiBudW1iZXIsIHdvcmQ6IHN0cmluZywgdmFyaWFudDpzdHJpbmcpOiBKUXVlcnlQcm9taXNlPE1vZGVscy5Nb3ZlUmVzdWx0PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh1Yi5pbnZva2UodGhpcy5jb25zdGFudHMuZG9Nb3ZlLCBtb3ZlT3JkZXIsIHdvcmQsIHZhcmlhbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHBhc3NNb3ZlKG1vdmVPcmRlcjogbnVtYmVyKTogSlF1ZXJ5UHJvbWlzZTxNb2RlbHMuTW92ZVJlc3VsdD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odWIuaW52b2tlKHRoaXMuY29uc3RhbnRzLnBhc3NNb3ZlLCBtb3ZlT3JkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbm5lY3RUb05ld0dyb3VwKGRpc3BsYXlOYW1lOiBzdHJpbmcsIGxldmVsOiBNb2RlbHMuTGV2ZWwpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odWIuaW52b2tlKHRoaXMuY29uc3RhbnRzLmh1YkNvbm5lY3RUb0dyb3VwTWV0aG9kTmFtZSwgZGlzcGxheU5hbWUsIGxldmVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbm5lY3RlZFRvR3JvdXAoY2FsbEJhY2s6KHVzZXJJZDogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaHViLm9uKHRoaXMuY29uc3RhbnRzLmNvbm5lY3RlZFRvR3JvdXAsIChtc2cpID0+IGNhbGxCYWNrKG1zZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uR3JvdXBGdWxsZWQoY2FsbEJhY2s6KGdyb3VwOiBNb2RlbHMuR3JvdXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5odWIub24odGhpcy5jb25zdGFudHMuZ3JvdXBGdWxsZWQsIChtc2cpID0+IGNhbGxCYWNrKG1zZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uVXNlckxlZnQoY2FsbEJhY2s6KGdyb3VwOiBNb2RlbHMuR3JvdXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5odWIub24odGhpcy5jb25zdGFudHMubGVmdEdyb3VwLCAobXNnKSA9PiBjYWxsQmFjayhtc2dbMF0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnYW1lU3RhcnRlZChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5HYW1lKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaHViLm9uKHRoaXMuY29uc3RhbnRzLmdhbWVTdGFydGVkLCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjayhtc2cpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkaWRNb3ZlKGNhbGxCYWNrOihtb3ZlUmVzOiBNb2RlbHMuTW92ZVJlc3VsdCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5kaWRNb3ZlLCAobXNnKSA9PiBjYWxsQmFjayhtc2cpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnYW1lRmluaXNoZWQoY2FsbEJhY2s6KGdyb3VwOiBNb2RlbHMuR2FtZSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5nYW1lRmluaXNoZWQsIChtc2cpID0+IGNhbGxCYWNrKG1zZ1swXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZShDb21tb24uR2V0Q29uc3RhbnRzKCkuYXBwTmFtZSkuc2VydmljZShcIlNlcnZpY2VzLkNvbm5lY3RUb0dhbWVTZXJ2aWNlXCIsIENvbm5lY3RUb0dhbWVTZXJ2aWNlKTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxubW9kdWxlIFNlcnZpY2VzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBIdWJDb25uZWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIEludGVyZmFjZXMuSUh1YkNvbm5lY3Rpb24ge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNvbm5lY3Rpb246IFNpZ25hbFIuSHViLkNvbm5lY3Rpb247XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDb25uZWN0aW9uKCk6IFNpZ25hbFIuSHViLkNvbm5lY3Rpb24ge1xyXG4gICAgICAgICAgICBpZiAoIUh1YkNvbm5lY3Rpb25TZXJ2aWNlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIEh1YkNvbm5lY3Rpb25TZXJ2aWNlLmNvbm5lY3Rpb24gPSAkLmh1YkNvbm5lY3Rpb24oXCIvc2lnbmFsclwiLCB7IHVzZURlZmF1bHRQYXRoOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIEh1YkNvbm5lY3Rpb25TZXJ2aWNlLmNvbm5lY3Rpb24ubG9nZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEh1YkNvbm5lY3Rpb25TZXJ2aWNlLmNvbm5lY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYW5ndWxhci5tb2R1bGUoQ29tbW9uLkdldENvbnN0YW50cygpLmFwcE5hbWUpLnNlcnZpY2UoXCJTZXJ2aWNlcy5IdWJDb25uZWN0aW9uU2VydmljZVwiLCBIdWJDb25uZWN0aW9uU2VydmljZSk7XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW50ZXJmYWNlcy50c1wiIC8+XHJcbm1vZHVsZSBTZXJ2aWNlcyB7XHJcbiAgICBpbnRlcmZhY2UgSU1vZGFsU2V0dGluZ3MgZXh0ZW5kcyBuZy51aS5ib290c3RyYXAuSU1vZGFsU2V0dGluZ3Mge1xyXG5cclxuICAgICAgICAvKiogU2V0cyB0aGUgYXJpYS1kZXNjcmliZWRieSBwcm9wZXJ0eSBvbiB0aGUgbW9kYWwuIFxyXG4gICAgICAgICAqIFRoZSB2YWx1ZSBzaG91bGQgYmUgYW4gaWQgKHdpdGhvdXQgdGhlIGxlYWRpbmcgIykgcG9pbnRpbmcgdG8gdGhlIGVsZW1lbnQgdGhhdCBkZXNjcmliZXMgeW91ciBtb2RhbC4gXHJcbiAgICAgICAgICogVHlwaWNhbGx5LCB0aGlzIHdpbGwgYmUgdGhlIHRleHQgb24geW91ciBtb2RhbCxcclxuICAgICAgICAgKiAgYnV0IGRvZXMgbm90IGluY2x1ZGUgc29tZXRoaW5nIHRoZSB1c2VyIHdvdWxkIGludGVyYWN0IHdpdGgsIFxyXG4gICAgICAgICAqIGxpa2UgYnV0dG9ucyBvciBhIGZvcm0uIFxyXG4gICAgICAgICAqIE9taXR0aW5nIHRoaXMgb3B0aW9uIHdpbGwgbm90IGltcGFjdCBzaWdodGVkIHVzZXJzIGJ1dCB3aWxsIHdlYWtlbiB5b3VyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC4gKi9cclxuICAgICAgICBhcmlhRGVzY3JpYmVkQnk6IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqIFNldHMgdGhlIGFyaWEtbGFiZWxsZWRieSBwcm9wZXJ0eSBvbiB0aGUgbW9kYWwuIFxyXG4gICAgICAgICAqIFRoZSB2YWx1ZSBzaG91bGQgYmUgYW4gaWQgKHdpdGhvdXQgdGhlIGxlYWRpbmcgIykgcG9pbnRpbmcgdG8gdGhlIGVsZW1lbnQgdGhhdCBsYWJlbHMgeW91ciBtb2RhbC4gXHJcbiAgICAgICAgICogVHlwaWNhbGx5LCB0aGlzIHdpbGwgYmUgYSBoZWFkZXIgZWxlbWVudC4gXHJcbiAgICAgICAgICogT21pdHRpbmcgdGhpcyBvcHRpb24gd2lsbCBub3QgaW1wYWN0IHNpZ2h0ZWQgdXNlcnMgYnV0IHdpbGwgd2Vha2VuIHlvdXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LiAqL1xyXG4gICAgICAgIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlSGFuZGxlclNlcnZpY2UgaW1wbGVtZW50cyBJbnRlcmZhY2VzLklTdGF0ZUhhbmRsZXIge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3RhbnRzOiBDb21tb24uQ29uc3RhbnRzO1xyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogSW50ZXJmYWNlcy5JUm9vdFNjb3BlO1xyXG4gICAgICAgIHByaXZhdGUgJG1vZGFsOiBhbmd1bGFyLnVpLmJvb3RzdHJhcC5JTW9kYWxTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdFRvR2FtZVNjb3BlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lU2NvcGU7XHJcbiAgICAgICAgcHJpdmF0ZSBncm91cEZ1bGxlZE9ic2VydmFibGU6IFJ4LlN1YmplY3Q8YW55PjtcclxuICAgICAgICBwcml2YXRlIGFkZGVkVG9Hcm91cE9ic2VydmFibGU6IFJ4LlN1YmplY3Q8YW55PjtcclxuICAgICAgICBwcml2YXRlIHVzZXJMZWZ0R3JvdXBPYnNlcnZhYmxlOiBSeC5TdWJqZWN0PGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSBnYW1lU3RhcnRlZE9ic2VydmFibGU6IFJ4LlN1YmplY3Q8YW55PjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGFydEdhbWVNb2RhbEluc3RhbmNlOiBhbmd1bGFyLnVpLmJvb3RzdHJhcC5JTW9kYWxTZXJ2aWNlSW5zdGFuY2U7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHJvb3RTY29wZVwiLCBcIiR1aWJNb2RhbFwiXTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcigkcm9vdFNjb3BlOiBJbnRlcmZhY2VzLklSb290U2NvcGUsICRtb2RhbDogYW5ndWxhci51aS5ib290c3RyYXAuSU1vZGFsU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnN0YW50cyA9IENvbW1vbi5HZXRDb25zdGFudHMoKTtcclxuICAgICAgICAgICAgdGhpcy4kbW9kYWwgPSAkbW9kYWw7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5pc1N0YXJ0R2FtZVBhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLnVzZXJJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBGdWxsZWRPYnNlcnZhYmxlID0gbmV3IFJ4LlN1YmplY3Q8YW55PigpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZGVkVG9Hcm91cE9ic2VydmFibGUgPSBuZXcgUnguU3ViamVjdDxhbnk+KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckxlZnRHcm91cE9ic2VydmFibGUgPSBuZXcgUnguU3ViamVjdDxhbnk+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXJ0ZWRPYnNlcnZhYmxlID0gbmV3IFJ4LlN1YmplY3Q8YW55PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYWxsSW5EaWdlc3RMb29wKGFjdGlvbjooKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRyb290U2NvcGUuJCRwaGFzZSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd1N0YXJ0R2FtZU1vZGFsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgb3B0ID0ge30gYXMgbmcudWkuYm9vdHN0cmFwLklNb2RhbFNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgb3B0LnNjb3BlID0gdGhpcy5jb25uZWN0VG9HYW1lU2NvcGU7XHJcbiAgICAgICAgICAgICAgICBvcHQudGVtcGxhdGVVcmwgPSBcImNvbm5lY3RUb0dyb3VwLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIG9wdC53aW5kb3dUZW1wbGF0ZVVybCA9IFwid2luZG93VGVtcGxhdGUuaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgb3B0LmJhY2tkcm9wID0gXCJzdGF0aWNcIjtcclxuICAgICAgICAgICAgICAgIG9wdC5rZXlib2FyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgb3B0LmFuaW1hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvcHQuc2l6ZSA9IFwibGdcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZSA9IHRoaXMuJG1vZGFsLm9wZW4ob3B0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd0dhbWVGaW5pc2hlZE1vZGFsV2luZG93KGlzV2luPzogYm9vbGVhbiwgaXNEcmF3PzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoaXNXaW4gPT09IHVuZGVmaW5lZCAmJiBpc0RyYXcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJPbmUgb2YgYm9vbGVhbiBmbGFncyBzaG91bGQgYmUgc3BlY2lmaWVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0VG9HYW1lU2NvcGUgPSB0aGlzLmNvbm5lY3RUb0dhbWVTY29wZTtcclxuICAgICAgICAgICAgdmFyIG9wdCA9IHt9IGFzIG5nLnVpLmJvb3RzdHJhcC5JTW9kYWxTZXR0aW5ncztcclxuICAgICAgICAgICAgICAgIG9wdC5jb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlOiBJbnRlcmZhY2VzLklHYW1lRmluaXNoZWRNb2RhbFdpbmRvd1Njb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBsYXlBZ2FpbiA9IGNvbm5lY3RUb0dhbWVTY29wZS5jb25uZWN0VG9Hcm91cDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRHJhdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiSXQgaXMgZHJhdy4gR29vZCBqb2IgOkQhXFxuRG8geW91IHdhbnQgdG8gcGxheSBhZ2Fpbj9cIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzV2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJDb25ncmF0dWxhdGlvbiEgWW91IGhhdmUgd29uIVxcbkRvIHlvdSB3YW50IHRvIHBsYXkgYWdhaW4/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIllvdSBoYXZlIGxvc3QsIGJ1dCB3aG8gY2FyZXMgOikuIEl0IHdhcyBmdW4uXFxuRG8geW91IHdhbnQgdG8gcGxheSBhZ2Fpbj9cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHQudGVtcGxhdGVVcmwgPSBcImdhbWVGaW5pc2hlZC5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICBvcHQud2luZG93VGVtcGxhdGVVcmwgPSBcIndpbmRvd1RlbXBsYXRlLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIG9wdC5iYWNrZHJvcCA9IFwic3RhdGljXCI7XHJcbiAgICAgICAgICAgICAgICBvcHQua2V5Ym9hcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG9wdC5hbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb3B0LnNpemUgPSBcImxnXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZU1vZGFsSW5zdGFuY2UgPSB0aGlzLiRtb2RhbC5vcGVuKG9wdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0Q29ubmVjdFRvR2FtZVNjb3BlKGNvbm5lY3RUb0dhbWVTY29wZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZVNjb3BlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvR2FtZVNjb3BlID0gY29ubmVjdFRvR2FtZVNjb3BlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUNvbm5lY3Rpb25Ub0dyb3VwKHByb21pc2U6IEpRdWVyeVByb21pc2U8YW55Pik6IHZvaWQge1xyXG4gICAgICAgICAgICBwcm9taXNlLmZhaWwoKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNtdGggYmFkIGhhcHBlbmVkOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwcm9taXNlLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5hZGRlZFRvR3JvdXBQcm9taXNlID0gdGhpcy5hZGRlZFRvR3JvdXBPYnNlcnZhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50YWtlKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKSBhcyBQcm9taXNlPGFueT47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwRnVsbGVkT2JzZXJ2YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRha2UoMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5sb2FkaW5nR2FtZVByb21pc2UgPSBSeC5PYnNlcnZhYmxlLm1lcmdlKHRoaXMudXNlckxlZnRHcm91cE9ic2VydmFibGUudGFrZSgxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhcnRlZE9ic2VydmFibGUudGFrZSgxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGFrZSgxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKSBhcyBQcm9taXNlPGFueT47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS51c2VyMkNvbm5lY3RlZFByb21pc2UgPSB0aGlzLmdyb3VwRnVsbGVkT2JzZXJ2YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50YWtlKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpIGFzIFByb21pc2U8YW55PjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLmlzU3RhcnRHYW1lUGFnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvR2FtZVNjb3BlLmNvbm5lY3RUb0dyb3VwUHJvbWlzZSA9IHByb21pc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZVVzZXJBZGRlZFRvR3JvdXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkZWRUb0dyb3VwT2JzZXJ2YWJsZS5vbk5leHQoe30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUNvbm5lY3Rpb25Ub0h1Yihwcm9taXNlOiBKUXVlcnlQcm9taXNlPGFueT4pOiB2b2lkIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic210aCBiYWQgaGFwcGVuZWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTdGFydEdhbWVNb2RhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuY29ubmVjdFRvSHViUHJvbWlzZSA9IHByb21pc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUdhbWVGaW5pc2hlZChpc1dpbj86IGJvb2xlYW4sIGlzRHJhdz86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5pc1N0YXJ0R2FtZVBhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dhbWVGaW5pc2hlZE1vZGFsV2luZG93KGlzV2luLCBpc0RyYXcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVHcm91cEZ1bGxlZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBGdWxsZWRPYnNlcnZhYmxlLm9uTmV4dCh7fSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgaGFuZGxlR2FtZVN0YXJ0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuaXNTdGFydEdhbWVQYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXJ0ZWRPYnNlcnZhYmxlLm9uTmV4dCh7fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTW9kYWxJbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFVzZXJJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kcm9vdFNjb3BlLnVzZXJJZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRVc2VySWQodXNlcklkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLnVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVVc2VyMkxlZnRHcm91cCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsSW5EaWdlc3RMb29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckxlZnRHcm91cE9ic2VydmFibGUub25OZXh0KHt9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5pc1N0YXJ0R2FtZVBhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N0YXJ0R2FtZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFVzZXJEaXNwbGF5TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kcm9vdFNjb3BlLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZShDb21tb24uR2V0Q29uc3RhbnRzKCkuYXBwTmFtZSkuc2VydmljZShcIlNlcnZpY2VzLlN0YXRlSGFuZGxlclNlcnZpY2VcIiwgU3RhdGVIYW5kbGVyU2VydmljZSk7XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2ludGVyZmFjZXMudHNcIiAvPlxyXG5tb2R1bGUgY29udHJvbGxlcnMge1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbm5lY3RUb0dhbWVDb250cm9sbGVyIHtcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3Rpb25IdWJTZXJ2aWNlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lO1xyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lU2NvcGU7XHJcbiAgICAgICAgcHJpdmF0ZSBncm91cEluZm86IE1vZGVscy5Hcm91cDtcclxuICAgICAgICBwcml2YXRlIHN0YXRlSGFuZGxlcjogSW50ZXJmYWNlcy5JU3RhdGVIYW5kbGVyO1xyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogSW50ZXJmYWNlcy5JUm9vdFNjb3BlO1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtcIlNlcnZpY2VzLkNvbm5lY3RUb0dhbWVTZXJ2aWNlXCIsIFwiJHNjb3BlXCIsIFwiU2VydmljZXMuU3RhdGVIYW5kbGVyU2VydmljZVwiLCBcIiRyb290U2NvcGVcIl07XHJcbiAgICAgICAgY29uc3RydWN0b3IoY29ubmVjdGlvbkh1YlNlcnZpY2U6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWUsICRzY29wZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZVNjb3BlLCBcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZUhhbmRsZXI6IEludGVyZmFjZXMuSVN0YXRlSGFuZGxlcixcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlOiBJbnRlcmZhY2VzLklSb290U2NvcGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZSA9IGNvbm5lY3Rpb25IdWJTZXJ2aWNlO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIgPSBzdGF0ZUhhbmRsZXI7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXdNb2RlbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplVmlld01vZGVsKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLnNldENvbm5lY3RUb0dhbWVTY29wZSh0aGlzLiRzY29wZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLm9uVXNlckxlZnQoZGF0YSA9PiB0aGlzLm9uVXNlckxlZnQuY2FsbCh0aGlzLCBkYXRhKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2Uub25Hcm91cEZ1bGxlZChkYXRhID0+IHRoaXMub25Hcm91cEZ1bGxlZC5jYWxsKHRoaXMsIGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5vbkNvbm5lY3RlZFRvR3JvdXAoZGF0YSA9PiB0aGlzLm9uQ29ubmVjdGVkVG9Hcm91cC5jYWxsKHRoaXMsIGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuY29ubmVjdFRvR3JvdXAgPSAoKSA9PiB0aGlzLmNvbm5lY3RUb0dyb3VwLmFwcGx5KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLmNvbm5lY3RUb0h1YigpLmRvbmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuc2V0VXNlcklkKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZUNvbm5lY3Rpb25Ub0h1Yihwcm9taXNlKTtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUubGV2ZWxzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xldmVsOiBNb2RlbHMuTGV2ZWwuQmVnaW5lciwgbmFtZTogXCLQndC+0LLQsNGH0L7QulwifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsZXZlbDogTW9kZWxzLkxldmVsLkludGVybWVkaWF0ZSwgbmFtZTogXCLQodGA0LXQtNC90LjQuVwifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsZXZlbDogTW9kZWxzLkxldmVsLkFkdmFuY2VkLCBuYW1lOiBcItCS0YvRgdC+0LrQuNC5XCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5sZXZlbCA9IHRoaXMuJHNjb3BlLmxldmVsc1sxXTtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuY2hhbmdlTGV2ZWwgPSAobGV2ZWw6IE1vZGVscy5JTGV2ZWxOYW1lUGFpcikgPT4gdGhpcy4kcm9vdFNjb3BlLmxldmVsID0gbGV2ZWw7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5kaXNwbGF5TmFtZSA9IFwi0KHQu9GD0YfQsNC50L3Ri9C5INC40LPRgNC+0LpcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkdyb3VwRnVsbGVkKGdyb3VwSW5mbzogTW9kZWxzLkdyb3VwKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBJbmZvID0gZ3JvdXBJbmZvO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlci5oYW5kbGVHcm91cEZ1bGxlZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvblVzZXJMZWZ0KGdyb3VwSW5mbzogTW9kZWxzLkdyb3VwKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBJbmZvID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuaGFuZGxlVXNlcjJMZWZ0R3JvdXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdFRvR3JvdXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5jb25uZWN0VG9OZXdHcm91cCh0aGlzLnN0YXRlSGFuZGxlci5nZXRVc2VyRGlzcGxheU5hbWUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS5sZXZlbC5sZXZlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZUNvbm5lY3Rpb25Ub0dyb3VwKHByb21pc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNvbm5lY3RlZFRvR3JvdXAodXNlcklkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhhbmRsZXIuc2V0VXNlcklkKHVzZXJJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZVVzZXJBZGRlZFRvR3JvdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoQ29tbW9uLkdldENvbnN0YW50cygpLmFwcE5hbWUpLmNvbnRyb2xsZXIoXCJjb250cm9sbGVycy5Db25uZWN0VG9HYW1lQ29udHJvbGxlclwiLCBDb25uZWN0VG9HYW1lQ29udHJvbGxlcik7XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxubW9kdWxlIGNvbnRyb2xsZXJzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0aW9uSHViU2VydmljZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZTtcclxuICAgICAgICBwcml2YXRlICRzY29wZTogSW50ZXJmYWNlcy5JR2FtZVNjb3BlO1xyXG4gICAgICAgIHByaXZhdGUgZ2FtZUluZm86IE1vZGVscy5HYW1lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGVIYW5kbGVyOiBJbnRlcmZhY2VzLklTdGF0ZUhhbmRsZXI7XHJcbiAgICAgICAgcHJpdmF0ZSB3b3JkczogQXJyYXk8TW9kZWxzLldvcmQ+XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyTnVtOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSAkaW50ZXJ2YWw6IG5nLklJbnRlcnZhbFNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSBzZWNvbmRzRm9yTW92ZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgdGltZXJQcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+O1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtcIlNlcnZpY2VzLkNvbm5lY3RUb0dhbWVTZXJ2aWNlXCIsIFwiJHNjb3BlXCIsIFwiU2VydmljZXMuU3RhdGVIYW5kbGVyU2VydmljZVwiLCBcIiRpbnRlcnZhbFwiXTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uSHViU2VydmljZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZSwgJHNjb3BlOiBJbnRlcmZhY2VzLklHYW1lU2NvcGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlSGFuZGxlcjogSW50ZXJmYWNlcy5JU3RhdGVIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICRpbnRlcnZhbDogbmcuSUludGVydmFsU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlID0gY29ubmVjdGlvbkh1YlNlcnZpY2U7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSGFuZGxlciA9IHN0YXRlSGFuZGxlcjtcclxuICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwgPSAkaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kc0Zvck1vdmUgPSAxMDtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVmlld01vZGVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemVWaWV3TW9kZWwoKTp2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5nYW1lU3RhcnRlZChkYXRhID0+IHRoaXMuc3RhcnRHYW1lLmNhbGwodGhpcywgZGF0YSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLmRpZE1vdmUoZGF0YSA9PiB0aGlzLnVzZXIyZGlkTW92ZS5jYWxsKHRoaXMsIGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuZG9Nb3ZlID0gKHZhcmlhbnQ6IHN0cmluZykgPT4gdGhpcy5kb01vdmUuY2FsbCh0aGlzLCB2YXJpYW50KTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5vblVzZXJMZWZ0KCgpID0+IHRoaXMub25Vc2VyTGVmdC5jYWxsKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy51bnNldEdhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uVXNlckxlZnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zZXRHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1bnNldEdhbWVJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJbmZvID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEluRGlnZXN0TG9vcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50V29yZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zZWNvbmRzRm9yTW92ZUxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGVyY2VudGFnZXNMZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ3VycmVudFVzZXJNb3ZlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGFzc2VkV29yZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmxlZnRXb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhcnRHYW1lKGdhbWU6IE1vZGVscy5HYW1lKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUluZm8gPSBnYW1lO1xyXG4gICAgICAgICAgICB0aGlzLndvcmRzID0gZ2FtZS53b3JkcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzVXNlcjEgPSBnYW1lLnVzZXIxLnVzZXJJZCA9PT0gdGhpcy5zdGF0ZUhhbmRsZXIuZ2V0VXNlcklkKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXNlck51bSA9IGlzVXNlcjEgPyAxIDogMjtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUgPSBpc1VzZXIxID8gZ2FtZS51c2VyMVNjb3JlIDogZ2FtZS51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUudXNlcjJTY29yZSA9ICFpc1VzZXIxID8gZ2FtZS51c2VyMVNjb3JlIDogZ2FtZS51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUudXNlcjJEaXNwbGF5TmFtZSA9ICFpc1VzZXIxID8gZ2FtZS51c2VyMS5kaXNwbGF5TmFtZSA6IGdhbWUudXNlcjIuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jdXJyZW50V29yZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkID0gdGhpcy53b3Jkc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ3VycmVudFVzZXJNb3ZlID0gKGlzVXNlcjEgJiYgdGhpcy5nYW1lSW5mby5jdXJyZW50TW92ZSA9PT0gMSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICghaXNVc2VyMSAmJiB0aGlzLmdhbWVJbmZvLmN1cnJlbnRNb3ZlID09PSAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2h1ZmZsZShhcnI6IEFycmF5PE1vZGVscy5Xb3JkPik6IEFycmF5PE1vZGVscy5Xb3JkPiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBhcnIuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbSA9IGFycmF5Lmxlbmd0aCwgdCwgaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnTigKZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbS0tKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBhcnJheVttXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVttXSA9IGFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2ldID0gdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5sZWZ0V29yZHMgPSBzaHVmZmxlKHRoaXMud29yZHMuc2xpY2UoMSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZUdhbWVTdGFydGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYWxsSW5EaWdlc3RMb29wKGFjdGlvbjooKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZS4kJHBoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXJ0VGltZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJQcmV2aW91cyB0aW1lciBzaG91bGQgYmUgc3RvcHBlZFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGxJbkRpZ2VzdExvb3AoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2Vjb25kc0Zvck1vdmVMZWZ0ID0gdGhpcy5zZWNvbmRzRm9yTW92ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnBlcmNlbnRhZ2VzTGVmdCA9IDEwMDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVyUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNlY29uZHNGb3JNb3ZlTGVmdC0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGVyY2VudGFnZXNMZWZ0ID0gdGhpcy4kc2NvcGUuc2Vjb25kc0Zvck1vdmVMZWZ0IC8gMTAgKiAxMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlLnNlY29uZHNGb3JNb3ZlTGVmdCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuJHNjb3BlLmlzQ3VycmVudFVzZXJNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzTW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDAwLCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0b3BUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVyUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwodGhpcy50aW1lclByb21pc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyUHJvbWlzZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVzZXIyZGlkTW92ZShtb3ZlUmVzOiBNb2RlbHMuTW92ZVJlc3VsdCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDdXJyZW50VXNlck1vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlKG1vdmVSZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHBhc3NNb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLnBhc3NNb3ZlKHRoaXMudXNlck51bSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChtb3ZlUmVzdWx0Ok1vZGVscy5Nb3ZlUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDdXJyZW50VXNlck1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlKG1vdmVSZXN1bHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvTW92ZSh2YXJpYW50OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlLnNlY29uZHNGb3JNb3ZlTGVmdCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGltZXIgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5kb01vdmUodGhpcy51c2VyTnVtLCB0aGlzLiRzY29wZS5jdXJyZW50V29yZC53b3JkLCB2YXJpYW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKG1vdmVSZXN1bHQ6TW9kZWxzLk1vdmVSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pc0N1cnJlbnRVc2VyTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmUobW92ZVJlc3VsdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGFuZGxlTW92ZShtb3ZlUmVzOiBNb2RlbHMuTW92ZVJlc3VsdCwgaXNDdXJyZW50VXNlck1vdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VXNlclNjb3JlID0gdGhpcy51c2VyTnVtID09PSAxID8gdGhpcy5nYW1lSW5mby51c2VyMVNjb3JlIDogdGhpcy5nYW1lSW5mby51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICB2YXIgdXNlcjJTY29yZSA9IHRoaXMudXNlck51bSA9PT0gMSA/IHRoaXMuZ2FtZUluZm8udXNlcjJTY29yZSA6IHRoaXMuZ2FtZUluZm8udXNlcjFTY29yZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IGlzQ3VycmVudFVzZXJNb3ZlID8gY3VycmVudFVzZXJTY29yZSA6IHVzZXIyU2NvcmU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1vdmVSZXMuaXNDb3JyZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1vdmVSZXMuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlUmVzLmlzU3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmUuc3VjY2Vzc2Z1bE1vdmVzKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZS53cm9uZ01vdmVzKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJOdW0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUgPSB0aGlzLmdhbWVJbmZvLnVzZXIxU2NvcmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS51c2VyMlNjb3JlID0gdGhpcy5nYW1lSW5mby51c2VyMlNjb3JlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFVzZXJTY29yZSA9IHRoaXMuZ2FtZUluZm8udXNlcjJTY29yZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnVzZXIyU2NvcmUgPSB0aGlzLmdhbWVJbmZvLnVzZXIxU2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkSW5kZXgrKztcclxuICAgICAgICAgICAgaWYgKGlzQ3VycmVudFVzZXJNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFzc2VkV29yZCA9IG5ldyBNb2RlbHMuUGFzc2VkV29yZEluZm8oKTtcclxuICAgICAgICAgICAgICAgIHBhc3NlZFdvcmQud29yZCA9IHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkLndvcmQ7XHJcbiAgICAgICAgICAgICAgICBwYXNzZWRXb3JkLmFuc3dlciA9IHRoaXMuJHNjb3BlLmN1cnJlbnRXb3JkLnRyYW5zbGF0ZVZhcmlhbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihpID0+IGkuaXNUcnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zaGlmdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnZhcmlhbnQ7XHJcbiAgICAgICAgICAgICAgICBwYXNzZWRXb3JkLndhc1Bhc3NlZCA9IG1vdmVSZXMuaXNTdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUucGFzc2VkV29yZHMucHVzaChwYXNzZWRXb3JkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRnJvbUFycmF5SWYoYXJyOiBBcnJheTxNb2RlbHMuV29yZD4sIGNhbGxiYWNrOiAoYXJnOiBNb2RlbHMuV29yZCwgaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycltpXSwgaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3VycmVudFdvcmQgPSB0aGlzLmdhbWVJbmZvLndvcmRzW3RoaXMuJHNjb3BlLmN1cnJlbnRXb3JkSW5kZXhdO1xyXG4gICAgICAgICAgICByZW1vdmVGcm9tQXJyYXlJZih0aGlzLiRzY29wZS5sZWZ0V29yZHMsIHcgPT4gdy53b3JkID09PSB0aGlzLiRzY29wZS5jdXJyZW50V29yZC53b3JkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb3ZlUmVzLmlzTGFzdE1vdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVIYW5kbGVyLmhhbmRsZUdhbWVGaW5pc2hlZCh0aGlzLiRzY29wZS5jdXJyZW50VXNlclNjb3JlLnN1Y2Nlc3NmdWxNb3ZlcyA+IHRoaXMuJHNjb3BlLnVzZXIyU2NvcmUuc3VjY2Vzc2Z1bE1vdmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmN1cnJlbnRVc2VyU2NvcmUuc3VjY2Vzc2Z1bE1vdmVzID09IHRoaXMuJHNjb3BlLnVzZXIyU2NvcmUuc3VjY2Vzc2Z1bE1vdmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zZXRHYW1lSW5mbygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoQ29tbW9uLkdldENvbnN0YW50cygpLmFwcE5hbWUpLmNvbnRyb2xsZXIoXCJjb250cm9sbGVycy5HYW1lQ29udHJvbGxlclwiLCBHYW1lQ29udHJvbGxlcik7XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hcHAudHNcIiAvPlxyXG5pbnRlcmZhY2UgUG9pbnQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG59O1xyXG5cclxuLy8gQXBwLkdldEFwcCgpLmFuaW1hdGlvbignLndvcmRzLWxlZnQtaXRlbScsIGZ1bmN0aW9uKCk6YW5ndWxhci5hbmltYXRlLklBbmltYXRlQ2FsbGJhY2tPYmplY3Qge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBsZWF2ZTogZnVuY3Rpb24oZWxlbWVudDogSlF1ZXJ5LCBkb25lOiBGdW5jdGlvbikge1xyXG4vLyAgICAgICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICB2YXIgdGFyZ2V0UG9zID0gZ2V0V29yZENvbnRhaW5lclBvc3Rpb24oKTtcclxuLy8gICAgICAgICAgICAgLy8gJGVsZW1lbnQuYW5pbWF0ZSh7XHJcbi8vICAgICAgICAgICAgIC8vICAgICBvcGFzaXR5OiAwLFxyXG4vLyAgICAgICAgICAgICAvLyAgICAgdG9wOiB0YXJnZXRQb3MueSxcclxuLy8gICAgICAgICAgICAgLy8gICAgIGxlZnQ6IHRhcmdldFBvcy54XHJcbi8vICAgICAgICAgICAgIC8vIH0sIGRvbmUpO1xyXG4vLyAgICAgICAgICAgICBkb25lKCk7XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oaXNDYW5jZWxsZWQ6IGJvb2xlYW4pIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChpc0NhbmNlbGxlZCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnN0b3AoKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH07XHJcbi8vIH0pXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0V29yZENvbnRhaW5lclBvc3Rpb24oKTogUG9pbnQge1xyXG4gICAgbGV0ICRlbGVtZW50ID0gJCgnI3dvcmQtZWxlbWVudCcpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogJGVsZW1lbnQub2Zmc2V0KCkubGVmdCxcclxuICAgICAgICB5OiAkZWxlbWVudC5vZmZzZXQoKS50b3BcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
