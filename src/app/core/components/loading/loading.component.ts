import {Component, inject} from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingService} from "../../services/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    NgIf,
    AsyncPipe
  ],
  template: `
    <div class="loading" *ngIf="loadingService.isLoading$ | async">
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
      z-index: 10000;
    }
  `
})
export class LoadingComponent {

  loadingService: LoadingService = inject(LoadingService);
}
