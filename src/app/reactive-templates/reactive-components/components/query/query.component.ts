import { Component, inject } from "@angular/core";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import json5 from "json5";
import { firstValueFrom } from "rxjs";

const parameters = () =>
  defineParameters({
    dataList: new Parameter("data_list", ""),
  });

@Component({
  selector: "oab-query",
  template: "", // template is not needed for this component
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class QueryComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  private dynamicDataService = inject(DynamicDataService);

  protected async computeStoredValue(value: any) {
    try {
      const queryString = `{${value as string}}`;
      const mangoQuery = value ? json5.parse(queryString) : {};
      const query = this.dynamicDataService.query$<any>(
        "data_list",
        this.params.dataList.value(),
        mangoQuery
      );

      return await firstValueFrom(query);
    } catch (error) {
      console.error(`Failed to parse query for ${this.name()}:`, error);
      return [];
    }
  }
}
