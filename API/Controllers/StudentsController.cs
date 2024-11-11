using Application.Students.Commands;
using Application.Students.DTOs;
using Application.Students.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IMediator mediator;

        public StudentsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<List<StudentDTO>> GetStudentListAsync()
        {
            var studentDetails = await mediator.Send(new GetStudentListQuery());
            return studentDetails;
        }

        [HttpGet]
        [Route("getStudent")]
        public async Task<StudentDTO> GetStudentAsync(int? id)
        {
            var student = await mediator.Send(new GetStudentQuery { Id = id ?? 0});
            return student;
        }

        [HttpPost]
        public async Task<StudentDTO> AddStudentAsync(StudentDTO student)
        {
            var studentDetail = await mediator.Send(new CreateStudentCommand { Name = student.Name });
            return studentDetail;
        }

        [HttpPut]
        public async Task<StudentDTO> UpdateStudentAsync(StudentDTO student)
        {
            var studentDetail = await mediator.Send(new UpdateStudentCommand {Id = student.Id, Name = student.Name });
            return studentDetail;
        }
    }
}

