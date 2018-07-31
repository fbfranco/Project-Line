using ProjectLine.CORE.Interface;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ProjectLine.DATA.Persistence
{
    public class ProjectRepository : IProjectRepository
    {
        private ProjectLineContext Context = new ProjectLineContext();
        private PhaseRepository phaseRepository = new PhaseRepository();

        public async Task<IEnumerable<Project>> GetProjects()
        {
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Projects.Include("User").Include("Phases").Include("Phases.Objectives").Where(x => x.Active == true).ToListAsync();
                return result;
            }
        }
        public Project FindById(int id)
        {
            using (Context = new ProjectLineContext())
            {
                var result = Context.Projects.Include("Phases").Where(s => s.ProjectID == id).FirstOrDefaultAsync();
                return result.Result;
            }
        }

        public void Create(Project project)
        {
            try
            {
                using (var Trans = Context.Database.BeginTransaction())
                {
                    try
                    {
                        Context.Projects.Add(project);
                        Context.SaveChanges();
                        var id = Context.Projects.OrderByDescending(i => i.ProjectID).First().ProjectID;
                        AddOrUpdatePhases(project, id, Context);
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
            Context.Dispose();
        }
        public void Update(Project project)
        {
            try
            {
                var context = new ProjectLineContext();
                using (var Trans = context.Database.BeginTransaction())
                {
                    try
                    {
                        //Get Project of the DB
                        var update = FindById(project.ProjectID);

                        //Update Project Data
                        update.Title = project.Title;
                        update.Description = project.Description;
                        update.StartDate = project.StartDate;
                        update.EndDate = project.EndDate;
                        update.UserID = project.UserID;
                        update.OwnerID = project.OwnerID;

                        context.Entry(update).State = EntityState.Modified;
                        context.SaveChanges();

                        AddOrUpdatePhases(project, update.ProjectID, context);
                        DeletePhasesExistens(project, context);

                        Trans.Commit();
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
        public void DeletePasive(int id)
        {
            try
            {
                var StatusUpdate = FindById(id);
                using (Context = new ProjectLineContext())
                {
                    // StatusUpdate.StatusID = 0;
                    StatusUpdate.Active = false;
                    Context.Entry(StatusUpdate).State = EntityState.Modified;
                    Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        private void AddOrUpdatePhases(Project project, int id, ProjectLineContext context)
        {
            foreach (var phase in project.Phases)
            {
                phase.ProjectID = id;
                if (phase.DemoVideo != null)
                {
                    if (phase.DemoVideo.Equals(""))
                    {
                        phase.DemoUrl = "";
                    }
                    else
                    {
                        phase.DemoUrl = "/assets/Demo/" + phase.Title + "_" + phase.DemoName;
                        SaveDemo(phase.DemoVideo, phase.DemoUrl);
                    }
                }

                if (phase.PhaseID == 0)
                {
                    phaseRepository.Create(phase, context);
                }
                else
                {
                    phaseRepository.Update(phase, context);
                }
            }
        }
        private void SaveDemo(string video, string path)
        {
            byte[] demoFile = Convert.FromBase64String(video);
            File.WriteAllBytes(HttpContext.Current.Server.MapPath(path), demoFile);
        }
        private void DeletePhasesExistens(Project projectExist, ProjectLineContext context)
        {
            foreach (var phaseDelete in projectExist.Phases)
            {
                var phaseFound = false;
                foreach (var phaseView in projectExist.Phases)
                {
                    //Check exist phase of the DB
                    if (phaseDelete.PhaseID == phaseView.PhaseID)
                    {
                        phaseFound = true;
                        break;
                    }
                }

                if (!phaseFound)
                {
                    //Delete phase if no exist in the DB
                    phaseRepository.Delete(phaseDelete.PhaseID, context);
                }
            }
        }
    }

}