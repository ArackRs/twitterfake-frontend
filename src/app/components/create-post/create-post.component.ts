import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    Button,
    DividerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  postId: string = '1';

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.postService.createById(this.postId, this.postForm.value).subscribe({
        next: (response) => {
          console.log('Post created successfully:', response);
          // Puedes redirigir o mostrar un mensaje de éxito aquí
        },
        error: (error) => {
          console.error('Error creating post:', error);
          // Manejo del error aquí
        }
      });
    }
  }
}
