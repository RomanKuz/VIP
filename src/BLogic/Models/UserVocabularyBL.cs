using System;
using System.Collections.Generic;
using Common.Models;
using DAL;

namespace BLogic.Models
{
    public class UserVocabularyBL
    {
        public UserIdKey UserId { get; set; }

        public List<VocabularyWordBL> Words { get; set; }

        public int Left { get; set; }
    }
}
