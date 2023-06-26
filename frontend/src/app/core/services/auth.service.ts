import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL_PATH: string = '/auth';
  private readonly TOKEN_KEY: string = 'token';
  private isUserLoggedIn$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private userId?: string;

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, email: string, password: string): void {
    this.http
      .post<HttpResponse<unknown>>(this.URL_PATH + '/register', {
        username,
        email,
        password,
      })
      .subscribe(() => this.login(username, password));
  }

  login(username: string, password: string): void {
    this.http
      .post<{ token: string; userId: string }>(this.URL_PATH + '/login', {
        username,
        password,
      })
      .subscribe((token_userId: { token: string; userId: string }) => {
        this.userId = token_userId.userId;

        localStorage.setItem(this.TOKEN_KEY, token_userId.token);
        this.isUserLoggedIn$.next(true);

        this.router.navigate(['/']);
      });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isUserLoggedIn$.next(false);

    this.router.navigate(['/login']);
  }

  hasTokenExpired(token: string): boolean {
    const expirationDate = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expirationDate;
  }

  getTokenKey(): string {
    return this.TOKEN_KEY;
  }
}
