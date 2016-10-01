using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using WordsComp.Hubs;
using WordsComp.Interfaces;
using System;

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
                hubContext.Clients.Group(g.GetGroupId()).groupFulled(g.ToRestModel());
            });

            userGroupsCollector.UserAddedToGroup.Subscribe(g =>
            {
                hubContext.Clients.Group(g.GetGroupId()).userAdded(g.ToRestModel());
            });

            userGroupsCollector.UserLeftGroupObservable.Subscribe(g =>
            {
                hubContext.Clients.Group(g.GetGroupId()).userLeft(g.ToRestModel());
            });
        }

        private IHubContext GetHubContext()
        {
            return connectionManager.GetHubContext<CompetitionHub>();
        }
    }
}
