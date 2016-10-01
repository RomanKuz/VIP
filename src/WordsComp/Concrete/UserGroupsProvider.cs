using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using WordsComp.Hubs;
using WordsComp.Interfaces;

namespace WordsComp.Concrete
{
    public class UserGroupsProvider: IUserGroupsProvider
    {
        private readonly IConnectionManager connectionManager;

        public UserGroupsProvider(IConnectionManager connectionManager)
        {
            this.connectionManager = connectionManager;
        }

        public async Task<string> CreateUserGroupAndAddUser(string userId)
        {
            var hubContext = GetHubContext();
            var groupId = Guid.NewGuid().ToString();
            await hubContext.Groups.Add(userId, groupId);

            return groupId;
        }

        public async Task AddUserToGroup(string userId, string groupId)
        {
            var hubContext = GetHubContext();
            await hubContext.Groups.Add(userId, groupId);
        }

        private IHubContext GetHubContext()
        {
            return connectionManager.GetHubContext<CompetitionHub>();
        }
    }
}
