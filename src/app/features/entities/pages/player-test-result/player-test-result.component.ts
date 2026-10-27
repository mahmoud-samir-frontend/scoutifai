import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-player-test-result',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './player-test-result.component.html',
  styleUrl: './player-test-result.component.scss'
})
export class PlayerTestResultComponent {}
