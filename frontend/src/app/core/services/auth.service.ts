import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly URL_PATH: string = '/auth';
  private readonly TOKEN_KEY: string = 'token';
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private userId?: string;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem(this.TOKEN_KEY)) {
      this.isLoggedIn$.next(true);
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public register(username: string, email: string, password: string): void {
    this.http
      .post<HttpResponse<unknown>>(this.URL_PATH + '/register', {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.login(username, password));
  }

  public login(username: string, password: string): void {
    this.http
      .post<{ token: string; userId: string }>(this.URL_PATH + '/login', {
        username: username.toLowerCase(),
        password,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((token_userId: { token: string; userId: string }) => {
        this.userId = token_userId.userId;

        localStorage.setItem(this.TOKEN_KEY, token_userId.token);
        this.isLoggedIn$.next(true);

        this.router.navigate(['/']);
      });
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn$.next(false);

    this.router.navigate(['/login']);
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
