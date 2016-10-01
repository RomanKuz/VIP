using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using WordsComp.Interfaces;
using WordsComp.Models;

namespace WordsComp.Hubs
{
    public class CompetitionHub: Hub
    {
        private readonly IUserGroupsCollector collector;

        public CompetitionHub(IUserGroupsCollector collector)
        {
            this.collector = collector;
        }

        public async Task<string> Connect()
        {
            await collector.AddUserToQueue(new UserInfo
            {
                UserId = Context.ConnectionId
            });
            return Context.ConnectionId;
        }

        public void Quit()
        {
            collector.RemoveUser(new UserInfo
            {
                UserId = Context.ConnectionId
            });
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            try
            {
                collector.RemoveUser(new UserInfo
                {
                    UserId = Context.ConnectionId
                });
            }
            catch (Exception ex)
            {
                // TODO: Log exception
            }
            return base.OnDisconnected(stopCalled);
        }
    }
}
