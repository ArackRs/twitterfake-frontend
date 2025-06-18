import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {Button} from "primeng/button";
import {FollowComponent} from "./shared/components/follow/follow.component";
import {FollowersComponent} from "./features/profile/components/widgets/followers/followers.component";
import {FollowingComponent} from "./features/profile/components/widgets/following/following.component";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {TabViewModule} from "primeng/tabview";
import {DividerModule} from "primeng/divider";
import {LandingComponent} from "./public/landing/pages/landing/landing.component";
import {NgIf} from "@angular/common";
import {AuthService} from "./core/services/auth.service";
import {ApiBaseService} from "./shared/services/api-base.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingComponent} from "./core/components/loading/loading.component";
import {DefaultLayoutComponent} from "./core/layouts/default-layout/default-layout.component";
import {retry, throwError, timer} from "rxjs";
import {catchError} from "rxjs/operators";
import {AlertService} from "./core/services/alert.service";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    Button,
    FollowComponent,
    FollowersComponent,
    FollowingComponent,
    SidebarComponent,
    TabViewModule,
    DividerModule,
    RouterLink,
    LandingComponent,
    NgIf,
    ProgressSpinnerModule,
    LoadingComponent,
    DefaultLayoutComponent,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TwitterfakeFrontend';

  constructor(
    private readonly apiBaseService: ApiBaseService<any>,
    private readonly alertService: AlertService, // Inyecta el AlertService
    private readonly router: Router // Inyecta el router para posibles redirecciones
  ) {}

  ngOnInit(): void {
    const MAX_RETRIES = 5; // Aumentamos un poco los reintentos para el arranque de un servidor dormido
    const RETRY_DELAY_MS = 2500; // Retraso entre reintentos

    this.apiBaseService.healthCheck().pipe(
      retry({
        count: MAX_RETRIES,
        delay: (error, retryCount) => {
          console.warn(`Health check failed. Retrying backend connection... Attempt ${retryCount}/${MAX_RETRIES}`);
          if (retryCount === 1) { // Mostrar un aviso solo en el primer reintento para no ser molesto
            this.alertService.showWarning(
              'Conectando con el servidor',
              'El servidor puede estar "dormido". Esto puede tardar unos segundos...'
            );
          }
          // El retraso puede ser exponencial (retryCount * RETRY_DELAY_MS) o fijo
          return timer(RETRY_DELAY_MS);
        }
      }),
      catchError((error) => {
        console.error('Health check failed after multiple retries. Backend is unreachable.', error);
        this.alertService.showError(
          'Error de Conexión',
          'No se pudo conectar con el servidor. Por favor, inténtelo más tarde o contacte a soporte.'
        );
        // Opcional: Si el fallo es crítico y la app no puede funcionar sin el backend
        // this.router.navigate(['/service-unavailable']); // Redirige a una página de "Servicio no disponible"
        return throwError(() => new Error('Backend no disponible')); // Propaga el error para posibles manejadores superiores
      })
    ).subscribe({
      next: (res) => {
        console.log('Health check OK', res);
        // this.alertService.showSuccess('Conexión con el servidor establecida.');
      }
    });
  }
}
