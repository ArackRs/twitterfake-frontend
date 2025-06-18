import {Component, EventEmitter, Output} from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {EventBusService} from "../../../../shared/services/event-bus.service";

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
  postForm: FormGroup = new FormGroup({});
  @Output() postCreated = new EventEmitter<void>();

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private notificationService: EventBusService
  ) {
    this.postForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.postForm.valid) {
      this.postService.create(this.postForm.value).subscribe({
        next: (response) => {
          console.log('Post created successfully:', response);
          this.postCreated.emit();
          this.notificationService.notifyPost();
        },
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });
    }
  }
}
