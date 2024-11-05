import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { FlowTypes } from "src/app/shared/model";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { arrayToHashmapArray, parseBoolean } from "src/app/shared/utils";
import {
  ITemplatePopupComponentProps,
  TemplatePopupComponent,
} from "../components/layout/popup/popup.component";
import { ITemplateContainerProps } from "../models";
import { TemplateContainerComponent } from "../template-container.component";

// Toggle logs used across full service for debugging purposes (there's quite a few and tedious to comment)
const SHOW_DEBUG_LOGS = false;
const log = SHOW_DEBUG_LOGS ? console.log : () => null;

@Injectable({
  providedIn: "root",
})
/**
 *
 * ...
 */
export class TemplateNavService extends SyncServiceBase {
  constructor(
    private modalCtrl: ModalController,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super("TemplateNav");
  }

  /**
   * Track list of modals created. As we can navigate repeatedly to the same page we want to avoid recreating same modals
   * We also want to retain modal open state following circular navigate (a->b->c->a), so by default we leave modals opened
   * unless specifically closed (e.g. nav triggered from modal)
   */
  private openPopupsByName: {
    [templatename: string]: { modal: HTMLIonModalElement; props: ITemplateContainerProps };
  } = {};

  public async handleQueryParamChange(
    params: INavQueryParams,
    container: TemplateContainerComponent
  ) {
    log(`[Query Param Change] - ${container.name}`, { params, container });
    const { nav_child, nav_parent, popup_child, popup_parent } = params;
    const { parent, name } = container;
    // handle nav delegation
    if (nav_child && !parent && nav_parent === name) {
      await this.handleNavActionsFromParent(params, container);
    }
    // handle popup delegation
    if (popup_child && !parent && popup_parent === name) {
      await this.handlePopupActionsFromParent(params, container);
    }
    if (popup_child && !parent && popup_parent !== name) {
      await this.handlePopupActionsFromOther(params, container);
    }

    // HACK - handle rerender on return
    // TODO - merge with hacks folder on merge
    if (!popup_child && !popup_parent && container.template) {
      // TODO - this could also be handled by having a default nav_resume action that emits force_rerender
      // force rerender on top-most template only
      if (!parent) {
        await container.forceRerender(false);
      }
      // trigger any actions defined for the nav_resume trigger on all templates
      await container.templateActionService.handleActions([
        { action_id: "emit", args: ["nav_resume"], trigger: "nav_resume" },
      ]);
    }
  }
  /*****************************************************************************************************
   *  Nav Actions
   ****************************************************************************************************/
  public async handleNavAction(action: FlowTypes.TemplateRowAction) {
    // TODO: Find more elegant way to get current root level template name
    const parentName = location.pathname.replace("/template/", "");
    const [templatename, key, value] = action.args;
    const nav_parent_triggered_by = action._triggeredBy?.name;
    const queryParams: INavQueryParams = { nav_parent: parentName, nav_parent_triggered_by };
    // handle direct page or template navigation
    const navTarget = templatename.startsWith("/") ? [templatename] : ["template", templatename];

    // If "dismiss_pop_up" is set to true for the go_to action, dismiss the current popup before navigating away
    if (key === "dismiss_pop_up" && parseBoolean(value)) {
      const { popup_child } = this.route.snapshot.queryParams;
      if (popup_child) {
        const popupDismissParams: INavQueryParams = {
          popup_child: null,
          popup_parent: null,
          popup_parent_triggered_by: null,
        };
        // alter route history so that on back-nav popup will not be present
        await this.router.navigate([], {
          relativeTo: this.route,
          queryParams: popupDismissParams,
          queryParamsHandling: "merge",
          replaceUrl: true,
        });
        // Dismiss open popup (without await to allow rest of nav to proceed await)
        this.dismissPopup(popup_child);
      }
    }
    return this.router.navigate(navTarget, {
      queryParams,
      queryParamsHandling: "merge",
    });
  }

