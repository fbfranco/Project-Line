using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
    public interface IPermissionRoleRepository
    {
        Task<IEnumerable<PermissionRole>> GetPermissionRoles();
        PermissionRole FindById(int id);
        void Create(PermissionRole PermissionRole);
    }
}
