using System;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using BLogic.Interfaces;
using BLogic.Models;
using Common.Models;

namespace BLogic.Concrete
{
    public class GameProvider : IGameProvider
    {
        private const int SECONDS_FOR_MOVE = 10;
        private readonly object locker = new object();

        private Game currentGame; 
        private readonly IWordStorageAdapter storageAdapter;
        private readonly Subject<Tuple<MoveResult, Move>> didMoveSubject;
        private readonly Subject<GameResult> gameFinishesSubject;
        private readonly Subject<long> timerTickSubject;
        private readonly Subject<MoveResult> missedMove;
        private Bot bot;

        private volatile IDisposable currentTimer;

        public GameProvider(IWordStorageAdapter storageAdapter)
        {
            this.storageAdapter = storageAdapter;
            didMoveSubject = new Subject<Tuple<MoveResult, Move>>();
            gameFinishesSubject = new Subject<GameResult>();
            timerTickSubject = new Subject<long>();
            missedMove = new Subject<MoveResult>();
        }

        public Game GetGame()
        {
            return currentGame;
        }

        public async Task<Game> StartGame(UserInfo user1, 
                                          UserInfo user2, 
                                          string groupId, 
                                          WordLevel wordLevel, 
                                          bool isGameWithBot,
                                          int wordsCount)
        {
            AssociatedGroupId = groupId;
            IsGameWithBot = isGameWithBot;

            if (IsGameWithBot)
            {
                bot = new Bot();
            }

            gameFinishesSubject.Subscribe(_ =>
            {
                lock (locker)
                {
                    currentTimer?.Dispose();
                }
            });

            currentGame = new Game(user1, user2, groupId);
            var words = await storageAdapter.GetRandomWords(wordsCount * 2, wordLevel);
            currentGame.StartGame(words);
            InitNewTimer(0);

            return currentGame;
        }

        private void InitNewTimer(int secondsDelay = 1)
        {
            bool isBotMove = IsGameWithBot
                             && ((currentGame.CurrentMove == Move.FirstUserMove && currentGame.User1.IsBot)
                                 || (currentGame.CurrentMove == Move.SecondUserMove && currentGame.User2.IsBot));
            lock (locker)
            {
                if (isBotMove)
                {
                    bot.HandleTimerStarted(SECONDS_FOR_MOVE);
                }

                currentTimer?.Dispose();
                currentTimer = Observable.Timer(TimeSpan.FromSeconds(secondsDelay), TimeSpan.FromSeconds(1))
                                        .Take(SECONDS_FOR_MOVE + 1)
                                        .Subscribe(tick =>
                                        {
                                            timerTickSubject.OnNext(SECONDS_FOR_MOVE - tick);
                                            if (SECONDS_FOR_MOVE - tick == 0)
                                            {
                                                PassMove();
                                            }
                                            else if (isBotMove)
                                            {
                                                var currentWord = currentGame.GetCurrentWord();
                                                var botVariant = bot.HandleTimerTick(SECONDS_FOR_MOVE - (int)tick, currentWord.TranslateVariants);
                                                if (!string.IsNullOrEmpty(botVariant))
                                                {
                                                    DoMove(currentGame.CurrentMove, currentWord.Word, botVariant);
                                                }
                                            }
                                        });
            }
        }

        private void DidMoveNotifySubscribers(Move userMove, MoveResult res, bool isMissed = false)
        {
            if (isMissed)
            {
                missedMove.OnNext(res);
            }
            else
            {
                didMoveSubject.OnNext(Tuple.Create(res, userMove));
            }

            if (res.IsLastMove)
            {
                didMoveSubject.OnCompleted();

                gameFinishesSubject.OnNext(res.GameResult);
                gameFinishesSubject.OnCompleted();
            }
        }

        public MoveResult DoMove(Move userMove, string word, string variant)
        {
            var res = currentGame.DoMove(userMove, word, variant);
            DidMoveNotifySubscribers(userMove, res);

            if (res.IsCorrect && !res.IsLastMove)
            {
                InitNewTimer();
            }
            return res;
        }

        private void PassMove()
        {
            var currentMove = currentGame.CurrentMove;
            var res = currentGame.PassMove();
            DidMoveNotifySubscribers(currentMove, res, true);

            if (res.IsCorrect && !res.IsLastMove)
            {
                InitNewTimer();
            }
        }

        public IObservable<Tuple<MoveResult, Move>> DidMove => didMoveSubject;

        public IObservable<MoveResult> MissedMove => missedMove;

        public IObservable<GameResult> GameFinishes => gameFinishesSubject;

        public IObservable<long> TimerTick => timerTickSubject;

        public string AssociatedGroupId { get; private set; }

        public bool IsGameWithBot { get; private set; }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                lock (locker)
                {
                    currentTimer?.Dispose();
                }
            }
        }
    }
}
