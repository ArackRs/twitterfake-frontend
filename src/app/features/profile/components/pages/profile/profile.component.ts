import {Component, OnInit} from '@angular/core';
import {CreatePostComponent} from "../../../../posts/widgets/create-post/create-post.component";
import {FollowComponent} from "../../../../../shared/components/follow/follow.component";
import {PrimeTemplate} from "primeng/api";
import {SidebarComponent} from "../../../../../shared/components/sidebar/sidebar.component";
import {TabViewModule} from "primeng/tabview";
import {UserService} from "../../../../users/services/user.service";
import {Button} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FollowingComponent} from "../../widgets/following/following.component";
import {FollowersComponent} from "../../widgets/followers/followers.component";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PostListComponent} from "../../../../posts/widgets/post-list/post-list.component";
import {PostService} from "../../../../posts/services/post.service";
import {ProfileService} from "../../../services/profile.service";
import {ActivatedRoute} from "@angular/router";
import {Profile} from "../../../models/profile";

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
    PostListComponent,
    NgOptimizedImage
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
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
  ) {
  }

  public ngOnInit(): void {
    this.loadUserProfile();
  }
  public saveProfile(): void {
    const userProfile = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: '',
      street: '',
      number: '',
      city: '',
      zipCode: '',
      country: ''
    };

    console.log('Updating profile:', userProfile);
    this.profileService.update(userProfile).subscribe({
      next: (response) => {
        this.hideDialog();
        this.loadUserProfile();
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }
  public showDialog(): void {
    this.visible = true;
  }
  public hideDialog(): void {
    this.visible = false;
  }

  private loadUserProfile(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username') ?? '';
      this.profileService.getProfileByUsername(username).subscribe({
        next: (profile: Profile): void => {
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
