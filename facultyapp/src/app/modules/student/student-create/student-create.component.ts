import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from '@app/shared/models';
import * as StudentActionTypes from "@app/store/student/student.action";
import { StudentState } from '@app/store/student/student.reducer';
import * as StudentStoreSelectors from "@app/store/student/student.selector";
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent {
  public name!: string;
  public studentForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading$!: Observable<boolean>;
  private unsubscribe$ = new Subject();
  public error$!: Observable<string|null>;


  constructor(
    private readonly store$: Store<StudentState>,
    private route: ActivatedRoute,

  ) { }


  private initForm() {
    this.studentForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(70)]),
    });
  }


  ngOnInit(): void {
    this.name = 'Create New Student';
    this.initForm();
  }


  private selectData(): void {

    this.error$ = this.store$.select(StudentStoreSelectors.getErrormessage);
    this.isLoading$ = this.store$.select(StudentStoreSelectors.getIsLoading);
  }



  onSubmitStudent() {
    this.submitted = true;
    if (this.studentForm.invalid)
     return;
    const student: Student = {
      ...this.studentForm.value
    };
    this.store$.dispatch(StudentActionTypes.createStudentRequestAction({ item: student }));
    this.selectData();
  }


  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();

  }
}
