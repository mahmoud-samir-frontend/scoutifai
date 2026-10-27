import { Component } from '@angular/core';
import { EntityCrudComponent } from '../../entity-crud/entity-crud.component';

@Component({
  selector: 'app-video-comment',
  standalone: true,
  imports: [EntityCrudComponent],
  templateUrl: './video-comment.component.html',
  styleUrl: './video-comment.component.scss'
})
export class VideoCommentComponent {}
