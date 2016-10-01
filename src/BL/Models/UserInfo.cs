using System;

namespace BL.Models
{
    public class UserInfo
    {
        public string UserId { get; set; }

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
    }
}
