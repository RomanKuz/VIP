using MongoDB.Bson.Serialization.Attributes;

namespace DAL
{
    public class UserGameResultDTO
    {
        [BsonId]
        public UserDbId UserId { get; set; }


    }
}
