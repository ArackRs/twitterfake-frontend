import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FooterComponent} from "../../components/footer/footer.component";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment";

declare const google: any;

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

  redirectToGoogleAuth() {
    const clientId = environment.googleClientId;
    const redirectUri = environment.googleRedirectUri; // Ej: 'https://tuapp.com/google/callback'
    const scope = 'openid email profile'; // Permisos que deseas solicitar
    const responseType = 'code';
    const state = 'opcional_un_valor_random';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;

    window.location.href = authUrl;
  }

}
