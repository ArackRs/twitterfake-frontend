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

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.redirectToGoogleAuth.bind(this),
      auto_select: true,
    });
    google.accounts.id.prompt();
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
    const redirectUri: string = environment.frontendUrl + '/login';
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
