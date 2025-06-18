import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "../../../shared/services/api-base.service";
import {catchError, Observable, retry, Subject} from "rxjs";
import {Post} from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService extends ApiBaseService<Post> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/posts'
  }

  public getPostsByUsername(username: string ): Observable<any> {
    return this.http.get<any>(`${this.resourcePath()}/user/${username}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
