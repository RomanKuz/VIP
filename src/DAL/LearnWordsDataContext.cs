using MongoDB.Driver;

namespace DAL
{
    public class LearnWordsDataContext
    {
        private static MongoClient client;

        static LearnWordsDataContext()
        {
            client = new MongoClient();
        }
    }
}
