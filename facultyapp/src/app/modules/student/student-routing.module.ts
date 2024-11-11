import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentCreateComponent } from './student-create/student-create.component';

export function digitsMatcher(url: UrlSegment[]) {
  const re = /^\d+$/;
  const match = re.exec(url[0].path);
  if (match) {
    return {
      consumed: url,
      posParams:
      {
        id: new UrlSegment(url[0].path, {}),
        name: new UrlSegment(url.length > 1 ? url[1].path : "", {})

      }
    };
  }
  return null;
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: StudentListComponent
      },

      {
        matcher: digitsMatcher,
        component: StudentDetailsComponent
      },
      {
        path: 'create',
        component: StudentCreateComponent
      },
      {
        path: 'edit',
        children: [
          {
            path: ':id', component: StudentEditComponent
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
