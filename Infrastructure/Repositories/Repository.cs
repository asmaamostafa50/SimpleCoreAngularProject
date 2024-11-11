using Domain.Commons;
using Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Domain.Models.Student;

namespace Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {  
        private readonly ApplicationDbContext _applicationDbContext;

        public Repository(
            ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext ?? throw new ArgumentNullException(nameof(applicationDbContext));
        }

        public async Task<T?> CreateAsync(
            T entity,
            CancellationToken cancellationToken)
        {
            _applicationDbContext.Add(entity);
            var changes = await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return changes > 0 ? entity : null;
        }

        public async Task<T?> UpdateAsync(
            T entity,
            CancellationToken cancellationToken)
        {
            _applicationDbContext.Update(entity);
            var changes = await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return changes > 0 ? entity : null;
        }

        public async Task<bool> DeleteAsync(
            T entity,
            CancellationToken cancellationToken)
        {
            _applicationDbContext.Remove(entity);
            var changes = await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return changes > 0;
        }
    }
}