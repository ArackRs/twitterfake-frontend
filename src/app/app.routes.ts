import { Routes } from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {authenticatedGuard} from "./guards/authenticated.guard";
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent),
    canActivate: [authenticatedGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'oauth2/callback',
    loadComponent: () => import('./pages/oauth2/oauth2.component').then(m => m.Oauth2Component),
  },
  // --- INICIO: Rutas que usan el Layout por defecto ---
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard]
      },
      {
        path: 'profile/:username',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      },
      // ... más rutas que usan este layout ...
    ]
  },
  // --- FIN: Rutas que usan el Layout por defecto ---
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
