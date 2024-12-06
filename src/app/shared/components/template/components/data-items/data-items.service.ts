import { Injectable, Injector } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { debounceTime, of, switchMap } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { ITemplateRowMap } from "../../services/instance/template-row.service";
import { defer } from "rxjs/internal/observable/defer";
import { DataItemProcessor } from "./data-items.processor";

@Injectable({ providedIn: "root" })
export class DataItemsService {
  constructor(
    private dynamicDataService: DynamicDataService,
    private injector: Injector
  ) {}

  /** Process an input data_items row and generate an observable of generated child item rows */
  public getItemsObservable(dataItemsRow: FlowTypes.TemplateRow, templateRowMap: ITemplateRowMap) {
    const dataListName = this.hackGetRawDataListName(dataItemsRow);
    if (!dataListName) {
      console.warn("[Data Items] no list provided", dataItemsRow);
      return of<FlowTypes.TemplateRow[]>([]);
    }
    const itemProcessor = this.getDataItemsProcessor(dataListName, templateRowMap);
    const { rows = [], parameter_list = {} } = dataItemsRow;

    // Create an observable that subscribes to data changes, debounced to avoid immediate re-processing
    // Use defer to allow async code within observable
    return (
      defer(async () => {
        await this.dynamicDataService.ready();
        const query = await this.dynamicDataService.query$("data_list", dataListName);
        return query.pipe(debounceTime(50));
      })
        // Map the output from the query to a new defer block that handles item processing and
        // Uses inner defer block to allow async processing when outer query emits data
        .pipe(
          switchMap((query) =>
            query.pipe(
              switchMap((data) =>
                defer(async () => {
                  const processed = await itemProcessor.renderItems(data, rows, parameter_list);
                  return processed;
                })
              )
            )
          )
        )
    );
  }

  /** Utility accessor to DataItemsProcessor constructor. Called as method for easier test override */
  private getDataItemsProcessor(dataListName: string, templateRowMap: ITemplateRowMap) {
    return new DataItemProcessor(dataListName, this.injector, templateRowMap);
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
}
