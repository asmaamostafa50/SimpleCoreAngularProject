namespace Domain.Commons
{
    public interface IRepository<T> where T : class
    {
        Task<bool> CreateAsync(
            T entity,
            CancellationToken cancellationToken);

        Task<bool> UpdateAsync(
            T entity,
            CancellationToken cancellationToken);
        Task<bool> DeleteAsync(
             T entity,
            CancellationToken cancellationToken);
    }
}
