import { ChangeDetectionStrategy, Component, computed, effect } from "@angular/core";
import { FlowTypes } from "../../models";
import { TemplateBaseComponent } from "../base";
import { DataItemsService } from "./data-items.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { switchMap, filter } from "rxjs";

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
      switchMap((row) => this.subscribeToDynamicData(row))
    )
  );

  /** List of actions to trigger on data_change */
  private dataActions = computed(() =>
    this.actionList().filter((a) => a.trigger === "data_changed")
  );

  constructor(private dataItemsService: DataItemsService) {
    super();
    effect(async () => {
      const actions = this.dataActions();
      const itemRows = this.itemRows();
      if (actions.length > 0 && itemRows !== undefined) {
        // TODO - if data_items have child rows the generated itemRows will be looped items
        // Need different method to always pass data_items list and not generated loop
        // (will only work if no child rows defined as fallback returns list rows and not generated)
        await this.hackTriggerDataChangedActions(actions, itemRows);
      }
    });
  }

  /** Trigger a `data_changed` action and evaluate with items list context */
  private async hackTriggerDataChangedActions(
    actions: FlowTypes.TemplateRowAction[] = [],
    itemRows: any[] = []
  ) {
    const evaluatedActions = this.dataItemsService.evaluateDataActions(actions, itemRows);
    await this.parent.handleActions(evaluatedActions, this._row);
  }

  private subscribeToDynamicData(row: FlowTypes.TemplateRow) {
    const { templateRowMap } = this.parent;
    return this.dataItemsService.getItemsObservable(row, templateRowMap);
  }
}
