using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
     public interface IUserRepository
    {
        //Task<IEnumerable<User>> GetUsers();
        Task<IEnumerable<User>> GetUsers(int id);
        User FindById(int id);
        void Create(User User);
        void Update(User User);
        void Delete(int id);
    }
}
