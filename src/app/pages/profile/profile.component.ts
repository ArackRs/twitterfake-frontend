import {Component, OnChanges, OnInit} from '@angular/core';
import {CreatePostComponent} from "../../components/create-post/create-post.component";
import {FollowComponent} from "../../components/follow/follow.component";
import {PostComponent} from "../../components/post/post.component";
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
    AvatarModule,
    NgIf,
    FollowingComponent,
    FollowersComponent,
    DialogModule,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  following: any[] = [];
  visible: boolean = false;
  firstName: string = '';
  lastName: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {

    this.userService.getUserByUsername(this.userService.getUsername()).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
      }
    });
  }

  public saveProfile(): void {
    const updatedUser = {
      firstName: this.firstName,
      lastName: this.lastName,
    };

    this.userService.update(updatedUser).subscribe(
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
}
