using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Persistence
{
   public class ProjectRepository : IProjectRepository
    {
        private ProjectLineContext Context;
        public async Task<IEnumerable<Project>> GetProjects()
        {
            //ProjectLineContext Context = new ProjectLineContext();
            using (Context)
            {
                var result = await Context.Projects.Take(100).ToListAsync();
                return result;
            }
        }
        public async Task Create(Project project)
        {
            try
            {
                using (Context = new ProjectLineContext())//destruir variables
                {
                    Context.Projects.Add(project);
                    foreach (var phases in project.Phases)
                    {
                        Context.Phases.Add(phases);
                    }
                    await Context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            //throw new NotImplementedException();
        }
    }
}
