import { Injectable } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import type { IActionSetDataParams } from "src/app/shared/services/dynamic-data/dynamic-data.actions";
import { TemplateActionRegistry } from "../../services/instance/template-action.registry";
import type { IActionSetItemParams } from "./data-items.component";
import { IItemWithMetadata, ITemplateRowWithDataItemContext } from "./data-items.types";

interface ISetItemAction extends FlowTypes.TemplateRowAction {
  _context: any;
}

/**
 * The data-items action service handles processing `set_item` and `set_items` actions triggered
 * from within item loops. Both of these actions wrap the more general `set_data` action,
 * passing the evaluated data to be updated
 *
 * Unlike most other actions, set_item and set_items are only evaluated once called,
 * storing relevant context variables within the action.
 *
 * This is due to the fact that they can often be somewhat complex to evaluated,
 * with reference either to the item that was used to generate them, or another entirely,
 * alongside other context variables such as locals and fields.
 */
@Injectable({ providedIn: "root" })
export class DataItemsActionService {
  constructor(private actionRegistry: TemplateActionRegistry) {
    this.actionRegistry.register({
      set_item: async (action: ISetItemAction) => {
        console.log("set item action triggered", action);
      },
      set_items: async (action: ISetItemAction) => {
        console.log("set items action triggered", action);
      },
    });
  }

  // TODO - maybe this should also be part of service???
  public mapSetItemActions(row: ITemplateRowWithDataItemContext, evaluator) {
    if (row.rows) {
      row.rows = row.rows.map((r) => this.mapSetItemActions({ ...r, _item: row._item }, evaluator));
    }
    // TODO - extract correct item context and evaluate (?)

    return row;
  }

  /**
   * When calling `set_item` or `set_items` actions from within a data_items loop convert the action to the global
   * `set_data` action, using item context data to specify parameters
   *
   * Additionally add support for updating a different row item either by id or index of rendered items
   */
  private updateItemActions(params: {
    templateRow: ITemplateRowWithDataItemContext;
    itemListRows: FlowTypes.Data_listRow[];
    dataListName: string;
  }) {
    const { templateRow, itemListRows, dataListName } = params;
    console.log("update action list", params);
    // Extract item context associated with template row for use in evaluation
    const { _item } = templateRow;

    // Recursively update action list of any nested rows
    if (templateRow.rows) {
      templateRow.rows = templateRow.rows.map((r) =>
        this.updateItemActions({ templateRow: { ...r, _item }, itemListRows, dataListName })
      );
    }

    // If no action_list included return
    if (!templateRow.action_list) return templateRow;

    // update action list
    templateRow.action_list = templateRow.action_list.map((action) => {
      if (action.action_id === "set_item") {
        return this.convertItemActionToSetDataAction({
          action,
          itemContext: _item,
          itemListRows,
          dataListName,
        });
      }

      // set_data -auto-populate list items to match currently rendered
      // TODO - this method should be deprecated once possible to set_data with query
      if (action.action_id === "set_items") {
        const { _id, _index, ...update } = action.params as IActionSetItemParams;
        return action;
        // TODO - review below
        // return this.convertItemActionToSetDataAction(action, itemListRows, update);
      }
      return action;
    });

    return templateRow;
  }

  /**
   * Items use `set_item` or `set_items` actions to provide update to item rows
   * These actions are just wrappers around the global `set_data` action, but require
   * evaluation before calling as they can refer to different items (by _id or _index)
   * so shouldn't be parsed at the same time the row is parsed
   */
  private convertItemActionToSetDataAction(opts: {
    action: FlowTypes.TemplateRowAction;
    itemContext: IItemWithMetadata;
    itemListRows: FlowTypes.Data_listRow[];
    dataListName: string;
  }) {
    const { action, dataListName, itemContext, itemListRows } = opts;
    const update = this.evaluateItemAction(
      action.params as IActionSetDataParams,
      itemContext,
      itemListRows
    );
    if (!update) {
      return action;
    }

    const actionParams: IActionSetDataParams = {
      _list_id: dataListName,
      _updates: [update],
    };
    action.action_id = "set_data";
    action.params = actionParams;
    return action;
  }

  /**
   * Evaluate set_item params
   *
   * 1. Check if _index of _id provided to switch item context, and update accordingly
   * 2. Evaluate any dynamic data
   *
   * TODO - move to class so that templateRowMap can also be included in evaluation (?)
   * Or pre-evaluate and pass (e.g. local/field also)... should have been extracted earlier
   */
  private evaluateItemAction(
    params: IActionSetItemParams,
    itemContext: IItemWithMetadata,
    itemListRows: FlowTypes.Data_listRow[]
  ) {
    console.log("evaluateItemAction", JSON.parse(JSON.stringify(params)));
    // action can target either specified id, self id, or a named index

    // If setting the target item by index evaluate any dynamic logic and replace with _id
    if (params._index !== undefined) {
      // evaluate the `_index` parameter in case dynamic
      console.log({ itemContext, _index: params._index });
      const evaluator = new AppDataEvaluator({ item: itemContext });
      const parsedIndex = evaluator.evaluate(params._index);
      console.log({ parsedIndex });
      params._id = itemListRows[parsedIndex]?._id;
      delete params._index;
    }

    const targetItem = itemListRows.find((v) => v.id === params._id);
    console.log({ targetItem });
    if (!targetItem) {
      const debugInfo = { itemListRows, params: { ...params, _index_raw: params._index } };
      console.error(`[Data Items] could not find item to update`, debugInfo);
      return undefined;
    }

    // TODO - evaluate here

    return params;
  }
}
