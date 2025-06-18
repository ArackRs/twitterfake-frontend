import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {AlertService} from "../../core/services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService<T> {

  basePath: string = `${environment.apiUrl}/api/v1`;
  resourceEndpoint: string = '/resources';
  alertService: AlertService = inject(AlertService);

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(protected http: HttpClient) { }

  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  // Modifica el handleError para usar el servicio de toasts
  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.'; // Mensaje genérico

    if (error.error instanceof ErrorEvent) {
      // Error de red o del lado del cliente.
      console.error(`An error occurred: ${error.error.message}`);
      errorMessage = 'Error de red. Por favor, compruebe su conexión.';
    } else {
      // Error del backend.
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      // Aquí podrías personalizar los mensajes basados en el código de error (error.status)
      if (error.status === 400) {
        errorMessage = 'Datos inválidos. Por favor, revise los campos.';
      } else if (error.status === 401 || error.status === 403) {
        errorMessage = 'No tiene permiso para realizar esta acción.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado.';
      } else if (error.status >= 500) {
        errorMessage = 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';
      }
    }

    // Muestra el toast de error
    this.alertService.showError('Error', errorMessage);

    return throwError((): Error => new Error(errorMessage)); // Lanza el error para que los componentes puedan manejarlo si es necesario
  }

  public create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public delete(): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public update(item: any): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}`, item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.resourcePath()}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError.bind(this)));
  }

  healthCheck(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/actuator/health`)
      .pipe(retry(2), catchError(this.handleError));
  }

}
