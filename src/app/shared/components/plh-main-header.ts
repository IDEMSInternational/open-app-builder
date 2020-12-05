import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "plh-main-header",
  template: `<ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/" icon="home"></ion-back-button>
      </ion-buttons>
      <ion-title style="text-align: center">
        <ion-icon src="assets/images/star.svg" style="margin: -1px 8px"></ion-icon>
        <span>{{ title }}</span>
      </ion-title>
      <ion-buttons slot="end">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>`,
})
export class PLHMainHeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = "ParentApp";
  routeChanges$: Subscription;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.routeChanges$ = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.handleRouteChange();
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
    console.log("route change", this.route);
    // As component sits outside main ion-router-outlet need to access via firstChild method
    // const snapshot = this.route.firstChild.snapshot;
    // could do stuff like check for app-routing.module config/data or build
    // breadcrumbs out of children objects
  }
}
