using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Config;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Persistence
{
    public class UserRepository : IUserRepository
    {
        private ProjectLineContext Context;


        public async Task<IEnumerable<User>> GetUsers(int id)
        {

            using (Context = new ProjectLineContext())
            {
                var result = await Context.Users.ToListAsync();
                return result;
            }
        }

        public User FindById(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var result = Context.Users.Where(s => s.UserID == id).FirstOrDefaultAsync();
                return result.Result;
            }
        }

        public void Create(User User)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    Context.Users.Add(User);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public void Update(User User)
        {
            try
            {
                var update = FindById(User.UserID);
                using (Context = new ProjectLineContext())
                {
                    update.Name = User.Name;
                    update.LastName = User.LastName;
                    update.Enterprise = User.Enterprise;
                    update.Address = User.Address;
                    update.Status = User.Status;

                    Context.Entry(update).State = EntityState.Modified;
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
                    Context.Users.Attach(delete);
                    Context.Users.Remove(delete);
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
