import { FlowTypes } from "packages/data-models";
import { IActionRemoveDataParams } from "src/app/shared/services/dynamic-data/dynamic-data.actions";
import { ISetItemContext } from "src/app/shared/services/dynamic-data/dynamic-data.service";

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
export function updateItemMeta(
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
    // Update any action list set_item args to contain name of current data list and item id
    // and set_items action to include all currently displayed rows
    if (r.action_list) {
      const setItemContext: ISetItemContext = {
        flow_name: dataListName,
        itemDataIDs,
        currentItemId: itemId,
      };
      r.action_list = r.action_list.map((a) => {
        if (a.action_id === "set_item") {
          a.args = [setItemContext];
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
        if (a.action_id === "set_items") {
          console.warn(
            "[Deprecated] set_items should not be used from within an items loop",
            "Use a `set_data` action instead outside of loop"
          );
          // TODO - add a check for @item refs and replace parameter list with correct values
          // for each individual item (default will be just to pick the first)
          a.args = [setItemContext];
        }
        return a;
      });
    }

    // Apply recursively to ensure item children with nested rows (e.g. display groups) also inherit item context
    if (r.rows) {
      r.rows = updateItemMeta(r.rows, itemData, dataListName);
    }

    return r;
  });
}
