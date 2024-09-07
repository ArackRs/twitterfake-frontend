import {Component, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {FollowService} from "../../services/follow.service";
import {Button} from "primeng/button";
import {NgClass} from "@angular/common";

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
  following: any[] = [];
  loading: { [key: number]: boolean } = {};

  constructor(private followService: FollowService) {}

  public ngOnInit(): void {
    this.loadFollowing();
    this.followService.userFollowed$.subscribe(() => {
      this.loadFollowing();
    });
  }
  public unFollowUser(followedId: number): void {
    this.loading[followedId] = true;

    this.followService.unFollow(followedId).subscribe({
      next: () => {
        this.loadFollowing();
        this.loading[followedId] = false;
      },
      error: (err) => {
        console.error('Error while unfollowing', err);
        this.loading[followedId] = false;
      }
    });
  }

  private loadFollowing(): void {
    this.followService.getFollowing().subscribe({
      next: (data) => {
        this.following = data;
        this.loading = {};
      },
      error: (err) => {
        console.error('Error fetching following', err);
      }
    });
  }
}
