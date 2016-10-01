using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    [JsonObject]
    public class UserModel
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }
    }
}
