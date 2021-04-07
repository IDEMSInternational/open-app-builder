import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes } from "scripts/types";
import { arrayToHashmapArray } from "src/app/shared/utils";
import { TemplatePopupComponent } from "../components/layout/popup";
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
export class TemplateNavService {
  constructor(private modalCtrl: ModalController) {}

  public async handleQueryParamChange(
    params: INavQueryParams,
    container: TemplateContainerComponent
  ) {
    log(`[Query Param Change] - ${container.name}`, { ...params });
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
    if (popup_child && popup_child === name) {
      await this.handlePopupActionsFromChild(params, container);
    }
  }
  /*****************************************************************************************************
   *  Nav Actions
   ****************************************************************************************************/
  public handleNavAction(
    action: FlowTypes.TemplateRowAction,
    container: TemplateContainerComponent
  ) {
    // TODO: Find more elegant way to get current root level template name
    const parentName = location.pathname.replace("/template/", "");
    const [templatename] = action.args;
    const nav_parent_triggered_by = action._triggeredBy;
    const queryParams: INavQueryParams = { nav_parent: parentName, nav_parent_triggered_by };
    return container.router.navigate(["template", templatename], {
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
    const { nav_child_emit, nav_parent_triggered_by, nav_child } = params;
    const { router, template } = container;
    log("[Nav] - Parent", { params, container });
    // remove query param
    const queryParams: INavQueryParams = {
      nav_child_emit: null,
      nav_child: null,
      nav_parent: null,
      nav_parent_triggered_by: null,
    };
    router.navigate([], {
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
        await container.handleActions(triggeredActions, nav_child);
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
    const { route, router } = container;
    const params = route.snapshot.queryParams as INavQueryParams;
    const { nav_parent, popup_parent } = params;
    log("[Nav] - Child", { params, container });
    // only process nav events for child if a nav_parent has been set
    if (nav_parent) {
      // only pass back completed/uncompleted emit actions
      const navExitAction = actions.find(
        (a) => a.action_id === "emit" && ["completed", "uncompleted"].includes(a.args[0])
      );
      const nav_child_emit = navExitAction?.args?.[0] || null;
      const nav_child = nav_child_emit ? container.name : null;
      const queryParams: INavQueryParams = { nav_child_emit, nav_child, nav_parent: null };
      // if we have navigated from a popup we need to return to the popup parent template
      // otherwise return to the template of the element that initiated the navigation
      const navTargetTemplate = popup_parent || nav_parent;
      router.navigate(["../", navTargetTemplate], {
        relativeTo: route,
        queryParams,
        replaceUrl: true,
        queryParamsHandling: "merge",
      });
    }
  }

  /*****************************************************************************************************
   *  Popup Actions
   ****************************************************************************************************/
  public async handlePopupAction(
    action: FlowTypes.TemplateRowAction,
    container: TemplateContainerComponent
  ) {
    const { router, name } = container;
    const templatename = action.args[0];
    // simply set the query params which will be handled in method below so that
    // opening can also be handled following navigation or on refresh
    const queryParams: INavQueryParams = {
      popup_child: templatename,
      popup_parent: name,
      popup_parent_triggered_by: action._triggeredBy,
    };
    router.navigate([], { queryParams, replaceUrl: true, queryParamsHandling: "merge" });
  }

  private async handlePopupActionsFromChild(
    params: INavQueryParams,
    container: TemplateContainerComponent
  ) {
    log("[Popup] - other", { params, container });
  }

  private async handlePopupActionsFromParent(
    params: INavQueryParams,
    container: TemplateContainerComponent
  ) {
    const { popup_child, nav_child_emit, popup_parent_triggered_by } = params;
    const { template } = container;
    const existingPopup = await this.modalCtrl.getTop();
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
          await container.handleActions(emittedActions, popup_child);
          await this.modalCtrl.dismiss(nav_child_emit);
        }
        // if the popup does not have any actions triggered by the nav_emit, leave open if there
        // is a trigger for the alternate completed/uncompleted event (otherwise dismiss)
        // - confusing logic I know!
        else {
          if (!actionsByTrigger["completed"] && !actionsByTrigger["uncompleted"]) {
            await this.modalCtrl.dismiss(nav_child_emit);
          } else {
            // ensure popup visible if previously put behind on navigated template
            existingPopup.classList.remove("hide-popup-on-template");
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
    await childTemplateModal.present();
    const { data } = await childTemplateModal.onDidDismiss();
    log("dismissed", data);
    // clear both popup and query params
    const queryParams: INavQueryParams = {
      popup_child: null,
      popup_parent: null,
      popup_parent_triggered_by: null,
      nav_child_emit: null,
      nav_child: null,
      nav_parent: null,
      nav_parent_triggered_by: null,
    };
    const { router } = container;
    router.navigate([], { queryParams, replaceUrl: true, queryParamsHandling: "merge" });
  }

  /** Popups persist nav operations, so also need to handle from top-level templates that are not the parent */
  private async handlePopupActionsFromOther(
    params: INavQueryParams,
    container: TemplateContainerComponent
  ) {
    // Hide any open popup that was trigggered on a previous page prior to navigation
    const existingPopup = await this.modalCtrl.getTop();
    if (existingPopup) {
      existingPopup.classList.add("hide-popup-on-template");
    } else {
      this.createPopupAndWaitForDismiss(params.popup_child, container);
    }
  }

  private async createChildPopupModal(popup_child: string, container: TemplateContainerComponent) {
    const childContainerProps: ITemplateContainerProps = {
      // make the popup share the same name as the container so that nav events return to parent container page
      name: popup_child,
      templatename: popup_child,
      parent: container,
    };
    return this.modalCtrl.create({
      component: TemplatePopupComponent,
      componentProps: childContainerProps,
      // update to this styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "template-popup-modal",
      showBackdrop: false,
    });
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
