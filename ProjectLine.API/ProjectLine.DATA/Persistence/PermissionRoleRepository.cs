using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Persistence
{
    public class PermissionRoleRepository : IPermissionRoleRepository
    {
        ProjectLineContext Context;
        public void Create(PermissionRole PermissionRole)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    Context.PermissionsRoles.Add(PermissionRole);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public PermissionRole FindById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<PermissionRole>> GetPermissionRoles()
        {
            using (Context = new ProjectLineContext())
            {
                var result = await Context.PermissionsRoles.Take(100).ToListAsync();
                return result;
            }
        }
    }
}
