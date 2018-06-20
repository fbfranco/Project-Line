using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Models
{
    public class Project
    {
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int StatusID { get; set; }
        public Boolean Active { get; set; }
        public ICollection<Phase> Phases { get; set; }


       public Project()
        {
            StatusID = 1;
            Active = true;
        } 

    }
}
