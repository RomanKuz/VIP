using DAL;
using SimpleInjector;

namespace BLogic
{
    public static class DependencyResolverHelper
    {
        public static void RegisterDependencies(Container container)
        {
            container.RegisterSingleton<IWordsDataContext, WordsDataContext>();
        }
    }
}
