import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "./api-base.service";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FollowService extends ApiBaseService<any> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/follow';
  }

  getFollowers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}/followers`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getFollowing(): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}/following`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  follow(followedId: number): Observable<any> {
    return this.http.post(`${this.resourcePath()}/${followedId}`, null, {...this.httpOptions, responseType: 'text'})
      .pipe(retry(2), catchError(this.handleError));
  }

  unFollow(followedId: number): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/unfollow/${followedId}`, {...this.httpOptions, responseType: 'text'})
      .pipe(retry(2), catchError(this.handleError));

  }
}
