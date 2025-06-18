import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {NgIf} from "@angular/common";
import {FooterComponent} from "../footer/footer.component";
import {UserService} from "../../../features/users/services/user.service";
import {User} from "../../../features/users/models/user";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    NgIf,
    FooterComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  user: User | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {  }
  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.userService.loadCurrentUser().subscribe(user => {
        this.user = user;
      });
    }
  }
  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  public logout(): void {
    this.authService.signOut().subscribe({
      next: () => {
        this.router.navigate(['/landing']).then(r => console.log('Logout successful, redirected to home.'));
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
  }
}
