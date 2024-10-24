import { ChangeDetectionStrategy, Component, effect, OnDestroy, signal } from "@angular/core";
import { debounceTime, Subscription } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { FlowTypes } from "../../models";
import { TemplateBaseComponent } from "../base";
import { DataItemsService } from "./data-items.service";

/** Metadata passed to `set_item` and `set_items` action **/
interface IActionSetItemParamsMeta {
  /**
   * Optional id of single item to update.
   * Default will target current item in `set_item` or all items in `set_items`
   **/
  _id?: string;
  /**
   * Optional index of item to update, relative to rendered rows.
   * Supports `@item` expressions
   * */
  _index?: number | string;
}
/** Full payload can also include arbitrary key-value pairs (omitted for type-checking) */
export type IActionSetItemParams = IActionSetItemParamsMeta & Record<string, any>;

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
  public itemRows = signal<FlowTypes.TemplateRow[]>([]);

  private dataListName: string;
  private dataQuery$: Subscription;

  constructor(
    private service: DataItemsService,
    private dynamicDataService: DynamicDataService
  ) {
    super();
    // Whenever row is set extract any dynamic variables for use in evaluation and
    // setup data list subscribers (if not already set)

    // NOTE - this will fail to catch case where context variables updated (e.g. @local, @field)
    effect(
      async () => {
        const row = this.rowSignal();
        if (row) {
          // setup data subscriptions
          const dataListName = row.value.replace(`@data.`, "");
          if (dataListName !== this.dataListName) {
            this.dataListName = dataListName;
            this.subscribeToData(dataListName);
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  private async subscribeToData(dataListName: string) {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
    if (dataListName) {
      await this.dynamicDataService.ready();
      const query = await this.dynamicDataService.query$("data_list", this.dataListName);
      this.dataQuery$ = query.pipe(debounceTime(50)).subscribe(async (dataListRows) => {
        const { templateRowMap } = this.parent.templateRowService;
        const parsedItemRows = await this.service.generateItemRows({
          dataListRows,
          templateItemsRow: this._row,
          parentRowMap: templateRowMap,
          dataListName: this.dataListName,
        });
        this.itemRows.set(parsedItemRows);
      });
    } else {
      this.itemRows.set([]);
    }
  }

  ngOnDestroy() {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
  }
}
