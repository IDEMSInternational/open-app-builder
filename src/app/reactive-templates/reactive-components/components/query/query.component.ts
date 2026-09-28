import { Component, inject } from "@angular/core";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
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

  constructor() {
    super();
    this.params.valueType.setValue("script");
  }

  public async execute(params?: IActionParameter[]): Promise<void> {
    await this.storeValue();
  }

  protected async preEvaluation(value: any) {
    if (value === null || value === undefined) {
      return `{}`;
    }

    const cleanValue = String(value).replace(/\n/g, " ");
    return `{${cleanValue}}`;
  }

  protected async postEvaluation(value: any) {
    if (value === null || value === undefined) {
      return value;
    }

    return await this.executeQuery(value);
  }

  private async executeQuery(value: any): Promise<any[]> {
    try {
      const dataList = this.params.dataList.value();

      if (!dataList || dataList === "undefined") {
        return Promise.resolve([]);
      }

      const results = this.dynamicDataService.query$<any>("data_list", dataList, value);

      return await firstValueFrom(results);
    } catch (error) {
      console.error(`Failed to parse query for ${this.name()}:`, error);
      return Promise.resolve([]);
    }
  }
}
