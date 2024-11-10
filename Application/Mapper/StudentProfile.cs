using Application.Students.DTOs;
using AutoMapper;
using Domain.Models.Student;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mapper
{
    public class StudentProfile : Profile
    {
        public StudentProfile()
        {
            CreateMap<StudentDTO, Student>().ReverseMap();
        }
    }
}
