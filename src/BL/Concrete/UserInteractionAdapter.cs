using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using WordsComp.Hubs;
using System;
using BL.Interfaces;

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
                hubContext.Clients.Group(g.GetGroupId()).groupFulled();
            });

            userGroupsCollector.UserAddedToGroup.Subscribe(g =>
            {
                hubContext.Clients.Group(g.GetGroupId()).userAdded();
            });

            userGroupsCollector.UserLeftGroupObservable.Subscribe(g =>
            {
                hubContext.Clients.Group(g.GetGroupId()).userLeft();
            });
        }

        private IHubContext GetHubContext()
        {
            return connectionManager.GetHubContext<CompetitionHub>();
        }
    }
}
