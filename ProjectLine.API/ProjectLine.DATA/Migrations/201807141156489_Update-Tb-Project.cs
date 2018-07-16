namespace ProjectLine.DATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateTbProject : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Projects", "RoleID", "dbo.Roles");
            DropIndex("dbo.Projects", new[] { "RoleID" });
            AddColumn("dbo.Projects", "UserID", c => c.Int(nullable: false));
            CreateIndex("dbo.Projects", "UserID");
            AddForeignKey("dbo.Projects", "UserID", "dbo.Users", "UserID", cascadeDelete: true);
            DropColumn("dbo.Projects", "RoleID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Projects", "RoleID", c => c.Int(nullable: false));
            DropForeignKey("dbo.Projects", "UserID", "dbo.Users");
            DropIndex("dbo.Projects", new[] { "UserID" });
            DropColumn("dbo.Projects", "UserID");
            CreateIndex("dbo.Projects", "RoleID");
            AddForeignKey("dbo.Projects", "RoleID", "dbo.Roles", "RoleID", cascadeDelete: true);
        }
    }
}
