using System;
using System.Threading.Tasks;
using BL.Models;

namespace BL.Interfaces
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
