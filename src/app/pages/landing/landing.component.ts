import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FooterComponent} from "../../components/footer/footer.component";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

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
    (window as any).handleCredentialResponse = (response: any) => {
      this.handleCredentialResponse(response);
    };

    google.accounts.id.initialize({
      client_id: '353060260533-ol23f81fr8pqo3a8ibjqprrv6kgpd4bf.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      // auto_select: true,
    });

    const googleButton: HTMLElement = document.getElementById("g_id_signin") as HTMLElement;

    if (googleButton) {
      google.accounts.id.renderButton(googleButton, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "continue_with",
        type: "standard",
        logo_alignment: "left",
        width: googleButton.offsetWidth
      });
    }

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

  handleCredentialResponse(response: any) {
    const idToken = response.credential;
    console.log('Google ID Token:', idToken);

    this.authService.continueWithGoogle(idToken).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: err => console.error('Google login error:', err)
    });
  }
}
