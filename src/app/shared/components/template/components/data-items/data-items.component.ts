import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
} from "@angular/core";
import { debounceTime, Subscription } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { FlowTypes } from "../../models";
import { ItemProcessor } from "../../processors/item";
import { TemplateRowService } from "../../services/instance/template-row.service";
import { TemplateVariablesService } from "../../services/template-variables.service";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-data-items",
  templateUrl: "./data-items.component.html",
  styleUrls: ["./data-items.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Data Items are a structural row component that subscribes to a dynamic data list
 * and re-renders child components on change
 *
 * TODO
 * - Would be better if can render children without container (like regular items)
 * - Should be refactored into structural container instead of display component
 * - Could possibly refactor to feature module including services
 */
export class TmplDataItemsComponent extends TemplateBaseComponent {
  public itemRows: FlowTypes.TemplateRow[] = [];

  private dataListName: string;
  private parameterList: Record<string, string>;

  private dataQuery$: Subscription;

  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
    this.dataListName = this.hackGetRawDataListName(row);
    this.parameterList = this.hackGetRawParameterList(row);
    this.subscribeToData();
  }

  constructor(
    private dynamicDataService: DynamicDataService,
    private templateVariablesService: TemplateVariablesService,
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  private async subscribeToData() {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
    if (this.dataListName) {
      await this.dynamicDataService.ready();
      const query = await this.dynamicDataService.query$("data_list", this.dataListName);
      this.dataQuery$ = query.pipe(debounceTime(50)).subscribe(async (data) => {
        await this.renderItems(data, this._row.rows, this.parameterList);
      });
    } else {
      await this.renderItems([], [], {});
    }
  }

  private async renderItems(
    itemDataList: any[],
    rows: FlowTypes.TemplateRow[],
    parameterList: any
  ) {
    const parsedItemDataList = await this.parseDataList(itemDataList);
    const itemRows = new ItemProcessor(parsedItemDataList, parameterList).process(rows);
    const parsedItemRows = await this.hackProcessRows(itemRows);
    const replacedActionRows = this.setActionListMeta(parsedItemRows, parsedItemDataList);
    // TODO - deep diff and only update changed
    this.itemRows = replacedActionRows;
    this.cdr.markForCheck();
  }

  /**
   * Update any action list set_item args to contain name of current data list and item id
   * and set_items action to include all currently displayed rows
   * */
  private setActionListMeta(
    rows: FlowTypes.TemplateRow[],
    dataList: {
      [index: string]: any;
    }
  ) {
    return rows.map((r) => {
      if (r.action_list) {
        r.action_list = r.action_list.map((a) => {
          if (a.action_id === "set_item") {
            a.args = [this.dataListName, r._evalContext.itemContext.id];
          }
          if (a.action_id === "set_items") {
            // TODO - add a check for @item refs and replace parameter list with correct values
            // for each individual item (default will be just to pick the first)
            a.args = [this.dataListName, Object.values(dataList).map((v) => v.id)];
          }
          return a;
        });
      }
      return r;
    });
  }

  /**
   * Ordinarily rows would be processed as part of the regular template processing,
   * however this must be bypassed to allow multiple reprocessing on item updates
   */
  private async hackProcessRows(rows) {
    const processor = new TemplateRowService(this.injector, {
      name: "",
      template: {
        rows,
      },
      row: {
        rows: [],
      },
    } as any);
    await processor.processContainerTemplateRows();
    return processor.renderedRows;
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

  /** Copied from template-row service */
  private hackGetRawParameterList(row: FlowTypes.TemplateRow) {
    const list = row.parameter_list;
    const unparsedFilter = row._dynamicFields?.parameter_list?.filter?.[0].fullExpression;
    if (list && unparsedFilter) {
      list.filter = unparsedFilter;
    }
    return list;
  }
  /** Copied from template-row service */
  private async parseDataList(dataList: { [id: string]: any }) {
    const parsed: { [id: string]: any } = {};
    for (const [listKey, listValue] of Object.entries(dataList)) {
      parsed[listKey] = listValue;
      for (const [itemKey, itemValue] of Object.entries(listValue)) {
        if (typeof itemValue === "string") {
          parsed[listKey][itemKey] = await this.templateVariablesService.evaluateConditionString(
            itemValue
          );
        }
      }
    }
    return parsed;
  }
}
