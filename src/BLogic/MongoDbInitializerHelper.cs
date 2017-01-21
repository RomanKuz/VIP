using DAL;
using MongoDB.Driver;

namespace BLogic
{
    public class MongoDbInitializerHelper
    {
        public static void SetUpMongoClient(string connectionString)
        {
            WordsDataContext.SetUpMongoClient(connectionString);
        }
    }
}
