using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLogic.Interfaces;
using BLogic.Models;
using Common.Models;
using DAL;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BLogic.Concrete
{
    public class UserVocabularyStorage: IUserVocabularyStorage
    {
        private readonly IWordsDataContext dataContext;

        public UserVocabularyStorage(IWordsDataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<UserVocabularyBL> GetUserVocabulary(string userId, string loginType, int take, int skip)
        {
            if (string.IsNullOrEmpty(userId))
                throw new ArgumentException("Value cannot be null or empty.", nameof(userId));
            if (string.IsNullOrEmpty(loginType))
                throw new ArgumentException("Value cannot be null or empty.", nameof(loginType));

            // TODO: Probably we can reduce this to one db query using aggregation
            var dtoObjects = await dataContext.GetUserVocabularyCollection()
                                              .Find(v => v.VocabularyWord.UserId.Id == userId
                                                         && v.VocabularyWord.UserId.LoginType == loginType)
                                              .SortByDescending(x => x.LastUpdateTime)
                                              .Skip(skip)
                                              .Limit(take)
                                              .ToListAsync();
            var count = await dataContext.GetUserVocabularyCollection().CountAsync(new BsonDocument());

            var left = count - take - skip;
            if (left < 0)
            {
                left = 0;
            }

            return new UserVocabularyBL
            {
                UserId = new UserIdKey
                {
                    Id = userId,
                    LoginType = loginType
                },
                Words = dtoObjects.Select(Mapper.Map<VocabularyWordBL>).ToList(),
                Left = (int)left
            };
        }

        public void SaveMoveResultToDatabase(MoveResult moveResult)
        {
            if (moveResult == null) throw new ArgumentNullException(nameof(moveResult));

            var user = moveResult.User;
            if (moveResult.IsSuccessful
                || !moveResult.IsCorrect
                || moveResult.Word == null
                || user == null
                || !user.IsLoggedIn)
            {
                return;
            }

            dataContext.GetUserVocabularyCollection()
                .UpdateOne(
                    v => v.VocabularyWord
                         == new VocabularyWordKey {UserId = user.LoginInfo.UserId, Word = moveResult.Word.Word},
                    Builders<VocabularyWordDTO>.Update
                        .CurrentDate(x => x.LastUpdateTime)
                        .Set(x => x.Translation, moveResult.Word.TranslateVariants.First(y => y.IsCorrect).VariantDef),
                    new UpdateOptions {IsUpsert = true});

        }
    }
}
