import { Component, Input } from '@angular/core';
import { Student } from '@app/shared/models';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent {
  @Input() item!: Student|null;

}
