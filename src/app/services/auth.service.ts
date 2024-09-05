import { Injectable } from '@angular/core';
import {ApiBaseService} from "./api-base.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiBaseService<any> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/auth'
  }

  signUp(item: any){
    return this.http.post<any>(`${this.resourcePath()}/sign-up`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  signIn(item: any): Observable<any> {
    return this.http.post<any>(`${this.resourcePath()}/sign-in`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
