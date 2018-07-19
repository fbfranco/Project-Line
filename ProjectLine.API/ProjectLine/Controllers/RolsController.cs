using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class RolsController : ApiController
    {
        private ProjectLineContext db = new ProjectLineContext();
        RolRepository Repository = new RolRepository();

        // GET: api/Rols
        public IEnumerable<Rol> GetRols()
        {
            return db.Rols;
        }

        // GET: api/Rols/5
        [ResponseType(typeof(Rol))]
        public IHttpActionResult GetRol(int id)
        {
            Rol rol = db.Rols.Find(id);
            if (rol == null)
            {
                return NotFound();
            }

            return Ok(rol);
        }

        // PUT: api/Rols/5
        public IHttpActionResult UpdateRol([FromBody]Rol rol)
        {
            if (Repository.FindById(rol.RoleId) == null)
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
        [ResponseType(typeof(Rol))]
        public IHttpActionResult SaveRol([FromBody]Rol rol)
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
        [ResponseType(typeof(Rol))]
        public IHttpActionResult DeleteRol(int id)
        {
            Rol rol = db.Rols.Find(id);
            if (rol == null)
            {
                return NotFound();
            }

            db.Rols.Remove(rol);
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
            return db.Rols.Count(e => e.RoleId == id) > 0;
        }
    }
}