import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [
    Button,
    CardModule,
    ImageModule
  ],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.css'
})
export class FollowComponent {

}
