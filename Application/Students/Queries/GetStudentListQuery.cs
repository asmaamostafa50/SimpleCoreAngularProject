using Application.Students.DTOs;
using Domain.Models.Student;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Students.Queries
{
    public class GetStudentListQuery : IRequest<List<StudentDTO>>
    {
    }
}