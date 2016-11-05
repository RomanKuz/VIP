using System.Threading.Tasks;
using BLogic.Models;

namespace BLogic.Interfaces
{
    public interface IUserGroupsProvider
    {
        Task<string> CreateUserGroupAndAddUser(string userId);

        Task AddUserToGroup(string userId, string groupId);
    }
}
