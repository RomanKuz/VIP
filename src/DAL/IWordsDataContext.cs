using MongoDB.Driver;

namespace DAL
{
    public interface IWordsDataContext
    {
        IMongoCollection<WordDTO> GetWordsCollection(int collectionType);
    }
}
