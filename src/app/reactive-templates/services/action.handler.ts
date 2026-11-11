import { inject, Injectable } from "@angular/core";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { ActionRegistry } from "./action.registry";
import { getScopeFallbackCandidates } from "../scope-fallback.utils";

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
        const namespace = action.namespace;

        if (params.name) {
          await this.handle(params, namespace);
        } else {
          return console.error("[ACTION] Name parameter not provided to action");
        }
      },
    });
  }

  private async handle(params: IActionParameters, namespace?: string) {
    const isQualifiedName = params.name.includes(".");
    const requestedActionName = isQualifiedName
      ? params.name
      : `${namespace ? `${namespace}.` : ""}${params.name}`;
    const actionCandidates = isQualifiedName
      ? [requestedActionName]
      : getScopeFallbackCandidates(requestedActionName);
    const actionName = actionCandidates.find((candidate) => this.actionRegistry.has(candidate));

    if (!actionName) {
      return console.error(`[ACTION] No action registered with name: ${requestedActionName}`);
    }

    const action = this.actionRegistry.get(actionName);

    try {
      await action.execute();
    } catch (error) {
      console.error(`[ACTION] Error executing action: ${actionName}`, error);
    }
  }
}
