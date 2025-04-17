import { Injectable, Injector } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { debounceTime, of, switchMap, distinctUntilChanged } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { ITemplateRowMap, TemplateRowService } from "../../services/instance/template-row.service";
import { defer } from "rxjs/internal/observable/defer";
import { TemplateVariablesService } from "../../services/template-variables.service";
import { ItemProcessor } from "../../processors/item";
import { generateItemMeta, updateItemActionLists } from "./data-items.utils";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { JSEvaluator } from "packages/shared/src/models/jsEvaluator/jsEvaluator";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { updateRowPropertyRecursively } from "../../utils";
import { TemplateCalcService } from "../../services/template-calc.service";

@Injectable({ providedIn: "root" })
export class DataItemsService {
  constructor(
    private dynamicDataService: DynamicDataService,
    private injector: Injector,
    private templateVariablesService: TemplateVariablesService,
    private templateTranslateService: TemplateTranslateService,
    private templateCalcService: TemplateCalcService
  ) {}

  /** Process an template data_items row and generate an observable of generated child item rows */
  public getItemsObservable(dataItemsRow: FlowTypes.TemplateRow, templateRowMap: ITemplateRowMap) {
    const dataListName = this.hackGetRawDataListName(dataItemsRow);
    if (!dataListName) {
      console.warn("[Data Items] no list provided", dataItemsRow);
      return of<FlowTypes.TemplateRow[]>([]);
    }
    const { rows = [], parameter_list = {} } = dataItemsRow;

    // Create an observable that subscribes to data changes, debounced to avoid immediate re-processing,
    // re-emitting only on distinct changes. Use defer to allow async code within observable
    return (
      defer(async () => {
        await this.dynamicDataService.ready();
        const query = await this.dynamicDataService.query$("data_list", dataListName);
        return query.pipe(debounceTime(50), distinctUntilChanged(isEqual));
      })
        // Map the output from the query to a new defer block that handles item processing and
        // Uses inner defer block to allow async processing when outer query emits data
        .pipe(
          switchMap((query) =>
            query.pipe(
              switchMap((data: FlowTypes.Data_listRow[]) =>
                defer(async () => {
                  // Parse the retrieved data_list. Use item processor to loop over item data
                  // and templated rows to generate item rows
                  const parsedItemList = await this.hackParseDataList(data);
                  const itemProcessor = new ItemProcessor(parsedItemList, parameter_list);

                  // apply pipe operations to items to handle sort, filter, limit etc.
                  const itemData = itemProcessor.pipeData(parsedItemList, parameter_list);

                  // if no child rows for data_items loop assume want back raw items
                  if (rows.length === 0) {
                    return itemData;
                  }

                  const itemTemplateRows = this.prepareItemRows({
                    items: itemData,
                    rows,
                    dataListName,
                  });

                  const parsedItemRows = await this.hackProcessRows(
                    itemTemplateRows,
                    templateRowMap
                  );
                  return parsedItemRows;
                })
              )
            )
          )
        )
    );
  }

  /**
   * Iterate over item list and child rows, and generate corresponding templated item rows.
   * Includes evaluating local variables generated within the item loop and adding to evalContext
   * used when rendering the templated rows
   */
  private prepareItemRows(config: {
    items: FlowTypes.Data_listRow[];
    rows: FlowTypes.TemplateRow[];
    dataListName: string;
  }) {
    const { items, rows, dataListName } = config;
    const evaluator = new AppDataEvaluator();

    // any set_variable statements within data_items loop will be managed internally as
    // local context variables. This applies by default to any templated rows without a row type
    const templatedRows = rows.filter((r) => r.type !== "set_variable");
    const variableRows = rows.filter((r) => r.type === "set_variable");
    const itemRows: FlowTypes.TemplateRow[] = [];
    const lastItemIndex = items.length - 1;
    const itemDataIds: string[] = items.map((i) => i.id);

    for (const [index, item] of items.entries()) {
      // assign item metadata and store to evalContext
      const _evalContext: FlowTypes.TemplateRowEvalContext = {
        item: { ...item, ...generateItemMeta(item, index, lastItemIndex) },
      };
      // generate a list of local variables within item loop and also store within evalContext
      if (variableRows.length > 0) {
        _evalContext.local = {};
        for (const { name, value } of variableRows) {
          if (typeof value === "string") {
            let evaluated: any;
            // HACK - AppDataEvaluator can't detect or extract `@calc(...)` statements so process manually
            // TODO - add support to extract @calc statements to AppDataEvaluator and provide callable function
            if (value.startsWith("@calc")) {
              evaluated = this.templateCalcService.evaluate(value, _evalContext);
            } else {
              evaluator.setExecutionContext(_evalContext as any);
              evaluated = evaluator.evaluate(value);
            }
            // use base name instead of nested as still unique within item loop context
            _evalContext.local[name] = evaluated;
          }
        }
      }

      // add eval context to all templated rows and recursive child rows
      for (const row of templatedRows) {
        const rowWithRecursiveEvalContext = updateRowPropertyRecursively(row, { _evalContext });
        const rowWithUpdatedActionList = updateItemActionLists(
          rowWithRecursiveEvalContext,
          dataListName,
          itemDataIds
        );
        itemRows.push(rowWithUpdatedActionList);
      }
    }

    return itemRows;
  }

