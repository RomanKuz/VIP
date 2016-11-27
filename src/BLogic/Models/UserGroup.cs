using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLogic.Interfaces;

namespace BLogic.Models
{
    public class UserGroup
    {
        private readonly IUserGroupsProvider userGroupsProvider;
        private string groupId;

        public UserGroup(IUserGroupsProvider userGroupsProvider)
        {
            this.userGroupsProvider = userGroupsProvider;
        }

        private UserInfo Establisher { get; set; }

        private UserInfo ConnectedUser { get; set; }

        public bool IsWaiting()
        {
            return ConnectedUser == null;
        }

        public List<UserInfo> GetUsers()
        {
            var res = new List<UserInfo>();
            if (Establisher != null)
            {
                res.Add(Establisher);
            }
            if (ConnectedUser != null)
            {
                res.Add(ConnectedUser);
            }

            return res;
        }

        public bool IsEmpty()
        {
            return Establisher == null;
        }

        public async Task EstablishConnection(UserInfo establisher)
        {
            Establisher = establisher;
            groupId = await userGroupsProvider.CreateUserGroupAndAddUser(establisher.UserId);
        }

        public string GetGroupId()
        {
            return groupId;
        }

        public async Task ConnectUser(UserInfo connectedUser)
        {
            if (ConnectedUser != null)
            {
                throw new InvalidOperationException("User is already connected");
            }

            ConnectedUser = connectedUser;

            if (!connectedUser.IsBot)
            {
                await userGroupsProvider.AddUserToGroup(connectedUser.UserId, groupId);
            }
        }

        public void DissconnectUser(string userId)
        {
            if (string.Equals(Establisher?.UserId, userId, StringComparison.Ordinal))
            {
                Establisher = ConnectedUser;
                ConnectedUser = null;
            }
            else if (string.Equals(ConnectedUser?.UserId, userId, StringComparison.Ordinal))
            {
                ConnectedUser = null;
            }
            else
            {
                throw new InvalidOperationException("No such user in group");
            }
        }

        public bool ContainsUser(string userId)
        {
            return Establisher?.UserId == userId || ConnectedUser?.UserId == userId;
        }

        public override bool Equals(object obj)
        {
            var userGroup = obj as UserGroup;
            if (userGroup == null)
            {
                return false;
            }
            return userGroup.Establisher.Equals(Establisher);
        }

        public override int GetHashCode()
        {
            return Establisher?.GetHashCode() ?? base.GetHashCode();
        }

        public IGameProvider GameProvider { get; set; }


        public void SetUpFriendToConnectGroupId(string id)
        {
            if (string.IsNullOrEmpty(id)) throw new ArgumentException("Value cannot be null or empty.", nameof(id));
            FriendToConnectGroupId = id;
        }

        public string FriendToConnectGroupId { get; private set; }
    }

}
