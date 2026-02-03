import { Component } from "@angular/core";
import { navParamPrefix, ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { defineParameters } from "../../parameters";
import { IAction, IActionParameter } from "src/app/reactive-templates/services/action.registry";

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
  public async execute(params?: IActionParameter[]): Promise<void> {
    const templateName = this.row().value;
    const rows = this.row().rows ?? [];
    const url = "/template/" + templateName;

    // Clear out any nav params in local session storage that begin with this url
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith(navParamPrefix(url))) {
        sessionStorage.removeItem(key);
      }
    });

    // Store nav parameters in session storage so that they can be picked up by the target template
    for (const row of rows) {
      const value = params?.find((p) => p.name === row.name)?.value ?? row.value;
      sessionStorage.setItem(`${navParamPrefix(url)}${row.name}`, value.toString());
    }

    await this.router.navigate([url]);
  }
}
