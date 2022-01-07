import { Injectable } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { fromEvent } from "rxjs";
import { filter, first, map, switchMap, tap } from "rxjs/operators";
import { ContextMenuComponent } from "./context-menu.component";
import { BehaviorSubject } from "rxjs";
import { Subscription } from "rxjs";
import {
  IContextMenuAction,
  IContextMenuActionHashmap,
  IContextMenuType,
} from "./context-menu.types";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
/**
 * The context menu service tracks interaction with right-click and text-selection actions
 * and presents a custom context menu where required
 * TODO - add mobile long-press (and test on mobile). E.g. via getstureController or hammerjs
 * https://ionicframework.com/docs/utilities/gestures#overview
 * https://levelup.gitconnected.com/making-hammerjs-work-with-angular-9-81d289159320
 */
export class ContextMenuService {
  /** Subscription list for tracking events */
  private eventListeners$: { [context in IContextMenuType]: Subscription } = {
    rightClick: new Subscription(),
    textSelect: new Subscription(),
    longPress: new Subscription(),
  };
  /** Subscribeable list of all registered action handlers */
  private actionHandlers$: {
    [context in IContextMenuType]: BehaviorSubject<IContextMenuActionHashmap>;
  } = {
    rightClick: new BehaviorSubject({}),
    textSelect: new BehaviorSubject({}),
    longPress: new BehaviorSubject({}),
  };

  /** Utility variable to help detect start/end of text selection events */
  private isSelectingText = false;

  constructor(private popoverController: PopoverController) {
    this.addEventListeners();
  }

  /** Add an item to appear in the context menu */
  public registerContextMenuAction(context: IContextMenuType, action: IContextMenuAction) {
    const actions = this.actionHandlers$[context].value;
    actions[action.id] = action;
    this.actionHandlers$[context].next(actions);
  }

  /** Remove an item from the context menu */
  public removeContextMenuAction(context: IContextMenuType, id: string) {
    const actions = this.actionHandlers$[context].value;
    if (actions.hasOwnProperty(id)) {
      delete actions[id];
    }
    this.actionHandlers$[context].next(actions);
  }

  private async showContextMenu(context: IContextMenuType, ev: Event, data: any = {}) {
    // if already open close before reopening
    const existingPopover = await this.popoverController.getTop();
    if (existingPopover) {
      await this.popoverController.dismiss();
    }
    // pass registered action handlers and event as input props to display in the ContextMenuComponent
    const componentProps = {
      actions: Object.values(this.actionHandlers$[context].value),
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
    const eventListeners: {
      [context in IContextMenuType]: Observable<{ ev: PointerEvent; data?: any }>;
    } = {
      // Long-press (TODO)
      longPress: fromEvent(document, "TODO").pipe(map((ev: PointerEvent) => ({ ev }))),
      // Right-click
      rightClick: fromEvent(document, "contextmenu").pipe(map((ev: PointerEvent) => ({ ev }))),
      // Text select
      // Events continously triggered so include additional mapping to detect start/end of selection
      textSelect: fromEvent(document, "selectionchange").pipe(
        filter(() => !this.isSelectingText), // ignore events while waiting for current selection to end
        tap(() => (this.isSelectingText = true)), // trigger variable to ignore events
        switchMap(() => fromEvent(document, "mouseup").pipe(first())), // switch to wait for next mouseup instead of selectionchange
        tap(() => (this.isSelectingText = false)), // trigger variable to resume event listener
        map((ev: PointerEvent) => ({
          ev,
          data: { selectedText: window.getSelection().toString() },
        })), // extract selected text
        filter((v) => (v.data.selectedText ? true : false)) // ignore cases where no text selected
      ),
    };

    // Subscribe to any changes in action handlers. If handlers exist subscribe to correct event and show menu when triggered,
    // if no handlers exist remove any previous event listeners
    for (const [type, actionHandlers$] of Object.entries(this.actionHandlers$)) {
      actionHandlers$.subscribe((handlers) => {
        if (Object.keys(handlers).length === 0) {
          this.eventListeners$[type].unsubscribe();
        } else {
          this.eventListeners$[type] = eventListeners[type].subscribe(async ({ ev, data }) => {
            ev.preventDefault();
            await this.showContextMenu(type as IContextMenuType, ev, data);
          });
        }
      });
    }
  }
}
