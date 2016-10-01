using System.Threading.Tasks;

namespace WordsComp.Interfaces
{
    public interface IUserGroupsProvider
    {
        Task<string> CreateUserGroupAndAddUser(string userId);

        Task AddUserToGroup(string userId, string groupId);
    }
}
