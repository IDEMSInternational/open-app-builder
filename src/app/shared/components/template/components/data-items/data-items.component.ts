import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnDestroy,
  signal,
} from "@angular/core";
import { debounceTime, Subscription } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { FlowTypes } from "../../models";
import { ItemProcessor } from "../../processors/item";
import { TemplateRowService } from "../../services/instance/template-row.service";
import { TemplateVariablesService } from "../../services/template-variables.service";
import { TemplateBaseComponent } from "../base";
import type { IActionSetDataParamsMeta } from "src/app/shared/services/dynamic-data/dynamic-data.actions";
import { AppStringEvaluator } from "packages/shared/src/models/appStringEvaluator/appStringEvaluator";
import { TemplatedData } from "packages/shared/src/models/templatedData/templatedData";

/** Metadata passed to `set_item` and `set_items` action **/
interface IActionSetItemParamsMeta {
  /**
   * Optional id of single item to update.
   * Default will target current item in `set_item` or all items in `set_items`
   **/
  _id?: string;
  /**
   * Optional index of item to update, relative to rendered rows.
   * Supports `@item` expressions
   * */
  _index?: number | string;
}
/** Full payload can also include arbitrary key-value pairs (omitted for type-checking) */
export type IActionSetItemParams = IActionSetItemParamsMeta & Record<string, any>;

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
 * TODO
 * - Would be better if can render children without container (like regular items)
 * - Should be refactored into structural container instead of display component
 * - Could possibly refactor to feature module including services
 */
export class TmplDataItemsComponent extends TemplateBaseComponent implements OnDestroy {
  public itemRows = signal<FlowTypes.TemplateRow[]>([]);

