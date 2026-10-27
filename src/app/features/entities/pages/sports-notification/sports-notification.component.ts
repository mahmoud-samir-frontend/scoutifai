import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-sports-notification',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './sports-notification.component.html',
  styleUrl: './sports-notification.component.scss'
})
export class SportsNotificationComponent {}