  /**
   * Sometimes we navigate from one template to another and lose hiearchy from the stack of rendered templates
   * Query parameters are therefore used to track if one template has been navigated to from another, and any
   * particular actions to carry out on the original template following return
   * @param nav_child_emit given by query parameters, completed/uncompleted emitted from child
   */
  private async handleNavActionsFromParent(
    params: INavQueryParams,
    container: TemplateContainerComponent
  ) {
    const { nav_child_emit, nav_parent_triggered_by } = params;
    const { template } = container;
    log("[Nav] - Parent", { params, container });
    // remove query param
    const queryParams: INavQueryParams = {
      nav_child_emit: null,
      nav_child: null,
      nav_parent: null,
      nav_parent_triggered_by: null,
    };
    this.router.navigate([], {
      queryParams,
      replaceUrl: true,
      queryParamsHandling: "merge",
    });
    // trigger any further actions defined on the nav_parent row that initiated the go_to action,
    // matching the trigger emitted by the nav_child template
    if (nav_child_emit) {
      const triggerRow = template.rows.find((r) => r.name === nav_parent_triggered_by);
      // Note - if triggered from a popup this will be hand
      if (triggerRow) {
        log("trigger row", triggerRow);
        const triggeredActions = triggerRow.action_list.filter((a) => a.trigger === nav_child_emit);
        await container.templateActionService.handleActions(triggeredActions, triggerRow);
        // back history will have changed (2 duplicate pages), so nav back to restore correct back button
        history.back();
      } else {
        log("nav trigger row not found");
      }
    }
  }

  /**
   * If the template was created following a go_to action provide additional query params on action completion
   * to be tracked by parent
   */
  public async handleNavActionsFromChild(
    actions: FlowTypes.TemplateRowAction[],
    container: TemplateContainerComponent
  ) {
    const params = this.route.snapshot.queryParams as INavQueryParams;
    const { nav_parent, popup_parent } = params;
    log("[Nav] - Child", { params, container });
    // only process nav events for child if a nav_parent has been set
    if (nav_parent) {
      // only pass back completed/uncompleted emit actions
      const navExitAction = actions.find(
        (a) => a.action_id === "emit" && ["completed", "uncompleted"].includes(a.args[0])
      );

      /**
       * 2021-04-12 CC - Previous attempt at navigating back with different query params
       * Temporariliy deprecated, pending future implementation
       */
      // const nav_child_emit = navExitAction?.args?.[0] || null;
      // const nav_child = nav_child_emit ? container.name : null;
      // const queryParams: INavQueryParams = { nav_child_emit, nav_child, nav_parent: null };
      // // if we have navigated from a popup we need to return to the popup parent template
      // // otherwise return to the template of the element that initiated the navigation
      // const navTargetTemplate = popup_parent || nav_parent;
      // this.router.navigate(["../template/", navTargetTemplate], {
      //   relativeTo: this.route,
      //   queryParams,
      //   replaceUrl: true,
      //   queryParamsHandling: "merge",
      // });

      /** Current implementation simply navigates back */
      if (navExitAction) {
        this.location.back();
      }
    }
  }

  public handleNavActionExternal(url) {
    window.open(url, "_blank");
  }

  /*****************************************************************************************************
   *  Popup Actions
   ****************************************************************************************************/
  public async handlePopupAction(
    action: FlowTypes.TemplateRowAction,
    container?: TemplateContainerComponent
  ) {
    const templatename = action.args[0];
    // if triggered outside templating system (e.g. via notification action) still enable
    // popup creation and dismiss on nav changes
    if (!container) {
      this.router.events.pipe(first()).subscribe(() => this.dismissPopup(templatename));
      return this.createPopupAndWaitForDismiss(templatename, null);
    }

    const { name } = container;
    // simply set the query params which will be handled in method below so that
    // opening can also be handled following navigation or on refresh
    const queryParams: INavQueryParams = {
      popup_child: templatename,
      popup_parent: name,
      popup_parent_triggered_by: action._triggeredBy?.name || null,
    };
    this.router.navigate([], { queryParams, replaceUrl: true, queryParamsHandling: "merge" });
  }

