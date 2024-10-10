import {Component, OnInit} from '@angular/core';
import {CreatePostComponent} from "../../components/create-post/create-post.component";
import {FollowComponent} from "../../components/follow/follow.component";
import {PrimeTemplate} from "primeng/api";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {TabViewModule} from "primeng/tabview";
import {UserService} from "../../services/user.service";
import {Button} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {NgIf} from "@angular/common";
import {FollowingComponent} from "../../components/following/following.component";
import {FollowersComponent} from "../../components/followers/followers.component";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PostListComponent} from "../../components/post-list/post-list.component";
import {PostService} from "../../services/post.service";
import {ProfileService} from "../../services/profile.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CreatePostComponent,
    FollowComponent,
    PrimeTemplate,
    SidebarComponent,
    TabViewModule,
    Button,
    AvatarModule,
    NgIf,
    FollowingComponent,
    FollowersComponent,
    DialogModule,
    FormsModule,
    InputTextModule,
    PostListComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  allPosts: any[] = [];
  myPosts: any[] = [];
  following: any[] = [];
  visible: boolean = false;
  firstName: string = '';
  lastName: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly postService: PostService,
    private readonly route: ActivatedRoute
  ) {  }

  public ngOnInit(): void {
    this.loadUserProfile();
  }
  public saveProfile(): void {
    const updatedUser = {
      firstName: this.firstName,
      lastName: this.lastName,
    };

    this.profileService.update(updatedUser).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        this.hideDialog();
        this.loadUserProfile();
      },
      error => {
        console.error('Error updating profile', error);
      }
    );
  }
  public showDialog(): void {
    this.visible = true;
  }
  public hideDialog(): void {
    this.visible = false;
  }

  private loadUserProfile(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username') || '';
      this.profileService.getProfileByUsername(username).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.loadAllPosts(profile.username);
        },
        error: (err) => {
          console.error('Error fetching current user:', err);
        }
      });
    });
  }

  private loadAllPosts(username: string): void {
    this.postService.getPostsByUsername(username).subscribe({
      next: (response) => {
        this.allPosts = response;
        this.filterPosts();
        console.log('Posts fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  private filterPosts(): void {
    this.myPosts = this.allPosts
      .filter(post => post.username === this.userService.getUsername())
      .reverse();
  }
}
