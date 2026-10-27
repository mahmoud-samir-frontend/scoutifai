import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-player-team',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-player-team.component.html',
  styleUrl: './sports-player-team.component.scss'
})
export class SportsPlayerTeamComponent {}
