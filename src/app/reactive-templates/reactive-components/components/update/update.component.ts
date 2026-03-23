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

  public execute(params?: IActionParameter[]): Promise<void> {
    const dataList = this.params.dataList.value();
    const value = json5.parse(this.value());

    return this.dynamicDataService.upsert("data_list", dataList, value);
  }
}
