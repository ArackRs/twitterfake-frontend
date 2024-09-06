import {Component, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {FollowService} from "../../services/follow.service";
import {Button} from "primeng/button";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [
    AvatarModule,
    Button,
    NgClass,
    NgIf
  ],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.css'
})
export class FollowersComponent implements OnInit {
  followers: any[] = [];
  loading: { [key: number]: boolean } = {};

  constructor(private followService: FollowService) {}

  ngOnInit(): void {
    this.loadFollowers();
  }

  private loadFollowers(): void {
    this.followService.getFollowers().subscribe({
      next: (followersData) => {
        // Cargar los usuarios que ya sigues
        this.followService.getFollowing().subscribe({
          next: (followingData) => {
            const followingIds = new Set(followingData.map((user: any) => user.id));

            // Marcar si ya sigues al usuario en la lista de seguidores
            this.followers = followersData.map((follower: any) => ({
              ...follower,
              isFollowing: followingIds.has(follower.id) // Añadir propiedad isFollowing
            }));

            this.loading = {}; // Resetear el estado de carga
          },
          error: (err) => {
            console.error('Error fetching following', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching followers', err);
      }
    });
  }

  followUser(followedId: number): void {
    this.loading[followedId] = true; // Iniciar el spinner de carga

    this.followService.follow(followedId).subscribe({
      next: () => {
        // Una vez seguido, recargar los seguidores para actualizar la vista
        this.loadFollowers();
        this.loading[followedId] = false; // Parar el spinner
      },
      error: (err) => {
        console.error('Error following user', err);
        this.loading[followedId] = false; // Parar el spinner en caso de error
      }
    });
  }
}

