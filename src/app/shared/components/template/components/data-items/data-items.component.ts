import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnDestroy,
} from "@angular/core";
import { debounceTime, Subscription } from "rxjs";
import {
  DynamicDataService,
  ISetItemContext,
} from "src/app/shared/services/dynamic-data/dynamic-data.service";
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
export class TmplDataItemsComponent extends TemplateBaseComponent implements OnDestroy {
  public itemRows: FlowTypes.TemplateRow[] = [];

  private dataListName: string;
  private parameterList: Record<string, string>;

  private dataQuery$: Subscription;

  private templateRowService: TemplateRowService;

  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
    this.dataListName = this.hackGetRawDataListName(row);
    this.parameterList = this.hackGetRawParameterList(row);
    this.subscribeToData();
  }

  constructor(
    private dynamicDataService: DynamicDataService,
    private templateVariablesService: TemplateVariablesService,
    injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    super();
    // HACK - create shell of templateRowService used to process rows
    this.templateRowService = new TemplateRowService(injector, {
      name: "",
      template: {
        rows: [],
      },
      row: {
        rows: [],
      },
    } as any);
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
    const { itemRows, itemData } = new ItemProcessor(parsedItemDataList, parameterList).process(
      rows
    );
    const itemRowsWithMeta = this.setItemMeta(itemRows, itemData);

    const parsedItemRows = await this.hackProcessRows(itemRowsWithMeta);
    // TODO - deep diff and only update changed
    this.itemRows = parsedItemRows;
    this.cdr.markForCheck();
  }

  /**
   * Update item dynamic evaluation context and action lists to include relevant
   * item data
   * @param templateRows List of template rows generated from itemData by item processor
   * @param itemData List of original item data used to create item rows (post operations such as filter/sort)
   * */
  private setItemMeta(templateRows: FlowTypes.TemplateRow[], itemData: FlowTypes.Data_listRow[]) {
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
          flow_name: this.dataListName,
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
      return r;
    });
  }

  /**
   * Ordinarily rows would be processed as part of the regular template processing,
   * however this must be bypassed to allow multiple reprocessing on item updates
   */
  private async hackProcessRows(rows: FlowTypes.TemplateRow[]) {
    this.templateRowService.container.template.rows = rows;

    // HACK - still want to be able to use localContext from parent rows so copy to child processor
    this.templateRowService.templateRowMap = JSON.parse(
      JSON.stringify(this.parent.templateRowService.templateRowMap)
    );
    return this.templateRowService.processContainerTemplateRows();
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
          parsed[listKey][itemKey] =
            await this.templateVariablesService.evaluateConditionString(itemValue);
        }
      }
    }
    return parsed;
  }

  ngOnDestroy() {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
  }
}
