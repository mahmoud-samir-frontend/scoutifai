import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-rehabilitation-plan',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './rehabilitation-plan.component.html',
  styleUrl: './rehabilitation-plan.component.scss'
})
export class RehabilitationPlanComponent {}
