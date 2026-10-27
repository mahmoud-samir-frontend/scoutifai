import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sport-test-definition',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sport-test-definition.component.html',
  styleUrl: './sport-test-definition.component.scss'
})
export class SportTestDefinitionComponent {}