  /**
   * If triggering data_change action args will be evaluated current item data available within `@items` context
   * @param actions List of actions to process
   * @param itemRows List of rows populated by data_items.
   * */
  public evaluateDataActions(
    actions: FlowTypes.TemplateRowAction[],
    items: FlowTypes.Data_listRow[]
  ) {
    const evaluator = new AppDataEvaluator();
    return actions.map((a) => {
      evaluator.setExecutionContext({ items });
      const args = evaluator.evaluate(a.args);
      // create new object to ensure args don't overwrite original
      return { ...a, args };
    });
  }

  /** Evaluate any self-references within triggered action params or args */
  public evaluateComponentAction(action: FlowTypes.TemplateRowAction) {
    const evaluator = new JSEvaluator();
    for (const [key, value] of Object.entries(action.params || {})) {
      if (typeof value === "string" && value.includes("this.value")) {
        action.params[key] = evaluator.evaluate(value, action._triggeredBy);
      }
    }
    action.args = action.args.map((arg) => {
      if (typeof arg === "string" && arg.includes("this.value")) {
        arg = evaluator.evaluate(arg, action._triggeredBy);
      }
      return arg;
    });
    return action;
  }

  /**
   * If datalist referenced as @data.some_list it will already be parsed, so extract
   * name from raw values.
   * Alternatively any list provided as a string value can be returned directly
   * */
  private hackGetRawDataListName(row: FlowTypes.TemplateRow) {
    if (!row.value) return;
    if (typeof row.value === "string") {
      return row.value;
    }
    // HACK - if list name contains '_list' template.parser will parse as an array instead of string
    if (Array.isArray(row.value)) {
      return row.value[0];
    }
    // Extract raw name in case full datalist object supplied in place of name
    return row._dynamicFields?.value?.[0]?.fieldName;
  }

  /**
   * Similar method as templateRowService to partially evaluate any string expressions in data_lists,
   * except uses arrays instead of hashmaps and includes translation
   * (default template processor uses `ensureValueTranslated` method from `template-variables.service`)
   *
   * TODO - this isn't an efficient method for parsing. Data lists should be evaluated in parser
   * and list of variables to replace identified as metadata in similar way to templating.
   */
  private async hackParseDataList(dataListRows: FlowTypes.Data_listRow[]) {
    // Ensure data list rows translated before processing template items
    // It might be possible to avoid repeated translation effort if including translated data_list in query,
    // but would also need better tracking of language change and data updates so not currently optimized.
    const translatedListRows = this.templateTranslateService.translateDataListRows(dataListRows);
    const evaluatedRows: FlowTypes.Data_listRow[] = [];
    for (const row of translatedListRows) {
      for (const [key, value] of Object.entries(row)) {
        if (typeof value === "string") {
          const evaluated = await this.templateVariablesService.evaluateConditionString(value);
          row[key] = evaluated;
        }
      }
      evaluatedRows.push(row);
    }

    return evaluatedRows;
  }

  /**
   * Ordinarily rows would be processed as part of the regular template processing,
   * however this must be bypassed to allow multiple reprocessing on item updates
   */
  private async hackProcessRows(rows: FlowTypes.TemplateRow[], templateRowMap: ITemplateRowMap) {
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
    // TODO - review how best to manage this... is parent data_items row missing out on local context?
    processor.templateRowMap = JSON.parse(JSON.stringify(templateRowMap));
    const templateRowMapValues = Object.fromEntries(
      Object.entries(templateRowMap).map(([key, { value }]) => [key, value])
    );
    processor.templateRowMapValues = templateRowMapValues;

    await processor.processContainerTemplateRows();
    return processor.renderedRows();
  }
}
