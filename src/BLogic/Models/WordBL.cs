using System.Collections.Generic;
using AutoMapper;
using DAL;

namespace BLogic.Models
{
    public class WordBL
    {
        public string Word { get; set; }

        public List<TranslateVariant> TranslateVariants { get; set; }

        public List<string> ExplanationQuotes { get; set; }

        public string Definition { get; set; }

        public string GetShortWordRepresentation()
        {
            return Word;
        }
    }
}
