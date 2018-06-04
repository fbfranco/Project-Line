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

        public async Task Create(Phase phase)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    Context.Phases.Add(phase);
                    await Context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public async Task<Phase> FindById(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Phases.Where(s => s.PhaseID == id).FirstOrDefaultAsync();
                return result;
            }
        }

        public async Task<IEnumerable<Phase>> GetPhases()
        {
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Phases.Take(100).ToListAsync();
                return result;
            }
        }

        Phase IPhaseRepository.FindById(int id)
        {
            throw new NotImplementedException();
        }

        //public async Task Update(Phase phase)
        //{
        //    try
        //    {
        //        using (Context)
        //        {
        //            var update = FindById(phase.PhaseID);
        //            update.Title = phase.Title;
        //            update.Description = phase.Description;
        //            update.StartDate = phase.StartDate;
        //            update.EndDate = phase.EndDate;
        //            update.DemoUrl = phase.DemoUrl;
        //            await Context.SaveChangesAsync();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.Write(ex);
        //    }
        //}
    }
}
