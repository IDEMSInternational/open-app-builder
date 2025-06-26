import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";

@Injectable({
  providedIn: "root",
})
export class NavigateBackService extends SyncServiceBase {
  constructor(private templateActionRegistry: TemplateActionRegistry) {
    super("NavigateBack");
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      navigate_back: async () => {
        this.navigateBack();
      },
    });
  }

  public navigateBack(): void {
    window.history.back();
  }
}
