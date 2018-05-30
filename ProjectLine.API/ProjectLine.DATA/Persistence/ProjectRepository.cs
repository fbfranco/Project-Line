using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Persistence
{
   public class ProjectRepository : IProjectRepository
    {
        public async Task<IEnumerable<Project>> GetProjects()
        {
            ProjectLineContext Context = new ProjectLineContext();
            using (Context)
            {
                var result = await Context.Projects.Take(100).ToListAsync();
                return result;
            }
        }
    }
}
