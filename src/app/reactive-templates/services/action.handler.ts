import { inject, Injectable } from "@angular/core";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { ActionRegistry, IActionParameter } from "./action.registry";
import { ActionComponent } from "../reactive-components/components/action/action.component";

interface IActionParameters {
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class ActionHandler {
  private templateActionRegistry = inject(TemplateActionRegistry);
  private actionRegistry = inject(ActionRegistry);

  constructor() {
    this.templateActionRegistry.register({
      action: async (action) => {
        const params = { name: action.args?.[0] } as IActionParameters;

        // Get the name of the action, which might be a reference to another action
        const baseName = action.rawArgs?.[0]?.replace("@local.", "");

        if (params.name) {
          await this.handle(params, baseName);
        } else {
          return console.error("[ACTION] Name parameter not provided to action");
        }
      },
    });
  }

  private async handle(params: IActionParameters, baseName: string) {
    if (!this.actionRegistry.has(params.name)) {
      return console.error(`[ACTION] No action registered with name: ${params.name}`);
    }

    const action = this.actionRegistry.get(params.name);
    let actionParams: IActionParameter[] = [];

    try {
      // if we are accessing a reference action.
      if (baseName !== params.name) {
        const baseAction = this.actionRegistry.get(baseName) as ActionComponent;
        actionParams = baseAction.actionParameters();
      }

      await action.execute(actionParams);
    } catch (error) {
      console.error(`[ACTION] Error executing action: ${params.name}`, error);
    }
  }
}
