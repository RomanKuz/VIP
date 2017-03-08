using System.Linq;
using AutoMapper;
using BLogic.Models;
using DAL;

namespace BLogic
{
    public static class MapperInitializerHelper
    {
        public static void InitializeMapping(IMapperConfigurationExpression config)
        {
            config.CreateMap<TranslateVariantDTO, TranslateVariant>();
            config.CreateMap<WordDTO, WordBL>();
            config.CreateMap<VocabularyWordDTO, VocabularyWordBL>()
                  .ForMember(x => x.Word, x => x.MapFrom(y => y.VocabularyWord.Word));
        }
    }
}
