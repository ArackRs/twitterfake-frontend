import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FooterComponent} from "../../components/footer/footer.component";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser
} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    Button,
    DividerModule,
    FooterComponent,
    RouterLink,
    GoogleSigninButtonModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly socialAuthService: SocialAuthService
  ) {

    // 2 - Suscribirse al estado de autenticación
    this.socialAuthService.authState.subscribe((user: SocialUser): void => {
      if (user) {
        console.log('Google User:', user);
        // Aquí podrías enviar el token al backend:
        this.authService.signInWithGoogle(user.idToken).subscribe({
          next: (res) => {
            // Guardar token y navegar
            this.router.navigate(['/home']);
          },
          error: err => console.error('Google login error', err)
        });
      }
    });
  }

  ngOnInit(): void {
    // 1 - Configurar el proveedor de Google
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => console.log('Google sign-in data:', data),
    );
  }

  public createGuestAccount(): void {

    this.authService.guest().subscribe({
      next: () => {
        this.router.navigate(['/home'])
          .then(r => console.log('Navigation a /home:', r));
      },
      error: (error) => {
        console.error('Error creating guest account:', error);
      }
    });
  }

  public loginWithGoogle(): void {
    window.location.href = 'https://zesty-shelagh-arackrs-3f4782f7.koyeb.app/oauth2/authorization/google';
  }

}
