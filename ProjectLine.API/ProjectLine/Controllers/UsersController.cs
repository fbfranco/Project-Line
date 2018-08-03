using ProjectLine.CORE.Models;
using ProjectLine.DATA.Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ProjectLine.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        UserRepository Repository = new UserRepository();

        // GET: api/Projects
        public async Task<IEnumerable<User>> GetUsersByRol(int id)
        {
            var user = await Repository.GetUsersByRol(id);
            return user;
        }

        // GET: api/Objetives/1
        public async Task<IEnumerable<User>> Get()
        {
            var user = await Repository.GetUsers();
            return user;
        }
        public async Task<IEnumerable<User>> GetUserPO(int id)
        {

            var objective = await Repository.GetUserPO(id);

            return objective;
        }

        // GET: api/email
        [HttpGet]
        public Boolean ValidateEmailUnique(string email)
        {
            return Repository.ValidateEmailUnique(email);
        }

        // POST: api/Users/Create
        public IHttpActionResult PostUser([FromBody]User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try
                {
                    Repository.Create(user);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
        }

        // POST: api/Users/Update
        public IHttpActionResult UpdateUser([FromBody]User user)
        {
            if (Repository.FindById(user.UserID) == null)
            {
                return NotFound();
            }
            else
            {
                try
                {
                    Repository.Update(user);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
        }

        // DELETE: api/Users/Delete/1
        public IHttpActionResult DeleteUser(int id)
        {
            if (Repository.FindById(id) == null)
            {
                return NotFound();
            }
            else
            {
                try
                {
                    Repository.Delete(id);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
        }

        // Match Email:
        //public IHttpActionResult MatchEmail(string user)
        //{
        //    Repository.MatchEmail(user);
        //    return Ok();

        //}
    }
}