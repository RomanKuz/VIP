using System;
using System.Threading.Tasks;
using BLogic.Models;

namespace BLogic.Interfaces
{
    public interface IUserGroupsCollector
    {
        Task AddUserToQueue(UserInfo newUser);

        void RemoveUser(string userId);

        UserGroup GetUserGroup(string userId);

        IObservable<UserGroup> GroupFulledObservable { get; }

        IObservable<UserGroup> UserLeftGroupObservable { get; }

        IObservable<string> UserAddedToGroup { get; }

        IObservable<IGameProvider> GameStarted { get; }
    }
}
