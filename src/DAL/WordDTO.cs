using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace DAL
{
    public class WordDTO
    {
        [BsonId]
        public string Word { get; set; }

        public List<TranslateVariantDTO> TranslateVariants { get; set; }

        public List<string> ExplanationQuotes { get; set; }

        public string Definition { get; set; }

        public int WordLevel { get; set; }
    }
}
