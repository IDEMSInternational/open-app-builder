import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../models";
import { TemplateBaseComponent } from "../base";

@Component({
  template: ``,
  styleUrls: ["../tmpl-components-common.scss"],
})
/**
 * Layout components such as a display_group, nav_group or animated section add a layer between
 * the template container and rendered child rows.
 *
 * Actions are still dispatched to the parent if rendered with reference to the parent container,
 * which may or may not be desired behaviour. E.g. a display_group which is simply showing buttons
 * in a flex-box will want the parent container to handle the button click actions, whereas a
 * nav_group may want to intercept the action to perform actions like changing slides.
 *
 * Action interceptors can be used to handle which actions propogate to the parent container or not
 *
 * @example template (rendering child rows with reference to this parent container)
 * ```
 *  <plh-template-component *ngFor="let childRow of _row.rows; trackBy: trackByRow" [row]="childRow" [parent]="parent"></plh-template-component>
 * ```
 */
export class TemplateLayoutComponent extends TemplateBaseComponent implements OnInit {
  /** specific data used in component rendering */
  @Input() set row(row: FlowTypes.TemplateRow) {
    row.rows = (row.rows || []).map((r) => {
      // r.action_list = this.addRowDefaultActions(r.action_list);
      return r;
    });
    row = this.modifyRowSetter(row);
    this._row = row;
  }

  ngOnInit() {
    this.addParentActionsFilter();
  }

  /**
   * As content can be nested within containers or pages, a general
   * method that scrolls everything scrollable (all parent containers and page content)
   * to the top
   */
  public scrollToTop() {
    let parent = this.parent;
    while (parent) {
      if (parent.elRef) {
        parent.elRef.nativeElement.scrollTop = 0;
      }
      parent = parent.parent;
    }
    const ionContentContainers = document.querySelectorAll("ion-content") || [];
    ionContentContainers.forEach((el) => {
      el.shadowRoot.querySelector(".inner-scroll").scrollTop = 0;
    });
  }

  /**
   * Apply any changes here to be applied the row @Input() set operation
   */
  public modifyRowSetter(row: FlowTypes.TemplateRow) {
    return row;
  }

  /**
   * Add any additional methods or function calls to actions that would otherwise be handled by
   * the template container.
   * @returns `true` or `false` to specify if the action should continue to also
   * be processed by the template container parent (as it is used as a filter)
   */
  public interceptTemplateContainerAction(action: FlowTypes.TemplateRowAction) {
    return true;
  }

  public trackByRow = (index: number, row: FlowTypes.TemplateRow) =>
    this.parent.trackByRow(index, row);

  private addParentActionsFilter() {
    this.parent.templateActionService.handleActionsInterceptor = async (actions) => {
      return actions.filter((action) => {
        const shouldHandleByParent = this.interceptTemplateContainerAction(action);
        // continue to process on parent unless specific return says not to
        return shouldHandleByParent !== false;
      });
    };
  }
}
