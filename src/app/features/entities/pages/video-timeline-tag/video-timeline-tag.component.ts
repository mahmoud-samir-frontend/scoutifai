import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-video-timeline-tag',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './video-timeline-tag.component.html',
  styleUrl: './video-timeline-tag.component.scss'
})
export class VideoTimelineTagComponent {}
