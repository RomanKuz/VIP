using MongoDB.Driver;

namespace DAL
{
    public class WordsDataContext: IWordsDataContext
    {
        private static readonly IMongoDatabase db;

        static WordsDataContext()
        {
            var client = new MongoClient();
            db = client.GetDatabase("WordsStorage");
        }

        public IMongoCollection<WordDTO> GetWordsCollection()
        {
            return db.GetCollection<WordDTO>("words");
        }
    }
}
