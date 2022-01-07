import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ContextMenuService } from "./context-menu.service";
import { IContextMenuAction } from "./context-menu.types";

@Component({
  selector: "app-context-menu",
  template: `
    <ion-content class="no-padding">
      <ion-list>
        <ion-list-header>Menu</ion-list-header>
        <ion-item button *ngFor="let action of actions" (click)="handleActionButtonClick(action)">{{
          action.menuButtonText
        }}</ion-item>
        <ion-item lines="none" detail="false" button (click)="popoverController.dismiss()"
          >Close</ion-item
        >
      </ion-list>
    </ion-content>
  `,
})
export class ContextMenuComponent {
  @Input() actions: IContextMenuAction[] = [];
  @Input() event: PointerEvent;
  constructor(
    public popoverController: PopoverController,
    public contextMenuService: ContextMenuService
  ) {}

  /** Trigger callbacks of passed action handlers when selected from context menu */
  public handleActionButtonClick(action: IContextMenuAction) {
    return action.actionHandler(this.event);
  }
}
