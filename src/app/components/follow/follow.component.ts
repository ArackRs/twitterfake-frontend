import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {UserService} from "../../services/user.service";
import {NgForOf, NgIf} from "@angular/common";
import {FollowService} from "../../services/follow.service";
import {AvatarModule} from "primeng/avatar";
import {FooterComponent} from "../footer/footer.component";
import {AuthService} from "../../services/auth.service";

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

  constructor(private authService: AuthService, private userService: UserService, private followService: FollowService) {}

  public ngOnInit(): void {
    this.userService.getUserByUsername(this.userService.getUsername()).subscribe({
      next: (user) => {
        this.currentUserId = user.id;
        console.log('Current user fetched:', user);
        this.user = user;
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
      }
    });
    this.loadUsers();
  }
  public followUser(followedId: number): void {
    this.loadingUsers[followedId] = true;
    this.followService.follow(followedId).subscribe({
      next: (response) => {
        console.log(response);
        this.loadingUsers[followedId] = false;
        this.loadUsers();
        this.followService.notifyUserFollowed();
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

        this.followService.getFollowing().subscribe({
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

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}

