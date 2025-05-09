import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { AuthService } from "../../services/auth.service";
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
export class LoginComponent implements OnInit {
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

  public ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const returnedState: string | null = params.get('state');
    const expectedState: string | null = sessionStorage.getItem('oauth_state');

    if (returnedState && expectedState && returnedState !== expectedState) {
      console.error('Invalid state');
      this.router.navigate(['/landing'], {replaceUrl: true})
        .then(r => console.log('Redirection a /landing:', r));
      return;
    }

    const code: string | null = params.get('code');
    if (code) {
      this.authService.continueWithGoogle(code).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home'], {replaceUrl: true}).then(r => console.log('Redirection a /home:', r));
        },
        error: (err) => {
          console.error('Error exchanging code:', err);
          this.router.navigate(['/landing'], {replaceUrl: true}).then(r => console.log('Redirection a /landing:', r));
        }
      });
    } else {
      console.error('Code missing in URL');
    }
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
