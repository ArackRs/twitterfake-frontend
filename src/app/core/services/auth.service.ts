import { Injectable } from '@angular/core';
import { ApiBaseService } from "../../shared/services/api-base.service";
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, retry} from "rxjs";
import {tap} from "rxjs/operators";
import {Auth} from "../models/auth";
import {SignIn} from "../models/sign-in";
import {SignUp} from "../models/sign-up";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiBaseService<Auth> {

  // AÑADIDO: BehaviorSubject para emitir el estado de autenticación de forma reactiva
  private readonly _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/auth';
    // Opcional: Escuchar eventos de 'storage' para sincronizar entre pestañas
    // Esto es útil si un usuario cierra sesión en una pestaña y quieres que se refleje en otras.
    window.addEventListener('storage', this.onStorageChange.bind(this));
  }

  // AÑADIDO: Método para manejar cambios en el localStorage
  private onStorageChange(event: StorageEvent): void {
    // Si la clave 'token' cambia o si se llama a localStorage.clear() (event.key es null)
    if (event.key === 'token' || event.key === null) {
      const newStatus: boolean = this.isAuthenticated();
      // Solo emitir si el estado ha cambiado para evitar emisiones innecesarias
      if (this._isLoggedIn.getValue() !== newStatus) {
        this._isLoggedIn.next(newStatus);
      }
    }
  }

  // Opcional: Limpiar el listener al destruir el servicio (aunque para 'providedIn: root' no es estrictamente necesario ya que el servicio vive toda la app)
  // ngOnDestroy() {
  //   window.removeEventListener('storage', this.onStorageChange.bind(this));
  // }

  public signUp(item: SignUp): Observable<Auth> {
    return this.http.post<Auth>(`${this.resourcePath()}/sign-up`, item, this.httpOptions)
      .pipe(
        tap(response => {
          this.saveCredentials(response.token, response.username);
          this._isLoggedIn.next(true); // AÑADIDO: Notificar que el usuario está logueado
        }),
        retry(2),
        catchError(this.handleError)
      );
  }
  public signIn(item: SignIn): Observable<Auth> {
    return this.http.post<Auth>(`${this.resourcePath()}/log-in`, item, this.httpOptions)
      .pipe(
        tap(response => {
          this.saveCredentials(response.token, response.username);
          this._isLoggedIn.next(true); // AÑADIDO: Notificar que el usuario está logueado
        }),
        retry(2),
        catchError(this.handleError)
      );
  }
  public guest(): Observable<Auth> {
    return this.http.post<Auth>(`${this.resourcePath()}/guest`, this.httpOptions)
      .pipe(
        tap(response => {
          this.saveCredentials(response.token, response.username);
          this._isLoggedIn.next(true); // AÑADIDO: Notificar que el usuario está logueado
        }),
        retry(2),
        catchError(this.handleError)
      );
  }
  public signOut(): Observable<void> {
    return this.http.post<void>(`${this.resourcePath()}/log-out`, this.httpOptions)
      .pipe(
        tap(() => {
          this.clearCredentials();
          this._isLoggedIn.next(false); // AÑADIDO: Notificar que el usuario no está logueado
        }),
        retry(2),
        catchError(this.handleError)
      );
  }

  public continueWithGoogle(code: any): Observable<Auth> {
    return this.http.post<Auth>(`${environment.apiUrl}/oauth2/google/callback`, { code }, this.httpOptions)
      .pipe(
        tap(response => {
          this.saveCredentials(response.token, response.username);
          this._isLoggedIn.next(true); // AÑADIDO: Notificar que el usuario está logueado
        }),
        retry(0),
        catchError(this.handleError)
      );
  }

  public handleSessionExpired(): void {
    this.clearCredentials();
    this._isLoggedIn.next(false); // AÑADIDO: Notificar que el usuario no está logueado
    alert('Session has expired. You will be redirected to the login page.');
    window.location.href = '/';
  }
  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private saveCredentials(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }
  private clearCredentials(): void {
    localStorage.clear();
  }
}
