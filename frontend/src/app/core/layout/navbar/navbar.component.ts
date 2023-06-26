import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent {
  public isMenuCollapsed = true;

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout();
  }
}
