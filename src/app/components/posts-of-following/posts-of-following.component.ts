import {Component, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FollowService} from "../../services/follow.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-posts-of-following',
  standalone: true,
  imports: [
    AvatarModule,
    Button,
    DividerModule
  ],
  templateUrl: './posts-of-following.component.html',
  styleUrl: './posts-of-following.component.css'
})
export class PostsOfFollowingComponent implements OnInit {
  posts: any[] = [];
  following: any[] = [];

  constructor(
    private followService: FollowService,
    private postService: PostService,
  ) {}

  public ngOnInit(): void {
    this.loadFollowingAndPosts();
  }
  public deletePost(): void {
    this.postService.delete().subscribe({
      next: (): void => {
        console.log('Post deleted successfully');
        this.getPostsFromFollowing();
      },
      error: (error): void => {
        console.error('Error deleting post:', error);
      }
    });
  }

  private loadFollowingAndPosts(): void {
    this.followService.getFollowing().subscribe({
      next: (followingList) => {
        this.following = followingList;
        this.getPostsFromFollowing();
      },
      error: (error) => {
        console.error('Error fetching following users:', error);
      }
    });
  }
  private getPostsFromFollowing(): void {
    const followingIds = this.following.map(user => user.id);

    this.postService.getAll().subscribe({
      next: (allPosts) => {
        this.posts = allPosts.filter(post => followingIds.includes(post.id)).reverse();
        console.log('Posts from following users fetched successfully:', this.posts);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }
}
