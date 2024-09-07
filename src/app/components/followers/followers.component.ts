import {Component, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {FollowService} from "../../services/follow.service";
import {Button} from "primeng/button";
import {NgClass} from "@angular/common";

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

  constructor(private followService: FollowService) {}

  public ngOnInit(): void {
    this.loadFollowers();

  }
  public followUser(followedId: number): void {
    this.loading[followedId] = true;

    this.followService.follow(followedId).subscribe({
      next: () => {
        this.loadFollowers();
        this.loading[followedId] = false;
      },
      error: (err) => {
        console.error('Error following user', err);
        this.loading[followedId] = false;
      }
    });
  }

  private loadFollowers(): void {
    this.followService.getFollowers().subscribe({
      next: (data) => {
        this.followers = data;
        console.log('Followers', this.followers);
        this.loading = {};
      },
      error: (err) => {
        console.error('Error fetching followers', err);
      }
    });
  }
}

