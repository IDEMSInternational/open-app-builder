import { Component, Input } from "@angular/core";
import { ContextMenuService } from "./context-menu.service";
import { IContextMenuAction, IContextMenuActionData } from "./context-menu.types";

@Component({
  selector: "app-context-menu",
  template: `
    <ion-content class="no-padding ">
      <ion-list class="context-menu-content">
        <ion-list-header>Menu</ion-list-header>
        <ion-item
          class="context-menu-button"
          button
          *ngFor="let action of actions"
          (click)="handleActionButtonClick(action)"
          >{{ action.menuButtonText }}</ion-item
        >
      </ion-list>
    </ion-content>
  `,
  styleUrls: ["./context-menu.component.scss"],
})
/** Component rendered when context menu launched (e.g. right-click event). Displays list of buttons
 * for any registered context-menuactions
 */
export class ContextMenuComponent {
  @Input() actions: IContextMenuAction[] = [];
  @Input() event: PointerEvent;
  @Input() data: IContextMenuActionData;
  constructor(public contextMenuService: ContextMenuService) {}

  /** Trigger callbacks of passed action handlers when selected from context menu */
  public handleActionButtonClick(action: IContextMenuAction) {
    return action.actionHandler(this.event, this.data);
  }
}
