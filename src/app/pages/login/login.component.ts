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
    // Inicializa el formulario reactivo
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Método para manejar el inicio de sesión
  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      // Llamada al método signIn del servicio AuthService
      this.authService.signIn(credentials).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          // Redirigir al usuario a una página después de iniciar sesión, como el dashboard
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
        }
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}
