import { FlowTypes } from "packages/data-models/flowTypes";
import type { IActionSetItemParams } from "./data-items.component";
import { evaluateDynamicDataUpdate } from "../../../../services/dynamic-data/dynamic-data.utils";
import type { IActionSetDataParams } from "src/app/shared/services/dynamic-data/dynamic-data.actions";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";

type IItemWithMetadata = FlowTypes.TemplateRowItemEvalContextMetadata & Record<string, any>;

interface ITemplateRowWithDataItemContext extends FlowTypes.TemplateRow {
  _item: IItemWithMetadata;
}

/**
 * Create a hashmap of item rows, complete with metadata fields `_index`, `_first` and `_last`
 * @param itemRows List of original item data used to create item rows (post operations such as filter/sort)
 * */
export function generateItemMeta(itemRows: FlowTypes.Data_listRow[]) {
  const lastItemIndex = itemRows.length - 1;
  const itemRowsWithMeta: IItemWithMetadata[] = [];
  itemRows.forEach((item, index) => {
    const itemMetadata: FlowTypes.TemplateRowItemEvalContextMetadata = {
      _id: item.id,
      _index: index,
      _first: index === 0,
      _last: index === lastItemIndex,
    };
    itemRowsWithMeta.push({
      ...item,
      ...itemMetadata,
    });
  });
  return itemRowsWithMeta;
}

export function generateLoopItemRows(
  templateRows: FlowTypes.TemplateRow[],
  itemRows: FlowTypes.Data_listRow[]
) {
  const itemTemplateRows: ITemplateRowWithDataItemContext[] = [];
  const itemRowsWithMeta = generateItemMeta(itemRows);
  for (const itemRow of itemRowsWithMeta) {
    for (const templateRow of templateRows) {
      // NOTE - only apply item context to top row as child rows will be evaluated with the same context
      itemTemplateRows.push({ ...templateRow, _item: itemRow });
    }
  }
  //
  return itemTemplateRows;
}

/**
 * When calling `set_item` or `set_items` actions from within a data_items loop convert the action to the global
 * `set_data` action, using item context data to specify parameters
 *
 * Additionally add support for updating a different row item either by id or index of rendered items
 */
export function updateActionList(params: {
  templateRow: FlowTypes.TemplateRow;
  itemListRows: FlowTypes.Data_listRow[];
  dataListName: string;
}) {
  const { templateRow, itemListRows, dataListName } = params;
  console.log("update action list", params);
  //
  if (templateRow.rows) {
    templateRow.rows = templateRow.rows.map((r) =>
      this.updateActionList({ templateRow: r, itemListRows, dataListName })
    );
  }

  //
  if (!templateRow.action_list) return templateRow;

  templateRow.action_list = templateRow.action_list.map((a) => {
    if (a.action_id === "set_item") {
      const setItemParams = a.params as IActionSetItemParams;
      console.log(" setItemParams", JSON.parse(JSON.stringify(setItemParams)));
      // action can target either specified id, self id, or a named index

      // If setting the target item by index evaluate any dynamic logic and replace with _id
      if (setItemParams._index !== undefined) {
        // evaluate the `_index` parameter in case dynamic
        const evaluator = new AppDataEvaluator({ item: templateRow._evalContext.itemContext });
        const parsedIndex = evaluator.evaluate(setItemParams._index);
        console.log({ parsedIndex });
        setItemParams._id = itemListRows[parsedIndex]?._id;
        delete setItemParams._index;
      }

      const targetItem = itemListRows.find((v) => v.id === setItemParams._id);
      console.log({ targetItem });
      if (!targetItem) {
        const debugInfo = { itemListRows, params: { ...params, _index_raw: setItemParams._index } };
        console.error(`[Data Items] could not find item to update`, debugInfo);
        return a;
      }

      a.params = setItemParams;

      return convertItemActionToSetDataAction({
        action: a,
        itemListRows: [targetItem],
        update: a.params,
        dataListName,
      });
    }

    // set_data -auto-populate list items to match currently rendered
    // TODO - this method should be deprecated once possible to set_data with query
    if (a.action_id === "set_items") {
      const { _id, _index, ...update } = a.params as IActionSetItemParams;
      return this.convertItemActionToSetDataAction(a, itemListRows, update);
    }
    return a;
  });

  return templateRow;
}

/**
 * Items use `set_item` or `set_items` actions to provide update to item rows
 * These actions are just wrappers around the global `set_data` action, but require
 * evaluation before calling as they can refer to different items (by _id or _index)
 * so shouldn't be parsed at the same time the row is parsed
 */
export function convertItemActionToSetDataAction(params: {
  action: FlowTypes.TemplateRowAction;
  itemListRows: FlowTypes.Data_listRow[];
  update: Record<string, any>;
  dataListName: string;
}) {
  const { action, itemListRows, update, dataListName } = params;
  // check if update contains any `@item` self references so that these can be evaluated as required
  const _updates = evaluateDynamicDataUpdate(itemListRows, update);

  const actionParams: IActionSetDataParams = {
    _list_id: dataListName,
    _updates,
  };
  action.action_id = "set_data";
  action.params = actionParams;
  return action;
}
