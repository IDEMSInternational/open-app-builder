import { Location } from "@angular/common";
import { Component, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "plh-main-header",
  template: `<ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start" style="position:absolute">
        <ion-menu-button *ngIf="isHomePage"></ion-menu-button>
        <ion-button [style.display]="isHomePage ? 'none' : 'block'" (click)="onBackButtonClick()">
          <ion-icon name="chevron-back-outline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title style="text-align: center">
        <ion-icon src="assets/images/star.svg" style="margin: -1px 8px"></ion-icon>
        <span>{{ title }}</span>
      </ion-title>
    </ion-toolbar>
  </ion-header>`,
})
export class PLHMainHeaderComponent implements OnInit, OnDestroy {
  isHomePage = true;
  @Input() title: string = "ParentApp";
  routeChanges$: Subscription;
  /** track if navigation has been used to handle back button click behaviour */
  hasBackHistory = false;
  constructor(private router: Router, private location: Location) {}
  ngOnInit() {
    this.routeChanges$ = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.handleRouteChange();
      }
      if (e instanceof NavigationStart) {
        this.hasBackHistory = true;
      }
    });
    this.handleRouteChange();
  }
  ngOnDestroy() {
    this.routeChanges$.unsubscribe();
  }

  /**
   * Optional methods that can respond to route changes from within the header component
   * It cannot subscribe to standard router methods as sits outside ion-router-outlet
   */
  handleRouteChange() {
    // As component sits outside main ion-router-outlet need to access via firstChild method
    // if wanting to access route params directly (not currently required)
    const HOME_ROUTE = "/home";
    // track if home page, allowing case where hosted from subdirectory (e.g. our pr preview system)
    this.isHomePage = location.pathname.endsWith(HOME_ROUTE);
  }

  onBackButtonClick() {
    if (this.hasBackHistory) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
