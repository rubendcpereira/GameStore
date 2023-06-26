import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed: boolean = true;
  public isUserLoggedIn: boolean = false;
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private authService: AuthService) {}

  public ngOnInit(): void {
    this.isLoggedIn();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public isLoggedIn(): void {
    this.authService
      .isLoggedIn()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isUserLoggedIn) => (this.isUserLoggedIn = isUserLoggedIn));
  }

  public login() {
    this.router.navigate(['/login']);
  }

  public logout() {
    this.authService.logout();
  }
}
