using Domain.Commons;

namespace Domain.Models.Student
{
    public interface IStudentRepository : IRepository<Student>
    {
        Task<List<Student>> Find(
       string name,
       CancellationToken cancellationToken);

        Task<Student?> GetById(
            int id,
            CancellationToken cancellationToken);

        Task<Student?> GetByName(
            string name,
            CancellationToken cancellationToken);

        Task<bool> IsExists(
            string name,
            CancellationToken cancellationToken);

        Task<List<Student>> GetAllAsync(CancellationToken cancellationToken);

    }
}
