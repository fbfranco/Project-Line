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
        private PhaseRepository phaseRepository = new PhaseRepository();

        public async Task<IEnumerable<Project>> GetProjects()
        {
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Projects.Include("Phases").Where(x => x.StatusID == 1).ToListAsync();
                return result;
            }
        }
        public Project FindById(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var result = Context.Projects.Where(s => s.ProjectID == id).FirstOrDefaultAsync();
                return result.Result;
            }
        }

        public void Create(ProjectViewModel project)
        {
            try
            {
                using (var Trans=Context.Database.BeginTransaction())
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
        }
        public void Update(ProjectViewModel project)
        {
            try
            {
                var context = new ProjectLineContext();
                using  (var Trans = context.Database.BeginTransaction())
                {
                    try
                    {
                        var update = FindById(project.Project.ProjectID);
                        update.Title = project.Project.Title;
                        update.Description = project.Project.Description;
                        update.StartDate = project.Project.StartDate;
                        update.EndDate = project.Project.EndDate;

                        foreach (var phase in project.Phases)
                        {
                           phaseRepository.Update(phase);
                        }
                        context.SaveChanges();
                        Trans.Commit();
                        context.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Console.Write(ex);
                        Trans.Rollback();
                    }
                }
                context.Dispose();
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
    }
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