using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class MoveResultModel
    {
        [JsonProperty("isSuccessful")]
        public bool IsSuccessful { get; set; }

        [JsonProperty("isCorrect")]
        public bool IsCorrect { get; set; }

        [JsonProperty("errorMessage")]
        public string ErrorMessage { get; set; }

        [JsonProperty("isLastMove")]
        public bool IsLastMove { get; set; }


        [JsonProperty("selectedVariantIndex")]
        public int SelectedVariantIndex { get; set; }

        [JsonProperty("gameResult")]
        public GameResultModel GameResult { get; set; }
    }
}
