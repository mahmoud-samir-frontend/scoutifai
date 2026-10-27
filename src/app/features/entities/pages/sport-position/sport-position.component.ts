import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sport-position',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sport-position.component.html',
  styleUrl: './sport-position.component.scss'
})
export class SportPositionComponent {}
