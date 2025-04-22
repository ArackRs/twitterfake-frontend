import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiBaseService } from "./services/api-base.service";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { authInterceptor } from "./core/auth.interceptor";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {PostService} from "./services/post.service";
import {FollowService} from "./services/follow.service";

import {
  SocialLoginModule,
  SocialAuthService,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule, GoogleLoginProvider
} from '@abacritt/angularx-social-login';

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
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '353060260533-ol23f81fr8pqo3a8ibjqprrv6kgpd4bf.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: any) => {
          console.error('Error in social login:', err);
        }
      } as SocialAuthServiceConfig
    },
    importProvidersFrom(
      BrowserAnimationsModule,
      ReactiveFormsModule,
      SocialLoginModule,
      GoogleSigninButtonModule
    )
  ]
};
