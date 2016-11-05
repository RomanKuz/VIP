using System.Collections.Generic;
using BLogic.Models;
using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class GameModel
    {
        [JsonProperty("user1")]
        public UserModel User1 { get; set; }

        [JsonProperty("user2")]
        public UserModel User2 { get; set; }

        [JsonProperty("currentMove")]
        public Move CurrentMove { get; set; }

        [JsonProperty("words")]
        public List<WordModel> Words { get; set; }

        [JsonProperty("user1Score")]
        public ScoreModel User1CurrentScore { get; set; }

        [JsonProperty("user2Score")]
        public ScoreModel User2CurrentScore { get; set; }

        [JsonProperty("gameStatus")]
        public GameStatus GameStatus { get; set; }
    }
}
