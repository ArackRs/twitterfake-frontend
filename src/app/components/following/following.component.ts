import {Component, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {FollowService} from "../../services/follow.service";
import {Button} from "primeng/button";
import {NgClass} from "@angular/common";
import {NotificationService} from "../../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Follow} from "../../model/follow";

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [
    AvatarModule,
    Button,
    NgClass
  ],
  templateUrl: './following.component.html',
  styleUrl: './following.component.css'
})
export class FollowingComponent implements OnInit {
  following: Follow[] = [];
  loading: { [key: number]: boolean } = {};
  username: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly followService: FollowService,
    private readonly notificationService: NotificationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') ?? '';
      this.loadFollowing();
    });
    this.notificationService.userFollow$.subscribe(() => {
      this.loadFollowing();
    });
  }

  public unFollowUser(followedId: number, username: string): void {
    this.loading[followedId] = true;

    this.userService.getUserByUsername(username).subscribe({
      next: (user) => {
        this.followService.unFollow(user.id).subscribe({
          next: () => {
            this.loadFollowing();
            this.loading[followedId] = false;
            this.notificationService.notifyFollow();
          },
          error: (err) => {
            console.error('Error while unfollowing', err);
            this.loading[followedId] = false;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user', err);
        this.loading[followedId] = false;
      }
    });
  }

  private loadFollowing(): void {
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe({
        next: (user) => {
          this.followService.getFollowingByUserId(user.id).subscribe({
            next: (data) => {
              this.following = data;
              this.loading = {};
            },
            error: (err) => {
              console.error('Error fetching following', err);
            }
          });
        },
        error: (err) => {
          console.error('Error fetching current user:', err);
        }
      });
      }
    }

  goProfile(username: string | undefined) {
    this.router.navigate([`/profile/${username}`]);
  }
}
