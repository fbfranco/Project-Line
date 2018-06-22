using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Config
{
    public class ProjectLineContext:DbContext
    {
        //Config Data Base
        public ProjectLineContext() : base("DefaultConnection") { }

        //create data model
        public DbSet<Project> Projects { get; set; }
        public DbSet<Phase> Phases { get; set; }

        //Tables Model
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            #region Model Project
            modelBuilder.Entity<Project>().HasKey(x => x.ProjectID);
            modelBuilder.Entity<Project>().Property(x => x.Title).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<Project>().Property(x => x.StartDate).IsRequired();
            modelBuilder.Entity<Project>().Property(x => x.EndDate).IsRequired();
            modelBuilder.Entity<Project>().Property(x => x.StatusID).IsRequired();
            modelBuilder.Entity<Project>().Property(x => x.Active).IsRequired();
            #endregion

            #region Model Phase
            modelBuilder.Entity<Phase>().HasKey(x => x.PhaseID);            
            modelBuilder.Entity<Phase>().Property(x => x.Title).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<Phase>().Property(x => x.Description).HasMaxLength(1000);
            modelBuilder.Entity<Phase>().Property(x => x.StartDate);
            modelBuilder.Entity<Phase>().Property(x => x.EndDate);
            modelBuilder.Entity<Phase>().Property(x => x.DemoUrl).HasMaxLength(255);
            #endregion
        }
    }
}
