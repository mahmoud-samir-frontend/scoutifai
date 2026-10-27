import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-player-measurement',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './player-measurement.component.html',
  styleUrl: './player-measurement.component.scss'
})
export class PlayerMeasurementComponent {}
