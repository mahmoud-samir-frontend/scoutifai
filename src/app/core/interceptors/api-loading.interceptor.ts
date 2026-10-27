import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ApiLoadingService } from '../../services/api-loading.service';

export const apiLoadingInterceptor: HttpInterceptorFn = (request, next) => {
  // Translation files and other static assets should not block the application.
  if (!request.url.includes('/api/')) return next(request);

  const loading = inject(ApiLoadingService);
  loading.start();
  return next(request).pipe(finalize(() => loading.stop()));
};
