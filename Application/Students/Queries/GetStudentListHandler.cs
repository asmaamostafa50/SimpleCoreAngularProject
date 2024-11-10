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
    internal class GetStudentListHandler : IRequestHandler<GetStudentListQuery, List<StudentDTO>>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;

        public GetStudentListHandler(IStudentRepository studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        public async Task<List<StudentDTO>> Handle(GetStudentListQuery query, CancellationToken cancellationToken)
        {
            return _mapper.Map<List<StudentDTO>>(await _studentRepository.GetAllAsync(cancellationToken));
        }
    }
}