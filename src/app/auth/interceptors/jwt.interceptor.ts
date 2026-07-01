import { Injectable, Injector } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import {
  JWT_TOKEN,
  REFRESH_TOKEN,
  CURRENT_USER,
  LOGGED_IN,
  REST_URL,
  AUTH_REFRESH_URL,
} from '../../shared/utils/constants';

/**
 * Attaches the access token to backend calls and, when the access token has expired (401), silently
 * exchanges the refresh token for a new access token and retries the original request — so the user
 * stays logged in without re-typing credentials. Concurrent 401s trigger a single refresh; if the
 * refresh itself fails, the session is cleared and the user is sent to /login.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshedToken$ = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isBackend = request.url.startsWith(REST_URL);
    const isPublic = this.isPublic(request.url);
    const token = sessionStorage.getItem(JWT_TOKEN);

    const outgoing = (token && isBackend && !isPublic) ? this.withToken(request, token) : request;

    return next.handle(outgoing).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && isBackend && !isPublic) {
          return this.handle401(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // A refresh is already in flight -> wait for the new token, then retry this request.
    if (this.isRefreshing) {
      return this.refreshedToken$.pipe(
        filter(t => t != null),
        take(1),
        switchMap(t => next.handle(this.withToken(request, t as string)))
      );
    }

    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      this.forceLogout();
      return throwError(new Error('Session expired'));
    }

    this.isRefreshing = true;
    this.refreshedToken$.next(null);

    // HttpClient is resolved lazily to avoid a circular dependency with the interceptor.
    const http = this.injector.get(HttpClient);
    return http.post<{ accessToken: string }>(AUTH_REFRESH_URL, { refreshToken }).pipe(
      switchMap(resp => {
        this.isRefreshing = false;
        sessionStorage.setItem(JWT_TOKEN, resp.accessToken);
        this.refreshedToken$.next(resp.accessToken);
        return next.handle(this.withToken(request, resp.accessToken));
      }),
      catchError(err => {
        // Refresh token invalid/expired -> real logout.
        this.isRefreshing = false;
        this.forceLogout();
        return throwError(err);
      })
    );
  }

  private withToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  /** Public endpoints never get a token and never trigger the refresh dance. */
  private isPublic(url: string): boolean {
    return url.indexOf('api/auth/login') !== -1
      || url.indexOf('api/auth/refresh') !== -1
      || url.indexOf('/authentification') !== -1
      || url.indexOf('/monitoring') !== -1;
  }

  private forceLogout(): void {
    sessionStorage.removeItem(JWT_TOKEN);
    sessionStorage.removeItem(REFRESH_TOKEN);
    sessionStorage.removeItem(CURRENT_USER);
    localStorage.removeItem(LOGGED_IN);
    this.router.navigate(['/login']);
  }
}
