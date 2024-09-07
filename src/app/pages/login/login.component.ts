import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth.service";

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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.authService.signIn(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          this.router.navigate(['/home']).then(r => console.log('Navigation a /home:', r));
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
