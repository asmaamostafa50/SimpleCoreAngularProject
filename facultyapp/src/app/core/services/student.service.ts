import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Student } from '@app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'https://localhost:7269/api/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url)
  }
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.url}/getStudent?id=${id}`)
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.url}`, student)
  }
}
