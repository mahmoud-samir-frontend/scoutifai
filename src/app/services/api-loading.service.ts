import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiLoadingService {
  private activeRequests = 0;
  readonly loading = signal(false);

  start() {
    this.activeRequests++;
    this.loading.set(true);
  }

  stop() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests === 0) this.loading.set(false);
  }
}
