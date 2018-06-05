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

                Title="David",
	            Description="Descripcion1",
	            StartDate= new DateTime (2017,08,09),
	            EndDate=new DateTime(2017,08,09),
	            StatusID=5
            };
            
            Phase NamePhase = new Phase()
            {
                    Title ="FaseDavid",
	                Description="Descripcion1",
	                StartDate= new DateTime (2017,08,09),
	                 EndDate= new DateTime(2017,08,09),
	                DemoUrl="Demo1"
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

            ProjectViewModel ViewModel = new ProjectViewModel() {
                Project = name, Phases = ListPhase
            };
           repos.Create(ViewModel);
        }
    }
}
