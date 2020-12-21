import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "plh-main-header",
  template: `<ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start" style="position:absolute">
        <ion-menu-button *ngIf="isHomePage"></ion-menu-button>
        <ion-icon
          (click)="onBackButtonClick()"
          [style.display]="isHomePage ? 'none' : 'block'"
          name="chevron-back-outline"
        ></ion-icon>
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
  urlsVisited: string[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.routeChanges$ = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.handleRouteChange();
      }
      if (e instanceof NavigationStart) {
        this.urlsVisited.push(e.url);
        console.log("Urls visited ", this.urlsVisited);
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
    const pathNameWithoutPr = location.pathname.replace(/\/[0-9]+\/module_list/g, "/module_list")
    this.isHomePage = pathNameWithoutPr === HOME_ROUTE;
  }

  onBackButtonClick() {
    if (this.urlsVisited.length > 0) {
      history.back();
    } else {
      this.router.navigateByUrl("/module_list");
    }
  }
}
