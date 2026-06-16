import { Component, inject } from "@angular/core";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { defineAuthorParameterSchema, RowBaseComponent } from "../../row-base.component";
import json5 from "json5";
import { IAction, IActionParameter } from "src/app/reactive-templates/services/action.registry";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  data_list: coerce.string(""),
}));

@Component({
  selector: "oab-update",
  template: "", // template is not needed for this component
  standalone: false,
})
export class UpdateComponent extends RowBaseComponent(AuthorSchema) implements IAction {
  private dynamicDataService = inject(DynamicDataService);

  public async execute(params?: IActionParameter[]): Promise<void> {
    const { dataList } = this.params();

    if (!dataList) {
      console.error(
        `[UpdateComponent] 'data_list' parameter is not set for component ${this.name()}`
      );
      return;
    }

    const value = this.evaluationService.evaluateExpression(this.expression(), this.namespace());

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
