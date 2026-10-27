import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-organization',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-organization.component.html',
  styleUrl: './sports-organization.component.scss'
})
export class SportsOrganizationComponent {}
