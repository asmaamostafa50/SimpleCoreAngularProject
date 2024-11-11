import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '@app/shared/models';

@Component({
  selector: 'app-student-list-items',
  templateUrl: './student-list-items.component.html',
  styleUrls: ['./student-list-items.component.scss']
})
export class StudentListItemsComponent {
  @Input() items!: Student[] | null;
  @Input() isLoading!: boolean | null;
  @Input() error!: string;
  @Output() onDelete = new EventEmitter<number>();

  onDeleteClick(id: number): void {
      this.onDelete.emit(id);
  }
}
