import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-parent-player-relation',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './parent-player-relation.component.html',
  styleUrl: './parent-player-relation.component.scss'
})
export class ParentPlayerRelationComponent {}
