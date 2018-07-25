using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Models
{
    public class Permission
    {
        public int PermissionID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int RoleID { get; set; }

    }
}
