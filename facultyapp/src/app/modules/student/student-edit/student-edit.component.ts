import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from '@app/shared/models';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as StudentActionTypes from "@app/store/student/student.action";
import * as StudentStoreSelectors from "@app/store/student/student.selector";
import { StudentState } from '@app/store/student/student.reducer';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit, OnDestroy {
  public name!:string;
  public studentForm!: FormGroup;
  public submitted: boolean=false;
  public isLoading$!: Observable<boolean>;
  private unsubscribe$ = new Subject();
  public error$!: Observable<string|null>;
  public student!: Student;


  constructor(
    private readonly store$: Store<StudentState>,
    private route: ActivatedRoute,

  ) { }


  private initForm() {
    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(70)]),
    });
  }


  ngOnInit(): void {
    this.name ='Edit Student';
    this.initForm();
    this.selectData();
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        const id = this.route.snapshot.paramMap.get('id');
        if (id)
          this.init(+id);
      });
  }

  private init(id: number): void {
    this.store$.dispatch(StudentActionTypes.getStudentAction({ id }));
  }

  private selectData(): void {
     this.store$.select(StudentStoreSelectors.getCurrentStudent).subscribe(student => {
      if (student) {
        this.student = student;
        this.studentForm.patchValue({
          name: student.name,
        });
      }
    });
    this.error$ = this.store$.select(StudentStoreSelectors.getErrormessage);
    this.isLoading$ = this.store$.select(StudentStoreSelectors.getIsLoading);
  }



  onSubmitStudent() {
    this.submitted=true;
    if (this.studentForm.invalid)
      return;

    const student:Student = {
      id: this.student.id,
      ...this.studentForm.value
    };
    this.store$.dispatch(StudentActionTypes.updateStudentRequestAction({ item:student }));

  }


  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
