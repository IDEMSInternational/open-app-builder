import { Injectable } from "@angular/core";
import { FlowTypes } from "scripts/types";
import { TemplateContainerComponent } from "../template-container.component";

@Injectable({
  providedIn: "root",
})
/**
 *
 * Note - currently this does not need to be provided as a service as containers typically still provide their own
 * references when calling functions (as a global service would have incorrect references for route and routers)
 */
export class TemplateNavService {
  public handleGoToAction(
    action: FlowTypes.TemplateRowAction,
    templateContainer: TemplateContainerComponent
  ) {
    const { router, name } = templateContainer;
    const [templatename] = action.args;
    const nav_parent_triggered_by = action._triggeredBy;
    const queryParams: INavQueryParams = { nav_parent: name, nav_parent_triggered_by };
    return router.navigate(["template", templatename], {
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
  public async handleActionsFromParent(
    params: INavQueryParams,
    templateContainer: TemplateContainerComponent
  ) {
    const { nav_child_emit, nav_parent_triggered_by, nav_child } = params;
    // only process nav events for parent if a nav_child has been set
    if (nav_child) {
      const { router, template } = templateContainer;
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
        const triggeredActions = triggerRow.action_list.filter((a) => a.trigger === nav_child_emit);
        await templateContainer.handleActions(triggeredActions, nav_child);
        // back history will have changed (2 duplicate pages), so nav back to restore correct back button
        history.back();
      }
    }
  }

  /**
   * If the template was created following a go_to action provide additional query params on action completion
   * to be tracked by parent
   */
  public async handleNavActionsFromChild(
    actions: FlowTypes.TemplateRowAction[],
    templateContainer: TemplateContainerComponent
  ) {
    const { route, router } = templateContainer;
    const params = route.snapshot.queryParams as INavQueryParams;
    const { nav_parent } = params;
    // only process nav events for child if a nav_parent has been set
    if (nav_parent) {
      // only pass back completed/uncompleted emit actions
      const navExitAction = actions.find(
        (a) => a.action_id === "emit" && ["completed", "uncompleted"].includes(a.args[0])
      );
      const nav_child_emit = navExitAction?.args?.[0] || null;
      const nav_child = nav_child_emit ? templateContainer.name : null;
      const queryParams: INavQueryParams = { nav_child_emit, nav_child, nav_parent: null };
      router.navigate(["../", nav_parent], {
        relativeTo: route,
        queryParams,
        replaceUrl: true,
        queryParamsHandling: "merge",
      });
    }
  }
}

/** When using go_to statements various nav query params are added for maintaining relationships between templates */
export interface INavQueryParams {
  nav_child_emit?: string; // when returning from a go_to statement the final emit from the nav child (completed/uncompleted)
  nav_child?: string; // the name of the nav child, for parent reference
  nav_parent?: string; // the name of the nav parent, for child reference
  nav_parent_triggered_by?: string; // the name of the parent row that triggered go_to action
}
