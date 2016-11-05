using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class ScoreModel
    {
        [JsonProperty("successfulMoves")]
        public int SuccessfulMoves { get; set; }

        [JsonProperty("wrongMoves")]
        public int WrongMoves { get; set; }
    }
}
