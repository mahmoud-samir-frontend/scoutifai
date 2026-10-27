import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-player-injury',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './player-injury.component.html',
  styleUrl: './player-injury.component.scss'
})
export class PlayerInjuryComponent {}
