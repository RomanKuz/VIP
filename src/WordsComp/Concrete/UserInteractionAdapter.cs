using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using WordsComp.Hubs;
using WordsComp.Interfaces;
using System;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using AutoMapper;
using BLogic.Interfaces;
using BLogic.Models;
using WordsComp.RestModels;

namespace WordsComp.Concrete
{
    public class UserInteractionAdapter: IUserInteractionAdapter
    {
        private readonly IUserGroupsCollector userGroupsCollector;
        private readonly IConnectionManager connectionManager;

        public UserInteractionAdapter(IUserGroupsCollector userGroupsCollector,
                                      IConnectionManager connectionManager)
        {
            this.userGroupsCollector = userGroupsCollector;
            this.connectionManager = connectionManager;
        }

        public void EstablishInteractionWithClients()
        {
            var hubContext = GetHubContext();
            userGroupsCollector.GroupFulledObservable.Subscribe(g =>
            {
                var group = hubContext.Clients.Group(g.GetGroupId());
                if (group != null)
                {
                    group.groupFulled(Mapper.Map<GroupModel>(g));
                }
            });

            userGroupsCollector.UserAddedToGroup.Subscribe(userId =>
            {
                var client = hubContext.Clients.Client(userId);
                if (client != null)
                {
                    client.userAdded(userId);
                }
            });

            userGroupsCollector.UserLeftGroupObservable.Subscribe(g =>
            {
                GameResult gameRes;
                var gameProvider = g.GameProvider;
                if (gameProvider != null 
                    && gameProvider.GetGame() != null
                    && gameProvider.GetGame().IsFinished(out gameRes))
                {
                    return;
                }

                foreach (var user in g.GetUsers())
                {
                    var client = hubContext.Clients.Client(user.UserId);
                    if (client != null)
                    {
                        client.userLeft(Mapper.Map<GroupModel>(g));
                    }
                }
            });

            userGroupsCollector.GameStarted.Subscribe(gameProvider =>
            {
                RegisterNewGame(gameProvider);
                var game = gameProvider.GetGame();

                var group = userGroupsCollector.GetUserGroup(game.GroupId);
                if (group != null && group.IsWaiting())
                {
                    return;
                }

                var hubGroup = hubContext.Clients.Group(game.GroupId);
                if (hubGroup != null)
                {
                    hubGroup.gameStarted(Mapper.Map<GameModel>(game));
                }
            });

            userGroupsCollector.FailedToLoadGameObservable.Subscribe(g =>
            {
                var group = hubContext.Clients.Group(g.GetGroupId());
                if (group != null)
                {
                    group.failedToLoadGame();
                }
            });
        }

        private void RegisterNewGame(IGameProvider gameProvider)
        {
            var hubContext = GetHubContext();
            gameProvider.DidMove.Subscribe(moveRes =>
            {
                var client = hubContext.Clients.Client(moveRes.Item1.NextMoveUserId);
                if (client != null)
                {
                    client.didMove(Mapper.Map<MoveResultModel>(moveRes.Item1));
                }
            });

            gameProvider.GameFinishes.Subscribe(gameRes =>
            {
                foreach (var user in gameRes.Users)
                {
                    userGroupsCollector.RemoveUser(user.UserId);
                }
            });

            gameProvider.GameFinishes
                .SubscribeOn(Scheduler.Default)
                .Subscribe(gameRes =>
                {
                    // TODO: Persist to database
                });
        }

        private IHubContext GetHubContext()
        {
            return connectionManager.GetHubContext<CompetitionHub>();
        }
    }
}
