import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-match-player-statistic',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './match-player-statistic.component.html',
  styleUrl: './match-player-statistic.component.scss'
})
export class MatchPlayerStatisticComponent {}
