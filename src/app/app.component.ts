import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./components/footer/footer.component";
import {Button} from "primeng/button";
import {FollowComponent} from "./components/follow/follow.component";
import {FollowersComponent} from "./components/followers/followers.component";
import {FollowingComponent} from "./components/following/following.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TabViewModule} from "primeng/tabview";
import {DividerModule} from "primeng/divider";
import {LandingComponent} from "./pages/landing/landing.component";
import {NgIf} from "@angular/common";
import {AuthService} from "./services/auth.service";
import {ApiBaseService} from "./services/api-base.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingComponent} from "./components/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    Button,
    FollowComponent,
    FollowersComponent,
    FollowingComponent,
    SidebarComponent,
    TabViewModule,
    DividerModule,
    RouterLink,
    LandingComponent,
    NgIf,
    ProgressSpinnerModule,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EnlaceFrontend';
  isSleeping: boolean = true;

  constructor(
    private readonly apiBaseService: ApiBaseService<any>,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.apiBaseService.healthCheck().subscribe({
      next: (res) => {
        console.log('Health check OK', res);
        if (res?.status === 'UP') {
          this.isSleeping = false;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Health check failed', error);
      }
    });
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
