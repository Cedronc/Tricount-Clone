import { inject } from '@angular/core';
import {
  HttpInterceptorFn
} from '@angular/common/http';
import { from, switchMap } from 'rxjs';
import { ClerkService } from 'ngx-clerk';
import { environment } from '../../environments/environment';

export const clerkAuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('[Interceptor] Request:', req.url);

  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const clerk = inject(ClerkService);

  return from(clerk.getToken()).pipe(
    switchMap(token => {
      console.log('[Interceptor] Token available:', !!token);

      if (!token) return next(req);

      return next(req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }));
    })
  );
};
