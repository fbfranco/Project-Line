using ProjectLine.CORE.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjects();
        Task Create(Project project);
    }
}
