using ProjectLine.CORE.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjects();
        Task<IEnumerable<Project>> GetProjectsPO(int id);
        Task<IEnumerable<Project>> GetArchivedProjects();
        Task<IEnumerable<Project>> GetArchivedProjectsPO(int id);
        Task<IEnumerable<Project>> GetProjectsCL(int id);
        Project FindById(int id);

        void Create(Project project);
        void Update(Project project);
    }
}
