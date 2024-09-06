import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiBaseService } from "./services/api-base.service";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { authInterceptor } from "./services/auth.interceptor";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {PostService} from "./services/post.service";
import {FollowService} from "./services/follow.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    ApiBaseService,
    AuthService,
    UserService,
    PostService,
    FollowService,
    importProvidersFrom(
      BrowserAnimationsModule,
      ReactiveFormsModule
    )
  ]
};
