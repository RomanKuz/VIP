using System;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using BLogic.Interfaces;
using BLogic.Models;

namespace BLogic.Concrete
{
    public class GameProvider : IGameProvider
    {
        private Game currentGame; 
        private readonly IWordStorageAdapter storageAdapter;
        private readonly Subject<Tuple<MoveResult, Move>> didMoveSubject;
        private readonly Subject<GameResult> gameFinishesSubject;

        public GameProvider(IWordStorageAdapter storageAdapter)
        {
            this.storageAdapter = storageAdapter;
            didMoveSubject = new Subject<Tuple<MoveResult, Move>>();
            gameFinishesSubject = new Subject<GameResult>();
        }

        public Game GetGame()
        {
            return currentGame;
        }

        public async Task<Game> StartGame(UserInfo user1, UserInfo user2, string groupId, WordLevel wordLevel)
        {
            if (user1.GameLevel != user2.GameLevel)
            {
                throw new Exception("Different game levels");
            }

            currentGame = new Game(user1, user2, groupId);
            var words = await storageAdapter.GetRandomWords(10, wordLevel);
            currentGame.StartGame(words);
            return currentGame;
        }

        private void DidMoveNotifySubscribers(Move userMove, MoveResult res)
        {
            didMoveSubject.OnNext(Tuple.Create(res, userMove));

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
            return res;
        }

        public MoveResult PassMove(Move userMove)
        {
            var res = currentGame.PassMove(userMove);
            DidMoveNotifySubscribers(userMove, res);
            return res;
        }

        public IObservable<Tuple<MoveResult, Move>> DidMove => didMoveSubject;

        public IObservable<GameResult> GameFinishes => gameFinishesSubject;
    }
}
