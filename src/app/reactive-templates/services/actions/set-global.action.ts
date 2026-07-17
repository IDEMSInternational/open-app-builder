import { Injectable } from "@angular/core";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { VariableStore } from "../../stores/variable-store";

@Injectable({
  providedIn: "root",
})
export class SetGlobalActionService {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
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
    this.variableStore.set({ type: "global", name: key }, value);
  }
}
