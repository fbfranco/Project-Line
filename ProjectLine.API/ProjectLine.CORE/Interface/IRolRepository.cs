using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
   public interface IRolRepository
    {
        Task<IEnumerable<Rol>> GetRoles();
        Rol FindById(int id);
        void Create(Rol rol);
        void Update(Rol rol);
        void Delete(int id);
    }
}
