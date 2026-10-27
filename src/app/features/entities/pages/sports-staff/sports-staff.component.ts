import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-staff',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-staff.component.html',
  styleUrl: './sports-staff.component.scss'
})
export class SportsStaffComponent {}
