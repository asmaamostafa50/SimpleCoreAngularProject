using Domain.Models.Student;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class StudentRepository : Repository<Student>, IStudentRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public StudentRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext ?? throw new ArgumentNullException(nameof(applicationDbContext));
        }

        public async Task<List<Student>> Find(
    string name,
    CancellationToken cancellationToken)
        {
            return await _applicationDbContext
                .Student.AsNoTracking()
                .Where(d => d.Name.Contains(name))
                .ToListAsync(cancellationToken);
        }

        public async Task<Student?> GetById(
            int id,
            CancellationToken cancellationToken)
        {
            return await _applicationDbContext
                .Student.AsNoTracking()
                .SingleOrDefaultAsync(d => d.Id == id, cancellationToken);
        }

        public async Task<Student?> GetByName(
            string name,
            CancellationToken cancellationToken)
        {
            return await _applicationDbContext
                .Student.AsNoTracking()
                .SingleOrDefaultAsync(d => d.Name == name, cancellationToken);
        }

        public async Task<bool> IsExists(
            string name,
            CancellationToken cancellationToken)
        {
            return await _applicationDbContext
                .Student.AsNoTracking()
                .SingleOrDefaultAsync(d => d.Name == name, cancellationToken) != null;
        }

        public async Task<List<Student>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _applicationDbContext.Student.ToListAsync();
        }
    }
}
