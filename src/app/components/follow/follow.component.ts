import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {UserService} from "../../services/user.service";
import {NgForOf, NgIf} from "@angular/common";
import {FollowService} from "../../services/follow.service";
import {AvatarModule} from "primeng/avatar";
import {FooterComponent} from "../footer/footer.component";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [
    Button,
    CardModule,
    ImageModule,
    NgForOf,
    AvatarModule,
    FooterComponent,
    NgIf
  ],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.css'
})
export class FollowComponent implements OnInit {
  users: any[] = [];
  user: any = {};
  loadingUsers: { [key: number]: boolean } = {};
  currentUserId: number = 0;

  constructor(
    private readonly userService: UserService,
    private readonly followService: FollowService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    const username: string = this.userService.getUsername();
    this.userService.getUserByUsername(username).subscribe({
      next: (user) => {
        this.user = user;
        this.currentUserId = user.id;
        console.log('Current user id:', this.currentUserId);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
    this.loadUsers();
    this.notificationService.userFollow$.subscribe(() => {
      this.loadUsers();
    });
  }
  public followUser(followedId: number): void {
    this.loadingUsers[followedId] = true;
    this.followService.follow(followedId).subscribe({
      next: (response) => {
        console.log(response);
        this.loadingUsers[followedId] = false;
        this.loadUsers();
        this.notificationService.notifyFollow();
        this.notificationService.notifyPost();
      },
      error: (err) => {
        console.error('Error following user:', err);
        this.loadingUsers[followedId] = false;
      }
    });
  }

  private loadUsers(): void {

    this.userService.getAll().subscribe({
      next: (allUsers) => {

        this.followService.getFollowingByUserId(this.currentUserId).subscribe({
          next: (followers) => {

            const followerIds = new Set(followers.map((user: any) => user.id));

            this.users = allUsers.filter((user: any) => {
              const notFollowed = !followerIds.has(user.id);
              const notCurrentUser = user.id !== this.currentUserId; // Excluir el usuario actual
              return notFollowed && notCurrentUser;
            });
          },
          error: (err) => {
            console.error('Error fetching following:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  goProfile(username: string) {
    this.router.navigate([`/profile/${username}`]);
  }
}

