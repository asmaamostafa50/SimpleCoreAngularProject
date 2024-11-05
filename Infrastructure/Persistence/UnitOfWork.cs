using Domain.Commons;
using Domain.Models.Course;
using Domain.Models.Student;
using Infrastructure.Repositories;

namespace Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext context;
        public UnitOfWork(ApplicationDbContext context)
        {
            this.context = context;
            Course = new CourseRepository(this.context);
            Student = new StudentRepository(this.context);
        }
        public ICourseRepository Course
        {
            get;
            private set;
        }
        public IStudentRepository Student
        {
            get;
            private set;
        }
        public void Dispose()
        {
            context.Dispose();
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
            return context.SaveChangesAsync();
        }
    }
}