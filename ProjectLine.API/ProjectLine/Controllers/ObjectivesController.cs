using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.Controllers
{
    [Authorize]
    public class ObjectivesController : ApiController
    {
        ObjectiveRepository Repository = new ObjectiveRepository();

        // GET: api/Objetives/1
        public async Task<IEnumerable<Objective>> Get(int id)
        {

            var objective = await Repository.GetObjectives(id);

            return objective;
        }


        // POST: api/Objectives/Create
        public IHttpActionResult PostObjective([FromBody]Objective objective)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try
                {
                    Repository.Create(objective);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
        }

        // POST: api/Objectives/Update
        public IHttpActionResult UpdateObjective([FromBody]Objective objective)
        {
            if (Repository.FindById(objective.ObjectiveID) == null)
            {
                return NotFound();
            }
            else
            {
                try
                {
                    Repository.Update(objective);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
        }

        // DELETE: api/Objectives/Delete/1
        public IHttpActionResult DeleteObjective(int id)
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
