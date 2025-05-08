import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
    private readonly route: ActivatedRoute
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

    const token: string | null = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      this.router.navigate(['/home'], {replaceUrl: true})
        .then(r => console.log('Redirection a /home:', r));
    } else {
      console.error('Token missing in URL');
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
