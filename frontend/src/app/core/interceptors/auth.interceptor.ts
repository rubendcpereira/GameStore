import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(this.authService.getTokenKey());

    if (token && this.authService.hasTokenExpired(token)) {
      this.authService.logout();
      return EMPTY;
    }

    return next.handle(
      token
        ? request
        : request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token),
          })
    );
  }
}
