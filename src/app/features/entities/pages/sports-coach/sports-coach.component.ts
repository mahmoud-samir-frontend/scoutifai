import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-coach',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-coach.component.html',
  styleUrl: './sports-coach.component.scss'
})
export class SportsCoachComponent {}
