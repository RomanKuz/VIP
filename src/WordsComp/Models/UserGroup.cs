using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WordsComp.Interfaces;
using WordsComp.RestModels;

namespace WordsComp.Models
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
            await userGroupsProvider.AddUserToGroup(connectedUser.UserId, groupId);
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

        public GroupModel ToRestModel()
        {
            return new GroupModel
            {
                GroupId = groupId,
                UsersList = new List<UserModel>
                {
                    Establisher?.ToRestModel(),
                    ConnectedUser?.ToRestModel()
                }
            };
        }
    }

}
