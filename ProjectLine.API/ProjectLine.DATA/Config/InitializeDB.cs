using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Config
{
    public class InitializeDB : DropCreateDatabaseIfModelChanges<ProjectLineContext>
    {

        protected override void Seed(ProjectLineContext context)
        {
            base.Seed(context);

            #region Initialize Table Project
            context.Projects.AddOrUpdate(x => x.ProjectID, new Project { Title = "Title1", Description="Descripcion1", StartDate = new DateTime(2018, 5, 17), EndDate= new DateTime(2018, 5, 19), StatusID=1});
            #endregion

            #region Initialize Table Phase
            context.Phases.AddOrUpdate(x => x.PhaseID, new Phase {
                      Title = "TitlePhase1",
                Description = "DescripcionPhase1",
                  StartDate = new DateTime(2018, 4, 1),
                    EndDate = new DateTime(2018, 4, 14),
                    DemoUrl = "Something/folderPhaseDemo"
            });
            #endregion
        }
    }
}
