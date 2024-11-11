using Application.Students.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Students.Commands
{
    public class UpdateStudentCommand : IRequest<StudentDTO>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
