import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authService: AuthService, private router: Router) {  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']).then(r => console.log('Logout'));
  }
}
