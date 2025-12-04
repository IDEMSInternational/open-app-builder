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

        if (params.name) {
          await this.handle(params);
        } else {
          return console.error("[ACTION] Name parameter not provided to action");
        }
      },
    });
  }

  private async handle(params: IActionParameters) {
    if (!this.actionRegistry.has(params.name)) {
      return console.error(`[ACTION] No action registered with name: ${params.name}`);
    }

    const action = this.actionRegistry.get(params.name);

    try {
      await action.execute();
    } catch (error) {
      console.error(`[ACTION] Error executing action: ${params.name}`, error);
    }
  }
}