  private async handlePopupActionsFromParent(
    params: INavQueryParams,
    container: TemplateContainerComponent
  ) {
    const { popup_child, nav_child_emit, popup_parent_triggered_by } = params;
    const { template } = container;
    const existingPopup = this.openPopupsByName[popup_child];
    log("[Popup] - parent", { params, parent: container.name });

    // process any actions triggered by nav from the popup
    if (nav_child_emit) {
      // identify the full action_list of the row that triggered the initial pop_up action
      const triggerRow = template.rows.find((r) => r.name === popup_parent_triggered_by);
      if (triggerRow && existingPopup) {
        const actionsByTrigger = arrayToHashmapArray(triggerRow.action_list || [], "trigger");
        log({ actionsByTrigger, existingPopup, nav_child_emit });
        // process any completed/uncompleted actions as specified
        const emittedActions = actionsByTrigger[nav_child_emit];
        if (emittedActions) {
          await container.templateActionService.handleActions(emittedActions, triggerRow);
          await this.dismissPopup(popup_child, nav_child_emit);
        }
        // if the popup does not have any actions triggered by the nav_emit, leave open if there
        // is a trigger for the alternate completed/uncompleted event (otherwise dismiss)
        // - confusing logic I know!
        else {
          if (!actionsByTrigger["completed"] && !actionsByTrigger["uncompleted"]) {
            await this.dismissPopup(popup_child, nav_child_emit);
          } else {
            // ensure popup visible if previously put behind on navigated template
            existingPopup.modal.classList.remove("hide-popup-on-template");
          }
        }
      }
      // If navigation has ocurred the page history will have a previous item with query params
      // to open the initial popup. Replace it with the current state and navigate back to the
      // duplicate page to keep overall history in order
      // TODO - not working as wanted, get duplicate modals. Will likely have to edit history
      // at earlier part of workflow and use back nav to trigger this state (in nav code)
      // history.replaceState({}, "", location.href);
      // history.back();
    }
    // If no popup already exists, create, present, and react to dismiss
    else {
      await this.createPopupAndWaitForDismiss(popup_child, container);
    }
  }

  private async createPopupAndWaitForDismiss(
    popup_child: string,
    container: TemplateContainerComponent
  ) {
    const childTemplateModal = await this.createChildPopupModal(popup_child, container);
    if (childTemplateModal) {
      await childTemplateModal.present();
      const { data } = await childTemplateModal.onDidDismiss();
      // remove reference to popup (will be auto removed if dismissed programatically, but not by background dismiss)
      if (this.openPopupsByName[popup_child]) {
        delete this.openPopupsByName[popup_child];
      }
      log("dismissed", data);
      // clear any existing popup query params on dismiss
      const queryParams: INavQueryParams = {
        popup_child: null,
        popup_parent: null,
        popup_parent_triggered_by: null,
      };
      this.router.navigate([], { queryParams, replaceUrl: true, queryParamsHandling: "merge" });
    }
  }
  private async dismissPopup(name: string, data: any = undefined) {
    const existingPopup = this.openPopupsByName[name];
    if (existingPopup) {
      await existingPopup.modal.dismiss(data);
      delete this.openPopupsByName[name];
    }
  }

  /** Popups persist nav operations, so also need to handle from top-level templates that are not the parent */
  private async handlePopupActionsFromOther(
    params: INavQueryParams,
    container: TemplateContainerComponent
  ) {
    // Hide any open popup that was trigggered on a previous page prior to navigation (unless new popup)
    const { popup_child } = params;
    const existingPopup = this.openPopupsByName[popup_child];
    if (existingPopup) {
      existingPopup.modal.classList.add("hide-popup-on-template");
    } else {
      this.createPopupAndWaitForDismiss(params.popup_child, container);
    }
  }

  private async createChildPopupModal(popup_child: string, container: TemplateContainerComponent) {
    const childContainerProps: ITemplatePopupComponentProps = {
      // make the popup share the same name as the container so that nav events return to parent container page
      name: popup_child,
      templatename: popup_child,
      parent: container,
      showCloseButton: true,
      dismissOnEmit: true,
    };
    // If trying to recreate a popup that already exists simply mark as visible
    const existingPopup = this.openPopupsByName[popup_child];
    if (existingPopup) {
      existingPopup.modal.classList.remove("hide-popup-on-template");
      return;
    }

    const modal = await this.modalCtrl.create({
      component: TemplatePopupComponent,
      componentProps: { props: childContainerProps },
      id: `popup-${popup_child}`,
      // update to this styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "template-popup-modal",
      showBackdrop: false,
    });
    this.openPopupsByName[popup_child] = { modal, props: childContainerProps };
    return modal;
  }
}

/** When using go_to statements various nav query params are added for maintaining relationships between templates */
export interface INavQueryParams {
  // nav
  nav_child_emit?: string; // when returning from a go_to statement the final emit from the nav child (completed/uncompleted)
  nav_child?: string; // the name of the nav child, for parent reference
  nav_parent?: string; // the name of the nav parent, for child reference
  nav_parent_triggered_by?: string; // the name of the parent row that triggered go_to action
  // popup
  popup_child?: string; //
  popup_parent?: string;
  popup_parent_triggered_by?: string; //
}
