import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as StudentActionTypes from "@app/store/student/student.action";
import * as StudentStoreSelectors from "@app/store/student/student.selector";
import { Student } from '@app/shared/models';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { StudentState } from '@app/store/student/student.reducer';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  public isLoading$!: Observable<boolean>;
  private unsubscribe$ = new Subject();
  public error$!: Observable<string|null>;
  public student$!: Observable<Student | null>;


  constructor(
    private readonly store$: Store<StudentState>,
    private route: ActivatedRoute,

  ) { }





  ngOnInit(): void {
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
    this.student$ = this.store$.select(StudentStoreSelectors.getCurrentStudent);
    this.error$ = this.store$.select(StudentStoreSelectors.getErrormessage);
    this.isLoading$ = this.store$.select(StudentStoreSelectors.getIsLoading);
  }






  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
