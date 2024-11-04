import {Component, Input} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-post-list',
  standalone: true,
    imports: [
        AvatarModule,
        Button,
        DividerModule
    ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  @Input() posts: any[] = [];
}
