import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { AuthService } from "../../../../core/services/auth.service";
import {SignIn} from "../../../../core/models/sign-in";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule,
    ProgressSpinnerModule
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
    private readonly router: Router,
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
          this.router.navigate(['/home'], { replaceUrl: true })
            .then(r => console.log('Redireccionado a /home:', r));
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
