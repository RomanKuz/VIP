using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace DAL
{
    public class VocabularyWordDTO
    {
        [BsonId]
        public VocabularyWordKey VocabularyWord { get; set; }

        public string Translation { get; set; }

        public DateTime LastUpdateTime { get; set; }
    }
}
