import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { AuthService } from "../../../../core/services/auth.service";
import {User} from "../../../../features/users/models/user";
import {SignUp} from "../../../../core/models/sign-up";

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
  register: SignUp | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {

      this.register = {
        firstName: this.registerForm.get('firstname')?.value,
        lastName: this.registerForm.get('lastname')?.value,
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value
      };

      this.authService.signUp(this.register).subscribe({

        next: () => {
          this.router.navigate(['/home'])
            .then(r => console.log('Redirection a /home:', r));
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          alert('Error en el registro. Por favor, intente de nuevo.');
        }
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}
