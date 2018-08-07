using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Persistence
{
    public class UserRepository : IUserRepository
    {
        private ProjectLineContext Context;


        public async Task<IEnumerable<User>> GetUsers()
        {

            using (Context = new ProjectLineContext())
            {
                var result = await Context.Users.Include("Role").ToListAsync();
                return result;
            }
        }
        public async Task<IEnumerable<User>> GetUserPO(int id)
        {

            using (Context = new ProjectLineContext())
            {
                var result = await Context.Users.Include("Role").Where(x => x.UserID == id).ToListAsync();
                return result;
            }
        }

        public async Task<IEnumerable<User>> GetUsersEdit()
        {

            using (Context = new ProjectLineContext())
            {
                var listusers = await Context.Users.Include("Role").ToListAsync();
                var result = listusers.Select(u => new User()
                {
                    UserID = u.UserID,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Company = u.Company,
                    Phone = u.Phone,
                    Mobile = u.Phone,
                    Email = u.Email,
                    Address = u.Address,
                    Active = u.Active,
                    RoleID = u.RoleID,
                    Role = u.Role
                    
                    });
                return result;
            }
          
        }

        public async Task<IEnumerable<User>> GetUsersByRol(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var listusers = await Context.Users.Include("Role").Where(x => x.Role.RoleID == id).ToListAsync();
                var result = listusers.Select(u => new User()
                {
                    UserID = u.UserID,
                    FirstName = u.FirstName,
                    LastName = u.LastName
                });
                return result;
            }
        }

        public bool ValidateEmailUnique(string email,int id)
        {
            using (Context = new ProjectLineContext())
            {
                var existEmail = Context.Users.Where(x => x.Email == email && x.UserID != id).Count();
                return existEmail > 0;
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
                    User.Password = HashPassword(User.Password);


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

                    if (User.Password == "")
                    {
                        update.FirstName = User.FirstName;
                        update.LastName = User.LastName;
                        update.Email = User.Email;
                        update.Company = User.Company;
                        update.Address = User.Address;
                        update.Phone = User.Phone;
                        update.Mobile = User.Mobile;
                        update.Active = User.Active;
                        update.RoleID = User.RoleID;
                    }
                    else
                    {
                        update.FirstName = User.FirstName;
                        update.LastName = User.LastName;
                        update.Email = User.Email;
                        update.Company = User.Company;
                        update.Address = User.Address;
                        update.Phone = User.Phone;
                        update.Mobile = User.Mobile;
                        update.Password = HashPassword(User.Password);
                        update.Active = User.Active;
                        update.RoleID = User.RoleID;
                    }

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

        public string HashPassword(string password)
        {
            // Create the salt value with a cryptographic PRNG
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            // Create the Rfc2898DeriveBytes and get the hash value
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            // Combine the salt and password bytes for later use
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            // Turn the combined salt+hash into a string for storage
            string savedPasswordHash = Convert.ToBase64String(hashBytes);

            return savedPasswordHash;
        }
    }
}
