using System.Collections.Generic;

namespace ProjectLine.CORE.Models
{
    public class Role
    {
        public int RoleID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public ICollection<PermissionRole> PermissionRoles { get; set; }

    }
}
