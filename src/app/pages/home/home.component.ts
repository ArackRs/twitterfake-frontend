import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {FollowComponent} from "../../components/follow/follow.component";
import {TabViewModule} from "primeng/tabview";
import {CreatePostComponent} from "../../components/create-post/create-post.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {UserService} from "../../services/user.service";
import {PostListComponent} from "../../components/post-list/post-list.component";
import {FollowService} from "../../services/follow.service";
import {PostService} from "../../services/post.service";
import {NotificationService} from "../../services/notification.service";
import {User} from "../../model/user";
import {NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    FollowComponent,
    TabViewModule,
    CreatePostComponent,
    FooterComponent,
    PostListComponent,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  allPosts: any[] = [];
  following: any[] = [];
  forYouPosts: any[] = [];
  followingPosts: any[] = [];
  currentUserId: number = 0;
  username: string = '';
  shouldRefreshPosts: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly followService: FollowService,
    private readonly notificationService: NotificationService
  ) {  }

  public ngOnInit(): void {
    this.loadCurrentUser();
    this.loadAllPosts();
    this.loadFollowing();
    this.notificationService.userPost$.subscribe(() => {
      this.loadAllPosts();
      this.loadFollowing();
    });
  }

  private loadCurrentUser(): void {
    this.userService.loadCurrentUser().subscribe({
      next: (user) => {
        this.username = user.username;
        this.currentUserId = user.id;
      },
      error: (error) => {
        console.error('Error loading current user:', error);
      }
    });
  }

  public onPostCreated() {
    this.shouldRefreshPosts = true;
  }

  private loadAllPosts(): void {
    this.postService.getAll().subscribe({
      next: (response) => {
        this.allPosts = response;
        this.filterPosts();
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  private loadFollowing(): void {

    if (this.currentUserId) {
      this.followService.getFollowingByUserId(this.currentUserId).subscribe({
        next: (followingList) => {
          this.following = followingList;
          this.filterPosts();
        },
        error: (error) => {
          console.error('Error fetching following users:', error);
        }
      });
    }
  }

  private filterPosts(): void {
    const followingUsernames = this.following.map(user => user.username);
    const allPostsCopy = [...this.allPosts];

    this.forYouPosts = allPostsCopy.reverse();
    this.followingPosts = this.allPosts
      .filter(post => followingUsernames.includes(post.username))
      .reverse();
  }
}
