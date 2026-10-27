import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-user-profile',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-user-profile.component.html',
  styleUrl: './sports-user-profile.component.scss'
})
export class SportsUserProfileComponent {}
