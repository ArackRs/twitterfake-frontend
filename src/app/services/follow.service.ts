import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "./api-base.service";
import {catchError, Observable, retry} from "rxjs";
import {Follow} from "../model/follow";

@Injectable({
  providedIn: 'root'
})
export class FollowService extends ApiBaseService<Follow> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/follow';
  }

  public getFollowersByUserId(userId: number): Observable<Follow[]> {
    return this.http.get<Follow[]>(`${this.resourcePath()}/followers/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  public getFollowingByUserId(userId: number): Observable<Follow[]> {
    console.log('getFollowingByUserId', userId);
    return this.http.get<Follow[]>(`${this.resourcePath()}/following/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public follow(followedId: number): Observable<void> {
    return this.http.post<void>(`${this.resourcePath()}/${followedId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public unFollow(followedId: number): Observable<void> {
    console.log('unfollow', followedId);
    return this.http.delete<void>(`${this.resourcePath()}/unfollow/${followedId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }
}
