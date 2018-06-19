using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.Controllers
{
    public class PhasesController : ApiController
    {
        PhaseRepository Repository = new PhaseRepository();

        // GET: api/Phases
        public async Task<IEnumerable<Phase>> GetPhases()
        {
            var phase = await Repository.GetPhases();
            return phase;
        }

        // GET: api/Phases/5
        public async Task<IHttpActionResult> GetPhase(int id)
        {
            var phase = Repository.FindById(id);
            if (phase == null)
            {
                return NotFound();
            }

            return Ok(phase);
        }        

        // POST: api/Phases
        public IHttpActionResult PostPhase([FromBody]Phase phase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try 
                {
                    Repository.Create(phase);
                    return Ok();
                } 
                catch (Exception error) 
                {
                    return BadRequest(error.ToString());
                }
            }
        }

        // PUT: api/Phases/5
        // public IHttpActionResult PutPhase(int id, [FromBody]Phase phase)
        // {
        //     if (!ModelState.IsValid || id != phase.PhaseID)
        //     {
        //         return BadRequest(ModelState);
        //     }
        //     if (repo.FindByID(id) == null)
        //     {
        //         return NotFound();
        //     }
        //     else 
        //     {
        //         try 
        //         {
        //             await repo.Update(phase);
        //             return Ok();
        //         } 
        //         catch {System.Exception error) 
        //         {
        //             return BadRequest(error.ToString())
        //         } 
        //     }
        // }

        // DELETE: api/Phases/5
        // public IHttpActionResult DeletePhase(int id)
        // {
        //     Phase phase = db.Phases.Find(id);
        //     if (phase == null)
        //     {
        //         return NotFound();
        //     }
        //     db.Phases.Remove(phase);
        //     db.SaveChanges();
        //     return Ok(phase);
        // }
    }
}