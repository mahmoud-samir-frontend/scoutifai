import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-evaluation-criteria',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './evaluation-criteria.component.html',
  styleUrl: './evaluation-criteria.component.scss'
})
export class EvaluationCriteriaComponent {}
