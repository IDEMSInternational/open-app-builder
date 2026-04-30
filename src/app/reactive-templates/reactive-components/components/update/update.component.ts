import { Component, inject } from "@angular/core";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import json5 from "json5";
import { IAction, IActionParameter } from "src/app/reactive-templates/services/action.registry";

const parameters = () =>
  defineParameters({
    dataList: new Parameter<string>("data_list", undefined),
  });

@Component({
  selector: "oab-update",
  template: "", // template is not needed for this component
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
  standalone: false,
})
export class UpdateComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements IAction
{
  private dynamicDataService = inject(DynamicDataService);

  public async execute(params?: IActionParameter[]): Promise<void> {
    const dataList = this.params.dataList.value();

    if (!dataList) {
      console.error(
        `[UpdateComponent] 'data_list' parameter is not set for component ${this.name()}`
      );
      return;
    }

    const value = this.evaluationService.evaluateExpression(
      this.expression(),
      this.namespace(),
      this.params.valueType.value()
    );

    try {
      const valueJson = `{${value as string}}`;
      const objValue = json5.parse(valueJson);

      if (!objValue.id) {
        console.error(
          `[UpdateComponent] upsert object must have an 'id' property for component ${this.name()}`
        );
        return;
      }

      await this.dynamicDataService.upsert("data_list", dataList, objValue);
    } catch (error) {
      console.error(`[UpdateComponent] Failed to parse value for component ${this.name()}:`, error);
    }
  }
}
