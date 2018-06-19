using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ProjectsController : ApiController
    {
        ProjectRepository Repository = new ProjectRepository();

        // GET: api/Projects
        public async Task<IEnumerable<Project>> Get()
        {
            var project = await Repository.GetProjects();
            return project;
        }
        
        //POST api/<controller>
        public IHttpActionResult Post([FromBody]ProjectViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try
                {
                    Repository.Create(model);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
        }

        // PUT: api/Phases/5
        public IHttpActionResult Put(int id, [FromBody]ProjectViewModel model)
        {
            if (!ModelState.IsValid || id != model.Project.ProjectID)
            {
                return BadRequest(ModelState);
            }
            if (Repository.FindById(id) == null)
            {
                return NotFound();
            }
            else
            {
                try
                {
                    Repository.Update(model);
                    return Ok();
                }
                catch (Exception error)
                {
                    return BadRequest(error.ToString());
                }
            }
        }

    }
}