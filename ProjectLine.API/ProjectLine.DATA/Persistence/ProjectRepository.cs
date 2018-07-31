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
        private ProjectLineContext Context = new ProjectLineContext();
        private PhaseRepository phaseRepository = new PhaseRepository();

        public async Task<IEnumerable<Project>> GetProjects()
        {
            using (Context = new ProjectLineContext())
            {
                var result = await Context.Projects.Include("Phases").Include("Phases.Objectives").Where(x => x.Active == true).ToListAsync();
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

        public void Create(ProjectViewModel project)
        {
            try
            {
                using (var Trans = Context.Database.BeginTransaction())
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
                using (var Trans = context.Database.BeginTransaction())
                {
                    try
                    {
                        //Get Project of the DB
                        var update = FindById(project.Project.ProjectID);

                        foreach (var phaseDelete in update.Phases)
                        {
                            var phaseFound = false;
                            foreach (var phaseView in project.Phases)
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

                        //Update Project Data
                        update.Title = project.Project.Title;
                        update.Description = project.Project.Description;
                        update.StartDate = project.Project.StartDate;
                        update.EndDate = project.Project.EndDate;

                        context.Entry(update).State = EntityState.Modified;
                        context.SaveChanges();

                        foreach (var phase in project.Phases)
                        {
                            if (phase.PhaseID == 0)
                            {
                                //Add phase if no exist in the DB
                                phase.ProjectID = project.Project.ProjectID;
                                phaseRepository.Create(phase, context);
                            }
                            else
                            {
                                //Update phase if exist in the DB
                                phaseRepository.Update(phase, context);
                            }
                        }
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
    }

}