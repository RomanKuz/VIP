using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using WordsComp.Concrete.Auth;
using WordsComp.Options;
using WordsComp.RestModels;
using HttpMethod = System.Net.Http.HttpMethod;

namespace WordsComp.Controllers
{
    [Route("[controller]/[action]")]
    public class AuthController : Controller
    {
        private readonly FacebookAuthOptions facebookOptions;
        private readonly GoogleAuthOptions googeOptions;
        private readonly TwitterAuthOptions twitterOptions;
        private static readonly HttpClient client = new HttpClient();

        public AuthController(FacebookAuthOptions facebookOptions,
                              GoogleAuthOptions googeOptions,
                              TwitterAuthOptions twitterOptions)
        {
            this.facebookOptions = facebookOptions;
            this.googeOptions = googeOptions;
            this.twitterOptions = twitterOptions;
        }

        private async Task SingIn(ClaimsIdentity identity, string authType)
        {
            identity.AddClaim(new Claim(AuthConstants.AUTH_EXTERNAL_PROVIDER_CLAIM_TYPE, authType));
            await HttpContext.Authentication.SignInAsync(AuthConstants.SIGN_IN_SCHEME,
                                                         new ClaimsPrincipal(identity),
                                                         new AuthenticationProperties {IsPersistent = true});
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody]ExternalLoginInfo loginInfo)
        {
            var authEndpoint = QueryHelpers.AddQueryString("https://graph.facebook.com/v2.5/oauth/access_token",
                new Dictionary<string, string>
                {
                    {"code", loginInfo.Code},
                    {"client_id", loginInfo.ClientId},
                    {"client_secret", facebookOptions.ClientSecret},
                    {"redirect_uri", loginInfo.RedirectUri}
                });
            var response = await client.GetAsync(authEndpoint, HttpContext.RequestAborted);
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Failed to retrieve access token.");
            }
            var tokenResponse = JObject.Parse(await response.Content.ReadAsStringAsync());
            var accessToken = tokenResponse.Value<string>("access_token");

            var endpoint = QueryHelpers.AddQueryString("https://graph.facebook.com/v2.6/me",
                new Dictionary<string, string>
                {
                    {"access_token", accessToken},
                    {"fields", string.Join(",", "id", "email", "first_name", "picture.type(large)")}
                });
            response = await client.GetAsync(endpoint, HttpContext.RequestAborted);
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Failed to retrieve Facebook user information ({response.StatusCode}) Please check if the authentication information is correct and the corresponding Facebook Graph API is enabled.");
            }

            var user = JObject.Parse(await response.Content.ReadAsStringAsync());
            var identity = new ClaimsIdentity(AuthConstants.SIGN_IN_SCHEME);

            var id = user.Value<string>("id");
            if (!string.IsNullOrEmpty(id))
            {
                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, id, ClaimValueTypes.String));
            }

            var email = user.Value<string>("email");
            if (!string.IsNullOrEmpty(email))
            {
                identity.AddClaim(new Claim(ClaimTypes.Email, email, ClaimValueTypes.String));
            }

            var firstName = user.Value<string>("first_name");
            if (!string.IsNullOrEmpty(firstName))
            {
                identity.AddClaim(new Claim(AuthConstants.SHORT_NAME_CLAIM_TYPE, firstName, ClaimValueTypes.String));
            }

            var image = user.Value<JObject>("picture")
                            ?.Value<JObject>("data");
            if (image != null)
            {
                identity.AddClaim(new Claim(AuthConstants.AUTH_USER_IMAGE_CLAIM_TYPE, image.Value<string>("url")));
            }

            await SingIn(identity, "facebook");
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Google([FromBody]ExternalLoginInfo loginInfo)
        {
            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("code", loginInfo.Code),
                new KeyValuePair<string, string>("client_id", loginInfo.ClientId),
                new KeyValuePair<string, string>("client_secret", googeOptions.ClientSecret),
                new KeyValuePair<string, string>("redirect_uri", loginInfo.RedirectUri),
                new KeyValuePair<string, string>("grant_type", "authorization_code")
            });
            var response = await client.PostAsync("https://accounts.google.com/o/oauth2/token",
                                                  formContent, 
                                                  HttpContext.RequestAborted);
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Failed to retrieve access token.");
            }
            var tokenResponse = JObject.Parse(await response.Content.ReadAsStringAsync());
            var accessToken = tokenResponse.Value<string>("access_token");

            var meEndpoint = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, meEndpoint);
            requestMessage.Headers.Add("Authorization", string.Join(" ", "Bearer", accessToken));

            var meResponce = await client.SendAsync(requestMessage);
            if (!meResponce.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Failed to retrieve user info.");
            }

            var user = JObject.Parse(await meResponce.Content.ReadAsStringAsync());
            var identity = new ClaimsIdentity(AuthConstants.SIGN_IN_SCHEME);

            var id = user.Value<string>("sub");
            if (!string.IsNullOrEmpty(id))
            {
                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, id, ClaimValueTypes.String));
            }

            var email = user.Value<string>("email");
            if (!string.IsNullOrEmpty(email))
            {
                identity.AddClaim(new Claim(ClaimTypes.Email, email, ClaimValueTypes.String));
            }

            var firstName = user.Value<string>("given_name");
            if (!string.IsNullOrEmpty(firstName))
            {
                identity.AddClaim(new Claim(AuthConstants.SHORT_NAME_CLAIM_TYPE, firstName, ClaimValueTypes.String));
            }

            var image = user.Value<string>("picture");
            if (image != null)
            {
                identity.AddClaim(new Claim(AuthConstants.AUTH_USER_IMAGE_CLAIM_TYPE, image));
            }

            await SingIn(identity, "google");
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public Task<IActionResult> Twitter([FromBody]ExternalLoginInfo loginInfo)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync(AuthConstants.SIGN_IN_SCHEME);
            return Ok();
        }
    }
}
