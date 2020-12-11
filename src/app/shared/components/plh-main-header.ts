import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "plh-main-header",
  template: `<ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start" style="position:absolute">
        <ion-menu-button *ngIf="isHomePage"></ion-menu-button>
        <ion-back-button
          defaultHref="/"
          routerDirection="back"
          [style.display]="isHomePage ? 'none' : 'block'"
          icon="chevron-back-outline"
        ></ion-back-button>
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
    // As component sits outside main ion-router-outlet need to access via firstChild method
    // if wanting to access route params directly (not currently required)
    const HOME_ROUTE = "/module_list";
    this.isHomePage = location.pathname === HOME_ROUTE;
  }
}
