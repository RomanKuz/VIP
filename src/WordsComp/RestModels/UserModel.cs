using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    [JsonObject]
    public class UserModel
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("displayName")]
        public string DisplayName { get; set; }

        [JsonProperty("isBot")]
        public bool IsBot { get; set; }
    }
}
