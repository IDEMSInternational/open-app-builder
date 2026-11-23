import { Component, inject } from "@angular/core";
import {
  navParamPrefix,
  ROW_PARAMETERS,
  RowBaseComponent,
  ValueType,
} from "../../row-base.component";
import { defineParameters } from "../../parameters";
import { IAction, IActionParameter } from "src/app/reactive-templates/services/action.registry";
import { NavigationService } from "src/app/reactive-templates/services/navigation-service";

const parameters = () => defineParameters({});

@Component({
  selector: "oab-nav",
  template: "",
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class NavComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements IAction
{
  private readonly navigationService = inject(NavigationService);

  public async execute(params?: IActionParameter[]): Promise<void> {
    const templateName = this.evaluationService.evaluateExpression(
      this.row().value,
      this.namespace(),
      this.params.valueType.value()
    );
    const rows = this.row().rows ?? [];
    const url = "/template/" + templateName;

    await this.navigationService.navigate([url], () => {
      // Only replace destination parameters once navigation has been allowed.
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith(navParamPrefix(url))) {
          sessionStorage.removeItem(key);
        }
      });

      for (const row of rows) {
        const expression = params?.find((p) => p.name === row.name)?.value ?? row.value;
        const value = this.evaluationService.evaluateExpression<string>(
          expression,
          this.namespace(),
          row.parameter_list?.value_type as ValueType
        );

        if (value) {
          sessionStorage.setItem(`${navParamPrefix(url)}${row.name}`, value.toString());
        }
      }
    });
  }
}
