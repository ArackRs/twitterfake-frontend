import { Component } from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    ProgressSpinnerModule
  ],
  template: `
    <div class="loading">
      <p-progressSpinner
        strokeWidth="8"
        fill="transparent"
        animationDuration=".5s"
        [style]="{ width: '50px', height: '50px' }"
      />
    </div>
  `,
  styles: `
    .loading {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: grid;
      place-content: center;
    }
  `
})
export class LoadingComponent {

}
