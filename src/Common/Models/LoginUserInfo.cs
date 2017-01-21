using Newtonsoft.Json;
using WordsComp.Concrete.Auth;

namespace Common.Models
{
    public class LoginUserInfo
    {
        [JsonProperty(AuthConstants.AUTH_USER_IMAGE_CLAIM_TYPE)]
        public string ProfileUrl { get; set; }

        [JsonProperty(AuthConstants.SHORT_NAME_CLAIM_TYPE)]
        public string ShortExternalProfileName { get; set; }
    }
}
