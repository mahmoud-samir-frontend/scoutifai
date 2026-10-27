import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-training-attendance',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './training-attendance.component.html',
  styleUrl: './training-attendance.component.scss'
})
export class TrainingAttendanceComponent {}
