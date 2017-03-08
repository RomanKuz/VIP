using System.Threading.Tasks;
using AutoMapper;
using BLogic.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordsComp.Concrete;
using WordsComp.RestModels;

namespace WordsComp.Controllers
{
    [Route("[controller]/[action]")]
    public class UserVocabularyController: Controller
    {
        private readonly IUserVocabularyStorage userVocabularyStorage;

        public UserVocabularyController(IUserVocabularyStorage userVocabularyStorage)
        {
            this.userVocabularyStorage = userVocabularyStorage;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Vocabulary(int take, int skip)
        {
            if (skip < 0)
            {
                return BadRequest();
            }

            if (take <= 0)
            {
                return BadRequest();
            }

            var userId = HttpContext.User.Claims.GetUserIdKey();
            var vocabulary = await userVocabularyStorage.GetUserVocabulary(userId.Id, userId.LoginType, take, skip);
            return Ok(Mapper.Map<UserVocabulary>(vocabulary));
        }
    }
}
