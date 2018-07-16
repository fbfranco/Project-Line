namespace ProjectLine.DATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Objectives",
                c => new
                    {
                        ObjectiveID = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 150),
                        Description = c.String(maxLength: 1000),
                        Completed = c.Boolean(nullable: false),
                        Weight = c.Int(nullable: false),
                        Estimated = c.Int(nullable: false),
                        Effort = c.Int(nullable: false),
                        PhaseID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ObjectiveID)
                .ForeignKey("dbo.Phases", t => t.PhaseID, cascadeDelete: true)
                .Index(t => t.PhaseID);
            
            CreateTable(
                "dbo.Phases",
                c => new
                    {
                        PhaseID = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 150),
                        Description = c.String(maxLength: 1000),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        DemoUrl = c.String(maxLength: 255),
                        ProjectID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PhaseID)
                .ForeignKey("dbo.Projects", t => t.ProjectID, cascadeDelete: true)
                .Index(t => t.ProjectID);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectID = c.Int(nullable: false, identity: true),
                        UserID = c.Int(nullable: false),
                        Title = c.String(nullable: false, maxLength: 150),
                        Description = c.String(maxLength: 1000),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        StatusID = c.Int(nullable: false),
                        Active = c.Boolean(nullable: false)
                    })
                .PrimaryKey(t => t.ProjectID)
                .ForeignKey("dbo.Users", t => t.UserID, cascadeDelete: true)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        RoleID = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 150),
                        Description = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.RoleID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false, maxLength: 150),
                        LastName = c.String(nullable: false, maxLength: 150),
                        Email = c.String(nullable: false, maxLength: 150),
                        Company = c.String(maxLength: 150),
                        Address = c.String(maxLength: 150),
                        Phone = c.String(maxLength: 20),
                        Mobile = c.String(maxLength: 20),
                        Username = c.String(nullable: false, maxLength: 25),
                        Password = c.String(nullable: false, maxLength: 25),
                        Active = c.Boolean(nullable: false),
                        RoleID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserID)
                .ForeignKey("dbo.Roles", t => t.RoleID, cascadeDelete: true)
                .Index(t => t.RoleID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.Projects", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.Phases", "ProjectID", "dbo.Projects");
            DropForeignKey("dbo.Objectives", "PhaseID", "dbo.Phases");
            DropIndex("dbo.Users", new[] { "RoleID" });
            DropIndex("dbo.Projects", new[] { "RoleID" });
            DropIndex("dbo.Phases", new[] { "ProjectID" });
            DropIndex("dbo.Objectives", new[] { "PhaseID" });
            DropTable("dbo.Users");
            DropTable("dbo.Roles");
            DropTable("dbo.Projects");
            DropTable("dbo.Phases");
            DropTable("dbo.Objectives");
        }
    }
}