  private dataListName: string;
  private parameterList: Record<string, string>;
  private dataQuery$: Subscription;

  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
    this.dataListName = this.hackGetRawDataListName(row);
    this.parameterList = row.parameter_list;
    this.subscribeToData();
  }

  constructor(
    private dynamicDataService: DynamicDataService,
    private templateVariablesService: TemplateVariablesService,
    private injector: Injector
  ) {
    super();
  }

  private async subscribeToData() {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
    if (this.dataListName) {
      await this.dynamicDataService.ready();
      const query = await this.dynamicDataService.query$("data_list", this.dataListName);
      this.dataQuery$ = query.pipe(debounceTime(50)).subscribe(async (data) => {
        await this.renderItems(data, this._row.rows, this.parameterList);
      });
    } else {
      await this.renderItems([], [], {});
    }
  }

  private async renderItems(
    itemDataList: any[],
    rows: FlowTypes.TemplateRow[],
    parameterList?: any
  ) {
    const parsedItemDataList = await this.parseDataList(itemDataList);
    const { itemRows, itemData } = new ItemProcessor(parsedItemDataList, parameterList).process(
      rows
    );
    const itemRowsWithMeta = this.setItemMeta(itemRows, itemData, this.dataListName);

    // Process action list before rest of row to handle case where action targets a different item context
    const parsedItemRowsWithActions = itemRowsWithMeta.map((r) => {
      if (r.action_list) {
        r.action_list = this.updateActionList(r, itemData);
      }
      return r;
    });

    // Parse rows fully, including item, local, field or any other context variables
    const parsedItemRows = await this.hackProcessRows(parsedItemRowsWithActions);

    this.itemRows.set(parsedItemRows);
  }

  /**
   * Update item dynamic evaluation context and action lists to include relevant item data.
   * @param templateRows List of template rows generated from itemData by item processor
   * @param itemData List of original item data used to create item rows (post operations such as filter/sort)
   * @param dataListName The name of the source data list (i.e. this.dataListName, extracted for ease of testing)
   * */
  private setItemMeta(
    templateRows: FlowTypes.TemplateRow[],
    itemData: FlowTypes.Data_listRow[],
    dataListName: string
  ) {
    const lastItemIndex = itemData.length - 1;
    const itemDataIDs = itemData.map((item) => item.id);
    // Reassign metadata fields previously assigned by item as rendered row count may have changed
    return templateRows.map((r) => {
      const itemId = r._evalContext.itemContext._id;
      // Map the row item context to the original list of items rendered to know position in item list.
      const itemIndex = itemDataIDs.indexOf(itemId);
      // Update metadata fields as _first, _last and index may have changed based on dynamic updates
      r._evalContext.itemContext = {
        ...r._evalContext.itemContext,
        _index: itemIndex,
        _first: itemIndex === 0,
        _last: itemIndex === lastItemIndex,
      };

      // Apply recursively to ensure item children with nested rows (e.g. display groups) also inherit item context
      if (r.rows) {
        r.rows = this.setItemMeta(r.rows, itemData, dataListName);
      }
      return r;
    });
  }

  /**
   * When calling `set_item` or `set_items` actions from within a data_items loop convert the action to the global
   * `set_data` action, using item context data to specify parameters
   *
   * Additionally add support for updating a different row item either by id or index of rendered items
   */
  private updateActionList(row: FlowTypes.TemplateRow, itemData: FlowTypes.Data_listRow[]) {
    return row.action_list.map((a) => {
      if (a.action_id === "set_item") {
        const { _id, _index, ...update } = a.params as IActionSetItemParams;
        // action can target either specified id, self id, or a named index
        let targetItem = row._evalContext.itemContext;
        if (_id) {
          targetItem = itemData.find((v) => v.id === _id);
        }
        if (_index) {
          // update parameter index in case defined dynamicaly
          a.params._index = this.evaluateItemExpression(row._evalContext.itemContext, _index);
          targetItem = itemData[a.params._index];
        }
        if (!targetItem) {
          const debugInfo = { itemData, params: a.params };
          console.error(`[Data Items] could not find item to update`, debugInfo);
          return a;
        }
        return this.convertItemActionToSetDataAction(a, [targetItem], update);
      }

      // set_data -auto-populate list items to match currently rendered
      // TODO - this method should be deprecated once possible to set_data with query
      if (a.action_id === "set_items") {
        const { _id, _index, ...update } = a.params as IActionSetItemParams;
        return this.convertItemActionToSetDataAction(a, itemData, update);
      }
      return a;
    });
  }

  /**
   * Items use `set_item` or `set_items` actions to provide update to item rows
   * These actions are just wrappers around the global `set_data` action, but require
   * evaluation before calling as they can refer to different items (by _id or _index)
   * so shouldn't be parsed at the same time the row is parsed
   */
  private convertItemActionToSetDataAction(
    action: FlowTypes.TemplateRowAction,
    items: FlowTypes.Data_listRow[],
    update: Record<string, any>
  ) {
    // check if update contains any `@item` self references so that these can be evaluated as required
    const contextVariables = new TemplatedData().listContextVariables(update, ["item"]);
    const _updates = items.map((item) => {
      if (contextVariables.item) {
        const evaluated = this.evaluateItemExpression(item, update);
        return { ...evaluated, id: item.id };
      } else {
        return { ...update, id: item.id };
      }
    });
    const _items: IActionSetDataParamsMeta = {
      _list_id: this.dataListName,
      _updates,
    };
    action.action_id = "set_data";
    action.params = _items;
    return action;
  }

  /** Evaluate data that includes `@item` expressions, such as `@item.number + 1` **/
  private evaluateItemExpression(item: FlowTypes.TemplateRowItemEvalContext, data: any) {
    return new AppStringEvaluator({ item }).evaluate(data);
  }

  /**
   * Ordinarily rows would be processed as part of the regular template processing,
   * however this must be bypassed to allow multiple reprocessing on item updates
   */
  private async hackProcessRows(rows: FlowTypes.TemplateRow[]) {
    const processor = new TemplateRowService(this.injector, {
      name: "",
      template: {
        rows,
      },
      row: {
        rows: [],
      },
    } as any);
    // HACK - still want to be able to use localContext from parent rows so copy to child processor
    processor.templateRowMap = JSON.parse(
      JSON.stringify(this.parent.templateRowService.templateRowMap)
    );
    await processor.processContainerTemplateRows();
    return processor.renderedRows;
  }

  /**
   * If datalist referenced as @data.some_list it will already be parsed, so extract
   * name from raw values.
   * Alternatively any list provided as a string value can be returned directly
   * */
  private hackGetRawDataListName(row: FlowTypes.TemplateRow) {
    if (!row.value) return;
    if (typeof row.value === "string") {
      return row.value;
    }
    // HACK - if list name contains '_list' template.parser will parse as an array instead of string
    if (Array.isArray(row.value)) {
      return row.value[0];
    }
    // Extract raw name in case full datalist object supplied in place of name
    return row._dynamicFields?.value?.[0]?.fieldName;
  }

  /** Copied from template-row service */
  private async parseDataList(dataList: { [id: string]: any }) {
    const parsed: { [id: string]: any } = {};
    for (const [listKey, listValue] of Object.entries(dataList)) {
      parsed[listKey] = listValue;
      for (const [itemKey, itemValue] of Object.entries(listValue)) {
        if (typeof itemValue === "string") {
          parsed[listKey][itemKey] =
            await this.templateVariablesService.evaluateConditionString(itemValue);
        }
      }
    }
    return parsed;
  }

  ngOnDestroy() {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
  }
}
