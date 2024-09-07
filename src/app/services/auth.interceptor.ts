import {HttpEvent, HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  const authReq = token ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }) : req;

  return next(authReq).pipe(
    tap(event => {
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        alert('Session has expired. You will be redirected to the login page.');
        window.location.href = '/landing';
      }
      return throwError(() => new Error('Something happened with the request, please try again later.'));
    })
  );
}
