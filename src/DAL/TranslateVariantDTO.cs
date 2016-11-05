using MongoDB.Bson.Serialization.Attributes;

namespace DAL
{
    public class TranslateVariantDTO
    {
        [BsonId]
        public string VariantDef { get; set; }

        public bool IsCorrect { get; set; }
    }
}
