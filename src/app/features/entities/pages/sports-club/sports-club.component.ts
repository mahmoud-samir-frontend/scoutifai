import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-club',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-club.component.html',
  styleUrl: './sports-club.component.scss'
})
export class SportsClubComponent {}
