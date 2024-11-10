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


        [HttpPost]
        public async Task<bool> AddStudentAsync(StudentDTO student)
        {
            var studentDetail = await mediator.Send(new CreateStudentCommand { Name = student.Name });
            return studentDetail;
        }
    }
}

