using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
    public interface IObjectiveRepository
    {
        Task<IEnumerable<Objective>> GetObjectives(int id);
        void Create(Objective objective);
    }
}
