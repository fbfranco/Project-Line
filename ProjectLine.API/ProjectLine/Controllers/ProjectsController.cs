using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Persistence;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
                    var url = "";
                    var httpRequest = HttpContext.Current.Request;
                    if (httpRequest.Files.Count > 0)
                    {
                        foreach (string file in httpRequest.Files)
                        {
                            var postedFile = httpRequest.Files[file];
                            url = "~/UploadFile/" + postedFile.FileName;
                            var filePath = HttpContext.Current.Server.MapPath(url);
                            postedFile.SaveAs(filePath);
                        }
                    }
                    model.Phases[0].DemoUrl = url;
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
    }
}