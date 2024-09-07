import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "./api-base.service";
import {catchError, Observable, retry, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FollowService extends ApiBaseService<any> {
  private userFollowedSource = new Subject<void>();

  userFollowed$ = this.userFollowedSource.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/follow';
  }

  public getFollowers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}/followers`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  public getFollowing(): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}/following`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  public follow(followedId: number): Observable<any> {
    return this.http.post(`${this.resourcePath()}/${followedId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  public unFollow(followedId: number): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/unfollow/${followedId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }

  public notifyUserFollowed() {
    this.userFollowedSource.next();
  }
}
