import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
