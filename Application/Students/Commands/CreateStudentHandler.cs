﻿using Application.Students.DTOs;
using AutoMapper;
using Domain.Models.Student;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Students.Commands
{
    public class CreateStudentHandler : IRequestHandler<CreateStudentCommand, StudentDTO>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;

        public CreateStudentHandler(IStudentRepository studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
        }
        public async Task<StudentDTO> Handle(CreateStudentCommand command, CancellationToken cancellationToken)
        {
            var student = new Student()
            {
                Name = command.Name,
            };

            return _mapper.Map<StudentDTO>(await _studentRepository.CreateAsync(student, cancellationToken));
        }
    }
}
