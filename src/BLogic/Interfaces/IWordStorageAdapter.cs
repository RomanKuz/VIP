using System.Collections.Generic;
using System.Threading.Tasks;
using BLogic.Models;

namespace BLogic.Interfaces
{
    public interface IWordStorageAdapter
    {
        Task<List<WordBL>> GetRandomWords(int count, WordLevel wordLevel);
    }
}