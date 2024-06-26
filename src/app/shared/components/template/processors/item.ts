// NOTE - importing from 'shared' will fail as contains non-browser packages and
// name conflicts with local 'shared' folder. Import full path from packages instead
import { JSEvaluator } from "packages/shared/src/models/jsEvaluator/jsEvaluator";
import { TemplatedData } from "packages/shared/src/models/templatedData/templatedData";

import { shuffleArray } from "src/app/shared/utils";
import { FlowTypes } from "../models";
import { objectToArray } from "../utils";

export class ItemProcessor {
  constructor(
    private dataList: any,
    private parameterList?: any
  ) {}

  public process(templateRows: any) {
    const data = objectToArray(this.dataList);
    const pipedData = this.pipeData(data, this.parameterList);
    const itemRows = this.generateLoopItemRows(templateRows, pipedData);
    const parsedItemRows = this.hackSetNestedName(itemRows);
    // Return both rows for rendering and list of itemData used (post pipe operations)
    return { itemRows: parsedItemRows, itemData: pipedData };
  }

  private pipeData(data: any[], parameter_list: any) {
    if (parameter_list) {
      const operations = Object.entries<any>(parameter_list).map(([name, arg]) => ({
        name,
        arg,
      }));
      return new ItemDataPipe().process(data, operations);
    }
    return data;
  }

  /**
   * Takes a row and list of items to iterate over, creating a new entry for each item with
   * the same row values but a unique evaluation context for populating dynamic variables from the item
   * @param templateRows - list of template rows to iterate over for each item
   * @param itemData - list of items to iterate over
   */
  private generateLoopItemRows(
    templateRows: FlowTypes.TemplateRow[],
    itemData: FlowTypes.Data_listRow[]
  ) {
    const loopItemRows: FlowTypes.TemplateRow[] = [];
    const lastItemIndex = itemData.length - 1;
    for (const [indexKey, item] of Object.entries(itemData)) {
      const _index = Number(indexKey);
      const itemContextMeta: FlowTypes.TemplateRowItemEvalContext = {
        _index,
        _id: item["id"],
        _first: _index === 0,
        _last: _index === lastItemIndex,
      };
      const evalContext: FlowTypes.TemplateRow["_evalContext"] = {
        itemContext: {
          ...item,
          ...itemContextMeta,
          // Assign row dynamic context to allow reference to rendered row metadata, including
          // item index, id, and whether first or last item in list
        },
      };
      for (const r of templateRows) {
        const itemRow = this.setRecursiveRowEvalContext(r, evalContext);
        loopItemRows.push(itemRow);
      }
    }
    return loopItemRows;
  }
  /** Update the evaluation context of a row and recursively any nested rows */
  private setRecursiveRowEvalContext(
    row: FlowTypes.TemplateRow,
    evalContext: FlowTypes.TemplateRow["_evalContext"]
  ) {
    // Workaround destructure for memory allocation issues (applying click action of last item only)
    const { rows, ...rest } = JSON.parse(JSON.stringify(row));
    const rowWithEvalContext: FlowTypes.TemplateRow = { ...rest, _evalContext: evalContext };
    // handle child rows independently to avoid accidental property leaks
    if (row.rows) {
      rowWithEvalContext.rows = [];
      for (const r of row.rows) {
        const recursivelyEvaluated = this.setRecursiveRowEvalContext(r, evalContext);
        rowWithEvalContext.rows.push(recursivelyEvaluated);
      }
    }
    return rowWithEvalContext;
  }

  /**
   * When working with items nested names cannot be parsed by regular parser,
   * so use delimited syntax and parse via newer TemplatedData processor
   * @see https://github.com/IDEMSInternational/parenting-app-ui/issues/1765
   */
  private hackSetNestedName(itemRows: FlowTypes.TemplateRow[]) {
    const parsedRows = [];
    for (const row of itemRows) {
      const parser = new TemplatedData({ context: { item: row._evalContext.itemContext } });
      const { rows, _nested_name } = row;
      row._nested_name = parser.parse(_nested_name);
      if (rows) {
        row.rows = this.hackSetNestedName(rows);
      }
      parsedRows.push(row);
    }
    return parsedRows;
  }
}

/**
 *
 */
class ItemDataPipe {
  public process(data: any[], operations: { name: string; arg?: string }[]) {
    for (const { name, arg } of operations) {
      const operator = this.operations[name];
      if (operator) {
        data = operator(data, arg);
      } else {
        console.error("No item pipeline operation found", name);
      }
    }
    return data;
  }

  private operations = {
    shuffle: (items: any[] = []) => {
      return shuffleArray(items);
    },
    sort: (items: any[] = [], sortField: string) => {
      if (!sortField) return items;
      return items.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
    },
    filter: (items: any[] = [], expression: string) => {
      if (!expression) return;
      return items.filter((item) => {
        // NOTE - expects all non-item condition to be evaluated
        // e.g. `@item.field > @local.some_value` already be evaluated to `this.item.field > "local value"`
        const evaluator = new JSEvaluator();
        const evaluated = evaluator.evaluate(expression, { item });
        return evaluated;
      });
    },
    reverse: (items: any[] = []) => items.reverse(),
    limit: (items: any[] = [], value: string) => {
      if (!value) return items;
      return items.slice(0, Number(value));
    },
  };
}
