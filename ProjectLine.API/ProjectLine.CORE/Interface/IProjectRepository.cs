using ProjectLine.CORE.Models;
using ProjectLine.CORE.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjects();
        Project FindById(int id);
        void Create(ProjectViewModel project);
        void Update(ProjectViewModel project);
    }
}
