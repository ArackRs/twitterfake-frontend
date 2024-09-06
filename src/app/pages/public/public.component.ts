import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {Router, RouterLink} from "@angular/router";
import {FooterComponent} from "../../components/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    DividerModule,
    RouterLink,
    FooterComponent,
    NgOptimizedImage
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent {

  constructor(private authService: AuthService, private router: Router) {}

  createGuestAccount() {
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
