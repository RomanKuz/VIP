using System;
using System.Threading.Tasks;
using AutoMapper;
using BLogic.Interfaces;
using BLogic.Models;
using Microsoft.AspNetCore.SignalR;
using WordsComp.RestModels;

namespace WordsComp.Hubs
{
    public class CompetitionHub: Hub
    {
        private readonly IUserGroupsCollector collector;

        public CompetitionHub(IUserGroupsCollector collector)
        {
            this.collector = collector;
        }

        public async Task Connect(string displayName, 
                                  WordLevel level,
                                  bool isGameWithFriend,
                                  string friendsGroupId)
        {
            if (string.IsNullOrWhiteSpace(displayName)) throw new ArgumentNullException(nameof(displayName));
            if (level == WordLevel.Unknown) throw new ArgumentException(nameof(level));

            await collector.AddUserToQueue(new UserInfo(Context.ConnectionId, displayName, level, false),
                                           isGameWithFriend,
                                           friendsGroupId);
        }

        public MoveResultModel DoMove(Move move, string word, string variant)
        {
            var group = collector.GetUserGroup(Context.ConnectionId);
            if (group != null)
            {
                var res = group.GameProvider.DoMove(move, word, variant);
                return Mapper.Map<MoveResultModel>(res);
            }
            else
            {
                return null;
            }
        }

        public void Quit()
        {
            collector.RemoveUser(Context.ConnectionId);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            try
            {
                Quit();
            }
            catch (Exception ex)
            {
                // TODO: Log exception
            }
            return base.OnDisconnected(stopCalled);
        }
    }
}
