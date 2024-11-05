using Domain.Models.Course;
using Domain.Models.Student;

namespace Domain.Commons
{
    public interface IUnitOfWork : IDisposable
    {
        IStudentRepository Student
        {
            get;
        }
        ICourseRepository Course
        {
            get;
        }
 
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
