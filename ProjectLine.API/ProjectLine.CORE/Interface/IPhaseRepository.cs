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
        Task<IEnumerable<Phase>> GetPhases();
        Phase FindById(int id);

        void Create(Phase phase);
        void Update(Phase phase);
        void Delete(int id);
    }
}
