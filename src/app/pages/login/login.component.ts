import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {SignIn} from "../../model/sign-in";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  credentials: SignIn | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {

      this.credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.authService.signIn(this.credentials).subscribe({
        next: () => {
          this.router.navigate(['/home'])
            .then(r => console.log('Redirection a /home:', r));
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}
