using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Enterprise { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public int RolID { get; set; }

        //public ICollection<Role> Phases { get; set; }

    }
}
