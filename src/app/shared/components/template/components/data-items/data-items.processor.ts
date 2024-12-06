import { Injector } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { ISetItemContext } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { ItemProcessor } from "../../processors/item";
import { TemplateRowService } from "../../services/instance/template-row.service";
import { TemplateVariablesService } from "../../services/template-variables.service";

export class DataItemProcessor {
  private templateVariablesService = this.injector.get(TemplateVariablesService);

  constructor(
    private dataListName: string,
    private injector: Injector,
    private templateRowMap
  ) {}

  public async renderItems(itemDataList: any[], rows: FlowTypes.TemplateRow[], parameterList: any) {
    const parsedItemDataList = await this.parseDataList(itemDataList);
    const { itemTemplateRows, itemData } = new ItemProcessor(
      Object.values(parsedItemDataList),
      parameterList
    ).process(rows);
    const itemRowsWithMeta = this.setItemMeta(itemTemplateRows, itemData, this.dataListName);

    const parsedItemRows = await this.hackProcessRows(itemRowsWithMeta);
    return parsedItemRows;
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
          if (a.action_id === "set_items") {
            // TODO - add a check for @item refs and replace parameter list with correct values
            // for each individual item (default will be just to pick the first)
            a.args = [setItemContext];
          }
          return a;
        });
      }

      // Apply recursively to ensure item children with nested rows (e.g. display groups) also inherit item context
      if (r.rows) {
        r.rows = this.setItemMeta(r.rows, itemData, dataListName);
      }

      return r;
    });
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
    processor.templateRowMap = JSON.parse(JSON.stringify(this.templateRowMap));
    await processor.processContainerTemplateRows();
    return processor.renderedRows;
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
}
