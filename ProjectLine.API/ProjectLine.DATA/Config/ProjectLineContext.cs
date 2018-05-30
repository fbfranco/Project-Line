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
            modelBuilder.Entity<Project>().Property(x => x.Description).HasMaxLength(300).IsRequired();
            modelBuilder.Entity<Project>().Property(x => x.StartDate).IsRequired();
            modelBuilder.Entity<Project>().Property(x => x.EndDate).IsRequired();
            modelBuilder.Entity<Project>().Property(x => x.StatusID).IsRequired();
            #endregion

            #region Model Phase
            modelBuilder.Entity<Phase>().HasKey(x => x.PhaseID);            
            modelBuilder.Entity<Phase>().Property(x => x.Title).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<Phase>().Property(x => x.Description).HasMaxLength(250);
            modelBuilder.Entity<Phase>().Property(x => x.StarDate).IsRequired();
            modelBuilder.Entity<Phase>().Property(x => x.EndDate).IsRequired();
            modelBuilder.Entity<Phase>().Property(x => x.StatusID).IsRequired();
            modelBuilder.Entity<Phase>().Property(x => x.ProjectID).IsRequired();
            #endregion
        }


    }
}
