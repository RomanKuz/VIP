using DAL;
using MongoDB.Driver;

namespace BLogic
{
    public class MongoDbInitializerHelper
    {
        public static void SetUpMongoClient(MongoClientSettings settings = null)
        {
            WordsDataContext.SetUpMongoClient(settings);
        }
    }
}
