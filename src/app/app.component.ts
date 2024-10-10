import { Component } from '@angular/core';
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
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EnlaceFrontend';
}
