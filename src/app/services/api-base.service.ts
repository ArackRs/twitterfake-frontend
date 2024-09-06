import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService<T> {

  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/resources';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  constructor(protected http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error("Something happened with request, please try again later."));
  }

  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  update(item: any): Observable<string> {
    return this.http.put(`${this.resourcePath()}`, JSON.stringify(item), { ...this.httpOptions, responseType: 'text' })
      .pipe(retry(2), catchError(this.handleError));
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.resourcePath()}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getById(): Observable<T> {
    return this.http.get<T>(`${this.resourcePath()}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
