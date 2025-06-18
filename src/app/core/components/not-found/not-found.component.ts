import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Button} from "primeng/button";

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="not-found-container">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-message">Oops! The page you're looking for does not exist.</p>
      <p-button (click)="goHome()" class="not-found-button" label="Go to Homepage"/>
    </div>
  `,
  imports: [
    Button
  ],
  styles: [`
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      color: #858585;
    }

    .not-found-title {
      font-size: 4rem;
      margin: 0;
    }

    .not-found-message {
      font-size: 1.5rem;
      margin: 1rem 0;
    }
  `]
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
