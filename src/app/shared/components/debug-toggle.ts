import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "plh-debug-toggle",
  template: ` <div
    class="debug-toggle-container"
    [attr.data-enabled]="debugMode"
    *ngIf="showDebugToggle"
  >
    <ion-icon name="bug-outline"></ion-icon>
    <ion-toggle
      class="debug-toggle"
      #debugToggle
      (ionChange)="setDebugMode(debugToggle.checked)"
      [checked]="debugMode"
    ></ion-toggle>
  </div>`,
  styles: [
    `
      .debug-toggle {
        padding-inline: 8px;
        --background: rgba(255, 255, 255, 0.8);
        --handle-background: white;
        --background-checked: var(--ion-color-secondary);
        --handle-background-checked: white;
      }
      .debug-toggle-container {
        display: flex;
        align-items: center;
      }
      .debug-toggle-container {
        margin-left: auto;
        opacity: 0.8;
      }
      .debug-toggle-container[data-enabled="true"] {
        opacity: 1;
      }
    `,
  ],
})
export class PLHDebugToggleComponent implements OnInit, OnDestroy {
  debugMode = false;
  showDebugToggle = true;
  componentDestroyed$ = new Subject();
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscribeToQueryParamChanges();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  public setDebugMode(debugMode: boolean) {
    this.debugMode = debugMode;
    const queryParams: IQueryParams = { debugMode: debugMode ? "true" : null };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }
  private subscribeToQueryParamChanges() {
    this.route.queryParams
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(async (params: any) => {
        this.debugMode = params.debugMode ? true : false;
      });
  }
}

interface IQueryParams {
  debugMode?: "true";
}
