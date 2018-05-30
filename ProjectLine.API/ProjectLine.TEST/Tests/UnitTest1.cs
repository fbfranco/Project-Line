using System;
using System.Data.Entity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.TEST.Tests
{
    [TestClass]
    public class UnitTest1
    {
        
        ProjectRepository repo;
        Project client = new Project();

        [TestInitialize]

        public void TestSetup()
        {
            InitializeDB db = new InitializeDB();
            Database.SetInitializer(db);
            repo = new ProjectRepository();
        }

        [TestMethod]
        public void IsClientInitializableDB()
        {
            var result = repo.GetProjects();
            Assert.IsNotNull(result);
        }
    }
}
