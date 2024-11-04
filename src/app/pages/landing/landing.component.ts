import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FooterComponent} from "../../components/footer/footer.component";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

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
export class LandingComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {  }

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
}
