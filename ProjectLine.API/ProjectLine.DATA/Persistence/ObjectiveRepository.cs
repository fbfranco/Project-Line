using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Config;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Persistence
{
    public class ObjectiveRepository : IObjectiveRepository
    {
        private ProjectLineContext Context;


        public async Task<IEnumerable<Objective>> GetObjectives(int id)
        {

            using (Context = new ProjectLineContext())
            {
                var result = await Context.Objectives.Where(x => x.PhaseID == id).ToListAsync();
                return result;
            }
        }

        public void Create(Objective objective)
        {
            try
            {
                using (Context = new ProjectLineContext())
                {
                    Context.Objectives.Add(objective);
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
    }
}
