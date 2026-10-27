import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-video-clip',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './video-clip.component.html',
  styleUrl: './video-clip.component.scss'
})
export class VideoClipComponent {}
