import { Component, OnInit } from '@angular/core';
import { Student } from '@app/shared/models';
import { Store } from '@ngrx/store';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import * as StudentActionTypes from "@app/store/student/student.action";
import * as StudentStoreSelectors from "@app/store/student/student.selector";
import { ActivatedRoute, Router } from '@angular/router';
import { StudentState } from '@app/store/student/student.reducer';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  public pageNumber = 1;
  public pageSize = 10;

  public name!:string;
  public searchTerm$!: Observable<string>;
  public sortType$!: Observable<number>;
  public totalCount$!:  Observable<number>;
  public students$!: Observable<Student[]>;
  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string|null>;

  constructor(
    private readonly store$: Store<StudentState>,
    private router: Router,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.name ='Student List';
    this.init();


  }

  private init(): void {
    this.students$ = this.store$.select(StudentStoreSelectors.getFilteredStudents);
    this.error$ = this.store$.select(StudentStoreSelectors.getErrormessage);
    this.isLoading$ = this.store$.select(StudentStoreSelectors.getIsLoading);
    this.totalCount$ = this.store$.select(StudentStoreSelectors.gettotalCount);
    this.searchTerm$ = this.store$.select(StudentStoreSelectors.getSearchTerm);
    this.sortType$ = this.store$.select(StudentStoreSelectors.getSortType);
    this.store$.dispatch(StudentActionTypes.getAllStudentsRequestAction());

  }



  onChangePage(page: number) {
    this.pageNumber = page;
    this.store$.dispatch(StudentActionTypes.setPaginationAction({ pageNumber: this.pageNumber, pageSize: this.pageSize }));
  }
  onChangeSort(value: any) {
    this.onChangePage(1);
    const sortType = +value.target.value;
    this.store$.dispatch(StudentActionTypes.sortStudentAction({ sortType }));

  }
  onChangeSearch(value: any) {
    this.onChangePage(1);
    const searchTerm = value.target.value?.trim();
    this.store$.dispatch(StudentActionTypes.searchStudentAction({ searchTerm }));
  }

  onDelete(id: number) {
    this.store$.dispatch(StudentActionTypes.deleteStudentRequestAction({ id }));
  }

}
