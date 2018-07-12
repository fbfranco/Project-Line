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
    public class RolRepository : IRolRepository
    {
        private ProjectLineContext Context;
        public void Create(Rol rol)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    Context.Rols.Add(rol);
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
                    Context.Rols.Attach(delete);
                    Context.Rols.Remove(delete);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public Rol FindById(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var result = Context.Rols.Where(s => s.RoleId == id).FirstOrDefaultAsync();
                return result.Result;
            }
        }

        public async Task<IEnumerable<Rol>> GetRoles()
        {           
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Rols.Take(100).ToListAsync();
                return result;
            }
        }

        public void Update(Rol rol)
        {
            try
            {
                var update = FindById(rol.RoleId);
                using (Context = new ProjectLineContext())
                {
                    update.Title = rol.Title;
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
