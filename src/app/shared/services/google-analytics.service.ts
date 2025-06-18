import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {logEvent} from "firebase/analytics";
import {analytics} from "../config/firebase.config";

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(private readonly router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.sendPageView(event.urlAfterRedirects);
    });
  }

  private sendPageView(url: string): void {
    logEvent(analytics, 'page_view', {
      page_location: window.location.href,
      page_path: url
    });
  }
}
