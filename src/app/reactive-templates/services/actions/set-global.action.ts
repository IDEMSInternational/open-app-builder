import { Injectable } from "@angular/core";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { EvaluationService } from "../evaluation.service";
import { VariableStore } from "../../stores/variable-store";

@Injectable({
  providedIn: "root",
})
export class SetGlobalActionService {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private evaluationService: EvaluationService,
    private variableStore: VariableStore
  ) {
    this.templateActionRegistry.register({
      set_global: async ({ args }) => {
        const [key, value] = args;
        return this.setGlobal(key, value);
      },
    });
  }

  private async setGlobal(key: string, value: any) {
    let evaluatedValue = this.evaluationService.evaluateExpression(value, "");
    this.variableStore.set({ type: "global", name: key }, evaluatedValue);
  }
}
