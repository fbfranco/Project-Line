using ProjectLine.CORE.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectLine.CORE.Interface
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjects();
        Project FindById(int id);

        void Create(Project project);
        void Update(Project project);
    }
}
