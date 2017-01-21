using System;
using System.Threading.Tasks;
using BLogic.Models;
using Common.Models;

namespace BLogic.Interfaces
{
    public interface IGameProvider: IDisposable
    {
        string AssociatedGroupId { get; }

        Task<Game> StartGame(UserInfo user1, UserInfo user2, string groupId, WordLevel wordLevel, bool isGameWithBot);

        MoveResult DoMove(Move userMove, string word, string variant);

        Game GetGame();

        IObservable<Tuple<MoveResult, Move>> DidMove { get; }

        IObservable<GameResult> GameFinishes { get; }

        IObservable<long> TimerTick { get; }

        IObservable<MoveResult> MissedMove { get; }
    }
}
