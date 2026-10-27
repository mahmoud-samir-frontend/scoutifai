import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-player-video-link',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './player-video-link.component.html',
  styleUrl: './player-video-link.component.scss'
})
export class PlayerVideoLinkComponent {}
