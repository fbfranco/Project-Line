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
    [Authorize]
    public class RolsController : ApiController
    {
        private ProjectLineContext db = new ProjectLineContext();
        RoleRepository Repository = new RoleRepository();

        public async Task<IEnumerable<Role>> GetRols()
        {
            var user = await Repository.GetRoles();
            return user;
        }

        public IEnumerable<Permission> GetPermissionsByRole(int id)
        {
            var permissions = Repository.GetPermissionsByRole(id);
            return permissions;
        }

        // GET: api/Rols/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult GetRol(int id)
        {
            Role rol = db.Roles.Find(id);
            if (rol == null)
            {
                return NotFound();
            }

            return Ok(rol);
        }

        // PUT: api/Rols/5
        public IHttpActionResult UpdateRol([FromBody]Role rol)
        {
            if (Repository.FindById(rol.RoleID) == null)
            {
                return NotFound();
            }
            else
            {
                try
                {
                    Repository.Update(rol);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
        }

        // POST: api/Rols
        [ResponseType(typeof(Role))]
        public IHttpActionResult SaveRol([FromBody]Role rol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try
                {
                    Repository.Create(rol);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
        }

        // DELETE: api/Rols/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult DeleteRol(int id)
        {
            Role rol = db.Roles.Find(id);
            if (rol == null)
            {
                return NotFound();
            }

            db.Roles.Remove(rol);
            db.SaveChanges();

            return Ok(rol);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RolExists(int id)
        {
            return db.Roles.Count(e => e.RoleID == id) > 0;
        }
    }
}