using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace WordsComp.RestModels
{
    public class ExternalLoginInfo
    {
        [JsonProperty("code")]
        public string Code { get; set; }


        public string ClientId { get; set; }
        public string RedirectUri { get; set; }
    }
}
