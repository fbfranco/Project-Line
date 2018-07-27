using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.TEST.Tests
{
    [TestClass]
    public class UnitTestPhase
    {
        PhaseRepository repo;
        Phase phase = new Phase();
        ProjectLineContext Context = new ProjectLineContext();

        ProjectRepository repos = new ProjectRepository();

        [TestInitialize]
        public void TestSetup()
        {
            InitializeDB db = new InitializeDB();
            Database.SetInitializer(db);
            repo = new PhaseRepository();
        }

        [TestMethod]
        public void IsPhaseInitializableDB()
        {
            var result = repo.GetPhases();
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void AddProject()
        {
            Project name = new Project()
            {

                Title = "David",
                Description = "Descripcion1",
                StartDate = new DateTime(2017, 08, 09),
                EndDate = new DateTime(2017, 08, 09),
                StatusID = 5
            };

            Phase NamePhase = new Phase()
            {
                Title = "FaseDavid",
                Description = "Descripcion1",
                StartDate = new DateTime(2017, 08, 09),
                EndDate = new DateTime(2017, 08, 09),
                DemoUrl = "Demo1"
            };


            List<Phase> ListPhase = new List<Phase>();
            ListPhase.Add(NamePhase);

            Phase NamePhase2 = new Phase()
            {
                Title = "FaseEider",
                Description = "Descripcion2",
                StartDate = new DateTime(2019, 08, 09),
                EndDate = new DateTime(2019, 08, 09),
                DemoUrl = "Demo1"
            };
            ListPhase.Add(NamePhase2);

            ProjectViewModel ViewModel = new ProjectViewModel()
            {
                Project = name,
                Phases = ListPhase
            };
            repos.Create(ViewModel);
        }

        ObjectiveRepository obj = new ObjectiveRepository();

        [TestMethod]
        public void AddObjective()
        {
            Objective o = new Objective()
            {
                Title = "David",
                Description = "Descripcion1",
                Completed = true,
                PhaseID = 1
            };
            obj.Create(o);
        }

        RoleRepository objrol = new RoleRepository();
        [TestMethod]
        public void AddRol()
        {
            Role r1 = new Role()
            {
               Title = "Administrator",
               Description="Administrador"
            };
            objrol.Create(r1);

            Role r2 = new Role()
            {
               Title = "Product Owner",
               Description = "PO"
            };
            objrol.Create(r2);

            Role r3 = new Role()
            {
               Title = "Client",
               Description = "Cliente"
            };
            objrol.Create(r3);
        }

        UserRepository objuser = new UserRepository();
        [TestMethod]
        public void AddUser()
        {
            User user1 = new User()
            {
                FirstName = "Danner",
                LastName = "Galvarro Vaca",
                Email = "dannergal@hotmail.com",
                Company = "Apple",
                Address = "Cupertino, CA",
                Phone = "1-800-345-12345",
                Mobile = "+(123)123-456-7890",
                Password = "Danner12",
                Active = true,
                RoleID = 1
            };
            objuser.Create(user1);

        }

    }
}
