using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
   public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetRoles();
        IEnumerable<Permission> GetPermissionsByRole(int id);
        Role FindById(int id);
        void Create(Role rol);
        void Update(Role rol);
        void Delete(int id);
    }
}
