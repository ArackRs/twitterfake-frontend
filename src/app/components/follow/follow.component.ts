import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {UserService} from "../../services/user.service";
import {NgForOf} from "@angular/common";
import {FollowService} from "../../services/follow.service";
import {AvatarModule} from "primeng/avatar";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [
    Button,
    CardModule,
    ImageModule,
    NgForOf,
    AvatarModule,
    FooterComponent
  ],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.css'
})
export class FollowComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private followService: FollowService) {}

  ngOnInit(): void {
    const currentUserId = 1;

    this.userService.getAll().subscribe({
      next: (allUsers) => {

        this.followService.getFollowers(currentUserId).subscribe({
          next: (followers) => {

            const followerIds = new Set(followers.map((user: any) => user.id));
            this.users = allUsers.filter((user: any) => !followerIds.has(user.id));
          },
          error: (err) => {
            console.error('Error fetching followers:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  followUser(followedId: number): void {
    const followerId = 1;
    this.followService.follow(followerId, followedId).subscribe({
      next: (response) => {
        console.log('Follow response:', response);
      },
      error: (err) => {
        console.error('Error following user:', err);
      }
    });
  }
}
