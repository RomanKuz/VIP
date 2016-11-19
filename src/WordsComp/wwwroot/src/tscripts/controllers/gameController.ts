/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
module controllers {
    export class GameController {
        private connectionHubService: Interfaces.IConnectToGame;
        private $scope: Interfaces.IGameScope;
        private gameInfo: Models.Game;
        private stateHandler: Interfaces.IStateHandler;
        private words: Array<Models.Word>
        private userNum: number;
        private $interval: ng.IIntervalService;
        private secondsForMove: number;
        private timerPromise: ng.IPromise<any>;
        private $timeout: ng.ITimeoutService;

        static $inject = ["Services.ConnectToGameService", "$scope", "Services.StateHandlerService", "$interval", '$timeout'];
        constructor(connectionHubService: Interfaces.IConnectToGame, $scope: Interfaces.IGameScope, 
                    stateHandler: Interfaces.IStateHandler,
                    $interval: ng.IIntervalService,
                    $timeout: ng.ITimeoutService) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.stateHandler = stateHandler;
            this.$interval = $interval;
            this.secondsForMove = 10;
            this.$timeout = $timeout;
            this.initializeViewModel();
        }

        private initializeViewModel():void {
            this.connectionHubService.gameStarted(data => this.startGame.call(this, data));
            this.connectionHubService.didMove(data => this.user2didMove.call(this, data));
            this.$scope.doMove = (variant: string) => this.doMove.call(this, variant);
            this.connectionHubService.onUserLeft(() => this.onUserLeft.call(this));
            this.unsetGameInfo();
        }

        private onUserLeft(): void {
            this.stopTimer();
            this.unsetGameInfo();
        }

        private unsetGameInfo(): void {
            this.gameInfo = null;

            this.callInDigestLoop(() => {
                this.$scope.currentWord = null;
                this.$scope.secondsForMoveLeft = null;
                this.$scope.percentagesLeft = null;
                this.$scope.isCurrentUserMove = null;
                this.$scope.currentUserScore = null;
                this.$scope.user2Score = null;
                this.$scope.passedWords = [];
                this.$scope.leftWords = [];
            });
        }

