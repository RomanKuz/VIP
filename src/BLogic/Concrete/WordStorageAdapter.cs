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

            long maxNumber = await dataContext.GetWordsCollection((int)wordLevel)
                                              .CountAsync(new BsonDocument());
            if (maxNumber < count || count < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(count));
            }

            var rnd = new Random();
            var wordsNumbers = Enumerable.Range(0, (int)count).Select(_ => rnd.Next(0, (int)maxNumber))
                                         .ToList();
            var dtoList = await dataContext.GetWordsCollection((int)wordLevel)
                .Find(Builders<WordDTO>.Filter.In(w => w.WordIndex, wordsNumbers))
                .ToListAsync();
            return dtoList.Select(Mapper.Map<WordBL>).ToList();
        }
    }
}
