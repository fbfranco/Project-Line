﻿using System;
using System.Collections.Generic;

namespace ProjectLine.CORE.Models
{
    public class Project
    {
        public int ProjectID { get; set; }
        public int? UserID { get; set; }
        public int? OwnerID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int StatusID { get; set; }
        public Boolean Active { get; set; }

        public User User { get; set; }
        public ICollection<Phase> Phases { get; set; }

       public Project()
        {
            StatusID = 1;
            Active = true;
        } 

    }
}
