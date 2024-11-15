﻿using Application.Students.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Students.Commands
{
    public class CreateStudentCommand : IRequest<StudentDTO>
    {
        public string Name { get; set; }
    }
}
