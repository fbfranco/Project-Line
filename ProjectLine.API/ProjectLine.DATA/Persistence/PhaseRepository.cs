using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Persistence
{
    public class PhaseRepository : IPhaseRepository
    {
        ProjectLineContext Context;


        public Phase FindById(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var result = Context.Phases.Where(s => s.ProjectID == id).FirstOrDefaultAsync();
                return result.Result;
            }

        }
        public Phase FindById(int id, ProjectLineContext context)
        {
            var result = context.Phases.Where(s => s.PhaseID == id).FirstOrDefaultAsync();
            return result.Result;
        }

        public async Task<IEnumerable<Phase>> GetPhases()
        {
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Phases.Take(100).ToListAsync();
                return result;
            }
        }

        public async Task<IEnumerable<Phase>> GetPhase(int id)
        {

            using (Context = new ProjectLineContext())
            {
                var result = await Context.Phases.Where(x => x.ProjectID == id).ToListAsync();
                return result;
            }
        }

        public void Create(Phase phase)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    Context.Phases.Add(phase);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
        public void Create(Phase phase, ProjectLineContext context)
        {
            try
            {
                context.Phases.Add(phase);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public void Update(Phase phase)
        {
            try
            {
                var update = FindById(phase.PhaseID);
                using (Context = new ProjectLineContext())
                {
                    update.Title = phase.Title;
                    update.Description = phase.Description;
                    update.StartDate = phase.StartDate;
                    update.EndDate = phase.EndDate;
                    update.DemoUrl = phase.DemoUrl;

                    Context.Entry(update).State = EntityState.Modified;
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
        public void Update(Phase phase, ProjectLineContext context)
        {
            try
            {
                var update = FindById(phase.PhaseID, context);
                update.Title = phase.Title;
                update.Description = phase.Description;
                update.StartDate = phase.StartDate;
                update.EndDate = phase.EndDate;
                update.DemoUrl = phase.DemoUrl;

                context.Entry(update).State = EntityState.Modified;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public void Delete(int id)
        {
            try
            {
                var phaseDelete = FindById(id);
                using (var Context = new ProjectLineContext())
                {
                    Context.Phases.Remove(phaseDelete);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
        public void Delete(int id, ProjectLineContext context)
        {
            try
            {
                var phaseDelete = FindById(id, context);

                context.Phases.Remove(phaseDelete);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
    }
}
