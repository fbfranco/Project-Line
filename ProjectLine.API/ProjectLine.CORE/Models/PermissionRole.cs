using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Models
{
    public class PermissionRole
    {
        public int RoleID { get; set; }
        public int PermissionID { get; set; }
        public Role Role { get; set; }
        public Permission Permission { get; set; }
    }
}
