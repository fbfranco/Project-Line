using ProjectLine.CORE.Models;
using ProjectLine.DATA.Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace ProjectLine.Controllers
{
    //[EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ProjectsController : ApiController
    {
        ProjectRepository Repository = new ProjectRepository();

        // GET: api/Projects
        public async Task<IEnumerable<Project>>GetProjects()
        {
            var project = await Repository.GetProjects();
            return project;
        }
        // GET: api/ProjectsArchiveds
        public async Task<IEnumerable<Project>> GetArchivedProjects()
        {
            var project = await Repository.GetArchivedProjects();
            return project;
        }

        //POST api/<controller>
        public IHttpActionResult SaveProject([FromBody]Project model)
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
        public IHttpActionResult UpdateProjectAndPhases(int id, [FromBody]Project model)
        {
            if (!ModelState.IsValid || id != model.ProjectID)
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
    }
}