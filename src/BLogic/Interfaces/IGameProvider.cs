using System;
using System.Threading.Tasks;
using BLogic.Models;

namespace BLogic.Interfaces
{
    public interface IGameProvider
    {
        Task<Game> StartGame(UserInfo user1, UserInfo user2, string groupId, WordLevel wordLevel);

        MoveResult DoMove(Move userMove, string word, string variant);

        MoveResult PassMove(Move userMove);

        Game GetGame();

        IObservable<Tuple<MoveResult, Move>> DidMove { get; }

        IObservable<GameResult> GameFinishes { get; }
    }
}
