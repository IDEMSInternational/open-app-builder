import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { APP_HEADER_DEFAULTS } from "data-models/constants";
import { Subscription } from "rxjs";

@Component({
  selector: "plh-main-header",
  template: `<ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start" style="position:absolute">
        <ion-menu-button *ngIf="showMenuButton"></ion-menu-button>
        <ion-button
          [style.display]="showBackButton ? 'block' : 'none'"
          (click)="onBackButtonClick()"
        >
          <ion-icon name="chevron-back-outline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title style="text-align: center" routerLink="/">
        <span>{{ title }}</span>
      </ion-title>
      <ion-buttons slot="end"> </ion-buttons>
    </ion-toolbar>
  </ion-header>`,
})
export class PLHMainHeaderComponent implements OnInit, OnDestroy {
  title = APP_HEADER_DEFAULTS.title;
  showMenuButton = false;
  showBackButton = false;

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
    const { should_show_back_button, should_show_menu_button } = APP_HEADER_DEFAULTS;
    this.showBackButton = should_show_back_button(location);
    this.showMenuButton = should_show_menu_button(location);
  }

  onBackButtonClick() {
    if (this.hasBackHistory) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
