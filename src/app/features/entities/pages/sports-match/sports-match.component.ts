import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-match',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-match.component.html',
  styleUrl: './sports-match.component.scss'
})
export class SportsMatchComponent {}
