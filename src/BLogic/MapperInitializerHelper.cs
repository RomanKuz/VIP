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
        }
    }
}
