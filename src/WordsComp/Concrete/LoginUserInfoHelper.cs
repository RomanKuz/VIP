using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Common.Models;
using WordsComp.Concrete.Auth;

namespace WordsComp.Concrete
{
    public static class LoginUserInfoHelper
    {
        public static UserIdKey GetUserIdKey(this IEnumerable<Claim> claims)
        {
            return new UserIdKey
            {
                Id = claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value,
                LoginType = claims.First(claim => claim.Type == AuthConstants.AUTH_EXTERNAL_PROVIDER_CLAIM_TYPE).Value
            };
        }
    }
}
