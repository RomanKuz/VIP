using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLogic.Interfaces;
using BLogic.Models;
using DAL;
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

            long maxNumber = await dataContext.GetWordsCollection().CountAsync(w => w.WordLevel == (int)wordLevel);
            if (maxNumber < count || count < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(count));
            }

            var res = new List<WordBL>(count);
            var rnd = new Random();
            foreach (var randomWord in Enumerable.Range(0, (int)maxNumber).OrderBy(_ => rnd.Next()).Take(count))
            {
                var dbModel = await dataContext.GetWordsCollection()
                                               .Find(w => w.WordLevel == (int)wordLevel)
                                               .Skip(randomWord)
                                               .FirstAsync();
                res.Add(Mapper.Map<WordBL>(dbModel));
            }
            return res;
        }
    }
}
