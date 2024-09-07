import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FooterComponent} from "../../components/footer/footer.component";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

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

  constructor(private authService: AuthService, private router: Router) {  }

  public createGuestAccount(): void {
    const guestData = {
      firstName: 'Guest',
      lastName: 'User',
      username: `guest_${Math.random().toString(36).substring(7)}`,
      password: 'guestpassword',
    };

    this.authService.signUp(guestData).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito', response);

        const credentials = {
          username: guestData.username,
          password: guestData.password,
        };

        this.authService.signIn(credentials).subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error al iniciar sesión con la cuenta de invitado:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al crear la cuenta de invitado:', error);
      }
    });
  }
}
