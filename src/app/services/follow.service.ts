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
    this.resourceEndpoint='/follow'
  }

  getFollowers(userId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}/followers/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getFollowing(userId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}/following/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  follow(followerId: number, followedId: number) {
    return this.http.post<any>(`${this.resourcePath()}/follow`, {followerId, followedId}, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
