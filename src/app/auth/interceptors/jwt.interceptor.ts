import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JWT_TOKEN, CURRENT_USER, LOGGED_IN, REST_URL } from '../../shared/utils/constants';

/**
 * Adds `Authorization: Bearer <token>` to every call to the backend, and redirects to the login
 * page on a 401 (expired/invalid token). Registered via HTTP_INTERCEPTORS in AppModule.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(JWT_TOKEN);

    // Only attach the token to our own backend, and never to public endpoints. Adding the (large)
    // Bearer header to a public GET would turn it into a CORS-preflighted, oversized request for no
    // reason; the backend permits these without a token anyway.
    const isBackend = request.url.startsWith(REST_URL);
    const isPublic = request.url.indexOf('api/auth/login') !== -1
      || request.url.indexOf('/authentification') !== -1
      || request.url.indexOf('/monitoring') !== -1;

    if (token && isBackend && !isPublic) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isPublic) {
          // Token missing/expired -> clear session and send the user back to login.
          sessionStorage.removeItem(JWT_TOKEN);
          sessionStorage.removeItem(CURRENT_USER);
          localStorage.removeItem(LOGGED_IN);
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
