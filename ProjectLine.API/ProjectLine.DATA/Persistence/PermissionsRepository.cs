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
    public class PermissionsRepository : IPermissionRepository
    {
        ProjectLineContext Context;

        public void Create(Permission permission)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    Context.Permissions.Add(permission);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public Permission FindByRol(int RolID)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Permission>> GetPermissions()
        {
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Permissions.Take(100).ToListAsync();
                return result;
            }
        }

        public Task<IEnumerable<Permission>> GetPermissionsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
