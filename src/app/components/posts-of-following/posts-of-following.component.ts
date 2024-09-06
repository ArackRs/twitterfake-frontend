import {Component, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FollowService} from "../../services/follow.service";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

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
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFollowingAndPosts();
  }

  loadFollowingAndPosts() {
    const userId = this.getCurrentUserId();

    this.followService.getFollowing(userId).subscribe({
      next: (followingList) => {
        this.following = followingList;
        this.getPostsFromFollowing();
      },
      error: (error) => {
        console.error('Error fetching following users:', error);
      }
    });
  }

  getPostsFromFollowing() {
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

  getCurrentUserId(): number {
    return 1
  }

  deletePost(postId: number) {
    this.postService.delete(postId).subscribe({
      next: () => {
        console.log('Post deleted successfully');
        this.getPostsFromFollowing();
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      }
    });
  }
}
