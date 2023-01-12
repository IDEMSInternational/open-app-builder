import { Component, Injector } from "@angular/core";
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
})
/**
 *
 * TODO
 * - Would be better if can render children without container (like regular items)
 * - Should be refactored into structural container instead of display component
 * - Could possibly refactor to feature module including services
 */
export class TmplDataItemsComponent extends TemplateBaseComponent {
  public itemRows: FlowTypes.TemplateRow[] = [];

  public parent = this as any;

  private dataListName: string;

  constructor(
    private dynamicDataService: DynamicDataService,
    private templateVariablesService: TemplateVariablesService,
    private injector: Injector
  ) {
    super();
  }
  async ngOnInit() {
    // extract raw parameter list
    this.dataListName = this.hackGetRawDataList(this._row);
    if (this.dataListName) {
      const parameterList = this.hackGetRawParameterList(this._row);
      await this.dynamicDataService.ready();
      const query = await this.dynamicDataService.query$("data_list", this.dataListName);
      query.subscribe(async (data) => {
        await this.renderItems(data, this._row.rows, parameterList);
      });
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
    const replacedActionRows = this.hackSetActionArgs(parsedItemRows);
    this.itemRows = replacedActionRows;
  }

  /**  */
  private hackSetActionArgs(rows: FlowTypes.TemplateRow[]) {
    return rows.map((r) => {
      if (r.action_list) {
        r.action_list = r.action_list.map((a) => {
          if (a.action_id === ("set_item" as any)) {
            a.args = [this.dataListName, r._evalContext.itemContext.id];
          }
          return a;
        });
      }
      return r;
    });
  }

  /** */
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

  /**  */
  private hackGetRawDataList(row: FlowTypes.TemplateRow) {
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
