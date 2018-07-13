using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ProjectLine.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ProjectsController : ApiController
    {
        ProjectRepository Repository = new ProjectRepository();

        // GET: api/Projects
        public async Task<IEnumerable<Project>>GetProjects()
        {
            var project = await Repository.GetProjects();
            return project;
        }
        
        //POST api/<controller>
        public IHttpActionResult SaveProject([FromBody]ProjectViewModel model)
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
        public IHttpActionResult UpdateProjectAndPhases(int id, [FromBody]ProjectViewModel model)
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

        [HttpPut]
        public IHttpActionResult InactiveProject(int id)
        {

            if (Repository.FindById(id) == null)
            {
                return NotFound();
            }
            else
            {
                try
                {

                    Repository.DeletePasive(id);
                    return Ok();
                }
                catch (Exception error)
                {
                    return BadRequest(error.ToString());
                }
            }
        }


        // GET: api/Projects
        public async Task<IEnumerable<User>> GetUsersByRol(int id)
        {
            var user = await Repository.GetUsersByRol(id);
            return user;
        }

    }
}