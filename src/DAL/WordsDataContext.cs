using System;
using Common.Models;
using MongoDB.Driver;

namespace DAL
{
    public class WordsDataContext: IWordsDataContext
    {
        private static IMongoDatabase db;
        private static MongoClient client;

        public static void SetUpMongoClient(string connectionString)
        {
            client = string.IsNullOrEmpty(connectionString) ? new MongoClient() : new MongoClient(connectionString);
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

        public IMongoCollection<WordDTO> GetWordsCollection(WordLevel collectionType)
        {
            switch (collectionType)
            {
                case WordLevel.Beginer:
                    return GetWordsBeginnerCollection();

                case WordLevel.Intermediate:
                    return GetWordsIntermediateCollection();

                case WordLevel.Advanced:
                    return GetWordsAdvancedCollection();

                default:
                    throw new ArgumentException(nameof(collectionType));
            }
        }
    }
}
