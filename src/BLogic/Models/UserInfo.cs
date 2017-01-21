using System;
using Common.Models;

namespace BLogic.Models
{
    public class UserInfo
    {
        public UserInfo(string userId, 
                        string displayName,
                        WordLevel gameLevel,
                        bool isBot,
                        bool isLoggedIn,
                        LoginUserInfo loginUserInfo = null)
        {
            UserId = userId;
            DisplayName = displayName;
            GameLevel = gameLevel;
            IsBot = isBot;

            if (isLoggedIn && loginUserInfo == null)
            {
                throw new ArgumentException(nameof(loginUserInfo));
            }

            IsLoggedIn = isLoggedIn;
            LoginInfo = loginUserInfo;
        }

        public void ChangeGameLevel(WordLevel wordLevel)
        {
            GameLevel = wordLevel;
        }

        public void ChangeDisplayName(string displayName)
        {
            DisplayName = displayName;
        }

        public string UserId { get; }

        public string DisplayName { get; private set; }

        public WordLevel GameLevel { get; private set; }

        public bool IsLoggedIn { get; }

        public LoginUserInfo LoginInfo { get; }

        public override bool Equals(object obj)
        {
            var userInfo = obj as UserInfo;
            if (userInfo == null)
            {
                return false;
            }
            return string.Equals(userInfo.UserId, UserId, StringComparison.Ordinal);
        }

        public override int GetHashCode()
        {
            return UserId.GetHashCode();
        }

        public bool IsBot { get; }
    }
}
