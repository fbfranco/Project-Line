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
            context.Projects.AddOrUpdate(x => x.ProjectID, new Project { Title = "Title1", Description = "Descripcion1", StartDate = new DateTime(2018, 5, 17), EndDate = new DateTime(2018, 5, 19), StatusID = 1 });
            #endregion

            #region Initialize Table Phase
            context.Phases.AddOrUpdate(x => x.PhaseID, new Phase
            {
                Title = "TitlePhase1",
                Description = "DescripcionPhase1",
                StartDate = new DateTime(2018, 4, 1),
                EndDate = new DateTime(2018, 4, 14),
                DemoUrl = "Something/folderPhaseDemo"
            });
            #endregion

            #region Initialize Table Objective
            context.Objectives.AddOrUpdate(x => x.ObjectiveID, new Objective
            {
                Title = "Title",
                Description = "Descripcion",
                Completed = true,
                Weight = 0,
                Estimated = 0,
                Effort = 0,
                PhaseID = 1
            });
            #endregion

            #region Initialize Table Roles
            context.Rols.AddOrUpdate(x => x.RoleID, new Rol
            {
                Title="Admin",
                Description="Administrador"
            });
            #endregion

            #region Initialize Table Users
            context.Users.AddOrUpdate(x => x.UserID, new User
            {
                FirstName = "Danner",
                LastName = "Galvarro Vaca",
                Email = "dannergal@hotmail.com",
                Company = "Apple",
                Address = "Cupertino, CA",
                Phone = "1-800-MY-APPLE",
                Mobile = "+(123)123-456-7890",
                Username = "dannergv",
                Password = "danner",
                Active = true,
                RoleID = 1
            });
            #endregion
        }
    }
}
