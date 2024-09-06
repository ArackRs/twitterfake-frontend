import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = {
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      };

      this.authService.signUp(user).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en el registro:', error);
        }
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}
