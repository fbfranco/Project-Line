namespace ProjectLine.CORE.Models
{
    public class Objective
    {
        public int ObjectiveID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
        public int Weight { get; set; }
        public int Estimated { get; set; }
        public int Effort { get; set; }

        public int PhaseID { get; set; }
        
    }
}
