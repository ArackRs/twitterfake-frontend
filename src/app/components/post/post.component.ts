import { Component } from '@angular/core';
import {InputTextareaModule} from "primeng/inputtextarea";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    InputTextareaModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DividerModule,
    Button,
    CardModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

}
