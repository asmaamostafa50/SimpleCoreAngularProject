namespace Domain.Commons
{
    public interface IRepository<T> where T : class
    {
        Task<T?> CreateAsync(
            T entity,
            CancellationToken cancellationToken);

        Task<T?> UpdateAsync(
            T entity,
            CancellationToken cancellationToken);
        Task<bool> DeleteAsync(
             T entity,
            CancellationToken cancellationToken);
    }
}
