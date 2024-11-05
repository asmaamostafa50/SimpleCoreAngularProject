using Domain.Commons;

namespace Domain.Models.Course
{
    public interface ICourseRepository : IRepository <Course>
    {
        Task<List<Course>> Find(
       string name,
       CancellationToken cancellationToken);

        Task<Course?> GetById(
            int id,
            CancellationToken cancellationToken);

        Task<Course?> GetByName(
            string name,
            CancellationToken cancellationToken);

    }
}
