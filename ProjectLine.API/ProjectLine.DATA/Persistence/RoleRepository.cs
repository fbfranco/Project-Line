using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using System;
using ProjectLine.DATA.Config;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ProjectLine.DATA.Persistence
{
    public class RoleRepository : IRoleRepository
    {
        private ProjectLineContext Context;
        public void Create(Role rol)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    Context.Roles.Add(rol);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
        
        public void Delete(int id)
        {
            try
            {
                var delete = FindById(id);
                using (Context = new ProjectLineContext())
                {
                    Context.Roles.Attach(delete);
                    Context.Roles.Remove(delete);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public Role FindById(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var result = Context.Roles.Where(s => s.RoleID == id).FirstOrDefaultAsync();
                return result.Result;
            }
        }

        public IEnumerable<Permission> GetPermissionsByRole(int id)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    var result = from p in Context.Permissions
                                 join pr in Context.PermissionsRoles on p.PermissionID equals pr.PermissionID
                                 join r in Context.Roles on pr.RoleID equals r.RoleID
                                 where r.RoleID == id
                                 select p;

                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }

        public async Task<IEnumerable<Role>> GetRoles()
        {           
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Roles.ToListAsync();
                return result;
            }
        }

        public void Update(Role rol)
        {
            try
            {
                var update = FindById(rol.RoleID);
                using (Context = new ProjectLineContext())
                {
                    //update.Title = rol.Title;
                    update.Description = rol.Description;


                    Context.Entry(update).State = EntityState.Modified;
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }

        }
    }
}
