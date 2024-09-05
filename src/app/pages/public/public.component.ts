import { Component } from '@angular/core';
import {SignInComponent} from "../../components/sign-in/sign-in.component";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [
    SignInComponent,
    ButtonModule,
    InputTextModule,
    DividerModule,
    RouterLink
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
