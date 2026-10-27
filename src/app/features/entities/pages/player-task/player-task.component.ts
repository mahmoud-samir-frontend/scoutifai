import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-player-task',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './player-task.component.html',
  styleUrl: './player-task.component.scss'
})
export class PlayerTaskComponent {}
