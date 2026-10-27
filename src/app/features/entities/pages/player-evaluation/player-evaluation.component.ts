import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-player-evaluation',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './player-evaluation.component.html',
  styleUrl: './player-evaluation.component.scss'
})
export class PlayerEvaluationComponent {}
