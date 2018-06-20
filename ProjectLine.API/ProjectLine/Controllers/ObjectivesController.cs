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
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ObjectivesController : ApiController
    {
        ObjectiveRepository Repository = new ObjectiveRepository();

        // GET: api/Objetives/1
        public async Task<IEnumerable<Objective>> Get(int id)
        {

            var objective = await Repository.GetObjectives(id);

            return objective;
        }


        // POST: api/Personas
        [HttpPost]
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
    }
}
