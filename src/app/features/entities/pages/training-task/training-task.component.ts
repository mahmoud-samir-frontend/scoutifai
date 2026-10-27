import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-training-task',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './training-task.component.html',
  styleUrl: './training-task.component.scss'
})
export class TrainingTaskComponent {}
