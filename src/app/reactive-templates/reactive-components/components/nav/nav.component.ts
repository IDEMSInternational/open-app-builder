import { Component, inject } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { defineParameters } from "../../parameters";
import { IAction } from "src/app/reactive-templates/services/action.registry";
import { Router } from "@angular/router";

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
  private router = inject(Router);

  public async execute(): Promise<void> {
    const templateName = this.row().value;

    const rows = this.row().rows ?? [];
    const queryParams: any = {};

    for (const row of rows) {
      queryParams[row.name] = this.evaluationService.evaluateExpression(
        row.value,
        this.namespace()
      );
    }

    await this.router.navigate([`/template/${templateName}`], { queryParams });
  }
}
