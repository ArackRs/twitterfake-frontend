import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import {MessageService} from "primeng/api";
import {loadingInterceptor} from "./core/interceptors/loading.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Asumiendo que 'routes' está importado de './app.routes'
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        // errorInterceptor
      ])
    ),
    MessageService,
    importProvidersFrom(
      BrowserAnimationsModule,
      ReactiveFormsModule,
    ),
  ]
};
