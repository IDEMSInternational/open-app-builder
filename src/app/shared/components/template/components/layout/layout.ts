import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes, ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";

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
export class TemplateLayoutComponent implements ITemplateRowProps {
  _row: FlowTypes.TemplateRow;
  /** specific data used in component rendering */
  @Input() set row(row: FlowTypes.TemplateRow) {
    row.rows = (row.rows || []).map((r) => {
      // r.action_list = this.addRowDefaultActions(r.action_list);
      return r;
    });
    row = this.modifyRowSetter(row);
    this._row = row;
  }
  /** reference to parent template container - does not have setter as should remain static */
  @Input() parent: TemplateContainerComponent;
  constructor() {}

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

  public trackByRow = (index: number, row: FlowTypes.TemplateRow) =>
    this.parent.trackByRow(index, row);
}
