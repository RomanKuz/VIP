using System;
using System.Collections.Generic;
using System.Linq;
using DAL;

namespace BLogic.Models
{
    public class Game
    {
        private GameStatus gameStatus;
        private int currentWordIndex;

        public Game(UserInfo user1, UserInfo user2, string groupId)
        {
            User1 = user1;
            User2 = user2;

            User1CurrentScore = new Score();
            User2CurrentScore = new Score();

            gameStatus = GameStatus.Unknown;
            CurrentMove = Move.Unknown;
            GroupId = groupId;
        }

        private void ChangeMoveTurn()
        {
            CurrentMove = CurrentMove == Move.FirstUserMove ? Move.SecondUserMove : Move.FirstUserMove;
        }

        public UserInfo User1 { get; }

        public UserInfo User2 { get; }

        public string GroupId { get; }

        public Move CurrentMove { get; private set; }

        public List<WordBL> Words { get; private set; }

        public Score User1CurrentScore { get; }

        public Score User2CurrentScore { get; }

        public GameStatus GetCurrentGameStatus()
        {
            return gameStatus;
        }

        public void StartGame(List<WordBL> words)
        {
            if (words.Count%2 != 0)
            {
                throw new InvalidOperationException("words count should be even");
            }

            if (words == null) throw new ArgumentNullException(nameof(words));
            if (gameStatus != GameStatus.Unknown)
            {
                throw new InvalidOperationException();
            }
            this.gameStatus = GameStatus.Pending;

            var random = new Random();
            CurrentMove = (Move)random.Next(1, 3);

            Words = words;
            currentWordIndex = 0;
        }

        public MoveResult DoMove(Move userMove, string word, string variant)
        {
            var userId = CurrentMove == Move.FirstUserMove ? User2.UserId : User1.UserId;
            var userScore = CurrentMove == Move.FirstUserMove ? User1CurrentScore : User2CurrentScore;

            if (userMove != CurrentMove)
            {
                return new MoveResult
                {
                    IsSuccessful = false,
                    IsCorrect = false,
                    ErrorMessage = "It is another user turn",
                    NextMoveUserId = userId,
                    IsLastMove = false,
                    SelectedVariantIndex = -1
                };
            }
            ChangeMoveTurn();


            if (currentWordIndex >= Words.Count)
            {
                return new MoveResult
                {
                    IsSuccessful = false,
                    IsCorrect = false,
                    ErrorMessage = "No words any more. Smth bad happened. Game should be finished",
                    NextMoveUserId = userId,
                    IsLastMove = false,
                    SelectedVariantIndex = -1
                };
            }

            var wordInfo = Words[currentWordIndex];
            currentWordIndex++;
            
            var variantInfo = wordInfo.TranslateVariants.FirstOrDefault(v => v.VariantDef == variant);
            if (variantInfo == null)
            {
                return new MoveResult
                {
                    IsSuccessful = false,
                    IsCorrect = false,
                    ErrorMessage = $"No such variant for word {word}",
                    NextMoveUserId = userId,
                    SelectedVariantIndex = -1
                };
            }

            int varIndex = wordInfo.TranslateVariants.IndexOf(variantInfo);
            var res = new MoveResult
            {
                IsCorrect = true,
                ErrorMessage = string.Empty,
                NextMoveUserId = userId,
                SelectedVariantIndex = varIndex
            };

            if (variantInfo.IsCorrect)
            {
                userScore.SuccessfulMoves++;
                res.IsSuccessful = true;
            }
            else
            {
                userScore.WrongMoves++;
                res.IsSuccessful = false;
            }

            GameResult gameRes;
            if (IsFinished(out gameRes))
            {
                res.IsLastMove = true;
                res.GameResult = gameRes;
            }

            return res;
        }

        public MoveResult PassMove(Move userMove)
        {
            currentWordIndex++;
            var userScore = CurrentMove == Move.FirstUserMove ? User1CurrentScore : User2CurrentScore;
            var userId = CurrentMove == Move.FirstUserMove ? User2.UserId : User1.UserId;
            userScore.WrongMoves++;

            if (userMove != CurrentMove)
            {
                return new MoveResult
                {
                    IsSuccessful = false,
                    IsCorrect = false,
                    ErrorMessage = "It is another user turn",
                    NextMoveUserId = userId,
                    IsLastMove = false,
                    SelectedVariantIndex = -1
                };
            }

            ChangeMoveTurn();
            var res = new MoveResult
            {
                IsCorrect = true,
                ErrorMessage = string.Empty,
                NextMoveUserId = userId,
                IsSuccessful = false,
                SelectedVariantIndex = -1
            };

            GameResult gameRes;
            if (IsFinished(out gameRes))
            {
                res.IsLastMove = true;
                res.GameResult = gameRes;
            }

            return res;
        }

        public bool IsFinished(out GameResult res)
        {
            res = null;
            if (currentWordIndex <= Words.Count - 1)
            {
                return false;
            }

            var users = new List<UserInfo>
            {
                User1,
                User2
            };

            if (User1CurrentScore.SuccessfulMoves == User2CurrentScore.SuccessfulMoves)
            {
                res = new GameResult
                {
                    Winner = 0,
                    IsDraw = true,
                    GroupId = GroupId,
                    Users = users
                };
                return true;
            }
            else if (User1CurrentScore.SuccessfulMoves > User2CurrentScore.SuccessfulMoves)
            {
                res = new GameResult
                {
                    Winner = 1,
                    IsDraw = false,
                    GroupId = GroupId,
                    Users = users
                };
                return true;
            }
            else
            {
                res = new GameResult
                {
                    Winner = 2,
                    IsDraw = false,
                    GroupId = GroupId,
                    Users = users
                };
                return true;
            }
        }
    }
}
