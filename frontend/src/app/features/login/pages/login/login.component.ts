import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public hasSessionExpired!: boolean;
  public loginForm = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-z0-9]+$/i), // Alphanumeric characters
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/), // At least one number, one lowercase letter and one uppercase letter
      ],
    ],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.hasSessionExpired =
      this.activatedRoute.snapshot.queryParams['expired'];
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService
        .login(username!, password!)
        .pipe(
          catchError((err) => {
            this.loginForm.setErrors({ wrongdetails: true });
            return throwError(() => err);
          })
        )
        .subscribe();
    }

    this.hasSessionExpired = false;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
