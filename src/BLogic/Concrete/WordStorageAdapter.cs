using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLogic.Interfaces;
using BLogic.Models;
using DAL;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BLogic.Concrete
{
    public class WordStorageAdapter: IWordStorageAdapter
    {
        private readonly IWordsDataContext dataContext;

        public WordStorageAdapter(IWordsDataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<List<WordBL>> GetRandomWords(int count, WordLevel wordLevel)
        {
            if (wordLevel == WordLevel.Unknown)
            {
                throw new ArgumentException(nameof(wordLevel));
            }

            var dtoList = await dataContext.GetWordsCollection((int)wordLevel)
                .Aggregate()
                .AppendStage<WordDTO>(string.Format("{{ $sample: {{ size: {0} }} }}", count))
                .ToListAsync();
            return dtoList.Select(Mapper.Map<WordBL>).ToList();
        }
    }
}
