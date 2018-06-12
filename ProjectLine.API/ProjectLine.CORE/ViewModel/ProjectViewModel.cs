using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.ViewModel
{
    public class ProjectViewModel
    {
        public Project Project { get; set; }
        public List<Phase> Phases { get; set; }
    }
}
