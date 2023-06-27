import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loggedInAuthGuard = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.isLoggedIn().pipe(
    first(),
    map((isUserLoggedIn: boolean) => {
      if (isUserLoggedIn) {
        router.navigate(['/']);
        return false;
      }

      return true;
    })
  );
};
