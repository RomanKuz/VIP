using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IUserGroupsProvider
    {
        Task<string> CreateUserGroupAndAddUser(string userId);

        Task AddUserToGroup(string userId, string groupId);
    }
}
