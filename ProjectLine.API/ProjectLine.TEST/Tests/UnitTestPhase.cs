using System;
using System.Data.Entity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.TEST.Tests
{
    [TestClass]
    public class UnitTestPhase
    {
        PhaseRepository repo;

        Phase phase = new Phase();

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
    }
}
