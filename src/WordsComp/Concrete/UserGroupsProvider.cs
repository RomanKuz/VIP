﻿using System;
using System.Threading.Tasks;
using BLogic.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using WordsComp.Hubs;

namespace WordsComp.Concrete
{
    public class UserGroupsProvider: IHubUserGroupsProvider
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
