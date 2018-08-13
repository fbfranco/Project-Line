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
        PhaseRepository repository;

        [TestInitialize]
        public void TestSetup()
        {
            InitializeDB db = new InitializeDB();
            Database.SetInitializer(db);
            repository = new PhaseRepository();
        }

        [TestMethod]
        public void IsInitializableDB()
        {
            var result = repository.GetPhases();
            Assert.IsNotNull(result);
        }

        RoleRepository objrole = new RoleRepository();

        [TestMethod]
        public void AddRoles()
        {
            Role role1 = new Role()
            {
               Title = "Administrator",
               Description="Admin"
            };
            objrole.Create(role1);

            Role role2 = new Role()
            {
               Title = "Product Owner",
               Description = "PO"
            };
            objrole.Create(role2);

            Role role3 = new Role()
            {
               Title = "Client",
               Description = "Client"
            };
            objrole.Create(role3);
        }

        UserRepository objuser = new UserRepository();

        [TestMethod]
        public void AddUser()
        {
            User user1 = new User()
            {
                FirstName = "Admin",
                LastName = "System",
                Email = "admin@project.com",
                Company = "System",
                Address = " ",
                Phone = " ",
                Mobile = " ",
                Password = "Admin123",
                Active = true,
                RoleID = 1
            };
            objuser.Create(user1);
        }

        PermissionsRepository objPermission = new PermissionsRepository();
        PermissionRoleRepository objPermissionRole = new PermissionRoleRepository();

        [TestMethod]
        public void AddPermissions()
        {
            #region List of Permissions
            Permission[] permissionsList = new Permission[19];

            permissionsList[0] = new Permission() { Name = "User_View", Description = "Allows access to the User View" };
            permissionsList[1] = new Permission() { Name = "User_Add", Description = "Allows access to the User Add" };
            permissionsList[2] = new Permission() { Name = "User_Edit", Description = "Allows access to the User Edit" };
            permissionsList[3] = new Permission() { Name = "User_Delete", Description = "Allows access to the User Delete" };

            permissionsList[4] = new Permission() { Name = "Role_View", Description = "Allows access to the Role View" };
            permissionsList[5] = new Permission() { Name = "Role_Edit", Description = "Allows access to the Role Edit" };

            permissionsList[6] = new Permission() { Name = "Project_View", Description = "Allows access to the Project View" };
            permissionsList[7] = new Permission() { Name = "Project_Add", Description = "Allows access to the Project Add" };
            permissionsList[8] = new Permission() { Name = "Project_Edit", Description = "Allows access to the Project Edit" };
            permissionsList[9] = new Permission() { Name = "Project_Archive", Description = "Allows access to the Project Archive" };

            permissionsList[10] = new Permission() { Name = "Phase_View", Description = "Allows access to the Phase View" };
            permissionsList[11] = new Permission() { Name = "Phase_Add", Description = "Allows access to the Phase Add" };
            permissionsList[12] = new Permission() { Name = "Phase_Edit", Description = "Allows access to the Phase Edit" };
            permissionsList[13] = new Permission() { Name = "Phase_Delete", Description = "Allows access to the Phase Delete" };

            permissionsList[14] = new Permission() { Name = "Objective_View", Description = "Allows access to the Objective View" };
            permissionsList[15] = new Permission() { Name = "Objective_Add", Description = "Allows access to the Objective Add" };
            permissionsList[16] = new Permission() { Name = "Objective_Edit", Description = "Allows access to the Objective Edit" };
            permissionsList[17] = new Permission() { Name = "Objective_Delete", Description = "Allows access to the Objective Delete" };

            permissionsList[18] = new Permission() { Name = "ProjectTracking_View", Description = "Allows access to the ProjectTracking_View" };
            #endregion

            // Save Permissions
            foreach (var item in permissionsList)
            {
                objPermission.Create(item);
            }

            PermissionRole permissionRole = new PermissionRole();
            // Admin
            permissionRole.RoleID = 1; 
            for (int i = 1; i <= permissionsList.Length; i++)
            {
                permissionRole.PermissionID = i;
                objPermissionRole.Create(permissionRole);
            }
            // PO
            permissionRole.RoleID = 2; 
            for (int i = 7; i <= permissionsList.Length; i++)
            {
                permissionRole.PermissionID = i;
                objPermissionRole.Create(permissionRole);
            }
            // Client
            permissionRole.RoleID = 3;
            permissionRole.PermissionID = 19;
            objPermissionRole.Create(permissionRole);
        }

    }
}
