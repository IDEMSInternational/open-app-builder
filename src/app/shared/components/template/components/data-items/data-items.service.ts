import { Injectable, Injector } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { debounceTime, of, switchMap, distinctUntilChanged } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { ITemplateRowMap, TemplateRowService } from "../../services/instance/template-row.service";
import { defer } from "rxjs/internal/observable/defer";
import { TemplateVariablesService } from "../../services/template-variables.service";
import { ItemProcessor } from "../../processors/item";
import { updateItemMeta } from "./data-items.utils";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { JSEvaluator } from "packages/shared/src/models/jsEvaluator/jsEvaluator";

@Injectable({ providedIn: "root" })
export class DataItemsService {
  constructor(
    private dynamicDataService: DynamicDataService,
    private injector: Injector,
    private templateVariablesService: TemplateVariablesService
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
              switchMap((data) =>
                defer(async () => {
                  // Parse the retrieved data_list. Use item processor to loop over item data
                  // and templated rows to generate item rows
                  const parsedItemList = await this.hackParseDataList(data);
                  const itemProcessor = new ItemProcessor(parsedItemList, parameter_list);
                  const { itemTemplateRows, itemData } = itemProcessor.process(rows);
                  // if no child rows for data_items loop assume want back raw items
                  if (rows.length === 0) {
                    return itemData;
                  }
                  // otherwise process generated template rows
                  const itemRowsWithMeta = updateItemMeta(itemTemplateRows, itemData, dataListName);
                  const parsedItemRows = await this.hackProcessRows(
                    itemRowsWithMeta,
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

  /**
   * Intercept any actions trigger from child components of a data_items loop to ensure they can correctly
   * manage values which may be bound to the item context, i.e. references to `this.value` or setting own value
   */
  public evaluateComponentActions(
    actions: FlowTypes.TemplateRowAction[],
    _triggeredBy: FlowTypes.TemplateRow
  ) {
    const evaluator = new JSEvaluator();
    return actions
      .filter((action) => {
        if (action.action_id === "set_local") {
          const [nestedName] = action.args;
          // Ignore self-update actions as not easy to reverse-engineer which corresponding item variable to set
          if (nestedName === _triggeredBy?._nested_name) {
            return false;
          }
        }
        return true;
      })
      .map((action) => {
        // Ensure any action params or args that self-reference `this.value` have correct value assigned
        for (const [key, value] of Object.entries(action.params || {})) {
          if (typeof value === "string" && value.includes("this.value")) {
            action.params[key] = evaluator.evaluate(value, _triggeredBy);
          }
        }
        action.args = action.args.map((arg) => {
          if (typeof arg === "string" && arg.includes("this.value")) {
            arg = evaluator.evaluate(arg, _triggeredBy);
          }
          return arg;
        });

        return action;
      });
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
   * except uses arrays instead of hashmaps
   *
   * TODO - this isn't an efficient method for parsing. Data lists should be evaluated in parser
   * and list of variables to replace identified as metadata in similar way to templating
   *
   * TODO - is this even required if the templated rows are also parsed?
   */
  private async hackParseDataList(dataListHashmap: FlowTypes.Data_listRow[]) {
    const parsedHashmap: Record<string, FlowTypes.Data_listRow> = {};
    for (const [listKey, listValue] of Object.entries(dataListHashmap)) {
      parsedHashmap[listKey] = listValue;
      for (const [itemKey, itemValue] of Object.entries(listValue)) {
        if (typeof itemValue === "string") {
          parsedHashmap[listKey][itemKey] =
            await this.templateVariablesService.evaluateConditionString(itemValue);
        }
      }
    }
    return Object.values(parsedHashmap);
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
    processor.templateRowMap = JSON.parse(JSON.stringify(templateRowMap));
    await processor.processContainerTemplateRows();
    return processor.renderedRows();
  }
}
