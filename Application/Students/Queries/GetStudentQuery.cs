using MediatR;
using Domain.Models.Student;
using Application.Students.DTOs;

namespace Application.Students.Queries
{
    public class GetStudentQuery : IRequest<StudentDTO>
    {
        public int Id { get; set; }
    }
}
