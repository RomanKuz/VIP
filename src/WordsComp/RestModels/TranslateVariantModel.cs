using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class TranslateVariantModel
    {
        [JsonProperty("variant")]
        public string VariantDef { get; set; }

        [JsonProperty("isTrue")]
        public bool IsCorrect { get; set; }
    }
}
