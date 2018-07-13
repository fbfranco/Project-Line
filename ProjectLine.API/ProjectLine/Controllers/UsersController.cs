using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        UserRepository Repository = new UserRepository();

        // GET: api/Objetives/1
        public async Task<IEnumerable<User>> Get()
        {
<<<<<<< HEAD
            var user = await Repository.GetUsers();
=======

            var user = await Repository.GetUsers();

>>>>>>> UI_MT_ADDUserVersion02-fix
            return user;
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
    }
}