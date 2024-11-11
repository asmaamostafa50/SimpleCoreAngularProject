import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, of, switchMap, tap } from "rxjs";
import * as ActionTypes from "./student.action";
import { StudentService } from "@app/core/services/student.service";
import { Student } from "@app/shared/models/student";
import { Router } from "@angular/router";

@Injectable()

export class StudentEffects {
  constructor(private readonly actions$: Actions,
    private router: Router,
     private readonly studentService: StudentService) {
  }

  getStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getAllStudentsRequestAction),
      switchMap(action => {
        return this.studentService.getStudents().pipe(
          map((items: Student[]) => {
            return ActionTypes.getAllStudentsSuccessAction({ items: items})
          }),
          catchError((error: any) => {
            return of(ActionTypes.getAllStudentsErrorAction({ error: error.message }))
          })
        )
      })
    )
  );

  getStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getStudentAction),
      switchMap(action => {
        return this.studentService.getStudent(action.id).pipe(
          map((items: Student) => {
            return ActionTypes.getStudentSuccessAction({ items: items})
          }),
          catchError((error: any) => {
            return of(ActionTypes.getStudentErrorAction({ error: error.message }))
          })
        )
      })
    )
  );

  createStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.createStudentRequestAction),
      switchMap(action => {
        return this.studentService.create(action.item).pipe(
          map((item: Student) => {
            return ActionTypes.createStudentSuccessAction({ item })
          }),

          catchError((error: any) => {
            return of(ActionTypes.createStudentErrorAction({ error: error.message }))
          })
        )
      })
    )
  );
  createStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.createStudentSuccessAction),
      tap(async () => {
        this.router.navigate(['/student'])
      }
      )
    );
  }, { dispatch: false });



  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.updateStudentRequestAction),
      switchMap(action => {
        return this.studentService.update(action.item).pipe(
          map((item: Student) => {
            return ActionTypes.updateStudentSuccessAction({ item })
          }),
          catchError((error: any) => {
            return of(ActionTypes.updateStudentErrorAction({ error: error.message }))
          })
        )
      })
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.deleteStudentRequestAction),
      switchMap(action => {
        return this.studentService.delete(action.id).pipe(
          map(() => {
            return ActionTypes.deleteStudentSuccessAction({ id :+action.id })
          }),
          catchError((error: any) => {
            return of(ActionTypes.deleteStudentErrorAction({ error: error.message }))
          })
        )
      })
    )
  );
}
