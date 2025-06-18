import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-oauth2',
  standalone: true,
  imports: [
  ],
  template: `
  `,
  styles: ``
})
export class Oauth2Component implements OnInit {

  constructor(
      private readonly authService: AuthService,
      private readonly router: Router,
  ) {}

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

}
