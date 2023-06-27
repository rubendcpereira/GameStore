import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-z0-9]+$/i), // Alphanumeric characters
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
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
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService
        .register(username!, email!, password!)
        .pipe(
          catchError((err) => {
            if (err.error.message === 'Username and Email Already Exist') {
              this.username?.setErrors({ duplicatedUsername: true });
              this.email?.setErrors({ duplicatedEmail: true });
            } else if (err.error.message === 'Username Already Exists') {
              this.username?.setErrors({ duplicatedUsername: true });
            } else if (err.error.message === 'Email Already Exists') {
              this.email?.setErrors({ duplicatedEmail: true });
            }

            return throwError(() => err);
          })
        )
        .subscribe();
    }
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
