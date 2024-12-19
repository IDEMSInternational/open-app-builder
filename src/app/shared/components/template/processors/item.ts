import { TemplatedData } from "packages/shared/src/models/templatedData/templatedData";
import { FlowTypes } from "../models";
import { ItemDataPipe } from "./itemPipe";

type IItemEvalContext = FlowTypes.TemplateRowItemEvalContextMetadata;

interface ITemplateRowWithItemContext extends FlowTypes.TemplateRow {
  _evalContext: { itemContext: IItemEvalContext }; // force specific context variables when calculating eval statements (such as loop items)
}

export class ItemProcessor {
  constructor(
    private dataListRows: FlowTypes.Data_listRow[] = [],
    private parameterList: any = {}
  ) {}

  public process(templateRows: any) {
    const pipedData = this.pipeData(this.dataListRows, this.parameterList);
    const itemTemplateRows = this.generateLoopItemRows(templateRows, pipedData);
    const parsedItemTemplatedRows = this.hackSetNestedName(itemTemplateRows);
    // Return both rows for rendering and list of itemData used (post pipe operations)
    return { itemTemplateRows: parsedItemTemplatedRows, itemData: pipedData };
  }

  /** Process all item list operators, such as filter, sort and limit */
  public pipeData(data: any[], parameter_list: any) {
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
    const loopItemRows: ITemplateRowWithItemContext[] = [];
    const lastItemIndex = itemData.length - 1;
    for (const [indexKey, item] of Object.entries(itemData)) {
      const _index = Number(indexKey);
      const itemContextMeta: FlowTypes.TemplateRowItemEvalContext = {
        _index,
        _id: item["id"],
        _first: _index === 0,
        _last: _index === lastItemIndex,
      };
      const evalContext: ITemplateRowWithItemContext["_evalContext"] = {
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
    evalContext: ITemplateRowWithItemContext["_evalContext"]
  ): ITemplateRowWithItemContext {
    // Workaround destructure for memory allocation issues (applying click action of last item only)
    const { rows, ...rest } = JSON.parse(JSON.stringify(row));
    const rowWithEvalContext: ITemplateRowWithItemContext = { ...rest, _evalContext: evalContext };
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
  private hackSetNestedName(itemRows: ITemplateRowWithItemContext[]) {
    const parsedRows = [];
    for (const row of itemRows) {
      const parser = new TemplatedData({ context: { item: row._evalContext.itemContext } });
      const { rows, _nested_name } = row;
      row._nested_name = parser.parse(_nested_name);
      if (rows) {
        row.rows = this.hackSetNestedName(rows as ITemplateRowWithItemContext[]);
      }
      parsedRows.push(row);
    }
    return parsedRows;
  }
}
