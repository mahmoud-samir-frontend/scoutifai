import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-player',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-player.component.html',
  styleUrl: './sports-player.component.scss'
})
export class SportsPlayerComponent {}
