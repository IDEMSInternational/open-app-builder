import { Injectable } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import {
  ITemplatedDataContext,
  TemplatedData,
} from "packages/shared/src/models/templatedData/templatedData";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";

import { TemplateVariablesService } from "../../services/template-variables.service";
import { generateLoopItemRows } from "./data-items.utils";
import { IDataItemParameterList, ITemplateRowWithDataItemContext } from "./data-items.types";
import { ItemDataPipe } from "../../processors/itemPipe";
import { DataItemsActionService } from "./data-items.actions";

@Injectable({ providedIn: "root" })
export class DataItemsService {
  constructor(
    private templateVariablesService: TemplateVariablesService,
    private dataItemsActionService: DataItemsActionService
  ) {}

  /**
   * Given any source of input data extract a list of dynamic variables and evaluate them
   * */
  private async generateDynamicEvaluationContext(data: any, templateRowMap = {}) {
    const rowDynamicPrefixes = ["data", "local", "field", "fields", "global", "campaign"];
    const rowDynamicContext = new TemplatedData().listContextVariables(data, rowDynamicPrefixes);
    const evalContext: ITemplatedDataContext = {};
    for (const [prefix, dynamicContext] of Object.entries(rowDynamicContext)) {
      for (const fieldName of Object.keys(dynamicContext)) {
        evalContext[prefix] ??= {};
        const { parsedValue } = await this.templateVariablesService.getDynamicFieldValue(
          prefix as FlowTypes.IDynamicPrefix,
          fieldName,
          templateRowMap
        );
        evalContext[prefix][fieldName] = parsedValue;
      }
    }
    return evalContext;
  }

  /**
   * Take an input data_items row and corresponding data_list and generate the full
   * set of rows for templating, taking into account any data operations (e.g. sort, filter)
   * and evaluating all dynamic dependencies. This is done in the following stages
   *
   * 1. Take the source item data_list and apply any data operations provided from parameter list.
   * This will be done in a dynamic context to allow for filtering by expression, e.g. @item.number > 2
   *
   * 2. Generate a set of template rows for each items, keeping track of the item context for
   * evaluation in next stages
   *
   * 3. Update any action list calls to set_item or set_items as these are simple wrappers to more general
   * set_data action (where set_item infers default metadata like list_id and item_ids ).
   * Evaluate the action_lists standalone as they may refer to a different item context,
   *
   * e.g. set_item `{_id: @item._index + 1, completed: !item.completed}` would evaluate current item to get
   * target index, but then use that value for completed toggle
   */
  public async generateItemRows(params: {
    templateRows: FlowTypes.TemplateRow[];
    dataListRows: FlowTypes.Data_listRow[];
    dataListName: string;
    parameterList?: IDataItemParameterList;
    parentRowMap?: any;
  }) {
    const evaluator = new AppDataEvaluator();

    const { dataListName, parameterList = {}, templateRows, parentRowMap = {} } = params;
    let { dataListRows } = params;

    // 1a. Dynamically evaluate any filter operations as these could depend on item or local contexts
    const { filter, ...operators } = parameterList;
    if (filter) {
      const filterContext = await this.generateDynamicEvaluationContext(filter, parentRowMap);
      evaluator.setExecutionContext(filterContext);
      dataListRows = dataListRows.filter((item) => {
        filterContext.item = item;
        evaluator.updateExecutionContext({ item });
        return evaluator.evaluate(filter) === true;
      });
    }

    // 1b. Dynamically evaluate the rest of parameter list operators
    const operatorContext = await this.generateDynamicEvaluationContext(operators, parentRowMap);
    evaluator.setExecutionContext(operatorContext);
    const parsedOperators = evaluator.evaluate(operators);

    // 1c. Apply data pipe operations
    const operations = Object.entries<any>(parsedOperators).map(([name, arg]) => ({ name, arg }));
    const itemListRows = new ItemDataPipe().process(dataListRows, operations);

    // 2.Generate rows
    const itemTemplateRows = generateLoopItemRows(templateRows, itemListRows);
    console.log({ itemTemplateRows });

    // 3a. Extract any common context used in all evaluation (e.g. @field, @local)
    const commonRowDynamicContext = await this.generateDynamicEvaluationContext(
      templateRows,
      parentRowMap
    );
    evaluator.setExecutionContext(commonRowDynamicContext);

    // Parse rows with full evaluation of any dynamic context
    // This will include common context extracted previously and individual item context
    const parsedRows: FlowTypes.TemplateRow[] = [];

    for (const row of itemTemplateRows) {
      const { _item } = row;
      evaluator.updateExecutionContext({ item: _item });

      // NOTE - need to evaluate row with item context but not action list
      // TODO - separate into function to allow also parsing row.rows

      // 3c. Evaluate the rest of the row
      const parsedRow = this.evaluateItemRow(row, evaluator);

      console.log("parsedRow", parsedRow);

      // TODO - separately store action context?
      const rowWithUpdatedActionList = this.dataItemsActionService.mapSetItemActions(
        parsedRow,
        evaluator
      );
      console.log("rowWithUpdatedActionList", rowWithUpdatedActionList);

      // 3b. Update action_list separately in case action list refers to a different item via _index or _id property
      // const rowWithUpdatedActionList = this.dataItemsActionService.mapItemActions(row)
      // updateItemActions({
      //   templateRow: row,
      //   itemListRows,
      //   dataListName,
      // });

      parsedRows.push(parsedRow);
    }

    return parsedRows;
  }

  private evaluateItemRow(row: ITemplateRowWithDataItemContext, evaluator: AppDataEvaluator) {
    if (row.rows) {
      row.rows = row.rows.map((r) => this.evaluateItemRow({ ...r, _item: row._item }, evaluator));
    }
    const { action_list, ...rest } = row;
    return { action_list, ...evaluator.evaluate(rest) };
  }
}

// TODO - handle subtle case where using 2 different item contexts in single expression
/**
 
_id: @item._id + 1, completed:!@item.completed

 */
