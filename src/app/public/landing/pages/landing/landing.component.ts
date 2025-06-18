import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FooterComponent} from "../../../../shared/components/footer/footer.component";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {environment} from "../../../../../environments/environment";

// declare const google: any;
// Declara la interfaz global de Google Sign-In para TypeScript
declare global {
  interface Window {
    google: any;
  }
}

interface CredentialResponse {
  credential: string; // Este es el ID Token
  select_by: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    Button,
    DividerModule,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {

    // Inicializa Google Sign-In
    // window.google.accounts.id.initialize({
    //   client_id: environment.googleClientId,
    //   callback: this.handleGoogleCredentialResponse.bind(this), // Nuevo callback para GSI
    //   auto_select: true, // Puedes poner true si quieres que intente iniciar sesión automáticamente
    //   cancel_on_tap_outside: true, // Permite al usuario cerrar el One-Tap haciendo clic fuera
    //   // ux_mode: 'popup' // Para un pop-up central en lugar del One-Tap si lo prefieres
    // });
    //
    // // Muestra el One-Tap
    // window.google.accounts.id.prompt();

    // Opcional: Renderiza un botón de "Iniciar sesión con Google" si el One-Tap no aparece
    // Este es el botón "Sign in with Google" clásico
    // window.google.accounts.id.renderButton(
    //   document.getElementById("googleSignInButton"), // Asegúrate de tener <div id="googleSignInButton"></div> en tu HTML
    //   { theme: "outline", size: "large", text: "signin_with", width: "300" } // Personaliza el botón
    // );
  }

  handleGoogleCredentialResponse(response: CredentialResponse): void {
    console.log("Encoded ID Token:" + response.credential);
    // Aquí envías el ID Token a tu backend para verificación y autenticación
    this.authService.continueWithGoogle(response.credential).subscribe({
      next: () => {
        this.router.navigate(['/home'])
          .then(r => console.log('Navigation to /home:', r));
      },
      error: (error) => {
        console.error('Error authenticating with Google ID token:', error);
        // Mostrar un toast de error
      }
    });
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

  redirectToGoogleAuth(): void {
    const clientId: string= environment.googleClientId;
    const redirectUri: string = environment.frontendUrl + '/oauth2/callback';
    console.log('Redirect URI:', redirectUri);
    const scope = 'openid email profile';
    const responseType = 'code';

    const state = crypto.randomUUID();
    sessionStorage.setItem('oauth_state', state);

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth`
      + `?client_id=${clientId}`
      + `&redirect_uri=${redirectUri}`
      + `&response_type=${responseType}`
      + `&scope=${scope}`
      + `&state=${state}`;
  }
}
