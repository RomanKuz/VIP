using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class GameResultModel
    {
        [JsonProperty("winner")]
        public int Winner { get; set; }

        [JsonProperty("isDraw")]
        public bool IsDraw { get; set; }
    }
}
