using System.Collections.Generic;
using System.Linq;
using Microsoft.Reactive.Testing;

namespace BLogic.Tests
{
    public static class TestableObserverHelper
    {
        public static IEnumerable<T> GetAllValues<T>(this ITestableObserver<T> observer)
        {
            return observer.Messages.Select(x => x.Value.Value);
        }
    }
}
