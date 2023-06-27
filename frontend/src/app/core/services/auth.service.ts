import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, first, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL_PATH: string = '/auth';
  private readonly TOKEN_KEY: string = 'token';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private userId?: string;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem(this.TOKEN_KEY)) {
      this.isLoggedIn$.next(true);
    }
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<HttpResponse<unknown>> {
    return this.http
      .post<HttpResponse<unknown>>(this.URL_PATH + '/register', {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
      })
      .pipe(
        first(),
        tap(() => this.login(username, password))
      );
  }

  public login(
    username: string,
    password: string
  ): Observable<{ token: string; userId: string }> {
    return this.http
      .post<{ token: string; userId: string }>(this.URL_PATH + '/login', {
        username: username.toLowerCase(),
        password,
      })
      .pipe(
        first(),
        tap((token_userId: { token: string; userId: string }) => {
          this.userId = token_userId.userId;

          localStorage.setItem(this.TOKEN_KEY, token_userId.token);
          this.isLoggedIn$.next(true);

          this.router.navigate(['/']);
        })
      );
  }

  public logout(hasSessionExpired?: boolean): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn$.next(false);

    this.router.navigate(['/login'], {
      queryParams: hasSessionExpired ? { expired: true } : {},
    });
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  public hasTokenExpired(token: string): boolean {
    const expirationDate = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expirationDate;
  }

  public getTokenKey(): string {
    return this.TOKEN_KEY;
  }
}
