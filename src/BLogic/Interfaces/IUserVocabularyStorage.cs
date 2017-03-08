using System.Threading.Tasks;
using BLogic.Models;

namespace BLogic.Interfaces
{
    public interface IUserVocabularyStorage
    {
        Task<UserVocabularyBL> GetUserVocabulary(string userId, string loginType, int take, int skip);

        void SaveMoveResultToDatabase(MoveResult moveResult);
    }
}
