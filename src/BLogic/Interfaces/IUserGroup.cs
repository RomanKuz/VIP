using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLogic.Models;

namespace BLogic.Interfaces
{
    public interface IUserGroup
    {
        bool IsWaiting();

        List<UserInfo> GetUsers();

        bool IsEmpty();

        Task EstablishConnection(UserInfo establisher);

        string GetGroupId();

        Task ConnectUser(UserInfo connectedUser);

        void DissconnectUser(string userId);

        bool ContainsUser(string userId);

        IGameProvider GameProvider { get; set; }

        void SetUpFriendToConnectGroupId(string id);

        string FriendToConnectGroupId { get; }

        bool IsFriendsRoom { get; }
    }
}
