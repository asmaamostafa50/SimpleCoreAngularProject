using MediatR;
using Domain.Models.Student;

namespace Application.Students.Queries
{
    public class GetStudentQuery : IRequest<Student>
    {
        public int Id { get; set; }
    }
}
