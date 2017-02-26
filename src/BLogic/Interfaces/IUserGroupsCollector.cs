using System;
using System.Threading.Tasks;
using BLogic.Models;

namespace BLogic.Interfaces
{
    public interface IUserGroupsCollector
    {
        Task AddUserToQueue(UserInfo newUser,
                            int wordsCountFilter,
                            bool isGameWithFriend = false,
                            string friendsGroupId = null);

        void RemoveUser(string userId);

        IUserGroup GetUserGroup(string userId);

        IObservable<IUserGroup> GroupFulledObservable { get; }

        IObservable<IUserGroup> UserLeftGroupObservable { get; }

        IObservable<string> UserAddedToGroup { get; }

        IObservable<IGameProvider> GameStarted { get; }

        IObservable<IUserGroup> FailedToLoadGameObservable { get; }
    }
}
