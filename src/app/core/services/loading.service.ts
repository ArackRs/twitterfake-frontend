import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private readonly _loading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._loading.asObservable();

  private activeRequests = 0; // Contador de peticiones activas

  show(): void {
    this.activeRequests++;
    if (this.activeRequests === 1) { // Solo muestra si es la primera petición activa
      this._loading.next(true);
    }
  }

  hide(): void {
    this.activeRequests--;
    if (this.activeRequests <= 0) { // Oculta si no hay más peticiones activas
      this.activeRequests = 0; // Previene números negativos
      this._loading.next(false);
    }
  }
}
