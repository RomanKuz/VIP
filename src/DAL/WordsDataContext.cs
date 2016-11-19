using System;
using System.Reflection;
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

        private IMongoCollection<WordDTO> GetWordsAdvancedCollection()
        {
            return db.GetCollection<WordDTO>("words.adv");
        }

        private IMongoCollection<WordDTO> GetWordsIntermediateCollection()
        {
            return db.GetCollection<WordDTO>("words.intermediate");
        }

        private IMongoCollection<WordDTO> GetWordsBeginnerCollection()
        {
            return db.GetCollection<WordDTO>("words.beginner");
        }

        public IMongoCollection<WordDTO> GetWordsCollection(int collectionType)
        {
            switch (collectionType)
            {
                case 1:
                    return GetWordsBeginnerCollection();

                case 2:
                    return GetWordsIntermediateCollection();

                case 3:
                    return GetWordsAdvancedCollection();

                default:
                    throw new ArgumentException(nameof(collectionType));
            }
        }
    }
}
