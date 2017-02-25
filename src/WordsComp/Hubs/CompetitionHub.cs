using System;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BLogic.Interfaces;
using BLogic.Models;
using Common.Models;
using Microsoft.AspNetCore.SignalR;
using WordsComp.Concrete.Auth;
using WordsComp.RestModels;

namespace WordsComp.Hubs
{
    public class CompetitionHub: Hub
    {
        private readonly IUserGroupsCollector collector;

        public CompetitionHub(IUserGroupsCollector collector)
        {
            this.collector = collector;
        }

        private LoginUserInfo GetLoginInfoFromClaims()
        {
            if (!Context.User.Identity.IsAuthenticated)
            {
                return null;
            }

            var claims = ((ClaimsIdentity) Context.User.Identity).Claims;
            return new LoginUserInfo
            {
                ProfileUrl = claims.FirstOrDefault(claim => claim.Type == AuthConstants.AUTH_USER_IMAGE_CLAIM_TYPE)
                                   ?.Value,
                ShortExternalProfileName = claims.FirstOrDefault(claim => claim.Type == AuthConstants.SHORT_NAME_CLAIM_TYPE)
                                   ?.Value
            };
        }

        private async Task ConnectUser(string displayName,
            WordLevel level,
            bool isGameWithFriend,
            string friendsGroupId,
            int wordsCountFilter,
            bool isLoggedIn)
        {
            if (string.IsNullOrWhiteSpace(displayName)) throw new ArgumentNullException(nameof(displayName));
            if (level == WordLevel.Unknown) throw new ArgumentException(nameof(level));

            await collector.AddUserToQueue(
                    new UserInfo(Context.ConnectionId, displayName, level, false, isLoggedIn, GetLoginInfoFromClaims()),
                    wordsCountFilter,
                    isGameWithFriend,
                    friendsGroupId);
        }

        public async Task ConnectAnon(string displayName, 
                                      WordLevel level,
                                      bool isGameWithFriend,
                                      int wordsCountFilter,
                                      string friendsGroupId)
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                throw new HttpRequestException("User is authorized. Should use ConnectAsAuthUser method");
            }

            await ConnectUser(displayName, level, isGameWithFriend, friendsGroupId, wordsCountFilter, false);
        }

        [Authorize]
        public async Task ConnectAsAuthUser(string displayName,
                                            WordLevel level,
                                            bool isGameWithFriend,
                                            int wordsCountFilter,
                                            string friendsGroupId)
        {
            await ConnectUser(displayName, level, isGameWithFriend, friendsGroupId, wordsCountFilter, true);
        }

        public MoveResultModel DoMove(Move move, string word, string variant)
        {
            var group = collector.GetUserGroup(Context.ConnectionId);
            if (group != null)
            {
                var res = group.GameProvider.DoMove(move, word, variant);
                return Mapper.Map<MoveResultModel>(res);
            }
            else
            {
                return null;
            }
        }

        public void Quit()
        {
            collector.RemoveUser(Context.ConnectionId);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            try
            {
                Quit();
            }
            catch (Exception ex)
            {
                // TODO: Log exception
            }
            return base.OnDisconnected(stopCalled);
        }
    }
}
