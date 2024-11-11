using Application.Students.DTOs;
using AutoMapper;
using Domain.Models.Student;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Students.Queries
{
    internal class GetStudentHandler : IRequestHandler<GetStudentQuery, StudentDTO>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;

        public GetStudentHandler(IStudentRepository studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        public async Task<StudentDTO> Handle(GetStudentQuery query, CancellationToken cancellationToken)
        {
            return _mapper.Map<StudentDTO>(await _studentRepository.GetById(query.Id, cancellationToken));
        }
    }
}