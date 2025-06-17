import {Component, inject} from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {FollowComponent} from "../../components/follow/follow.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    FollowComponent,
    NgIf,
    AsyncPipe,
    RouterOutlet
  ],
  template: `
    <div id="app" class="flex lg:gap-3">
      <app-sidebar *ngIf="authService.isLoggedIn$ | async" />
      <main class="flex-grow">
        <router-outlet />
      </main>
      <app-follow *ngIf="authService.isLoggedIn$ | async" />
    </div>
  `,
  styles: ``
})
export class DefaultLayoutComponent {

  authService: AuthService = inject(AuthService);

  constructor() {
    // Opcional: puedes suscribirte aquí para depuración
    // this.authService.isLoggedIn$.subscribe(status => {
    //   console.log('User login status in DefaultLayoutComponent:', status);
    // });
  }
}
