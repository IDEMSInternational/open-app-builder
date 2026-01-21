import { inject, Injectable } from "@angular/core";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { ActionRegistry } from "./action.registry";

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
    const actionName = baseName ?? params.name;

    if (!this.actionRegistry.has(actionName)) {
      return console.error(`[ACTION] No action registered with name: ${actionName}`);
    }

    const action = this.actionRegistry.get(actionName);

    try {
      await action.execute();
    } catch (error) {
      console.error(`[ACTION] Error executing action: ${actionName}`, error);
    }
  }
}
