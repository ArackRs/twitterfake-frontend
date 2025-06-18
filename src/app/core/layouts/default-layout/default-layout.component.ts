import {Component} from '@angular/core';
import {SidebarComponent} from "../../../shared/components/sidebar/sidebar.component";
import {FollowComponent} from "../../../shared/components/follow/follow.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    FollowComponent,
    NgIf,
    AsyncPipe,
    RouterOutlet
  ],
  template: `
    <div id="app" class="flex lg:gap-3">
      <app-sidebar />
      <main class="flex-grow">
        <router-outlet />
      </main>
      <app-follow />
    </div>
  `,
  styles: ``
})
export class DefaultLayoutComponent {

}
