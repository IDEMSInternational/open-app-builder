import { Component, computed, effect, Input, OnDestroy, signal } from "@angular/core";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { FlowTypes, ITemplateRowProps } from "../models";
import { TemplateContainerComponent } from "../template-container.component";
import { VariableStore } from "../stores/variable-store";
import { Subscription } from "rxjs";
import type { TemplateComponent } from "../template-component";

@Component({
  template: ``,
  styleUrls: ["./tmpl-components-common.scss"],
})
/**
 * Common methods and data made available to all other components
 * By default it provides input setters, and mapping to local variables
 *
 * Other components can either extend this one, or implement ITemplateRowProps
 * in their own way.
 * Note, if extending the base component access to data is provided by the declared properties,
 * e.g. `_row`
 */
export class TemplateBaseComponent implements ITemplateRowProps, OnDestroy {
  /** @ignore */
  public _row: FlowTypes.TemplateRow;

  // TODO - main row should just be an input.required and child code refactored to avoid set override
  // TODO - could also consider whether setting parent required (is it template row map or services?), possibly merge with row
  // NOTE - the signal does not use an `{equal: isEqual}` optimisation to allow signal update on external
  // field set: https://github.com/IDEMSInternational/open-app-builder/pull/2915
  public rowSignal = signal<FlowTypes.TemplateRow>(undefined);
  public value = computed(() => this.rowSignal()?.value, { equal: isEqual });
  public parameterList = computed(() => this.rowSignal().parameter_list || {}, { equal: isEqual });
  public actionList = computed<FlowTypes.TemplateRowAction[]>(
    () => this.rowSignal().action_list || [],
    {
      equal: isEqual,
    }
  );
  public rows = computed<FlowTypes.TemplateRow[]>(() => this.rowSignal().rows || [], {
    equal: isEqual,
  });

  public variableStore: VariableStore;
  private subscriptions: Subscription[] = [];

  /** Specify whether component should be shown or not. If hidden sets display:none on host component */
  public shouldShow = signal(true);

  /**
   * @ignore
   * specific data used in component rendering
   **/
  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
    // take shallow clone to still be able to detect changes if this._row directly modified
    this.rowSignal.set({ ...row });

    // variable store should be set by now.
    if (this.variableStore) {
      this.value = this.variableStore.asSignal(this._row._nested_name);
    } else {
      console.warn("Variable store not set for TemplateBaseComponent, row:", this._row);
    }

    this.subscribeToDependantVariables();
  }

  /**
   * @deprecated - use `parentContainerComponentRef` instead
   */
  @Input() parent: TemplateContainerComponent;

  @Input() parentContainerComponentRef: TemplateContainerComponent;

  @Input() parentTemplateComponentRef: TemplateComponent;

  constructor() {
    // Handle show/hide override from component (bypasses templating system)
    effect(() => {
      const shouldShow = this.shouldShow();
      const templateComponentRef = this.parentTemplateComponentRef;
      if (templateComponentRef) {
        const templateEl = templateComponentRef.elRef.nativeElement as HTMLDivElement;
        // Set display to "none" when hiding, or use empty string to remove specific override
        templateEl.style.display = shouldShow ? "" : "none";
      }
    });
  }

  /**
   * Whenever actions are triggered handle in the parent template component
   * Actions are grouped by trigger, only emitting specific event handler (e.g. click)
   * @ignore
   */
  triggerActions(trigger: FlowTypes.TemplateRowAction["trigger"] = "click") {
    // TODO - CC 2024-11 is the accordion_section workaround still required?
    if (this._row.disabled && this._row.type !== "accordion_section") {
      console.log("Click action disabled for ", this._row.name);
      return;
    }
    const action_list = this._row.action_list || [];
    const actionsForTrigger = action_list.filter((a) => a.trigger === trigger);
    if (actionsForTrigger.length > 0) {
      return this.parent.handleActions(actionsForTrigger, this._row);
    }
  }

  /**
   * Update the current value of the row by setting a local variable that matches
   * @ignore
   **/
  async setValue(value: any) {
    // HACK - provide optimistic update so that data_items interceptor also can access updated row value
    if (isEqual(this._row.value, value)) return;

    this._row.value = value;
    this.rowSignal.update((v) => ({ ...v, value }));

    const action: FlowTypes.TemplateRowAction = {
      action_id: "set_self",
      args: [this._row._nested_name, value],
      trigger: "click",
    };
    await this.parent.handleActions([action], this._row);
    await this.triggerActions("changed");
  }

  /** @ignore */
  trackByRow = (index: number, row: FlowTypes.TemplateRow) => this.parent.trackByRow(index, row);

  private subscribeToDependantVariables() {
    this.subscribeToParentVariables();
  }

  private subscribeToParentVariables() {
    if (!this.parent || this.parent.row?.type !== "template") return;

    let parentVariable = this.parent.row.rows.find((parentRow) =>
      this._row._nested_name.endsWith(parentRow.name)
    );

    if (!parentVariable) {
      return;
    }

    if (!this.variableStore.has(parentVariable._nested_name)) return;
    const subscription = this.variableStore
      .watch(parentVariable._nested_name)
      .subscribe(async (value) => {
        await this.setValue(value);
      });

    this.subscriptions.push(subscription);
  }

  public ngOnDestroy(): void {
    // Unsubscribe from all variable store subscriptions to prevent memory leaks
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
