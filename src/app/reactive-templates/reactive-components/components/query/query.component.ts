import { Component, inject } from "@angular/core";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import json5 from "json5";
import { firstValueFrom } from "rxjs";
import { IAction, IActionParameter } from "src/app/reactive-templates/services/action.registry";

const parameters = () =>
  defineParameters({
    dataList: new Parameter<string>("data_list", undefined),
  });

@Component({
  selector: "oab-query",
  template: "", // template is not needed for this component
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
  standalone: false,
})
export class QueryComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements IAction
{
  private dynamicDataService = inject(DynamicDataService);

  public async execute(params?: IActionParameter[]): Promise<void> {
    await this.storeValue();
  }

  protected async computeStoredValue(value: any) {
    return await this.executeQuery(value);
  }

  private async executeQuery(value: any): Promise<any[]> {
    try {
      const queryString = `{${value as string}}`;
      const mangoQuery = value ? json5.parse(queryString) : {};
      const dataList = this.params.dataList.value();

      if (!dataList) {
        return Promise.resolve([]);
      }

      const query = this.dynamicDataService.query$<any>("data_list", dataList, mangoQuery);

      return await firstValueFrom(query);
    } catch (error) {
      console.error(`Failed to parse query for ${this.name()}:`, error);
      return Promise.resolve([]);
    }
  }
}
