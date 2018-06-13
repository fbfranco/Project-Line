using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
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
        private ProjectLineContext Context= new ProjectLineContext();
        public async Task<IEnumerable<Project>> GetProjects()
        {
            //ProjectLineContext Context = new ProjectLineContext();
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Projects.Take(100).ToListAsync();
                return result;
            }
        }
        public void Create(ProjectViewModel project)
        {
            try
            {
                using (var Trans=Context.Database.BeginTransaction())//destruir variables
                {
                    try
                    {
                        Context.Projects.Add(project.Project);
                        Context.SaveChanges();
                        var id = Context.Projects.OrderByDescending(i => i.ProjectID).First().ProjectID;
                        foreach (var phase in project.Phases)
                        {
                            phase.ProjectID = id;
                            Context.Phases.Add(phase);
                        }
                        Context.SaveChanges();
                        Trans.Commit();
                    }
                    catch (Exception ex)
                    {
                        Console.Write(ex);
                        Trans.Rollback();
                    }           
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
