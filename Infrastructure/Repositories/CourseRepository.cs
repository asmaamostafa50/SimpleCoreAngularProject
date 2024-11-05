using Domain.Models.Course;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public CourseRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext ?? throw new ArgumentNullException(nameof(applicationDbContext));
        }

        public async Task<List<Course>> Find(
    string name,
    CancellationToken cancellationToken)
        {
            return await _applicationDbContext
                .Course.AsNoTracking()
                .Where(d => d.Name.Contains(name))
                .ToListAsync(cancellationToken);
        }

        public async Task<Course?> GetById(
            int id,
            CancellationToken cancellationToken)
        {
            return await _applicationDbContext
                .Course.AsNoTracking()
                .SingleOrDefaultAsync(d => d.Id == id, cancellationToken);
        }

        public async Task<Course?> GetByName(
            string name,
            CancellationToken cancellationToken)
        {
            return await _applicationDbContext
                .Course.AsNoTracking()
                .SingleOrDefaultAsync(d => d.Name == name, cancellationToken);
        }
    }
}
