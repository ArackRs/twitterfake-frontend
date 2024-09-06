import {Component, OnInit} from '@angular/core';
import {CreatePostComponent} from "../../components/create-post/create-post.component";
import {FollowComponent} from "../../components/follow/follow.component";
import {PostComponent} from "../../components/post/post.component";
import {PrimeTemplate} from "primeng/api";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {TabViewModule} from "primeng/tabview";
import {UserService} from "../../services/user.service";
import {FollowService} from "../../services/follow.service";
import {Button} from "primeng/button";
import {AvatarModule} from "primeng/avatar";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CreatePostComponent,
    FollowComponent,
    PostComponent,
    PrimeTemplate,
    SidebarComponent,
    TabViewModule,
    Button,
    AvatarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  following: any[] = [];
  followers: any[] = [];
  username: string = 'string';
  userId: number = 1;

  constructor(
    private userService: UserService,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadFollowing();
    this.loadFollowers();
  }

  loadUserProfile(): void {
    this.userService.getByUsername(this.username).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error fetching user profile', err)
    });
  }

  loadFollowing(): void {
    this.followService.getFollowing(this.userId).subscribe({
      next: (data) => this.following = data,
      error: (err) => console.error('Error fetching following', err)
    });
  }

  loadFollowers(): void {
    this.followService.getFollowers(this.userId).subscribe({
      next: (data) => this.followers = data,
      error: (err) => console.error('Error fetching followers', err)
    });
  }
}
