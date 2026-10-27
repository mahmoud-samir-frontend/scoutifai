import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-team',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-team.component.html',
  styleUrl: './sports-team.component.scss'
})
export class SportsTeamComponent {}
