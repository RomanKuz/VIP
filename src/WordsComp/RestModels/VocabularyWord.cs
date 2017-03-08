using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class VocabularyWord
    {
        [JsonProperty("word")]
        public string Word { get; set; }


        [JsonProperty("translation")]
        public string Translation { get; set; }
    }
}
