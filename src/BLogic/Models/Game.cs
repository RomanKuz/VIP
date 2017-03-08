using System;
using System.Collections.Generic;
using System.Linq;
using DAL;

namespace BLogic.Models
{
    public class Game
    {
        private readonly List<WordBL> user1FailedAttempts = new List<WordBL>();
        private readonly List<WordBL> user1SuccessfulAttempts = new List<WordBL>();
        private readonly List<WordBL> user2FailedAttempts = new List<WordBL>();
        private readonly List<WordBL> user2SuccessfulAttempts = new List<WordBL>();

        private GameStatus gameStatus;
        private int currentWordIndex;

        private object locker = new object();

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
            lock (locker)
            {
                var userId = CurrentMove == Move.FirstUserMove ? User2.UserId : User1.UserId;
                var userScore = CurrentMove == Move.FirstUserMove ? User1CurrentScore : User2CurrentScore;
                var user = userMove == Move.FirstUserMove ? User1 : User2;

                if (userMove != CurrentMove)
                {
                    return new MoveResult
                    {
                        IsSuccessful = false,
                        IsCorrect = false,
                        ErrorMessage = "It is another user turn",
                        NextMoveUserId = userId,
                        IsLastMove = false,
                        SelectedVariantIndex = -1,
                        Word = Words[currentWordIndex],
                        User = user
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
                        SelectedVariantIndex = -1,
                        User = user
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
                        SelectedVariantIndex = -1,
                        Word = wordInfo,
                        User = user
                    };
                }

                int varIndex = wordInfo.TranslateVariants.IndexOf(variantInfo);
                var res = new MoveResult
                {
                    IsCorrect = true,
                    ErrorMessage = string.Empty,
                    NextMoveUserId = userId,
                    SelectedVariantIndex = varIndex,
                    Word = wordInfo,
                    User = user
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

                var collectionToAddMoveRes = userMove == Move.FirstUserMove
                   ? res.IsSuccessful
                       ? user1SuccessfulAttempts
                       : user1FailedAttempts
                   : res.IsSuccessful
                       ? user2SuccessfulAttempts
                       : user2FailedAttempts;
                if (res.IsCorrect)
                {
                    collectionToAddMoveRes.Add(wordInfo);
                }

                GameResult gameRes;
                if (IsFinished(out gameRes))
                {
                    res.IsLastMove = true;
                    res.GameResult = gameRes;
                }

                return res;
            }
        }

        public MoveResult PassMove()
        {
            lock (locker)
            {
                currentWordIndex++;
                var userScore = CurrentMove == Move.FirstUserMove ? User1CurrentScore : User2CurrentScore;
                var userId = CurrentMove == Move.FirstUserMove ? User2.UserId : User1.UserId;
                userScore.WrongMoves++;

                ChangeMoveTurn();
                var res = new MoveResult
                {
                    IsCorrect = true,
                    ErrorMessage = string.Empty,
                    NextMoveUserId = userId,
                    IsSuccessful = false,
                    SelectedVariantIndex = -1,
                    IsSkipped = true,
                    Word = Words[currentWordIndex-1]
                };

                GameResult gameRes;
                if (IsFinished(out gameRes))
                {
                    res.IsLastMove = true;
                    res.GameResult = gameRes;
                }

                return res;
            }
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

            res = new GameResult
            {
                User1SuccessfulAttempts = user1SuccessfulAttempts,
                User1FailedAttempts = user1FailedAttempts,
                User2SuccessfulAttempts = user2SuccessfulAttempts,
                User2FailedAttempts = user2FailedAttempts,
                GroupId = GroupId,
                Users = users
            };

            if (User1CurrentScore.SuccessfulMoves == User2CurrentScore.SuccessfulMoves)
            {
                res.Winner = -1;
                res.IsDraw = true;

                return true;
            }
            else if (User1CurrentScore.SuccessfulMoves > User2CurrentScore.SuccessfulMoves)
            {
                res.Winner = 1;
                res.IsDraw = false;
                return true;
            }
            else
            {
                res.Winner = 2;
                res.IsDraw = false;
                return true;
            }
        }

        public WordBL GetCurrentWord()
        {
            return Words[currentWordIndex];
        }
    }
}
