import { FlowTypes } from "packages/data-models/flowTypes";
import { IItemWithMetadata, ITemplateRowWithDataItemContext } from "./data-items.types";

/**
 * Update item rows to include metadata fields `_index`, `_first` and `_last`
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

/** Generate repeated template rows generated from an item list */
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
