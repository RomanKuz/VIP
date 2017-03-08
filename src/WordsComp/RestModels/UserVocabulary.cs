using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class UserVocabulary
    {
        [JsonProperty("words")]
        public List<VocabularyWord> Words { get; set; }

        [JsonProperty("left")]
        public int Left { get; set; }
    }
}
