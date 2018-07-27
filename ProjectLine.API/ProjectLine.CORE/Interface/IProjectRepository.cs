using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
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
        Task<IEnumerable<Project>> GetArchivedProjects();
        Project FindById(int id);

        void Create(ProjectViewModel project);
        void Update(ProjectViewModel project);
    }
}
