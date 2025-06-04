import { ChangeDetectionStrategy, Component, computed, effect } from "@angular/core";
import { FlowTypes } from "../../models";
import { TemplateBaseComponent } from "../base";
import { DataItemsService } from "./data-items.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { switchMap, filter, distinctUntilChanged } from "rxjs";
import { isEqual } from "packages/shared/src/utils/object-utils";

@Component({
  selector: "plh-data-items",
  templateUrl: "./data-items.component.html",
  styleUrls: ["./data-items.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Data Items are a structural row component that subscribes to a dynamic data list
 * and re-renders child components on change
 *
 * - Should be refactored to handle at container level without rendered UI
 */
export class TmplDataItemsComponent extends TemplateBaseComponent {
  // HACK - create signal from combination of signals and observables
  // https://github.com/angular/angular/issues/53519
  public itemRows = toSignal(
    toObservable(this.rowSignal).pipe(
      filter((row) => row !== undefined),
      switchMap((row) => this.subscribeToDynamicData(row)),
      distinctUntilChanged(isEqual)
    )
  );

  constructor(private dataItemsService: DataItemsService) {
    super();
    effect(async () => {
      const itemRows = this.itemRows();
      if (itemRows !== undefined) {
        // TODO - if data_items have child rows the generated itemRows will be looped items
        // Need different method to always pass data_items list and not generated loop
        // (will only work if no child rows defined as fallback returns list rows and not generated)
        await this.hackTriggerDataChangedActions(itemRows);
      }
    });
    effect(() => {
      const { _nested_name } = this.rowSignal();
      this.hackInterceptComponentActions(_nested_name);
    });
  }

  /** Trigger a `data_changed` action and evaluate with items list context */
  private async hackTriggerDataChangedActions(itemRows: any[] = []) {
    const actions = this.actionList().filter((a) => a.trigger === "data_changed");
    if (actions.length > 0) {
      const evaluatedActions = this.dataItemsService.evaluateDataActions(actions, itemRows);
      await this.parent.handleActions(evaluatedActions, this._row);
    }
  }

  private subscribeToDynamicData(row: FlowTypes.TemplateRow) {
    const { templateRowMap } = this.parent;
    return this.dataItemsService.getItemsObservable(row, templateRowMap);
  }

  /**
   * Prevent child components triggering set_self actions that would update the value of a component
   * within the data_items loop. These are not synced with the parent templateRowMap, and instead require
   * the author to explicitly use a set_item action. This applies to any component that internally calls `setValue`
   */
  private hackInterceptComponentActions(_nested_name: string) {
    this.parent.templateActionService.registerActionsInterceptor(_nested_name, (action) => {
      if (action.action_id === "set_self" && action._triggeredBy._evalContext?.item) {
        return undefined;
      }
      return this.dataItemsService.evaluateComponentAction(action);
    });
  }
}
