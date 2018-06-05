using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Models
{
    public class Phase
    {
        public int PhaseID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string DemoUrl { get; set; }
        public int ProjectID { get; set; }
        public Project Project { get; set; }
    }
}
