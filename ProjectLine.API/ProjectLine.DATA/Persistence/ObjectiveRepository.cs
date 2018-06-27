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

        public Objective FindById(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var result = Context.Objectives.Where(s => s.ObjectiveID == id).FirstOrDefaultAsync();
                return result.Result;
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

        public void Update(Objective objective)
        {
            try
            {
                var update = FindById(objective.ObjectiveID);
                using (Context = new ProjectLineContext())
                {
                    update.Title = objective.Title;
                    update.Description = objective.Description;
                    update.Completed = objective.Completed;
                    update.Weight = objective.Weight;
                    update.Estimated = objective.Estimated;
                    update.Effort = objective.Effort;

                    Context.Entry(update).State = EntityState.Modified;
                    Context.SaveChanges();
                }
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
                var Delete = FindById(id);
                using (Context = new ProjectLineContext())
                {
                    Context.Objectives.Remove(Delete);
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
