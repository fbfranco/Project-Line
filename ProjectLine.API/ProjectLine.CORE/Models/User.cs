﻿namespace ProjectLine.CORE.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public bool Active { get; set; }

        public int RoleID { get; set; }

        // A User Contain a Role
        public Role Role { get; set; }

    }
}
