import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  OnInit,
  ViewChild,
} from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes } from "packages/data-models";
import { getBooleanParamFromTemplateRow } from "src/app/shared/utils";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

interface ITableParams {
  /** TEMPLATE PARAMETER: show_id. Display the data lists's ID column in the table. Default false */
  showId: boolean;
}

@Component({
  selector: "plh-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TmplTableComponent extends TemplateBaseComponent implements AfterViewInit {
  params = computed(() => this.getParams(this.parameterList()));
  dataRows = computed(() => this.getDataRowsFromValue(this.value()));

  columnsToDisplay = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private appDataService: AppDataService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    effect(async () => {
      const data = (await this.dataRows()) || [];
      this.dataSource = new MatTableDataSource(data);
      this.columnsToDisplay = this.getColumnsToDisplayFromData(data);
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private getParams(authorParams: FlowTypes.TemplateRow["parameter_list"]): ITableParams {
    return {
      showId: getBooleanParamFromTemplateRow(this._row, "show_id", false),
    };
  }

  private async getDataRowsFromValue(dataListName: string) {
    // TODO: handle data passed as @data format (see data-items handling)
    if (typeof dataListName !== "string") {
      console.log("[TABLE COMPONENT] Value must be a data list name string");
      return [];
    }
    const dataList = await this.appDataService.getSheet("data_list", dataListName);
    return dataList?.rows;
  }

  private getColumnsToDisplayFromData(data: FlowTypes.Data_listRow[]): string[] {
    if (!data || !data.length) return [];
    // Infer columns from first data row
    const columnNames = Object.keys(data[0]);
    return this.params().showId
      ? columnNames
      : columnNames.filter((columnName) => columnName !== "id");
  }
}
