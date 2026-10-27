import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.scss'
})
export class SportComponent {}
