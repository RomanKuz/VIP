using Common.Models;
using MongoDB.Driver;

namespace DAL
{
    public interface IWordsDataContext
    {
        IMongoCollection<WordDTO> GetWordsCollection(WordLevel collectionType);

        IMongoCollection<VocabularyWordDTO> GetUserVocabularyCollection();
    }
}
