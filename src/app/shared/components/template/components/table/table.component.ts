import { ChangeDetectorRef, Component, computed, effect, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes } from "packages/data-models";
import { getBooleanParamFromTemplateRow } from "src/app/shared/utils";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

interface ITableParams {
  /** TEMPLATE PARAMETER: show_id. Display the data lists's ID column in the table. Default false */
  showId: boolean;
}

@Component({
  selector: "plh-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TmplTableComponent extends TemplateBaseComponent {
  params = computed(() => this.getParams(this.parameterList()));
  dataRows = computed(() => this.getDataRowsFromValue(this.value()));

  columnsToDisplay = [];
  dataSource = [];

  constructor(
    private appDataService: AppDataService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    // Mat table requires a data source to be an array, not signal value, so unwrap
    effect(async () => {
      this.dataSource = (await this.dataRows()) || [];
      this.columnsToDisplay = this.getColumnsToDisplayFromData(await this.dataRows());
      this.cdr.detectChanges();
    });
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
