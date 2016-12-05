using System.Collections.Generic;
using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    [JsonObject]
    public class GroupModel
    {
        [JsonProperty("groupId")]
        public string GroupId { get; set; }

        [JsonProperty("usersList")]
        public List<UserModel> UsersList { get; set; }

        [JsonProperty("isFriendsRoom")]
        public bool IsFriendsRoom { get; set;}
    }
}
