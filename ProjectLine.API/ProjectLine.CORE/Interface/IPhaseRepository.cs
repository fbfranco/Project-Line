using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
    public interface IPhaseRepository
    {
        Task Create(Phase phase);
        Task<IEnumerable<Phase>> GetPhases();
        Phase FindById(int id);
        void Update(Phase phase);
    }
}
