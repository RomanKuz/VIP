using System;
using AutoMapper;
using WordsComp.RestModels;

namespace WordsComp.Models
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

        public UserModel ToRestModel()
        {
            return Mapper.Map<UserModel>(this);
        }
    }
}
