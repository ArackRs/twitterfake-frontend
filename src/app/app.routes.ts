import { Routes } from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";
import {authenticatedGuard} from "./core/guards/authenticated.guard";
import {DefaultLayoutComponent} from "./core/layouts/default-layout/default-layout.component";

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadComponent: () => import('./public/landing/pages/landing/landing.component').then(m => m.LandingComponent),
    canActivate: [authenticatedGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./public/auth/pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./public/auth/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'oauth2/callback',
    loadComponent: () => import('./public/auth/pages/oauth2/oauth2.component').then(m => m.Oauth2Component),
  },
  // --- INICIO: Rutas que usan el Layout por defecto ---
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/posts/pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard]
      },
      {
        path: 'profile/:username',
        loadComponent: () => import('./features/profile/components/pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      },
      // ... más rutas que usan este layout ...
    ]
  },
  // --- FIN: Rutas que usan el Layout por defecto ---
  {
    path: '**',
    loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
