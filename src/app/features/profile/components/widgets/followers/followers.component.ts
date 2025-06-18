import {Component, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {FollowService} from "../../../services/follow.service";
import {Button} from "primeng/button";
import {NgClass} from "@angular/common";
import {EventBusService} from "../../../../../shared/services/event-bus.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../users/services/user.service";

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [
    AvatarModule,
    Button,
    NgClass
  ],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.css'
})
export class FollowersComponent implements OnInit {
  followers: any[] = [];
  loading: { [key: number]: boolean } = {};
  disabled: { [key: number]: boolean } = {};
  username: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly followService: FollowService,
    private readonly notificationService: EventBusService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
      this.loadFollowers();
    });
    this.notificationService.userFollow$.subscribe(() => {
      this.loadFollowers();
    });
  }
  public followUser(followedId: number): void {
    this.loading[followedId] = true;

    this.followService.follow(followedId).subscribe({
      next: () => {
        this.notificationService.notifyFollow();
        this.loadFollowers();
        this.disabled[followedId] = true;
      },
      error: (err) => {
        console.error('Error following user', err);
        this.loading[followedId] = false;
      }
    });
  }

  private loadFollowers(): void {
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe({
        next: (user) => {
          this.followService.getFollowersByUserId(user.id).subscribe({
            next: (data) => {
              this.followers = data;
              this.loading = {};
            },
            error: (err) => {
              console.error('Error fetching followers', err);
            }
          });
        },
        error: (error) => {
          console.error('Error fetching user ID:', error);
        }
      });
    }
  }

  goProfile(username: string): void {
    this.router.navigate([`/profile/${username}`]);
  }
}

