import { Component, computed, effect, signal, viewChild, ViewChild } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes } from "packages/data-models";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort, MatSortable, MatSortModule } from "@angular/material/sort";
import { uniqueObjectArrayKeys } from "packages/shared/src/utils/object-utils";
import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import { IonicModule } from "@ionic/angular";
import { parseBoolean } from "src/app/shared/utils";

interface IAuthorParams {
  /** Ordered list of columns to display. Default display all columns */
  display_columns?: string;
  show_search?: string;
  sort_default?: string;
}

/** @ignore */
interface ITableParams {
  displayColumns: string[];
  showSearch: boolean;
  sortDefault?: MatSortable;
}

@Component({
  selector: "plh-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  imports: [ExperimentalScrollingModule, IonicModule, MatSortModule, MatTableModule],
})
export class TmplTableComponent extends TemplateBaseComponent {
  public params = computed(() => this.mapParams(this.parameterList()));

  public columnsToDisplay = signal<string[]>([]);

  public dataSource = signal<MatTableDataSource<any>>(new MatTableDataSource([]));

  private sort = viewChild(MatSort);

  constructor(private appDataService: AppDataService) {
    super();
    // When row value and params have been received prepare data and
    // table options for rendering
    effect(async () => {
      const value = this.value();
      const params = this.params();
      if (params && value) {
        const dataRows = await this.getDataRowsFromValue(value);
        const displayColumns = params.displayColumns || this.inferDisplayColumns(dataRows);
        this.columnsToDisplay.set(displayColumns);
        this.loadData(dataRows);
      }
    });
  }

  public handleRowClick(row) {
    // TODO - add way to trigger action with row reference
  }

  public applyFilter(value: string | number) {
    this.dataSource().filter = `${value}`.trim().toLowerCase();
  }

  private loadData(data: any[] = []) {
    const dataSource = new MatTableDataSource(data);
    dataSource.sort = this.sort();
    if (this.params().sortDefault) {
      dataSource.sort.sort(this.params().sortDefault);
    }
    this.dataSource.set(dataSource);
  }

  /** Map authoring params to component render params */
  private mapParams(authorParams: IAuthorParams): ITableParams {
    return {
      displayColumns: authorParams.display_columns?.split(",").map((v) => v.trim()),
      showSearch: parseBoolean(authorParams.show_search),
      sortDefault: this.parseSortDefault(authorParams.sort_default),
    };
  }

  private async getDataRowsFromValue(dataListName: string) {
    // TODO: handle data passed as @data format, and query dynamic data to return live data (see data-items handling)
    if (typeof dataListName !== "string") {
      console.log("[TABLE COMPONENT] Value must be a data list name string");
      return [];
    }
    const dataList = await this.appDataService.getSheet("data_list", dataListName);
    return dataList?.rows || [];
  }

  /** Iterate over first 20 rows or data and extract any unique column names observed */
  private inferDisplayColumns(data: FlowTypes.Data_listRow[] = []): string[] {
    return uniqueObjectArrayKeys(data, 20);
  }

  /**
   * Convert `sort_default` authoring param to object for use with mat-table sorting.
   * Any named column passed by the author becomes the default sorting column, with a fallback
   * to initial row
   */
  private parseSortDefault(authorSort?: string): MatSortable {
    if (!authorSort) return undefined;
    let [id, dir] = authorSort.split(" ").map((v) => v.trim());
    return { id: id || "id", disableClear: false, start: dir === "desc" ? "desc" : "asc" };
  }
}
