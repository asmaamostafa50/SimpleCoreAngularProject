using Domain.Models.Student;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Students.Commands
{
    public class CreateStudentHandler : IRequestHandler<CreateStudentCommand, bool>
    {
        private readonly IStudentRepository _studentRepository;

        public CreateStudentHandler(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }
        public async Task<bool> Handle(CreateStudentCommand command, CancellationToken cancellationToken)
        {
            var student = new Student()
            {
                Name = command.Name,
            };

            return await _studentRepository.CreateAsync(student, cancellationToken);
        }
    }
}
