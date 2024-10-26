import { Injectable } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import {
  ITemplatedDataContext,
  TemplatedData,
} from "packages/shared/src/models/templatedData/templatedData";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";

import { TemplateVariablesService } from "../../services/template-variables.service";
import { ItemProcessor } from "../../processors/item";
import { setItemMeta } from "./data-items.utils";
import { IDataItemParameterList } from "./data-items.types";

@Injectable({ providedIn: "root" })
export class DataItemsService {
  constructor(private templateVariablesService: TemplateVariablesService) {}

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
   * and evaluating all dynamic dependencies
   */
  public async generateItemRows(params: {
    templateRows: FlowTypes.TemplateRow[];
    dataListRows: FlowTypes.Data_listRow[];
    dataListName: string;
    parameterList: IDataItemParameterList;
    parentRowMap?: any;
  }) {
    const evaluator = new AppDataEvaluator();

    const { dataListName, parameterList, templateRows, parentRowMap = {} } = params;
    let { dataListRows } = params;

    // Dynamically evaluate any filter operations as these could depend on item or local contexts
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

    // Dynamically evaluate the rest of parameter list operators
    const operatorContext = await this.generateDynamicEvaluationContext(operators, parentRowMap);
    evaluator.setExecutionContext(operatorContext);
    const parsedOperators = evaluator.evaluate(operators);

    // Generate looped item rows for each template row
    const { itemRows, itemData } = new ItemProcessor(dataListRows, parsedOperators).process(
      templateRows
    );

    // TODO - possibly just keep reference to item index now that filter has been already done
    const itemRowsWithMeta = setItemMeta(itemRows, itemData, dataListName);

    // Extract any common context used in all evaluation (e.g. @field, @local)
    const commonRowDynamicContext = await this.generateDynamicEvaluationContext(
      templateRows,
      parentRowMap
    );
    evaluator.setExecutionContext(commonRowDynamicContext);

    // Parse rows with full evaluation of any dynamic context
    // This will include common context extracted previously and individual item context
    const parsedRows: FlowTypes.TemplateRow[] = [];
    for (const { _evalContext, ...row } of itemRowsWithMeta) {
      evaluator.updateExecutionContext({ item: _evalContext.itemContext });
      const evaluated = await evaluator.evaluate(row);
      parsedRows.push(evaluated);
    }

    // TODO - sort action lists
    // // Process action list before rest of row to handle case where action targets a different item context
    // const parsedItemRowsWithActions = itemRowsWithMeta.map((row) =>
    //   updateActionList(row, itemData)
    // );

    return parsedRows;
  }
}