        private startGame(game: Models.Game): void {
            this.gameInfo = game;
            this.words = game.words;

            const isUser1 = game.user1.userId === this.stateHandler.getUserId();
            this.userNum = isUser1 ? 1 : 2;
            this.$scope.$apply(() => {
                      this.$scope.currentUserScore = isUser1 ? game.user1Score : game.user2Score;
                      this.$scope.user2Score = !isUser1 ? game.user1Score : game.user2Score;
                      this.$scope.user2DisplayName = !isUser1 ? game.user1.displayName : game.user2.displayName;
                      this.$scope.currentWordIndex = 0;
                      this.$scope.currentWord = this.words[0];
                      this.setVarinatsOrder();
                      this.$scope.isCurrentUserMove = (isUser1 && this.gameInfo.currentMove === 1) 
                                                      || (!isUser1 && this.gameInfo.currentMove === 2);
                      
                      function shuffle(arr: Array<Models.Word>): Array<Models.Word> {
                            let array = arr.slice(0);
                            let m = array.length, t, i;

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
                      this.$scope.leftWords = shuffle(this.words.slice(1));
            });

            this.stateHandler.handleGameStarted();
            this.startTimer();
        }

        private callInDigestLoop(action:() => void) {
            if (this.$scope.$$phase) {
                action();
            } else {
                this.$scope.$apply(() => {
                    action();
                })
            }
        }

        private startTimer(): void {
            if (this.timerPromise) {
                throw "Previous timer should be stopped";
            }

            this.callInDigestLoop(() => {
                this.$scope.secondsForMoveLeft = this.secondsForMove;
                this.$scope.percentagesLeft = 100;
            });

            this.timerPromise = this.$interval(() => {
                this.$scope.secondsForMoveLeft--;
                this.$scope.percentagesLeft = this.$scope.secondsForMoveLeft / 10 * 100;

                if (this.$scope.secondsForMoveLeft === 0
                    && this.$scope.isCurrentUserMove) {
                    this.passMove();
                }
            }, 1000, 10);
        }

        private stopTimer(): void {
            if (!this.timerPromise) {
                return;
            }

            this.$interval.cancel(this.timerPromise);
            this.timerPromise = null;
        }

        private user2didMove(moveRes: Models.MoveResult): void {
            this.$scope.$apply(() => {
                this.handleMove(moveRes, false);
            });
        }

        private passMove(): void {
            this.connectionHubService.passMove(this.userNum)
                                     .done((moveResult:Models.MoveResult) => {
                                         this.$scope.$apply(() => {
                                             this.handleMove(moveResult, true);
                                         });
                                     });
        }

        private doMove(variant: string): void {
            // a way to handle multiple click
            if (this.$scope.currentWord.translateVariants.filter(v => v.isSelected)
                    .length !== 0) {
                        return;
            }

            this.stopTimer();
            if (this.$scope.secondsForMoveLeft === 0) {
                // should be handled by timer callback
                return;
            }
            
            let selectedVar = this.$scope.currentWord.translateVariants.filter(v => v.variant === variant)[0];
            if (!selectedVar) {
                console.log('Incorrect var selected');
            } else {
                selectedVar.isSelected = true;
            }

            this.connectionHubService.doMove(this.userNum, this.$scope.currentWord.word, variant)
                                     .done((moveResult:Models.MoveResult) => {
                                         this.$scope.$apply(() => {
                                             this.handleMove(moveResult, true);
                                         });
                                     });
        }

        private handleMove(moveRes: Models.MoveResult, isCurrentUserMove) {
            this.stopTimer();

            // if it is skipped, then set timer manually to 0
            // because timer on both side may show different time by that time
            // e.g. one could have 0 and other player could have 1
            if (moveRes.isSkipped) {
                this.$scope.secondsForMoveLeft = 0;
                this.$scope.percentagesLeft = 0;
            }

            var currentUserScore = this.userNum === 1 ? this.gameInfo.user1Score : this.gameInfo.user2Score;
            var user2Score = this.userNum === 1 ? this.gameInfo.user2Score : this.gameInfo.user1Score;

            let score = isCurrentUserMove ? currentUserScore : user2Score;

            if (!moveRes.isCorrect) {
                console.error(moveRes.errorMessage);
            } else if (moveRes.isSuccessful) {
                score.successfulMoves++;
            } else {
                score.wrongMoves++;
            }

            if (moveRes.selectedVariantIndex !== -1) {
                this.$scope.currentWord.translateVariants[moveRes.selectedVariantIndex].isSelected = true;
            }

            if (this.userNum === 1) {
                this.$scope.currentUserScore = this.gameInfo.user1Score;
                this.$scope.user2Score = this.gameInfo.user2Score;
            } else {
                this.$scope.currentUserScore = this.gameInfo.user2Score;
                this.$scope.user2Score = this.gameInfo.user1Score;
            }
            
            this.$timeout(() => {
                this.$scope.isCurrentUserMove = !isCurrentUserMove;
                this.$scope.currentWordIndex++;
                if (isCurrentUserMove) {
                    let passedWord = new Models.PassedWordInfo();
                    passedWord.word = this.$scope.currentWord.word;
                    passedWord.answer = this.$scope.currentWord.translateVariants
                        .filter(i => i.isTrue)
                        .shift()
                        .variant;
                    passedWord.wasPassed = moveRes.isSuccessful;
                    this.$scope.passedWords.push(passedWord);
                }
                
                function removeFromArrayIf(arr: Array<Models.Word>, callback: (arg: Models.Word, index: number) => boolean): void {
                    let i = 0;
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
                this.setVarinatsOrder();
                removeFromArrayIf(this.$scope.leftWords, w => w.word === this.$scope.currentWord.word);

                if (moveRes.isLastMove) {
                    this.stateHandler.handleGameFinished(this.$scope.currentUserScore.successfulMoves > this.$scope.user2Score.successfulMoves,
                                                         this.$scope.currentUserScore.successfulMoves == this.$scope.user2Score.successfulMoves);
                    this.unsetGameInfo();
                    this.connectionHubService.stopHubConnection();
                } else {
                    this.startTimer();
                }
            }, 1000, true); // delay to let user see the result of move
        }
        
        private setVarinatsOrder(): void {
            if (!this.$scope.currentWord) {
                return;
            }

            this.$scope.currentWord.translateVariants.forEach((value, index) => value.order = index + 1);
        }
    }

    angular.module(Common.GetConstants().appName).controller("controllers.GameController", GameController);
} 