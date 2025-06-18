import { Injectable } from '@angular/core';
import {ApiBaseService} from "../../../shared/services/api-base.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {Profile} from "../models/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiBaseService<Profile> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/profile'
  }

  public getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getProfileByUsername(username: string | null): Observable<Profile> {
    console.log('Fetching profile by username:', username);
    return this.http.get<Profile>(`${this.resourcePath()}/${username}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
