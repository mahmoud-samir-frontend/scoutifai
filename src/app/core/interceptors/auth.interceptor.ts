import { HttpInterceptorFn } from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.url.endsWith('/SportsUsers/register')) return next(request);
  if (request.headers.has('Authorization')) return next(request);
  const token = localStorage.getItem('sports_token');
  return next(token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request);
};
