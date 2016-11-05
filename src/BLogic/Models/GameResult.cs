﻿using System.Collections.Generic;

namespace BLogic.Models
{
    public class GameResult
    {
        public int Winner { get; set; }

        public bool IsDraw { get; set; }

        public List<UserInfo> Users { get; set; }

        public string GroupId { get; set; }
    }
}
