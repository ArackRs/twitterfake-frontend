import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private readonly userFollowSource = new Subject<void>();
  private readonly userPostSource = new Subject<void>();

  public userFollow$ = this.userFollowSource.asObservable();
  public userPost$ = this.userPostSource.asObservable();

  public notifyPost() {
    this.userPostSource.next();
  }

  public notifyFollow(): void {
    this.userFollowSource.next();
  }
}
