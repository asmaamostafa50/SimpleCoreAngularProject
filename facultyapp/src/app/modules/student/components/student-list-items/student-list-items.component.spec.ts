import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListItemsComponent } from './student-list-items.component';

describe('StudentListItemsComponent', () => {
  let component: StudentListItemsComponent;
  let fixture: ComponentFixture<StudentListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentListItemsComponent]
    });
    fixture = TestBed.createComponent(StudentListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
