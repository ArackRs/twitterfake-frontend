import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-create-post',
  standalone: true,
    imports: [
        Button,
        DividerModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule
    ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

}
