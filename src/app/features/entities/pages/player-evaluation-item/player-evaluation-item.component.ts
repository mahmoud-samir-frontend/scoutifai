import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-player-evaluation-item',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './player-evaluation-item.component.html',
  styleUrl: './player-evaluation-item.component.scss'
})
export class PlayerEvaluationItemComponent {}
