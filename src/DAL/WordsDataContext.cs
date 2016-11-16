using MongoDB.Driver;

namespace DAL
{
    public class WordsDataContext: IWordsDataContext
    {
        private static IMongoDatabase db;
        private static MongoClient client;

        public static void SetUpMongoClient(MongoClientSettings settings = null)
        {
            if (settings == null)
            {
                client = new MongoClient();
            }
            else
            {
                client = new MongoClient(settings);
            }
            db = client.GetDatabase("WordsStorage");
        }

        public IMongoCollection<WordDTO> GetWordsCollection()
        {
            return db.GetCollection<WordDTO>("words");
        }
    }
}
