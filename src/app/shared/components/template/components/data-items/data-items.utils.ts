import type { FlowTypes } from "packages/data-models/flowTypes";
import type { IActionSetItemParams } from "./data-items.component";
import { evaluateDynamicDataUpdate } from "../../../../services/dynamic-data/dynamic-data.utils";
import type { IActionSetDataParams } from "src/app/shared/services/dynamic-data/dynamic-data.actions";

/**
 * When calling `set_item` or `set_items` actions from within a data_items loop convert the action to the global
 * `set_data` action, using item context data to specify parameters
 *
 * Additionally add support for updating a different row item either by id or index of rendered items
 */
export function updateActionList(row: FlowTypes.TemplateRow, itemData: FlowTypes.Data_listRow[]) {
  //
  if (row.rows) {
    row.rows = row.rows.map((r) => this.updateActionList(r, itemData));
  }

  //
  if (!row.action_list) return row;

  row.action_list = row.action_list.map((a) => {
    if (a.action_id === "set_item") {
      const { _id, _index, ...update } = a.params as IActionSetItemParams;
      // action can target either specified id, self id, or a named index
      let targetItem = row._evalContext.itemContext;
      if (_id) {
        targetItem = itemData.find((v) => v.id === _id);
      }
      if (_index !== undefined) {
        // update parameter index in case defined dynamically
        // use the same method used to more generally merge update object to rows (and just extract as needed)

        // TODO - should probalby just use current evaluator

        a.params._index = this.appDataEvaluator.evaluate(a.params._index);
        targetItem = itemData[a.params._index];
      }
      if (!targetItem) {
        const debugInfo = { itemData, params: { ...a.params, _index_raw: _index } };
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

  return row;
}

/**
 * Update item dynamic evaluation context and action lists to include relevant item data.
 * @param templateRows List of template rows generated from itemData by item processor
 * @param itemData List of original item data used to create item rows (post operations such as filter/sort)
 * @param dataListName The name of the source data list (i.e. this.dataListName, extracted for ease of testing)
 * */
export function setItemMeta(
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
 * Items use `set_item` or `set_items` actions to provide update to item rows
 * These actions are just wrappers around the global `set_data` action, but require
 * evaluation before calling as they can refer to different items (by _id or _index)
 * so shouldn't be parsed at the same time the row is parsed
 */
export function convertItemActionToSetDataAction(
  action: FlowTypes.TemplateRowAction,
  items: FlowTypes.Data_listRow[],
  update: Record<string, any>
) {
  // check if update contains any `@item` self references so that these can be evaluated as required
  const _updates = evaluateDynamicDataUpdate(items, update);

  const _items: IActionSetDataParams = {
    _list_id: this.dataListName,
    _updates,
  };
  action.action_id = "set_data";
  action.params = _items;
  return action;
}
