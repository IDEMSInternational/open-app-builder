import { FlowTypes } from "packages/data-models";
import { IActionRemoveDataParams } from "src/app/shared/services/dynamic-data/actions";
import { ISetItemContext } from "src/app/shared/services/dynamic-data/dynamic-data.service";

/** Generate metadata stored with items */
export const generateItemMeta = (
  item: FlowTypes.Data_listRow,
  index: number,
  lastItemIndex: number
): FlowTypes.TemplateRowItemEvalContextMetadata => ({
  _id: item.id,
  _index: index,
  _first: index === 0,
  _last: index === lastItemIndex,
});

/**
 * Update item dynamic evaluation context and action lists to include relevant item data.
 * Additionally handle assigning `set_item` context args
 *
 * By default initial ItemProcessor includes `itemContext` evaluation data, however this
 * must be updated whenever the corresponding item data list changes as properties like
 * `_index`, `_first` or `_last` may have changed
 *
 * @param templateRows List of template rows generated from itemData by item processor
 * @param itemData List of original item data used to create item rows (post operations such as filter/sort)
 * @param dataListName The name of the source data list (i.e. this.dataListName, extracted for ease of testing)
 * */
export function updateItemActionLists(
  r: FlowTypes.TemplateRow,
  dataListName: string,
  itemDataIDs: string[]
) {
  // Reassign metadata fields previously assigned by item as rendered row count may have changed

  const itemId = r._evalContext.item._id;
  // Map the row item context to the original list of items rendered to know position in item list.

  // Update any action list set_item args to contain name of current data list and item id
  // and set_items action to include all currently displayed rows
  if (r.action_list) {
    r.action_list = r.action_list.map((a) => {
      if (a.action_id === "set_item") {
        const context: ISetItemContext = {
          flow_name: dataListName,
          currentItemId: itemId,
          itemDataIDs,
        };
        a.args = [context];
      }
      // re-map remove_item to remove_data action
      // TODO - set_item and set_items should also be remapped
      if (a.action_id === "remove_item") {
        a.action_id = "remove_data";
        const removeDataParams: IActionRemoveDataParams = {
          _id: itemId,
          _list_id: dataListName,
        };
        a.params = removeDataParams;
      }
      // HACK - avoid issues with nested object references
      return JSON.parse(JSON.stringify(a));
    });
  }

  // Apply recursively to ensure item children with nested rows (e.g. display groups) also inherit item context
  // Do not override the item context for rows that create their own item lists (i.e. data_items and items)
  if (r.rows && r.type !== "data_items" && r.type !== "items") {
    r.rows = r.rows.map((childRow) => updateItemActionLists(childRow, dataListName, itemDataIDs));
  }

  return r;
}
