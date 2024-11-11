import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStudent from '@store/student/student.reducer';
import { StudentEffects } from '@app/store/student/student.effect';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentListItemsComponent } from './components/student-list-items/student-list-items.component';
import { PagerComponent } from '@app/shared/components/pager/pager.component';
import { SharedModule } from '@app/shared/shared.module';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailsComponent,
    StudentListItemsComponent,
    StudentEditComponent,
    StudentCreateComponent,
    StudentInfoComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(fromStudent.studentFeatureKey, fromStudent.studentReducer),
    EffectsModule.forFeature([StudentEffects]),
  ]
})
export class StudentModule { }
