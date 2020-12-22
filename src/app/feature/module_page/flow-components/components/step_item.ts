import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "scripts/node_modules/rxjs";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { TaskService } from "src/app/shared/services/task/task.service";

@Component({
  selector: "module-list-flow-step-item",
  template: `<div
    class="step-item-container"
    [attr.data-locked]="isLocked"
    [attr.data-completed]="isCompleted"
  >
    <div class="step-item-checkbox">
      <ion-icon *ngIf="isCompleted" name="checkmark-outline"></ion-icon>
      <ion-icon *ngIf="!isCompleted && !isLocked" name=""></ion-icon>
      <ion-icon *ngIf="!isCompleted && isLocked" name="lock-closed-outline"></ion-icon>
    </div>
    <div (click)="handleItemClicked()" class="step-item-button" [attr.data-locked]="isLocked">
      {{ row.text }}
    </div>
  </div>`,
  styleUrls: ["./flow-components-common.scss", "./step_item.scss"],
})
export class StepItemFlowComponent implements OnInit, OnDestroy {
  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;
  isLocked: boolean = true;
  isCompleted: boolean = false;
  subscription$: Subscription;
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    if (this.row.task_id) {
      this.evaluateTaskMeta(this.row.task_id);
      this._subscribeToRouteChanges();
    }
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  async evaluateTaskMeta(task_id: string) {
    this.isCompleted = await this.taskService.evaluateTaskCompleted(task_id);
    this.isLocked = await this.taskService.evaluateTasklocked(task_id);
  }

  /** When a row is clicked inform the task service to carry out any associated tasks
   * Note - we are not bubbling up output events as there is a lot of nesting levels to go through
   * and harder to use with dynamic injected components
   */
  async handleItemClicked() {
    if (this.row.task_id) {
      await this.taskService.startTask(this.row.task_id);
    }
  }

  /**
   * Due to the way ionic implements angular's router and some bugs/quirks with how
   * navigation is handled, the component isn't always destroyed when launching an
   * action that navigates to a new flow. As a result the ngOnInit logic might not be
   * run to refresh data if returning to the page that hosts this component after
   * completing a flow (and hence the data becomes outdated)
   *
   * As a rough workaround, subscribe to the router to watch for navigation events,
   * and refresh the data whenever the page hosting this component is navigated back to
   *
   * Alternate workarounds would be to use the IonViewDidEnter lifecycle hook in the parent
   * page and passing info down to prompt refresh, or possibly better hooking into ngZone.run
   * methods (although have tried and still tempermental, usually works for first nav event
   * but not subsequent)
   */
  private _subscribeToRouteChanges() {
    const currentUrl = this.router.url;
    this.subscription$ = this.router.events.subscribe(async (e) => {
      if (e instanceof NavigationEnd && e.url === currentUrl) {
        await this.evaluateTaskMeta(this.row.task_id);
        // TODO - check if there are any pending writes also (e.g. tips page just destroyed)
        // might be handled with better overall binding system so non-priority
      }
    });
  }
}
