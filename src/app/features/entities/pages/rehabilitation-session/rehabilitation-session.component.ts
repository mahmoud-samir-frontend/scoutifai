import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-rehabilitation-session',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './rehabilitation-session.component.html',
  styleUrl: './rehabilitation-session.component.scss'
})
export class RehabilitationSessionComponent {}
