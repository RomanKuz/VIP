using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.Authentication;
using WordsComp.Concrete.Auth;

namespace WordsComp.Concrete
{
    public class JWTDataFormat: ISecureDataFormat<AuthenticationTicket>
    {
        private readonly JwtSecurityTokenHandler jwtHandler = new JwtSecurityTokenHandler();

        public string Protect(AuthenticationTicket data)
        {
            var jwt = new JwtSecurityToken(new JwtHeader(), new JwtPayload(data.Principal.Claims));
            return jwtHandler.WriteToken(jwt);
        }

        public AuthenticationTicket Unprotect(string protectedText, string purpose)
        {
            return Unprotect(protectedText);
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            if (!jwtHandler.CanReadToken(protectedText))
            {
                return null;
            }

            var token = jwtHandler.ReadJwtToken(protectedText);
            return new AuthenticationTicket(new ClaimsPrincipal(new ClaimsIdentity(token.Claims, AuthConstants.SIGN_IN_SCHEME)), 
                                            new AuthenticationProperties(), 
                                            AuthConstants.SIGN_IN_SCHEME);
        }

        public string Protect(AuthenticationTicket data, string purpose)
        {
            return Protect(data);
        }
    }
}
