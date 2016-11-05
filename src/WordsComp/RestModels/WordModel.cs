using System.Collections.Generic;
using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class WordModel
    {
        [JsonProperty("word")]
        public string Word { get; set; }

        [JsonProperty("translateVariants")]
        public List<TranslateVariantModel> TranslateVariants { get; set; }

        [JsonProperty("explanationQuotes")]
        public List<string> ExplanationQuotes { get; set; }

        [JsonProperty("definition")]
        public string Definition { get; set; }

        [JsonProperty("shortWordRepresentation")]
        public string ShortWordRepresentation { get; set; }
    }
}
