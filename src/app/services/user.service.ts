import { Injectable } from '@angular/core';
import {ApiBaseService} from "./api-base.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBaseService<any>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/users'
  }

  getByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.resourcePath()}/${username}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
