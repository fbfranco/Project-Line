﻿using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Config
{
    public class ProjectLineContext : DbContext
    {
        //Config Data Base
        public ProjectLineContext() : base("DefaultConnection") { }

        //create data model
        public DbSet<Project> Projects { get; set; }
        public DbSet<Phase> Phases { get; set; }
        public DbSet<Objective> Objectives { get; set; }
        public DbSet<User> Users { get; set; }

        //Tables Model
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            #region Model Project
            modelBuilder.Entity<Project>().HasKey(x => x.ProjectID);
            modelBuilder.Entity<Project>().Property(x => x.Title).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<Project>().Property(x => x.Description).HasMaxLength(1000);
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

            #region Model Objective
            modelBuilder.Entity<Objective>().HasKey(x => x.ObjectiveID);
            modelBuilder.Entity<Objective>().Property(x => x.Title).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<Objective>().Property(x => x.Description).HasMaxLength(1000);
            modelBuilder.Entity<Objective>().Property(x => x.Completed);
            modelBuilder.Entity<Objective>().Property(x => x.Weight);
            modelBuilder.Entity<Objective>().Property(x => x.Estimated);
            modelBuilder.Entity<Objective>().Property(x => x.Effort);
            modelBuilder.Entity<Objective>().Property(x => x.PhaseID);
            #endregion

            #region Model Users
            modelBuilder.Entity<User>().HasKey(x => x.UserID);
            modelBuilder.Entity<User>().Property(x => x.Name).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.LastName).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.Enterprise).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.Address).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.Email).HasMaxLength(150).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.Status).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.RolID).IsRequired();
            //modelBuilder.Entity<User>().Property(x => x.RoleID);
            #endregion
        }
    }
}
