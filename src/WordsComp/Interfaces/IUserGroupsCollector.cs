using System;
using System.Threading.Tasks;
using WordsComp.Models;

namespace WordsComp.Interfaces
{
    public interface IUserGroupsCollector
    {
        Task AddUserToQueue(UserInfo newUser);

        void RemoveUser(UserInfo removedUser);

        IObservable<UserGroup> GroupFulledObservable { get; }

        IObservable<UserGroup> UserLeftGroupObservable { get; }

        IObservable<UserGroup> UserAddedToGroup { get; }
    }
}
