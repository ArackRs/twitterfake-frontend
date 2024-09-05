import { Injectable } from '@angular/core';
import {ApiBaseService} from "./api-base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBaseService<any>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/users'
  }
}
