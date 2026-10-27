import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageSearchService {
  readonly changes = new Subject<string>();
}
