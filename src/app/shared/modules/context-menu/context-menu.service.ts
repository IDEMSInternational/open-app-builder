import { Injectable } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { fromEvent } from "rxjs";
import { first } from "rxjs/operators";
import { ContextMenuComponent } from "./context-menu.component";
import { BehaviorSubject } from "rxjs";
import { Subscription } from "rxjs";
import {
  IContextMenuAction,
  IContextMenuActionHashmap,
  IContextMenuType,
} from "./context-menu.types";

@Injectable({ providedIn: "root" })
/**
 * The context menu service tracks interaction with right-click and text-selection actions
 * and presents a custom context menu where required
 */
export class ContextMenuService {
  /** Subscription list for tracking events */
  private events$: { [context in IContextMenuType]: Subscription } = {
    rightClick: new Subscription(),
    textSelect: new Subscription(),
  };
  /** Subscribeable list of all registered action handlers */
  private actions$: { [context in IContextMenuType]: BehaviorSubject<IContextMenuActionHashmap> } =
    {
      rightClick: new BehaviorSubject({}),
      textSelect: new BehaviorSubject({}),
    };

  /** Utility variable to help detect start/end of text selection events */
  private isSelectingText = false;

  constructor(private popoverController: PopoverController) {
    this.addEventListeners();
  }

  /** Add an item to appear in the context menu */
  public registerContextMenuAction(context: IContextMenuType, action: IContextMenuAction) {
    const actions = this.actions$[context].value;
    actions[action.id] = action;
    this.actions$[context].next(actions);
  }

  /** Remove an item from the context menu */
  public removeContextMenuAction(context: IContextMenuType, id: string) {
    const actions = this.actions$[context].value;
    if (actions.hasOwnProperty(id)) {
      delete actions[id];
    }
    this.actions$[context].next(actions);
  }

  /** Trigger actions following right-click events */
  private async handleRightClickAction(ev: PointerEvent) {
    ev.preventDefault();
    await this.showContextMenu("rightClick", ev);
  }

  /** Trigger actions following text-select events */
  private async handleTextSelectionAction(ev: PointerEvent) {
    ev.preventDefault();
    try {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        this.showContextMenu("textSelect", ev);
      }
    } catch (error) {}
  }

  private async showContextMenu(context: IContextMenuType, ev: Event) {
    // if already open close before reopening
    const existingPopover = await this.popoverController.getTop();
    if (existingPopover) {
      await this.popoverController.dismiss();
    }
    // pass registered action handlers and event as input props to display in the ContextMenuComponent
    const componentProps = {
      actions: Object.values(this.actions$[context].value),
      event: ev,
    };
    const popover = await this.popoverController.create({
      component: ContextMenuComponent,
      cssClass: "context-menu",
      event: ev,
      reference: "event", // create menu from where event triggered
      translucent: true,
      componentProps,
      dismissOnSelect: true,
    });
    await popover.present();
  }

  /**
   * Listen to right click (contextmenu) and text select (selectionchange)
   * events to trigger event handlers
   **/
  private addEventListeners() {
    // Right-click
    this.actions$.rightClick.subscribe((actions) => {
      if (Object.keys(actions).length === 0) {
        this.events$.rightClick.unsubscribe();
      } else {
        this.events$.rightClick = fromEvent(document, "contextmenu").subscribe(
          (ev: PointerEvent) => {
            this.handleRightClickAction(ev);
          }
        );
      }
    });
    // Text select
    // As events are continously triggered during selection add mouseup event listener
    // to determine when selection complete
    this.actions$.textSelect.subscribe((actions) => {
      if (Object.keys(actions).length === 0) {
        this.events$.textSelect.unsubscribe();
      } else {
        this.events$.textSelect = fromEvent(document, "selectionchange").subscribe(() => {
          if (!this.isSelectingText) {
            this.isSelectingText = true;
            const keyupEvent = fromEvent(document, "mouseup");
            keyupEvent.pipe(first()).subscribe((ev: PointerEvent) => {
              this.isSelectingText = false;
              this.handleTextSelectionAction(ev);
            });
          }
        });
      }
    });
  }
}
