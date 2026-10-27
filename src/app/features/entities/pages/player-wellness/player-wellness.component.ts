import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-player-wellness',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './player-wellness.component.html',
  styleUrl: './player-wellness.component.scss'
})
export class PlayerWellnessComponent {}
